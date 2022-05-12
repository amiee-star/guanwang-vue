<template>
    <div class="vue-comments">
        <div class="editor-f" v-show="showEditor">
            <div class="editor-w">
              <textarea name="" :placeholder="placeholder" v-model="comment" ></textarea>
            </div>
            <ul class="emoji" v-show="showemoji">
                <li v-for="(item,index) in emojis" :key="index" @click="selectemoji(item)"><span v-html="item" :title="index"></span></li>
            </ul>
            <div class="vcontrol">
                <div class="emojibtn" @click="showemoji=!showemoji">
                    表情
                </div>
                <div class="btn" @click="bindFormSubmit">{{atData?"回复":"评论"}}</div>
            </div>
        </div>
        <div class="count" v-show="showCount">
            评论数 {{count || 0}}
        </div>
        <ul class="comments">
            <li v-for="(item,index) in list" :key="index">
                <div class="avatar" @click="$emit('clickAvatar',item)">
                    <img :src="item.avatar || config.defAvatar" alt="">
                </div>
                <div class="content">
                    <div class="user"  @click="$emit('clickName',item)" >{{item.nick || config.defNick}}</div>
                    <div class="time-reply">
                        <div class="time">{{item._createAt}}</div>
                        <div  class="reply"><span  @click="atReply(item)">回复</span> </div>
                    </div>
                    <div class="txt">{{item.comment}}</div>
                    <div class="vquote" v-if="item._childs && item._childs.length > 0">
                        <div v-for="(child,idx) in item._childs" :key="idx">
                            <div class="avatar"  @click="$emit('clickAvatar',item)">
                                <img :src="child.avatar || config.defAvatar" alt="">
                            </div>
                            <div class="content">
                                <div class="user" @click="$emit('clickName',item)">{{child.nick || config.defNick}}</div>
                                <div class="time-reply">
                                    <div class="time">{{child._createAt}}</div>
                                    <div class="reply"><span   @click="atReply(child)">回复</span> </div>
                                </div>
                                <div class="txt"  >
                                    <span v-if="child.at" class="at" @click="$emit('clickAt',child)">@{{child.at}}</span>
                                    <span>{{child.comment}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="loadmore" v-show="haseData&&showLoadMore" @click="query">点击加载更多</div>
    </div>

</template>

<script>

const emojis = require("./res/emoji.json");
import utils from "./res/utils";
// 存储服务
var AV = require('leancloud-storage');  // npm i leancloud-storage --save

export default {
    name:"vue-comments",
    props:{
        person:{
            type:Object,
            default(){
                return {
                    nick: '游客',
                    attach: {},
                    ua: '', //来源
                    avatar: "",
                    url: "" //标识 id,针对哪个的标识
                }
            }
        },
        table:{
            type:String,
            default:"Comment"
        },
        pageSize:{
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
        },
        showLoadMore:{
            type:Boolean,
            default:true
        },
        showCount:{
            type:Boolean,
            default:true
        },
        showEditor:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {
            list:[],
            atData:"",
            comment:"",
            placeholder:"请输入评论",
            haseData:true,
            count:'',
            currtPage:1,
           cacheId:{},
           emojis:emojis,
           showemoji:false
        }
    },
    mounted(){
       this.init(this.config)
    },
    methods:{
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
                this.query(1);
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
                q.equalTo('state', "2");
                q.addDescending('createdAt');
                q.addDescending('insertedAt');
                return q;
            }else{
                ids = JSON.stringify(ids).replace(/(\[|\])/g, '');
                let cql = `select * from ${table} where rid in (${ids}) and state='2' order by createdAt,updatedAt asc `;
                return AV.Query.doCloudQuery(cql);
            }
        },
        QcountAll(k){
            //获取所有的评论数量
            const me = this;
            const table = me.table;
            let cql = `select count(*) from ${table} where url='${decodeURI(k)}' and state='2' `;
            return AV.Query.doCloudQuery(cql);
        },
        async query(page){
             const me = this;
            if(!me.haseData){
                return ;
            }
            let no = me.currtPage;
            const url = me.config.path;
            const size = me.pageSize;

            var list = me.list;
            let cacheId = me.cacheId; //防止数据分页重复
            if(page === 1){
                list = [];
            }
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
                let ret = utils.formatItem(rets[i]);
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
                        let child = utils.formatItem(childs[k]);
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
                let text = await me.$http.wordFilter({content:commentTxt})
                comment.set("comment", text);
                comment.set("state","1"); // 设置状态， 1 未审核，2 审核通过， 3 审核不通过
                comment.setACL(me.getAcl()); //设置权限，可以读写
                let ret = await comment.save();
                /*
                let data = utils.formatItem(ret);

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
                */
                me.$Ruler.success("留言成功，审核通过后显示")
                me.reset();
            }catch(e){
                console.log(e)
            }
       
        },
        
        getAcl(){
            let acl = new AV.ACL();
            acl.setPublicReadAccess(true); //大家都可以读取
            acl.setPublicWriteAccess(true);    //不允许删除，可以指定账户有删除权限
            return acl;
        },
        
        reset(){
            this.comment = "";
            this.atData = "";
            this.placeholder ="请输入评论";
            this.showemoji = false;
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
            this.$emit("atReply",this.atData);
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
    }
}
</script>
<style lang="scss" scoped  src="./comment.scss"></style>
