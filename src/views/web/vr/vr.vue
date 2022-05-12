<template>
  <div class="vr">
<!--    <page-header :gradual="false"></page-header>-->
    <div class="banner" @click="bannerHandle">
      <img :src="require('@/assets/images/vr/banner.png')" alt="">
      <!-- <div class="title">
        <h2>3D展厅+VR带看</h2>
        <p class="desc">破次壁黑科技 线上营销新高度</p>
      </div> -->
      <ul class="banner-tag">
        <li v-for="item in bannerTags" :key="item.title">
          <div class="icon">
            <img :src="item.icon" alt="">
          </div>
          <div class="text">
            <h5>{{item.title}}</h5>
            <p class="desc">{{item.desc}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="main">
      <div class="main-content1">
        <div class="base-container">
          <div class="title">
            <h4>VR带看×智能讲解×虚拟主播</h4>
            <p>3D云展，重磅推出全系列新功能!</p>
          </div>
          <ul class="introduce">
            <li v-for="item in introduceList" :key="item.text">
              <img :src="item.icon" alt="">
              <div class="text">{{item.text}}</div>
            </li>
          </ul>
          <div class="video">
            <video autoplay="autoplay" loop="loop" muted>
              <source :src="videoUrl" type="video/mp4">
            </video>
            <div class="button" @click="goDetail">
              <img :src="require('@/assets/images/vr/play.png')" alt="">
              <span>即刻体验</span>
            </div>
          </div>
        </div>
      </div>
      <div class="main-content2">
        <div class="base-container">
          <div class="title">
            <h4>多行业适用</h4>
            <p>让客户体验更便捷高效</p>
          </div>
          <div class="industry">
            <div class="left">
              <div class="img-box">
                <img :src="activeImgUrl" alt="">
              </div>
              <div class="bottom">
                <h5>{{activeTitle}}<span v-if="activeTag">{{activeTag}}</span></h5>
                <p>{{activeDesc}}</p>
              </div>
            </div>
            <div class="right">
              <div class="box" v-for="(item, index) in industryList" :key="item.title"
                   @mouseenter="enterHandle(item, index)" @mouseleave="leaveHandle()">
                <div class="content">
                  <h5>{{item.title}}<span v-if="item.tag">{{item.tag}}</span></h5>
                  <p>{{item.desc}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-content3">
        <img :src="require('@/assets/images/vr/bg1.png')" alt="">
        <div class="base-container">
          <div class="title">
            <h4>3D展厅——720°销售场景，不用到店也能体验</h4>
            <p>满足各行业多样的应用场景</p>
          </div>
          <ul class="application">
            <li v-for="item in applicationList" :key="item.title">
              <img :src="item.icon" alt="">
              <div class="tit">{{item.title}}</div>
              <div class="text">{{item.desc}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-content4">
        <img class="phone" :src="phoneImgUrl" alt="">
        <div class="container">
          <div class="base-container">
            <div class="title">
              <h4>简单设置，轻松触达</h4>
              <p>轻松4步，完成VR带看设置，让你的3D展厅与众不同</p>
            </div>
            <div class="anchor">
              <ul>
                <li v-for="(item, index) in anchorList" :key="item.title">
                  <span class="num">{{'0'+(index+1)}}</span>
                  <img :src="item.icon" alt="">
                  <span>{{item.title}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="main-content5">
        <div class="base-container">
          <div class="title">
            <h4>行业案例</h4>
            <p>3D+VR展厅已经在企业文化、文博展览、摄影绘画、房产、家装、3D商城等领域广泛应用</p>
          </div>
          <ul>
          	<li v-for="item in caseList" :key="item.title">
              <img :src="item.img" alt="">
              <div class="bottom">
                <span>{{item.title}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
<!--    <page-footer></page-footer>-->
  </div>
</template>
<script>
  import PageFooter from "@/components/page-footer/page-footer.vue";
  import PageHeader from "@/components/page-header/page-header.vue";
  import {copy} from "../../../components/canvas-card/jsonCanvas/cax/util";

  export default {
    name: "solved",
    components: {
      PageFooter,
      PageHeader,
    },
    data() {
      return {
        videoUrl: require("@/assets/video/vr.mp4"),
        activeImgUrl: require("@/assets/images/vr/kanfang.png"),
        phoneImgUrl: require("@/assets/images/vr/phone.png"),
        activeTitle: "VR看房",
        activeDesc: "随时随地 沉浸式看房",
        activeTag: "HOT",
        isEnter: true,
        bannerTags: [{
          icon: require("@/assets/images/vr/banner-tag1.png"),
          title: "同屏互动",
          desc: "双向操作，实时语音"
        }, {
          icon: require("@/assets/images/vr/banner-tag2.png"),
          title: "虚拟主持一对多",
          desc: "实时在线，离线可预约"
        }, {
          icon: require("@/assets/images/vr/banner-tag3.png"),
          title: "线上3D展厅",
          desc: "1:1还原真实场景 "
        }, {
          icon: require("@/assets/images/vr/banner-tag4.png"),
          title: "三维空间漫游",
          desc: "720°沉浸式交互"
        }],
        introduceList: [{
          icon: require("@/assets/images/vr/introduce-img1.png"),
          text: "最优逛展路线"
        }, {
          icon: require("@/assets/images/vr/introduce-img2.png"),
          text: "卡通主播带逛"
        }, {
          icon: require("@/assets/images/vr/introduce-img3.png"),
          text: "虚拟主持讲解"
        }, {
          icon: require("@/assets/images/vr/introduce-img4.png"),
          text: "双倍的极致逛展体验"
        }],
        industryList: [{
          img: require("@/assets/images/vr/jiaoyu.jpg"),
          title: "VR教育",
          desc: "智慧教室 交互式课程",
          tag: "",
        }, {
          img: require("@/assets/images/vr/kanche.jpg"),
          title: "VR看车",
          desc: "无需到店 智享云购车",
          tag: "NEW",
        }, {
          img: require("@/assets/images/vr/daogou.jpg"),
          title: "VR导购",
          desc: "掌上商城 自助式购物",
          tag: "",
        }, {
          img: require("@/assets/images/vr/lvyou.jpg"),
          title: "VR旅游",
          desc: "新颖文旅 主题化畅游",
          tag: "",
        }],
        applicationList: [{
          icon: require("@/assets/images/vr/application-img1.png"),
          title: "720°",
          desc: "无死角浏览各个角落"
        }, {
          icon: require("@/assets/images/vr/application-img2.png"),
          title: "测量",
          desc: "空间尺寸实测"
        }, {
          icon: require("@/assets/images/vr/application-img3.png"),
          title: "导航",
          desc: "展厅实景导航"
        }, {
          icon: require("@/assets/images/vr/application-img4.png"),
          title: "VR",
          desc: "VR带看实时互动"
        }, {
          icon: require("@/assets/images/vr/application-img5.png"),
          title: "标签热点",
          desc: "自由嵌入展示丰富信息"
        }],
        anchorList: [{
          icon: require("@/assets/images/vr/anchor-img1.png"),
          title: "设置入口"
        }, {
          icon: require("@/assets/images/vr/anchor-img2.png"),
          title: "设置路线"
        }, {
          icon: require("@/assets/images/vr/anchor-img3.png"),
          title: "设置语音"
        }, {
          icon: require("@/assets/images/vr/anchor-img4.png"),
          title: "选择卡通主播/虚拟主持"
        }],
        caseList: [{
          img: require("@/assets/images/vr/case-img1.png"),
          title: "企业文化"
        }, {
          img: require("@/assets/images/vr/case-img2.png"),
          title: "文博展览"
        }, {
          img: require("@/assets/images/vr/case-img3.png"),
          title: "摄影绘画"
        }, {
          img: require("@/assets/images/vr/case-img4.png"),
          title: "房产"
        }, {
          img: require("@/assets/images/vr/case-img5.png"),
          title: "家装"
        }, {
          img: require("@/assets/images/vr/case-img6.png"),
          title: "3D商城"
        }],
      };
    },
    methods: {
      bannerHandle() {
        window.open("https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=63cd95c986104192bc0570db175ebfe2")
      },
      enterHandle(item, index) {
        if (this.isEnter) {
          let obj = {
            title: this.activeTitle,
            desc: this.activeDesc,
            img: this.activeImgUrl,
            tag: this.activeTag
          }
          this.activeTitle = item.title;
          this.activeDesc = item.desc;
          this.activeImgUrl = item.img;
          this.activeTag = item.tag;
          this.industryList.splice(index, 1, obj);
          this.isEnter = false;
        }
      },
      leaveHandle() {
        this.isEnter = true;
      },
      goDetail() {
        window.open("https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=003b966c97ab46deb4a11696671794e5")
      }
    }
  };
</script>

<style lang="scss" scoped src="./vr.scss"></style>
