<template>
    <div class="tpl-view">
        <iframe :src="url" frameborder="0" v-if="url" width="100%" height="100%" allowfullscreen="true"></iframe>
        <template v-if="show3D">
            <div v-show="!ismoving">
                <div class="info-about">
                    <div class="info">
                        <p><span class="label">面积：</span><span class="res">{{info._sz}}㎡ <template v-if="info._floorNum">{{info._floorNum}}</template></span></p>
                        <p  v-if="info.tags"><span class="label">合适：</span><span class="res">{{info.tags}}</span></p>
                    </div>
                    <template v-if="info.caseList.length > 0">
                        <div class="head">
                            <span class="nm">案例</span>
                            <div class="showMore">
                                <span :class="{close:moreOpen}" @click="moreOpen=!moreOpen">{{ moreOpen ? "收起":"更多"}}<img src="@/assets/images/case/bread.png" alt /></span>
                            </div>
                        </div>
                        <div class="about" :class="{close:!moreOpen}" >
                            <div class="onscroll" >
                                <ul>
                                    <li v-for="(item,index) in info.caseList" :key="index" @click="toView(item)">
                                        <div class="thumb" :class="item._thumbnail">
                                            <img :src="item.thumb" alt="" >
                                        </div>
                                        <p class="title">{{item.name}}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="footer-info" v-if="info.type==1"><payFooter :selected="info"></payFooter></div>
                <div class="footer-kefu" @click="showKefu" v-else-if="info.type==2">
                    <svg-icon iconClass="qykf"></svg-icon>
                    <span>优惠活动 咨询客服</span>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import payFooter from "@/components/pay-footer/pay-footer.vue";
export default {
    name:"tpl-view",
    data(){
        return {
            tempid:this.$route.params.tempid,
            url:"",
            info:{},
            moreOpen:true,
            show3D:false,
            ismoving:false,
        }
    },
    components:{
        payFooter
    },
    mounted(){
        this.url = this.$utils.getArtViewUrl({G_TEMP_ID:this.tempid,viewtpl:1})
        this.getInfo();
        window.addEventListener("message",this.winMessage, false);
    },
    methods:{
       showKefu(){
            this.$utils.showKf();
       },
       async getInfo(){
           let res = await this.$http.getTemplateOne({parentId:this.tempid,type:1});
           res = this.$utils.formatItem(res);
           let caseList = res.caseList || [];
           for(let i = 0; i < caseList.length; i++){
               let item = caseList[i];
               if(!item.thumb){
                item.thumb = require("@/assets/images/self/logo-hui.png");
                item._thumbnail = "thumbnail-w";
                }else{
                item._thumbnail = "";
                }
           }
           res.caseList = caseList;
           res._sz = res.sz ? res.sz.toFixed(2) : 0;
           this.info = res;
       },
       winMessage(event){
            var origin = event.origin || event.originalEvent.origin;
            var data = event.data || {};
            if(data.type === "show3D" && data.data){
                this.show3D = true;
            }else if(data.type === "moving"){
                this.ismoving = data.data
            }

       },
       toView(item){
            var url = this.$utils.getArtViewUrl({G_TEMP_ID:item.tempid})
            window.open(url,"_blank");
       }
    },
    beforeDestroy(){
        window.removeEventListener("message",this.winMessage);
    }
}
</script>
<style lang="scss" scoped src="./tpl-view.scss">

</style>
