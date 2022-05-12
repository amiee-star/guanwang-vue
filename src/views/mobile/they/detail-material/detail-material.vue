<template>
    <div class="detail-material">
        <navHeader :title="info.name || '素材详情'" />
        <div class="banner">
            <div class="bannerimg" v-if="info._imgUrls && info._imgUrls.length > 0">
                <img :src="info._imgUrls[0].src" alt class="fill" v-if="info._imgUrls.length == 1" />
                <el-carousel arrow="never" indicator-position="none" height="100%" v-else  @change="onSwiperChnage"> 
                <el-carousel-item v-for="(item,index) in info._imgUrls" :key="index">
                    <img :src="item.src" alt class="fill" />
                </el-carousel-item>
                </el-carousel>
            </div>
            <div class="see-info">
                <a class="btn" v-if="info.link" :href="info.link">了解更多</a>
                <span v-if="info._imgUrls && info._imgUrls.length > 1" >{{currImg}}/{{info._imgUrls.length}}</span>
            </div>
            <div class="backindex" @click="$router.push({name:'index'})" v-if="showBack">返回首页</div>
        </div>

        <div class="m-container materialinfo">
            <div class="name" v-if="info.name">{{info.name}}</div>
            <div class="size-pv"><span>{{info.thumbnailSize}}</span> <p><img src="@/assets/mimg/material/eye.png" alt=""> {{info.browserCount}}</p></div>
            <div class="music-w" v-if="musicUrl">
                <div class="icon " :class="{isplay:isplay}" @click="play"></div>
                <div class="prog">
                    <div class="runway">
                        <span class="circle" :style="{left:progress}"></span>
                    </div>
                    <div class="time">
                        <span>{{currentTime}}</span>
                        <span>{{duration}}</span>
                    </div>
                </div>
            </div>
            <div class="desc" v-if="info.description">{{info.description}}</div>
        </div>
        <div class="article">
          <h4 v-if="articleTitle">{{articleTitle}}</h4>
          <div v-if="articleContent" class="articleCon" v-html="articleContent"></div>
      </div>
         <div class="split"></div>
        <div class="art m-container" @click="toDetail">
            <img :src="info.sceneThumbnail" alt="" class="thumb">
            <div class="about">
                <div class="content">
                    <div class="title">{{info.sceneName}}</div>
                    <p v-if="info.pictures">展品：{{info.pictures.length}}</p>
                    <span>{{info.username}}</span>
                </div>
            </div>
        </div>
        <div class="comment-love-w">
            <Mcomment
                v-if="config.path"
                :config="config" 
                ref="comment"
            />
        </div>
    </div>
</template>
<script>
import navHeader from "mobile/components/nav-header.vue";
import Mcomment from "mobile/components/m-comment.vue";
export default {
    name:"detail-material",
    components: {
        navHeader,
        Mcomment
    },
    data(){
        const materialid =  this.$route.params.materialid;
        const tempid = this.$route.params.tempid;
        return {
            info:{
            },
            currImg:1,
            isplay:false,
            duration:"00:00",
            currentTime:"00:00",
            progress:"0%",
            showBack: window.history.length <= 1,
            config:{
                path: materialid, //标识 id,针对哪个的评论标识
                defAvatar: "//3dshichuang.com/scene-portal/resources/wxapp/images/avatar.png", //有些评论没有头像的，给个默认头像
                defNick:"游客", //有些评论如果没有名字，就使用默认的
                appId:"4cG6KBG54iv4KdOhfOwagBBu-gzGzoHsz",
                appKey:"kSAwH65w4qmnpQgOBa4qvwBA"
            },
            tempid:tempid,
            materialid:materialid,
            articleId:'',
            articleTitle:'',
            articleContent:'',
            musicUrl:'',
        }
    },
    mounted(){
        
        this.getInfo();
        
    },

    methods:{
        getArticleInfo(id){
            const that = this;
            if(that.articleId) {
                that.$http.mediaInfo({id:that.articleId}).then((res)=>{
                    
                    that.articleTitle = res.title;  
                    that.articleContent = res.content;
                }).catch(()=>{
                })
            }
            
        },
        getInfo(materialid){
           var me = this;
           var param = {
               tempid:this.tempid,
               objId:me.materialid
               }
               console.log(param)

           me.$http.getObjInfo(param).then((info)=>{
               console.log(info)
               me.$utils.formateMaterial(info,param.objId,{width:512});
               me.info = info;
               let arrObj = JSON.parse(info.extData.info.custom);
               if(arrObj.detail_article){
                   me.articleId = arrObj.detail_article.id;
                   me.getArticleInfo();
               }
               if(arrObj.detail_audio){
                    let musicObj =arrObj.detail_audio ;
                    if(musicObj){
                        
                        me.musicUrl = musicObj.musicFile;
                        
                        me.initAudio(me.musicUrl);
                    }
               }
               
           }).catch(()=>{
           })
       },
       toDetail(){
           this.$router.push({
               name:"detail",
               params:{
                   materialid:this.materialid,
                   tempid:this.tempid
               }
           })
       },
        onSwiperChnage(e){
            this.currImg = e+1;
        },
        initAudio(url){
            const me = this;
            if(!me.audio){
                me.audio = new Audio();
                
            }
             me.audio.muted = false;
             me.audio.src = url;
             me.audio.oncanplay = function () {
                me.duration = me.formatTime(me.audio.duration);
                me.currentTime = me.formatTime(me.audio.currentTime);
                me.progress = (me.audio.currentTime/me.audio.duration)*100 +"%";
            }
            me.audio.ontimeupdate = function(){
                me.currentTime = me.formatTime(me.audio.currentTime);
                me.progress = (me.audio.currentTime/me.audio.duration)*100  +"%";
            }
            me.audio.οnended = function(){
                me.progress = "0%";
                me.isplay = false;
            }
            me.audio.onmuted =true;
            
        },
        play(){
            //const audio = new Audio();
            if(this.audio){
                if(this.isplay){
                    this.audio.pause();
                }else{
                    this.audio.play();
                }
                this.isplay = !this.isplay;
            }
        },
        formatTime(num){
            if(num <= 0){
            return "00:00"
            }
            var second = Math.floor(num % 60);
            num = num / 60;
            var minute = Math.floor(num);

            minute = minute < 10 ? `0${minute}`:minute;
            second = second < 10 ? `0${second}` : second;

            return `${minute}:${second}`;

        }
    },
    destroyed(){
        if(this.audio){
            this.audio.pause();
            this.audio = null;
        }
    }
}
</script>
<style lang="scss" scoped src="./detail-material.scss"> </style>