<template>
    <div class="they-detail-material-page" :class="{hideLogo:!hideLogo}">
        <div class="min-w">

            <div class="content-w">
                <div class="content">
                    <div class="bigimg-w">
                        <div class="head" v-if="!hideLogo">
                            <div class="logo">
                                <logo></logo>
                            </div>
                        </div>
                        <div class="bigimg">
                            <img :src="pictures[0].src" alt="" class="thumb"  v-if="pictures.length==1">
                            <div class="swiper-img" v-else-if="pictures.length>1">
                                <el-carousel indicator-position="none" arrow="always" @change="getCurrent"  :autoplay="true" ref="swiper">
                                    <el-carousel-item v-for="(item,index) in pictures" :key="index" height="100%">
                                        <img :src="item.src" v-if="item.fileType==1" alt="">
                                        <video :src="item.src" v-else-if="item.fileType==3"></video>
                                    </el-carousel-item>
                                </el-carousel>
                                <ul class="minis" @mouseenter="autoplay=false" @mouseleave="autoplay=true">
                                    <li v-for="(item,index) in pictures" :class="{isActive:picCurrentIndex==index}" :key="index" @click="$refs.swiper.setActiveItem(index)"> <img :src="item.picPathCompre" alt=""></li>
                                </ul>
                            </div>
                            <div class="bottom-btns">
                                <ul class="left">

                                </ul>
                                <ul class="center">
                                    <li @click="backSee">
                                        <img src="@/assets/images/they/back.png" alt="">
                                        <img src="@/assets/images/they/back-hover.png" class="hover" alt="">
                                        返回
                                    </li>
                                    <li @click="clickLove" :class="{isfavorite:info.isfavorite}" >
                                        <img src="@/assets/images/they/love.png" alt="">
                                        <img src="@/assets/images/they/love-hover.png" class="hover" alt="">
                                        <img src="@/assets/images/they/loveed.png" class="loveed" alt="">
                                        喜欢
                                    </li>
                                    <audio v-if="musicUrl" :src="musicUrl" :autoplay="autoplay" id="music" hidden></audio>
                                    <li v-if="musicUrl" @click="changeAudio"  class="sound">
                                        <img v-show="musicVisible" src="@/assets/images/they/music.png" alt="">
                                        <img v-show="musicVisible" src="@/assets/images/they/music-hover.png" class="hover" alt="">
                                        <img v-show="!musicVisible" src="@/assets/images/they/pause.png" alt="">
                                        <img v-show="!musicVisible" src="@/assets/images/they/pause-hover.png" class="hover" alt="">
                                        音乐
                                    </li>
                                    <li @click="toArt" v-if="info.objStatus" class="toArt">
                                        <img src="@/assets/images/gif.gif" alt="">
                                        <img src="@/assets/images/gif.gif" class="hover" alt="">
                                        进入展厅
                                    </li>
                                    <li v-else class="disabed">
                                        <img src="@/assets/images/they/time.png" alt="">
                                        正在处理
                                    </li>
                                </ul>
                                <ul class="right" >
                                    <li v-bind:style="{'backgroundColor':btnColor}" v-if="btnLink" @click="pageOpen(btnLink)">{{btnText}}</li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="left-info" >
                        <information :tempid="tempid" :info="info" :user="user" :articleTitle="articleTitle" :articleContent="articleContent" :materialid="mematerialid" @materialClick="materialClick"></information>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import logo from "@/components/logo.vue";
import information from "./information";
import store from "@/store";
export default {
   name:"they-detail-material",
   props:["hideLogo","tempid","materialid"],
    data(){
        return {
            picCurrentIndex:0,
            picks:[],
            pictures:[],
            musicUrl:'',
            musicVisible:true,
            info:{
                _imgUrls:[],
                pictures:[],
                qrcodeUrl:""
            },
            user:{
                sceneCount:0,
                guestCount:0
            },
            autoplay:false,
            audio:null,
            shareQcode:false,
            favoriting:false,
            mematerialid:this.materialid,
            articleId:'',
            articleTitle:'',
            articleContent:'',
            btnColor:'',
            btnText:'',
            btnLink:'',
            btnType:'',
        }
    },
    computed:{
        userinfo(){
            return store.state.userinfo;
        }
    },
    components:{
        logo,
        information
    },
    mounted(){
        this.getInfo(this.materialid,true);
    },
    watch:{
        materialid(val){
            if(val){
                this.mematerialid = val;
                this.getInfo(val);
            }
        }
    },
    methods:{
        pageOpen(link){
            const that = this;
            var leftVal = (screen.width - 1500) / 2;
            var topVal = (screen.height - 700) / 2;
            if(that.btnType == 1){  //开新窗口
            window.open(link, 'newwindow', 'height=700, width=1500, top='+ topVal +', left='+leftVal+', toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
            }else{ //当前页面打开
            window.location.href=link;
            }
        },
        changeAudio(){
           let musicObj = document.getElementById('music');
           if(musicObj.paused){ //暂停中
               musicObj.play();
               this.musicVisible = false;

           }else{ //播放中
               musicObj.pause();
               this.musicVisible = true;

           }


       },
       getArticleInfo(){
            const that = this;
            if(that.articleId!=''){
                that.$http.mediaInfo({id:that.articleId}).then((res)=>{

                    that.articleTitle = res.title;
                    that.articleContent = res.content;
                }).catch(()=>{
                })
            }

       },
       clickLove(){
           var me = this;
           if(me.userinfo){
               if(!me.favoriting){
                   if(!me.info.isfavorite){
                       me.$http.favorite({tempid:me.info.tempid,token:me.userinfo.token}).then((res)=>{
                        me.$set(me.info,"isfavorite",true)
                       }).catch(()=>{}).finally(()=>{me.favoriting = false})
                   }else{
                        me.$http.unfavorite({tempid:me.info.tempid,token:me.userinfo.token}).then((res)=>{
                            me.$set(me.info,"isfavorite",false)
                       }).catch(()=>{}).finally(()=>{me.favoriting = false})
                   }
               }

           }else{
               me.$Ruler.confirm("请先登录哦~").then((res)=>{
                   if(res == "ok"){
                       me.$Ruler.account({
                           options:{
                               operate:0
                           }
                       })
                   }
               })
           }

       },
       getCurrent:function(key1, key2) {
            this.picCurrentIndex = key1;
       },
       getInfo(materialid,getUser){
           var me = this;
           var param = {
               tempid:this.tempid,
               objId:materialid
            }

           me.$http.getObjInfo(param).then((info)=>{
               me.$utils.formateMaterial(info,param.objId);
               if(info.musicUrl){
                   me.musicUrl = info.musicUrl;
                   me.audio = new Audio(info.musicUrl);
               }
                if(info.btnColor){
                    me.btnColor = info.btnColor;
                }
                if(info.btnText){
                    me.btnText = info.btnText;
                }
                if(info.url){
                    me.btnLink = info.url;
                }
                if(info.target){
                    me.btnType = info.target;
                }
                if(info.articleId){
                    me.articleId = info.articleId;
                    me.getArticleInfo();
                }else{
                    me.articleId='';
                }
                me.pictures = info._imgUrls;
                if(getUser){
                    me.info = info;
                }else{
                    //避免瀑布流多次加载
                    for(let i in info){
                        if(i !== "pictures"){
                             me.$set(me.info,i,info[i]);
                        }
                    }
                }
               if(info.userId && getUser){
                   me.getUserInfo(info.userId);
               }
           }).catch(()=>{
           })
       },
       getUserInfo(userId){
           var me = this;
           me.$http.getOtherUserInfo({userId}).then((userInfo)=>{
               me.user = userInfo;
           }).catch(()=>{

           })
       },
       materialClick(item){
           if(this.hideLogo){
                //直接跳转网页
                this.$router.replace({name:"detailMaterial",params:{tempid:this.tempid,materialid:item.objId}});
                this.mematerialid = item.objId;
                this.getInfo(item.objId);

            }else{

                this.$emit("toMetail",item);
            }
       },
       backSee(){
            this.pictures = this.info._imgUrls;
            if(this.hideLogo){
                //直接跳转网页
                this.$router.go(-1);
            }else{
                this.$emit("toDetail");
            }
       },
       toArt(){
           if(this.info && this.info.objStatus){
               var url = this.$utils.getArtViewUrl({G_TEMP_ID: this.tempid})
               window.open(url,"_blank");
           }

       },

       paused(){
           var me = this;
           if(me.audio){
                me.audio.pause();
                me.audioPlay = false;
           }
       },
       musicPlay(){
           var me = this;
           if(me.audio){
               if(me.audio.paused){
                   me.audio.play();
                   me.audioPlay = true;
               }else{
                   me.audio.pause();
                   me.audioPlay = false;
               }
           }

       }
    },
    destroyed(){
        this.paused();
    }

}
</script>

<style lang="scss" scoped src="./detail.scss"></style>
<style lang="scss">
.they-detail-material-page{
    div.custom-dialog__wrapper{
        div.el-dialog{
            margin: 0 !important;
            width: 100%;
            height: 100%;
        }
        div.el-dialog__body{
            height: 100%;
        }
    }
    div.swiper-img{
        position: absolute;
        z-index: 10;
        height: 100%;
        width:100%;

        div.el-carousel{
            height: 100%;
            width:100%;
            div.el-carousel__container{
                height: 100% !important;
            }
        }
        img{
            max-width: 100%;
            max-height: 100%;
            position: relative;
            top: 50%;
            transform: translateY(-50%)
        }
        button.el-carousel__arrow{
            width:54px;
            height:54px;
            background:rgba(17,17,17,1);
            border:2px solid rgba(255,255,255,1);
            opacity:0.6;
            border-radius:50%;
            &:hover i{
                    color:#23B8FF
                }
            &.el-carousel__arrow--right{


            }
            &.el-carousel__arrow--left{

            }
            i{
                //display: none;
                font-size:20px;

            }
        }
    }

}


</style>

