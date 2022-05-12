<template>
    <div class="media_detail">
<!--        <page-header :gradual="false"></page-header>-->
        <div class="news_box2">
            <div class="news_title">
                <router-link class="navTitle" :to="{name:'aboutMedia'}" tag="span">媒体中心</router-link>
                <i class="el-icon-arrow-right middleIcon"></i>
                <span class="news_con">新闻详情</span>
            </div>
            <div class="mews_content"><h1 class="title">{{info.title}}</h1><p class="small-title"><span class="news-type">公司新闻</span><span class="new-publish-time"> {{info.author}}</span></p><p class="share-news"></p>
            <div class="news-text"><div v-html="info.content"></div></div>
            </div>
        </div>
        <div class="news_box3">
            <div v-if="info.upid" @click="toDetail(info.upid)">
                <i class="el-icon-arrow-left newNext"></i>
                <span>上一篇</span>
            </div>
            <span></span>
            <div  v-if="info.downid"  @click="toDetail(info.downid)">
                <span>下一篇</span>
                <i class="el-icon-arrow-right newNext"></i>
            </div>
        </div>
<!--        <PageFooter></PageFooter>-->
        <fixed-tool></fixed-tool>
    </div>
</template>
<script>
export default {
    name:"media_detail",
    data(){
        return {
            info:{},
            id:null,
        }
    },
    mounted(){
        console.log(this.$router)
        this.id = this.$router.history.current.params.id;
        this.getInfo(this.id);
    },
    watch:{
        '$route' (to, from) {
            this.getInfo(to.params.id)
        }
    },
    methods:{
       async getInfo(id){
           this.info={};
           this.info = await this.$http.mediaInfo({id : id || this.$route.params.id});
        },
         toDetail(id){
            this.$router.replace({name:"aboutMediaDetail",params:{id:id}});
            this.getInfo(id);
        }
    }
}
</script>
<style lang="scss" scoped  src="./media_detail.scss"></style>