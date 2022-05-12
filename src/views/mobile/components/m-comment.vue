<template>
    <div class="m-comment">
        <div class="m-comment-w">
            <div class="icon">
            <img src="@/assets/mimg/detail/message.png" alt="" @click="showComment()">
        </div>
        <div class="rightc">
            <ul v-if="list.length > 0">
                <li v-for="(item,index) in list" :key="index" >
                    <div class="main">
                        <img :src="item.avatar || config.defAvatar" alt="" class="avatar">
                        <div class="content">
                            <div class="user-time">
                                <span class="name" @click="clickName(item)">{{item.nick || config.defNick}}</span>
                                <span class="time">{{item._createAt}}</span>
                            </div>
                            <div class="txt" @click="atReply(item)">{{item.comment}}</div>
                        </div>
                    </div>
                    <div class="vquote" v-if="item._childs && item._childs.length > 0">
                        <div class="levlliw" v-for="(itemName,idx) in item._childs" :key="idx"  @click="atReply(itemName)">
                            <div class="levlli levelone" v-if="itemName.pid == item.id">
                                <span class="name" @click.stop="clickName(itemName)">{{itemName.nick || config.defNick}}</span><span class="txt">{{itemName.comment}}</span>
                            </div>
                            <div class="levlli leveltwo" v-else>
                            <span class="name" @click.stop="clickName(itemName)">{{itemName.nick || config.defNick}}</span><span class="call">回复</span><span class="at" @click.stop="clickAt(itemName)">{{itemName.at}}</span><span class="txt">{{itemName.comment}}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="notdata" v-else>
                <div class="icon">
                    <img src="@/assets/mimg/detail/notcomment.png" />
                </div> 
                <div class="text">还没有人评论，有什么想说的？</div>
            </div>

            <el-dialog
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            top="0"
            >
                <div class="bg" @click="dialogVisible=false"></div>
                <div class="editor-input">
                    <input type="text" v-model="comment" :placeholder="placeholder" ref="input"><div class="btn" @click="bindFormSubmit">{{atData?"回复":"评论"}}</div>
                </div> 
            </el-dialog>

            
        </div>
        </div>
        <div class="loadmore" v-show="loading" ref="loadmore">加载更多...</div>
    </div>
</template>
<script>
// 存储服务
var AV = require('leancloud-storage');  // npm i leancloud-storage --save
export default {
    name:"m-comment",
    props:{
        table:{  //使用的表
            type:String,
            default:"Comment"
        },
        pageSize:{  //分页
            type:Number,
            default:10
        },
        config:{
            type:Object,
            default(){
                return {
                    path:"",      //很重要的标识
                    defAvatar: "", //有些评论没有头像的，给个默认头像
                    defNick: "", //有些评论如果没有名字，就使用默认的
                    appId: "",
                    appKey: ""
                }
            }
        }
    },
    data(){
        let userinfo = this.$store.state.userinfo;
        let person;
        if(userinfo){
            person = {
                        nick: userinfo.username,
                        attach: {
                            userId:userinfo.userId
                        },
                        ua: 'art-office',
                        avatar: userinfo.headimgurl,
                    };
        }
        return {
            list:[],
            atData:"",
            comment:"",
            placeholder:"请输入评论",
            haseData:true,
            count:'',
            currtPage:1,
            cacheId:{},
            dialogVisible:false,
            person:person,
            loading:false
        }
    },
    mounted(){
        this.init(this.config);
        window.addEventListener("scroll",this.onscroll);
    },
    methods:{
        onscroll(){
            var offset = $(this.$refs.loading).offset();
            if(offset && ($(window).scrollTop() >= offset.top - $(window).height())){
                //需要数据
                this.query();
            }
        },
        getServerURLs(AV,id){
            AV.applicationId && delete AV._config.applicationId || (AV.applicationId = void 0);
            AV.applicationKey && delete AV._config.applicationKey || (AV.applicationKey = void 0);
            let serverURLs = id.slice(-9) === '-MdYXbMMI' ? 'https://us.avoscloud.com' : 'https://avoscloud.com';
            return serverURLs;
        },
        resetData(){
            this.atData="";
            this.comment="";
            this.placeholder="请输入评论";
            this.haseData=true;
            this.count='';
            this.currtPage=1;
            this.showemoji=false;
            this.cacheId = {};
        },
        init(config){
            config = config || {};
            this.config = Object.assign(this.config,config);
            const appId = config.appId;
            const appKey = config.appKey;
            const path = config.path;
            if (appId && appKey && path){
                AV.init({
                appId: appId,
                appKey: appKey,
                serverURLs: this.getServerURLs(AV, appId)  //通过appid获取
                });
                this.resetData();
                this.query();
                this.initCount();
           }
        },
        Q(k,ids){
            const me = this;
            const table = me.table;
            if (!ids){
                let notExist = new AV.Query(table);
                notExist.doesNotExist('rid');
                let isEmpty = new AV.Query(table);
                isEmpty.equalTo('rid', '');
                let q = AV.Query.or(notExist, isEmpty);
                if (k === '*') q.exists('url');
                else q.equalTo('url', decodeURI(k));
                q.addDescending('createdAt');
                q.addDescending('insertedAt');
                return q;
            }else{
                ids = JSON.stringify(ids).replace(/(\[|\])/g, '');
                let cql = `select * from ${table} where rid in (${ids}) order by createdAt,updatedAt asc `;
                return AV.Query.doCloudQuery(cql);
            }
        },
        QcountAll(k){
            //获取所有的评论数量
            const me = this;
            const table = me.table;
            let cql = `select count(*) from ${table} where url='${decodeURI(k)}' `;
            return AV.Query.doCloudQuery(cql);
        },
        formatItem(item){
            var obj = Object.assign({}, item.attributes);
            obj.id = item.id;
            obj.cid = item.cid;
            var d = item.get('insertedAt');
            obj.createAt = d;
            obj._createAt = this.$utils.getMsgTime(d);
            obj.updatedAt = d;
            return obj;
        },
        async query(){
             const me = this;
            if(!me.haseData){
                return ;
            }
            let no = me.currtPage;
            const url = me.config.path;
            const size = me.pageSize;

            var list = me.list;
            let cacheId = me.cacheId; //防止数据分页重复
            if(no === 1){
                list = [];
            }
            me.loading = true;
            try{
                let cq = me.Q(url);
                cq.limit(size);
                cq.skip((no - 1) * size);
                var rets = await cq.find();
                let len = rets.length;
                let retsData = [];
                let cache = {};
                
                let rids = [];
                for (let i = 0; i < len; i++) {
                let ret = me.formatItem(rets[i]);
                if (!cacheId[ret.id]){
                    rids.push(ret.id);
                    retsData.push(ret);
                    cache[ret.id] = ret;
                    cacheId[ret.id] = true;
                }
                }

                //加载子节点
                if (rids.length > 0) {
                    let retChilds = await me.Q(url, rids);
                    let childs = retChilds && retChilds.results || [];
                    for (let k = 0; k < childs.length; k++) {
                        let child = me.formatItem(childs[k]);
                        let parent = cache[child["rid"]];
                        if (parent){
                        if(!parent._childs){
                            parent._childs = [];
                        }
                        parent._childs.push(child);
                        }
                    }
                }

                if (len < size){
                    me.haseData = false
                }

                me.list = list.concat(retsData);
                me.currtPage = ++no;
            }catch(e){
                console.log(e);
            }
             me.loading = false;
        },
       async initCount(){
            this.count = await this.getCount();
        },
        async getCount(){
                //获取评论的总数
                try{
                    if (this.count === "") {
                    //说明还没有请求过
                    const url = this.config.path;
                    //let count = this.Q(url).count();
                    var count = await this.QcountAll(this.config.path);
                    return Promise.resolve(count.count);
                    } else {
                    return Promise.resolve(this.count);
                    }
                }catch(e){
                    console.log(e);
                    return Promise.resolve(0);
                }
        },
         async commitEvt(commentTxt){
            //提交
            try{

                const me = this;
                const table = me.table;
                const url = me.config.path;
                let atData = me.atData;
                let Ct = AV.Object.extend(table);
                // 新建对象
                let comment = new Ct();

                let person = me.person
                for (var i in person) {
                comment.set(i, person[i]);
                }

                comment.set('url', decodeURI(url));
                comment.set('insertedAt', new Date());
                if (atData) {
                let pid = atData['pid'] || atData['rid'];
                comment.set('rid', atData['rid']);
                comment.set('pid', pid);
                comment.set('at', atData['at']);    //艾特的人的用户名
                comment.set('atattach', atData['atattach']); //被艾特的人的附加数据
                }
                comment.set("comment", commentTxt);
                comment.setACL(me.getAcl()); //设置权限，可以读写
                let ret = await comment.save();
                
                let data = me.formatItem(ret);

                let list = me.list;
                if (atData) {
                    //插入子节点
                    for (let i = 0; i < list.length; i++) {
                        let item = list[i];
                        if (item.id == data.rid) {
                        if (!item._childs){
                            item._childs = [];
                        }
                        item._childs.push(data);
                        break;
                        }
                    }
                }else{
                    //追加节点
                    list.unshift(data);
                
                    me.cacheId[data.id] = true;
                }

                //评论数加一
                let count = await this.getCount();
                count++;
                me.count = count;
                
                me.list = list;
                me.reset();
            }catch(e){
                console.log(e)
            }
       
        },
        
        getAcl(){
            let acl = new AV.ACL();
            acl.setPublicReadAccess(true); //大家都可以读取
            acl.setPublicWriteAccess(false);    //不允许删除，可以指定账户有删除权限
            return acl;
        },
        
        reset(){
            this.comment = "";
            this.atData = "";
            this.placeholder ="请输入评论";
            this.dialogVisible = false;
        },
        selectemoji(emo){
            this.comment = this.comment + emo;
        },
         atReply(item){
            //艾特 回复
            this.atData = {
                'at':  item.nick,
                'atattach': item.attach || {}, //被at的附加信息
                'rid': item.rid || item.id, //  rt.id 自己的id ， rt.get("rid") 根评论的id， rt.get("pid") 父级评论的id
                'pid': item.id,
                'rt': item
            }
            this.placeholder = '@' + item.nick + ' '
            this.showComment();
            //this.$emit("atReply",this.atData);
        },
        bindFormSubmit(){
            const me = this;
            let comment = me.comment;
            comment = comment.trim();
            if (!comment) {
                if(me.$Ruler &&  me.$Ruler.warn){
                    me.$Ruler.warn("内容不能为空");
                }else{
                    alert("内容不能为空");
                }
                
                return;
            }
            this.commitEvt(comment);
        },
        showComment(){
            const me = this;
            if(me.person){
                //存在用户
                me.dialogVisible = true;
                me.$nextTick(()=>{
                    me.$refs.input.focus();
                });
            }else{
                //获取用户信息---需要登录才能使用,移动端暂不做登录，所以先禁用登录

            }
        },
        clickName(item){
            //没有去他人空间
        },
        clickAt(item){
            
        }
    },
    watch:{
        config:{
            handler(val,oldval){
                if(val){
                    this.init(val);
                }
            },
            deep:true
        },
        count(val,oldval){
            this.$emit("countChange",val);
        }
    },
     destroyed(){
         window.removeEventListener("scroll",this.onscorll);
    }
}
</script>
<style lang="scss" scoped>
.m-comment{
    margin-bottom: .5rem;
    .m-comment-w{
        display: flex;
        background: #F6F6F6;
    }
    div.icon{
        width: .33rem;
        height: .3rem;
        margin-top: .4rem;
        margin-left: .20rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
    div.rightc{
        flex: 1;
        padding-left: 0.22rem;
        padding-right: 0.18rem;
        li{
            padding-top: .4rem;
            margin-bottom: .4rem;
            &+li{
                border-top: 1px solid #E0E0E2;
            }
            div.main{
                display: flex;
                img.avatar{
                    width: .63rem;
                    height: .63rem;
                    border-radius:.1rem;
                }
            }
            div.content{
                flex: 1;
                margin-left: .16rem;
            }
            .user-time{
                display: flex;
                justify-content: space-between;
                .name{
                    color: #000000;
                    font-size: .28rem;
                    font-weight:bold;
                }
                .time{
                    color: #999999;
                    font-size: .24rem;
                }
            }
            .txt{
                font-size: .28rem;
                color: #333333;
                white-space: pre-wrap;
           }

           div.vquote{
                font-size: .28rem;
                color: #333333;
                border-top: 1px solid #E0E0E2;
                margin-top: .2rem;
                .name,.at,.call{
                    color: #497480;
                }
                .call{
                    padding: 0 .1rem 0 .12rem;
                }
                .at{
                    padding-right: .12rem;
                }
                .levlli{
                    padding: .22rem 0;
                } 
                .levlliw{
                    border-bottom: 1px solid #E0E0E2;
                }
                .levlliw:last-child{
                    border: none;
                    .levlli{
                        padding-bottom: 0;
                    }
                }
                
           }
        }
    }

    .notdata{
        padding-top: .20rem;
    }
    .notdata .icon{
    width: 4.8rem;
    height: 2.25rem;
    margin: 0 auto;
    }
    .notdata .text{
    text-align: center;
    color: #999999;
    font-size: .24rem;
    padding-bottom: .84rem;
    }

  
    div.editor-input{
        position: absolute;
        transition: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        height: .98rem;
        padding: .15rem 0 .15rem .4rem;
        background: #fff;
        input{
            background: #F5F5F5;
            height: .68rem;
            border: none;
            outline: none;
            border-radius: .34rem;
            flex: 1;
            padding: 0 .30rem;
        }
        div.btn{
            padding: .1rem .4rem .1rem .35rem;
            cursor: pointer;
        }
   }

   .loadmore{
       text-align: center;
       padding: .1rem 0;
    }

}
</style>
<style lang="scss">
.m-comment{
    .el-dialog__wrapper{
        padding: 0;
        width: 100%;
        .el-dialog{
            padding: 0 !important;
            margin: 0 !important;
            width: 100vw;
            height: 100vh;
            left: 0;
            background: transparent;
            .el-dialog__header{
                display: none;
            }
            .el-dialog__body{
                padding: 0;
                height: 100%;
                div.bg{
                    height: 100%;
                }
            }
        }

    }
    
}
</style>