<template>
    <div class="m-scheme">
        <pageHeader />
        <div class="banner">
            <img src="@/assets/mimg/scheme/banner.png" alt="" class="bg">
            <div class="bg"></div>
            <div class="content m-container">
                <div class="title">
                    <p>3D数字化展示，重新构想</p>
                    <p>场景营销、博物馆、艺术品行业</p>
                </div>
                <div class="desc">
                    <p>视创认为：场景营销需要利用数字技术重塑视觉体验，挖掘企业</p> 
                    <p>或博物馆等行业自身数据价值，实现以消费者为中心的智慧场景营销</p>
                </div>
                <div class="contact" @click="showContact=true" >联系我们</div>
                <div class="phone">免费咨询3D数字化专家：<span>400-080-9959</span></div>
                <div class="time">（服务时间：工作日9:00-18:00）</div>
            </div>
        </div>
        <div class="consume">
            <div class="title">
                <p>用户、消费者需求正在不断</p>
                <p>演变发展，您呢？</p>
            </div>
            <ul>
                <li>
                    <div class="icon">
                        <img src="@/assets/mimg/scheme/new.png" alt="">
                    </div>
                    <div class="desc">萌发的消费者需求、不断演变的价值链和意想不到的竞争对手正在迫使企业、博物馆、艺术品行业做出巨大变革 </div>
                </li>
                <li>
                    <div class="icon">
                        <img src="@/assets/mimg/scheme/percent.png" alt="">
                    </div>
                    <div class="desc">的企业、博物馆、艺术家表示，传统的 价值链由于颠覆性技术而日渐分崩瓦解，并逐渐 被场景化营销取代 </div>
                </li>
            </ul>
        </div>
        <div class="art-business">
            <img src="@/assets/mimg/scheme/artbg.png" alt="" class="bg">
            <div class="content">
                <div class="text">
                    <div class="title">
                        <p>艺术与文物行业</p>
                        <p>解决方案</p>
                    </div>
                    <div class="desc">看视创视觉创新技术，如何助力文博客户实现数字化转型</div>
                </div>
                <div class="swipers"  v-once>
                    <swiperGrid :arr="artBusiness"></swiperGrid>
                </div>
            </div>
        </div>

        <div class="goods">
            <div class="content">
                <div class="title">零售与电商行业解决方案</div>
                <div class="iframe">
                    <iframe
                    src="//www.51jianmo.com/model?code=M000000000004054AA15G&desc=0&icon=1&type=1&quick=0&opacity=0&full=0"
                    frameborder="0"
                    allowfullscreen="allowfullscreen"
                    ></iframe>
                </div>
            </div>
        </div>

        <div class="goods-swiper"  v-once>
            <swiperGrid :arr="goods"></swiperGrid>
        </div>

        <div class="hourse"  v-once>
            <div class="m-container">
                <div class="title">
                    <p>房地产与空间陈列</p>
                    <p>解决方案</p>
                </div>
                <p class="desc">快速发展的驱动力来自于日益严苛的政策、日新月异的新材料新科技，通过利用视创展示平台的专业能力来提升企业稳定的永续发展</p>
            </div>
            <div class="swiper">
                <swiperGrid :arr="house"></swiperGrid>
            </div>
        </div>
        
        <div class="histroy"  v-once>
            <div class="m-container">
                <div class="title">
                    <p>历史、科技/党建馆</p>
                    <p>解决方案</p>
                </div>
                <p class="desc">聚焦中国发展的历史变迁，分析发展中面临的重大挑战，共同探索中国未来的发展与政策</p>
            </div>
            <div class="swiper">
                <swiperGrid :arr="science"></swiperGrid>
            </div>
        </div>
        <div class="enterprise">
            <div class="m-container">
                <div class="title">
                    <p>企业名片与客户</p>
                    <p>关系解决方案</p>
                </div>
                <p class="desc">致力于帮助企业创造一流的客户体验、构建敏捷的核心系统，提供科技创新服务并优化客户关系控制</p>
            </div>
            <div class="swiper">
                <swiperGrid :arr="enterprise"></swiperGrid>
            </div>
        </div>
        <div class="cooperation"  v-once>
            <div class="title">合作品牌</div>
            <ul>
                <li v-for="(item,index) in cooperation" :key="index" @click="skipTo(item)">
                    <div class="img">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="content">
                        <div class="name">{{item.name}}</div>
                        <div class="sub">{{item.sub}}</div>
                        <p>{{item.desc}}</p>
                    </div>
                </li>
            </ul>
            <div class="m-container" >
                <div class="btns" @click="$router.push({name:'case'})">更多案例 ></div>
            </div>
        </div>
        <footer>
            <div class="title">视创 在您身边</div>
            <div class="desc">
                <p>更多3D数字展示相关信息及 </p>
                <p>数字化重塑问题，请交给我们为您解答</p>
            </div>
            <p class="time">（服务时间：工作日9:00-18:00）</p>
            <ul>
                <li>
                    <img src="@/assets/mimg/scheme/fmsg.png" alt="" @click="showContact=true" >
                    <p>填写需求</p>
                    <span>请3D数字化专家与您联系</span>
                </li>
                <li>
                    <img src="@/assets/mimg/scheme/fphone.png" alt="">
                    <p>免费咨询3D数字化专家</p>
                    <span>400-080-9959</span>
                </li>
            </ul>
        </footer>
        <contactUs :isvisible="showContact" @close="showContact=false" />
    </div>

 

</template>
<script>
import pageHeader from "mobile/components/page-header/page-header.vue";
import contactUs from "mobile/components/contactus.vue";
import swiperGrid from "mobile/components/swiper-grid.vue";
import schemeData from "@/config/scheme";
export default {
    name:"scheme",
    data(){
        return {
            showContact:false,
            ...schemeData
        }
    },
    components:{
        pageHeader,
        contactUs,
        swiperGrid
    },
    methods:{
        skipTo(item){
            if(item.link){
                window.open(item.link,"__blank");
            }
        }
    }
}
</script>
<style lang="scss" scoped src="./scheme.scss"></style>