<template>
  <div class="scheme">
    <page-header></page-header>
    <div class="banner">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide>
          <img src="@/assets/images/scheme/banner01.png" alt />
        </swiper-slide>
        <swiper-slide>
          <img src="@/assets/images/scheme/banner02.png" alt />
        </swiper-slide>
        <swiper-slide>
          <img src="@/assets/images/scheme/banner03.png" alt />
        </swiper-slide>
        <swiper-slide>
          <img src="@/assets/images/scheme/banner04.png" alt />
        </swiper-slide>
      </swiper>
      <div class="show-w">
        <div class="bgblack"></div>
        <div class="show-info">
          <h3>3D数字化展示，重新构想</h3>
          <h3>场景营销、博物馆、艺术品行业</h3>
          <div class="desc">
            <p>场景营销需要利用数字技术重塑视觉体验，挖掘企业</p>
            <p>或博物馆等行业自身数据价值，实现以消费者为中心的智慧场景营销</p>
          </div>
          <div class="contact" @click="contactUs=true">联系我们</div>
          <div class="serve">
            <p>
              免费咨询3D数字化专家：
              <span>400-080-9959</span>
            </p>
            <p>（服务时间：工作日9:00-18:00）</p>
          </div>
        </div>
      </div>
    </div>
    <div class="subnav">
      <ul class="base-container">
        <li><a href="#artblock"></a>艺术与文物</li>
        <li><a href="#goods"></a>零售电商</li>
        <li><a href="#house"></a>地产与空间陈列</li>
        <li><a href="#science"></a>历史与科技馆</li>
        <li><a href="#enterprise"></a>企业品牌形象</li>
      </ul>
    </div>

    <div class="subdesc">
      <ul class="base-container">
        <li>
          <p>用户、消费者需求正在不断演变发展，您呢？</p>
        </li>
        <li>
          <div class="word">新</div>
          <p>萌发的消费者需求、不断演变的价值链和意想不到的竞争对手正在迫使企业、博物馆、艺术品行业做出巨大变革</p>
        </li>
        <li>
          <div class="word">
            <span class="num">58</span>
            <span class="percent">%</span>
          </div>
          <p>的企业、博物馆、艺术家表示，传统的价值链由于颠覆性技术而日渐分崩瓦解，并逐渐被场景化营销取代</p>
        </li>
      </ul>
    </div>

    <div class="art-block"  v-once  id="artblock">
      <div class="base-container sortbox alignMiddle">
        <schemeBlock :list="artBusiness">
          <li class="descs" slot="top">
            <div class="box">
              <h3>艺术与文物行业 解决方案</h3>
              <p>看3D视觉创新技术，如何助力文博客户实现数字化转型</p>
            </div>
          </li>
        </schemeBlock>
      </div>
    </div>

    <div class="goods" id="goods">
      <h2>零售与电商行业解决方案</h2>
      <div class="base-container">
        <div class="left sortbox">
          <div class="bimg">
            <img :src="goods[0].img" alt />
          </div>
          <div class="text">
            <h3>{{goods[0].name}}</h3>
            <p>{{goods[0].desc}}</p>
          </div>
          <div class="arrow"  @click="skipTo(goods[0])">
            <span class="txt">{{goods[0].arrow}}</span>
            <span class="r">→</span>
          </div>
        </div>
        <div class="middle">
          <iframe
            src="//www.51jianmo.com/model?code=M000000000004054AA15G&desc=0&icon=1&type=1&quick=0&opacity=0&full=0"
            frameborder="0"
            allowfullscreen="allowfullscreen"
          ></iframe>
        </div>
        <div class="right sortbox" >
          <div class="bimg">
            <img :src="goods[1].img" alt />
          </div>
          <div class="text">
            <h3>{{goods[1].name}}</h3>
            <p>{{goods[1].desc}}</p>
          </div>
          <div class="arrow" @click="skipTo(goods[1])">
            <span class="txt">{{goods[1].arrow}}</span>
            <span class="r">→</span>
          </div>
        </div>
      </div>
    </div>

    <div class="house"  v-once  id="house">
      <div class="base-container sortbox alignMiddle">
        <schemeBlock :list="house">
          <li class="descs" slot="bottom">
            <h3>房地产与空间陈列解决方案</h3>
            <p>快速发展的驱动力来自于日益严苛的政策、日新月异的新材料新科技，通过利用3D云展平台的专业能力来提升企业稳定的永续发展</p>
          </li>
        </schemeBlock>
      </div>
    </div>

    <div class="science"  v-once id="science">
      <div class="base-container sortbox alignMiddle">
        <schemeBlock :list="science">
          <li class="descs" slot="top">
            <div class="box">
              <h3>历史、科技/党建馆解决方案</h3>
              <p>聚焦中国发展的历史变迁，分析发展中面临的重大挑战，共同探索中国未来的发展与政策</p>
            </div>
          </li>
        </schemeBlock>
      </div>
    </div>

    <div class="enterprise"  v-once  id="enterprise">
      <div class="base-container sortbox alignMiddle">
        <schemeBlock :list="enterprise">
          <li class="descs" slot="bottom">
            <h3>企业名片与客户关系解决方案</h3>
            <p>致力于帮助企业创造一流的客户体验、构建敏捷的核心系统，提供科技创新服务并优化客户关系控制</p>
          </li>
        </schemeBlock>
      </div>
    </div>
    <div class="cooperation"  v-once>
      <div class="base-container">
        <h2>合作品牌</h2>
        <ul class="clear">
          <li v-for="(item,index) in cooperation" :key="index" @click="skipTo(item)" :class="{link:!!item.link}">
            <img :src="item.img" class="b" alt />
            <div class="text">
              <h3>{{item.name}}</h3>
              <p>{{item.sub}}</p>
              <div>{{item.desc}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <div class="base-container clear alignMiddle">
        <div class="left">
          <h2>3D云展 在您身边</h2>
          <div class="desc">
            <p>更多3D数字展示相关信息及</p>
            <p>数字化重塑问题，请交给我们为您解答</p>
          </div>
          <div class="time">（服务时间：工作日9:00-18:00）</div>
        </div>
        <ul class="right">
          <li>
            <img src="@/assets/images/scheme/foot-msg.png" alt @click="contactUs=true" />
            <p>填写需求</p>
            <div>请3D数字化专家与您联系</div>
          </li>
          <li>
            <img src="@/assets/images/scheme/foot-phone.png" alt />
            <p>免费咨询3D数字化专家</p>
            <div>400-080-9959</div>
          </li>
        </ul>
      </div>
    </div>
    <fixed-tool></fixed-tool>
    <contact-us :isvisible="contactUs" @close="contactUs=false"></contact-us>
  </div>
</template>
<script>
import contactUs from "@/components/contact-us.vue";
import PageHeader from "@/components/page-header/page-header.vue";
import schemeData from "@/config/scheme";
import schemeBlock from "./scheme_block.vue";
export default {
  name: "scheme",
  data() {
    return {
      ...schemeData,
      swiperOption: {
        effect: "fade",
        autoplay: {
          delay: 3000 //自动切换的时间间隔，单位ms
        },
        loop: true,
        allowTouchMove: false
      },
      contactUs: false,
    };
  },
  components: {
    contactUs,
    PageHeader,
    schemeBlock
  },
  mounted() {},
  methods: {
    modelJm() {},
    skipTo(item){
      if(item.link){
          window.open(item.link,"__blank");
      }
    }
  }
};
</script>
<style lang="scss"  src="./scheme.scss"></style>
<style lang="scss">
.scheme {
  .banner {
    .swiper-container {
      height: 100%;
      .swiper-slide {
        background: #fff;
        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>