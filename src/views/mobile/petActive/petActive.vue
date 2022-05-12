<template>
    <div class="petActive">
        <div class="firstBlock">
            <img src="@/assets/mimg/active/active-first.png" alt="" />
        </div>
        <div class="secondBlock">
            <img src="@/assets/mimg/active/active-word.png" alt="">
        </div>
        <div class="thirdBlock">
            <div class="title">
                <div class="floor-title"><img src="@/assets/mimg/active/title-left.png" alt=""><span>如何参加活动</span><img src="@/assets/mimg/active/title-right.png" alt=""></div>
            </div>
            <ul>
                <li><img src="@/assets/mimg/active/active-step1.png" alt=""><span class="txt">进入<span class="light">微信“3d云展”小程序</span>活动页，点击<span class="light">“立即参赛，赢现金”</span>按钮，按照指引创建展厅；</span></li>
                <li><img src="@/assets/mimg/active/active-step2.png" alt=""><span class="txt">将展厅分享给好友，邀请好友为你的展厅点赞；</span></li>
                <li><img src="@/assets/mimg/active/active-step3.png" alt=""><span class="txt">关注微信小程序“3d云展”和公众号，加入活动QQ群: 972348765及时获取获奖信息</span></li>
            </ul>
            <div class="rule" @click="toRule">点击查看活动规则 ></div>
            <div class="title nextTitle">
                <div class="floor-title"><img src="@/assets/mimg/active/title-left.png" alt=""><span>活动奖励</span><img src="@/assets/mimg/active/title-right.png" alt=""></div>
            </div>
            <div class="pocketList">
                 <img src="@/assets/mimg/active/pocket1.png" alt="">
                 <img src="@/assets/mimg/active/pocket2.png" alt="">
                 <img src="@/assets/mimg/active/pocket3.png" alt="">
                 <img src="@/assets/mimg/active/pocket4.png" alt="">
                 <img src="@/assets/mimg/active/pocket5.png" alt="">
                 <img src="@/assets/mimg/active/pocket6.png" alt="">
            </div>
        </div>
        <div class="fourBlock">
             <div class="title">
                <div class="floor-title"><img src="@/assets/mimg/active/title-left.png" alt=""><span>萌宠推荐</span><img src="@/assets/mimg/active/title-right.png" alt=""></div>
            </div>
            <div class="list">
              <waterEasy 
                :maxCols="2"
                :imgsArr="list"
                srcKey="thumbnail"
                >
                    <template v-slot="{item}">
                      <div class="card" @click="toDetail(item)">
                        <div class="thumbnail">
                            <img :src="item.thumbnail" alt="" class="thumb">
                        </div>
                        <div class="content">
                            <div class="artname">{{item.name}}</div>
                            <div class="praise">
                                <div class="user"><img :src="item.headimgurl" alt=""><div>{{item.username}}</div></div>
                                <div class="count"><img src="@/assets/mimg/active/praise.png" alt="">{{item.likeCount}}</div>
                            </div>
                        </div>
                      </div>
                    </template>
                </waterEasy>
            </div>
        </div>
        <div class="rewardJoin" @click="isShow = true" v-if="gameInfo&&gameInfo.howH5">
            <img src="@/assets/mimg/active/play.png" alt="">
            <p>活动指引</p>
        </div>
        <div class="introVideo" v-if="isShow" @click="isShow = false">
             <video  :src="gameInfo.howH5" controls autoplay v-if="gameInfo&&gameInfo.howH5"></video>
        </div>
    </div>
</template>
<script>
import waterEasy from "@/components/vue-water-easy.vue";
export default {
    data(){
        return {
            list:[],
            gameInfo:null,
            isShow: false,
        }
    },
    components:{
        waterEasy
    },
    mounted(){
       this.getRecommend()
    },
    methods:{
        async getGameInfo(){
            if(this.gameInfo){
                return Promise.resolve(this.gameInfo);
            }

            let info =  await this.$http.getGameInfo();
            if(!info){
                // 没有活动相关信息
                this.$message.warning("活动已结束");
                setTimeout(() => {
                   this.$router.replace({name:"index"}) 
                }, 2000);
                return Promise.reject("活动已经结束");
            }else{
                // 存在活动
                this.gameInfo = info;
                return Promise.resolve(info);
            }
        },
        async getRecommend(){
            let gameInfo = await this.getGameInfo();
            let list = await this.$http.getRecommend({gid:gameInfo.gid});
            this.$utils.formatList(list);
            this.list = list;
        },
        toDetail(item){
            console.log(item);
            let tempid = item.tempid;
            this.$router.push({
                name:"detail",
                params:{
                    tempid
                }
            })
        },
        toRule(){
            window.location.href = "/scene-portal/resources/wxapp/active.html";
        },
        showIntro(){
           this.isShow = true;
        }
    }

}
</script>
<style lang="scss" scoped src="./petActive.scss"></style>
<style scoped lang="scss">

</style>