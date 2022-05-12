<template>
  <div class="home-page">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <div class="banner">
      <!--      <el-tooltip class="item" effect="light" content placement="top">-->
      <!--        <div slot="content" class="codeToolTip">-->
      <!--          <img src="@/assets/images/home/gzh.png" width="100" height="100" />-->
      <!--          <p>3d云展公众号</p>-->
      <!--        </div>-->

      <!--        <button type="button" class="el-carousel__arrow el-carousel__arrow&#45;&#45;code">-->
      <!--          <svg-icon iconClass="code" class="code"></svg-icon>-->
      <!--        </button>-->
      <!--      </el-tooltip>-->
      <el-carousel
        :interval="5000"
        arrow="always"
        :autoplay="bannerAutoplay"
        indicator-position="none"
        @change="bannerImgChange"
        ref="bannerImg"
      >
        <el-carousel-item v-for="(item,index) in info.bannerList" :key="index">
          <a :href="item.link" target="_blank" rel="noopener" class="bannerLink">
            <img class="bannerImg" :src="item.image" />
            <div class="bannerShade"></div>
            <div class="text">
              <div class="base-container alignMiddle">
                <p class="t1" v-if="item.tag">「{{item.tag}}」</p>
                <p class="t2">{{item.title}}</p>
                <p class="t3">{{item.subTitle}}</p>
                <span>
                  {{item.btnText}}
                  <i class="el-icon-arrow-right"></i>
                </span>
              </div>
            </div>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 场景营销新趋势 -->
    <div class="yingxiao">
      <div class="base-container">
        <h2>为什么20000+企业都选择3D云展！</h2>
        <div class="applicat flex" @mouseover="stopRollyx" @mouseout="startRollyx">
          <ul class="left">
            <li
              @mouseover="changeOverYx(index)"
              v-for="(item,index) in leftList"
              :key="index"
              class="flex-end"
            >
              <div class="text">
                <p class="tit" v-html="item.title"></p>
                <p class="desc">{{item.desc}}</p>
              </div>
              <div class="icon">
                <div class="flex-center-column">
                  <svg-icon :iconClass="item.img"></svg-icon>
                </div>
              </div>
            </li>
          </ul>

          <div class="img">
            <img src="@/assets/images/home/yingxiao-bg.png" alt class="bg" />
            <div class="play">
              <img :src="middleImg[yingxiaoIndex]" alt />
            </div>
          </div>

          <ul class="right">
            <li
              v-for="(item,index) in rightList"
              :key="index"
              class="flex-start"
              @mouseover="changeOverYx(index+4)"
            >
              <div class="icon">
                <div class="flex-center-column">
                  <svg-icon :iconClass="item.img"></svg-icon>
                </div>
              </div>
              <div class="text">
                <p class="tit" v-html="item.title"></p>
                <p class="desc">{{item.desc}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 行业案例 -->
    <div class="industry-solutions">
      <div class="base-container" @mouseover="stopRoll" @mouseout="startRoll">
        <h2>行业案例</h2>
        <div class="desc">覆盖多样化行业场景，助你轻松玩转场景营销</div>
        <div class="industry-solutions-container">
          <div class="nav-list">
            <ul>
              <li
                @mouseover="changeOver(index)"
                v-for="(item,index) in info.tradeList"
                :key="index"
                :class="{active:index==industryIndex}"
                @click="industryIndex=index"
              >
                <div>
                  <span class="nav-icon"></span>
                  <span class="nav-name">
                    <img :src="item.icon" alt class="normal" />
                    <img :src="item.honverIcon" alt class="hover" />
                    {{ item.name }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="navImg-w" v-if="tradeObj.cases">
            <div class="nav-img" v-if="tradeObj.cases[0]" @click="openPage(tradeObj.cases[0].url)">
              <!-- <div class="mongolia" v-show="mongoliaBool0" @mouseout="hideMongolia(0)">
                            了解详情
              </div>-->
              <img
                :src="tradeObj.cases[0].image"
                alt
                @mouseover="showMongolia(0)"
                @mouseout="hideMongolia(0)"
                :class="[mongoliaBool0 ? 'imgAnim' : 'imgAnimSmall']"
                v-if="tradeObj.cases[0].image"
              />

              <div class="nav-img-desc">
                <span>{{tradeObj.cases[0].name}}</span>
              </div>
            </div>
            <div class="nav-content">
              <div class="nav-content-top">
                <div
                  class="nav-content-img-left"
                  v-if="tradeObj.cases[1]"
                  @click="openPage(tradeObj.cases[1].url)"
                >
                  <img
                    :src="tradeObj.cases[1].image"
                    :class="[mongoliaBool1 ? 'imgAnim' : 'imgAnimSmall']"
                    alt
                    @mouseover="showMongolia(1)"
                    @mouseout="hideMongolia(1)"
                    v-if="tradeObj.cases[1].image"
                  />

                  <div class="nav-content-img-desc">
                    <span>{{tradeObj.cases[1].name}}</span>
                  </div>
                </div>
                <div
                  class="nav-content-img-right"
                  v-if="tradeObj.cases[2]"
                  @click="openPage(tradeObj.cases[2].url)"
                >
                  <img
                    :src="tradeObj.cases[2].image"
                    :class="[mongoliaBool2 ? 'imgAnim' : 'imgAnimSmall']"
                    alt
                    @mouseover="showMongolia(2)"
                    @mouseout="hideMongolia(2)"
                    v-if="tradeObj.cases[2].image"
                  />
                  <!-- <div class="mongolia" v-show="mongoliaBool2" @mouseout="hideMongolia(2)">
                                    了解详情
                  </div>-->
                  <div class="nav-content-img-desc">
                    <span>{{tradeObj.cases[2].name}}</span>
                  </div>
                </div>
              </div>

              <div class="nav-content-bottom">
                <div class="alignMiddle">
                  <div class="nav-content-bottom-title">
                    <span>{{tradeObj.description}}</span>
                  </div>
                  <!-- <div class="nav-content-bottom-desc">
                    <span>{{tradeObj.tag}}</span>
                  </div>-->
                  <div class="nav-content-bottom-more">
                    <span
                      class="create"
                      v-if="tradeObj.createLink"
                      @click="openPage(tradeObj.createLink)"
                    >制作3D展厅</span>
                    <span
                      class="more"
                      v-if="tradeObj.moreLink"
                      @click="openPage(tradeObj.moreLink)"
                    >查看更多</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模板自主建馆-->
    <div class="templateBuild" @scroll="handleScroll" v-show="isshow">
      <div class="templateBuild_content">
        <div class="templateBuild_content_content">
          <h2 class="h2">近千款3D模板展厅</h2>
          <div class="descript">让您轻松拥有3D线上展厅</div>
          <div class="animationcontent">
            <div class="left_templateBuild">
              <div class="oneTemplate t11">
                <div class="leftOne">
                  <div class="leftOneimg">
                    <svg-icon iconClass="mobantaoyong" class="svg"></svg-icon>
                  </div>
                </div>
                <div class="rightOne">
                  <p class="p1">模板选择</p>
                  <p class="p2">千款展厅模板选择，高效达成您的展厅需求</p>
                </div>
              </div>
              <div class="oneTemplate t22">
                <div class="leftOne">
                  <div class="leftOneimg">
                    <svg-icon iconClass="ziyoubianji" class="svg"></svg-icon>
                  </div>
                </div>
                <div class="rightOne">
                  <p class="p1">自由布展</p>
                  <p class="p2">图片、视频、3D模型自由添加，您的展厅您做主</p>
                </div>
              </div>
            </div>
            <div class="center">
              <div class="centerContent">
                <div class="center_content">
                  <div class="leftOne">
                    <div class="leftOneimg">
                      <svg-icon iconClass="chaodichengben" class="svg"></svg-icon>
                    </div>
                  </div>
                  <p class="p1">超低成本</p>
                  <p class="p2">千元超低建展成本，7*24H永不落幕</p>
                </div>
              </div>
              <div class="jianguanyanshi">
                <p
                  class="p11"
                  @click="playVideo('https://obs.3dyunzhan.com/yunzhanfile/3Dyunzhancaozuo.mp4')"
                >
                  <span>建展演示</span>
                </p>
                <p class="p12" @click="freeCreate">
                  <span>我的展厅</span>
                </p>
              </div>
            </div>
            <div class="right_templateBuild">
              <div class="oneTemplate t33">
                <div class="leftOne">
                  <div class="leftOneimg">
                    <svg-icon iconClass="qingsongshangshou" class="svg"></svg-icon>
                  </div>
                </div>
                <div class="rightOne">
                  <p class="p1">轻松上手</p>
                  <p class="p2">3分钟学会布展，会电脑就能做展厅</p>
                </div>
              </div>
              <div class="oneTemplate t4">
                <div class="leftOne">
                  <div class="leftOneimg">
                    <svg-icon iconClass="shenxinguanli" class="svg"></svg-icon>
                  </div>
                </div>
                <div class="rightOne">
                  <p class="p1">省心管理</p>
                  <p class="p2">私有云、混合云部署，访问数据自主调取</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 私有定制建设 -->
    <div class="customization">
      <div v-show="siyoushow" @scroll="handleScroll" class="contentshow">
        <div class="siyoushow">
          <div class="siyoucontent">
            <p class="p1">个性化定制3d展厅</p>
            <p class="p2">专业的私人订制展厅设计团队，标准高效的制作流程，为您提供全方位的定制服务</p>
            <div class="img">
              <img src="@/assets/images/home/siyou1.png" alt class="img1" />
              <img src="@/assets/images/home/siyou4.png" alt class="img2" />
              <img src="@/assets/images/home/siyou2.png" alt class="img3" />
              <img src="@/assets/images/home/siyou5.png" alt class="img2" />
              <img src="@/assets/images/home/siyou3.png" alt class="img5" />
            </div>
            <div class="btn" @click="contactUs=true">专属营销顾问</div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="system">
      <div class="base-container">
        <h1 style class>使用3d云展系统，3分钟生成3D展厅</h1>
        <ul>
          <li>
            <div class="img" @click="freeCreate">
              <img src="@/assets/images/home/sys_tpl.png" alt />
            </div>
            <div class="topic">模板套用</div>
            <p>精选海量展厅模板随意选购套用</p>
            <div class="btn" @click="freeCreate">立即制作</div>
          </li>
          <li>
            <div class="img" @click="freeCreate">
              <img src="@/assets/images/home/sys_const.png" alt />
            </div>
            <div class="topic">内容拼装</div>
            <p>自助上传图像、音频、视频多种</p>
            <p>内容一键布置</p>
            <div class="btn" @click="freeCreate">立即制作</div>
          </li>
          <li>
            <div class="img" @click="freeCreate">
              <img src="@/assets/images/home/sys_custom.png" alt />
            </div>
            <div class="topic">自定义编辑</div>
            <p>30+ 功能组件可视化拖曳，玩转</p>
            <p>个性化制作</p>
            <div class="btn" @click="freeCreate">立即制作</div>
          </li>
        </ul>
      </div>
    </div>-->

    <!-- <div class="video-teach">
      <div class="base-container">
        <h2>视频教程</h2>
        <ul>
          <li
            @click="playVideo('http://oss.3dshichuang.com/video/%E5%B1%95%E5%8E%85%E7%BC%96%E8%BE%91%E6%A8%A1%E5%BC%8F%E4%BB%8B%E7%BB%8D0417.mp4')"
          >
            <div class="video">
              <img src="@/assets/images/home/video-1.png" alt class="thumbs" />
              <img src="@/assets/images/home/video.png" alt class="play" />
            </div>
            <p>3分钟快速制作展厅演示</p>
          </li>
          <li @click="playVideo('https://oss.3dshichuang.com/video/video-2020-04-16-11.mp4')">
            <div class="video">
              <img src="@/assets/images/home/video-2.png" alt class="thumbs" />
              <img src="@/assets/images/home/video.png" alt class="play" />
            </div>
            <p>探索展厅奥秘的方法</p>
          </li>
        </ul>
      </div>
    </div>-->
    <!--
    <div class="custom-serve">
      <div class="base-container">
        <h2>专属定制服务流程</h2>
        <h3>低成本、快捷为客户和市场提供全方位服务</h3>
        <ul>
          <li class="item">
            <img src="@/assets/images/home/serve1.png" alt />
            <p class="title">了解项目</p>
            <p class="desc">分析、策划创意方案</p>
          </li>
          <li class="arrow">
            <img src="@/assets/images/home/arrow.png" alt />
          </li>
          <li class="item">
            <img src="@/assets/images/home/serve2.png" alt />
            <p class="title">方案实施</p>
            <p class="desc">虚拟/实景场景搭建</p>
          </li>
          <li class="arrow">
            <img src="@/assets/images/home/arrow.png" alt />
          </li>
          <li class="item">
            <img src="@/assets/images/home/serve3.png" alt />
            <p class="title">展品处理</p>
            <p class="desc">展示内容精细化处理</p>
          </li>
          <li class="arrow">
            <img src="@/assets/images/home/arrow.png" alt />
          </li>
          <li class="item">
            <img src="@/assets/images/home/serve4.png" alt />
            <p class="title">展示分享</p>
            <p class="desc">多平台分发浏览展示</p>
          </li>
        </ul>
        <div class="btn" @click="contactUs=true">联系客服 定制展厅</div>
      </div>
    </div>-->

    <div class="service-firend">
      <div class="h1">合作客户</div>

      <img class="img" src="@/assets/images/home/service-friend.png" alt />

      <router-link tag="div" class="btn" :to="{name:'case'}">更多案例</router-link>
    </div>

    <fixed-tool></fixed-tool>

    <playShow :isPlay="isPlay" @closeDialog="isPlay = false" :playObj="playObj"></playShow>
    <contact-us :isvisible="contactUs" @close="contactUs=false"></contact-us>
  </div>
</template>
<!--<script src="http://libs.baidu.com/jquery/1.8.1/jquery.min.js"></script>-->
<script>
import swiperCertify from "@/components/swiper-certify/swiper-certify.vue";
import playShow from "@/components/playShow/index.vue";
import contactUs from "@/components/contact-us.vue";
import s01 from "@/assets/images/home/s01.jpg";
import s02 from "@/assets/images/home/s02.jpg";
import s03 from "@/assets/images/home/s03.jpg";
import s04 from "@/assets/images/home/s04.jpg";
import s05 from "@/assets/images/home/s05.jpg";
import s06 from "@/assets/images/home/s06.jpg";
import s07 from "@/assets/images/home/s07.jpg";
import s08 from "@/assets/images/home/s08.jpg";
import s09 from "@/assets/images/home/s09.png";
import s10 from "@/assets/images/home/s10.png";

export default {
  data() {
    var me = this;
    return {
      middleImg: [s01, s02, s03, s04, s05, s06, s07, s08, s09, s10],
      yxArr: [
        {
          title: "<span style='color: #23B5FA'>「大」</span>有流量",
          desc: "持续聚合流量，引流助力经营",
          img: "icondayouliuliang",
        },
        {
          title: "超<span style='color: #23B5FA'>「强」</span>商机",
          desc: "3D数字化解决方案，让品牌“活”起来",
          img: "iconchaoqiangshangji",
        },
        {
          title: "<span style='color: #23B5FA'>「轻」</span>量成本",
          desc: "让“产品+品牌”管理营销一体化",
          img: "iconqingliangchengben",
        },
        {
          title: "<span style='color: #23B5FA'>「云」</span>端数据",
          desc: "实时数据，精准分析，灵活调整经营策略",
          img: "iconyunduanshuju",
        },
        {
          title: "<span style='color: #23B5FA'>「体验」</span>不平凡",
          desc: "3D产品+3D场景，让展示和交互更真实",
          img: "icontiyanbupingfan",
        },
        {
          title: "<span style='color: #23B5FA'>「畅享」</span>无界限",
          desc: "互联网传播让实体不受时间、空间限制",
          img: "iconchangxiangwujiexian",
        },
        {
          title: "<span style='color: #23B5FA'>「传播」</span>触即达",
          desc: "兼容多端展示分享，让裂变也“疯狂”",
          img: "iconchuanbochujida",
        },
        {
          title: "<span style='color: #23B5FA'>「商展」</span>不将就",
          desc: "个性定制，专属特色，凸显极致",
          img: "iconshangzhanbujiangjiu",
        },
      ],
      mongoliaBool0: false,
      mongoliaBool1: false,
      mongoliaBool2: false,
      bannerIndex: 0,
      isshow: false,
      siyoushow: false,
      bannerAutoplay: true,
      industryIndex: 0,
      info: {
        bannerList: [],
        tradeList: [],
      },
      yingxiaoIndex: 0,
      isPlay: false,
      playObj: {},
      contactUs: false,
    };
  },
  components: {
    swiperCertify,
    playShow,
    contactUs,
  },
  computed: {
    leftList() {
      let leftArr = [];
      this.yxArr.filter((item, index) => {
        if (index < 4) {
          leftArr.push(item);
        }
      });
      return leftArr;
    },
    rightList() {
      let rightArr = [];
      this.yxArr.filter((item, index) => {
        if (index > 3) {
          rightArr.push(item);
        }
      });
      return rightArr;
    },
    userinfo() {
      return this.$store.state.userinfo;
    },
    tradeObj() {
      return this.info.tradeList[this.industryIndex] || {};
    },
  },
  async mounted() {
    var me = this;
    let res = await this.$http.homeIndex();
    this.info = res;

    me.startRoll();
    me.startRollyx();
    window.addEventListener("scroll", this.handleScroll);
    // this.offsetTop = this.$refs.scrollcontent.offsetTop;
    // console.log(this.offsetTop);
    // console.log(666)
  },

  methods: {
    // handleScroll() {
    //   const top =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   // console.log(top);
    //   if (top) {
    //     console.log(this.top);
    //   }
    // },
    changeOverYx(index) {
      this.yingxiaoIndex = index;
    },
    // getScrollTop() {
    //   var scroll_top = 0;
    //   if (document.documentElement && document.documentElement.scrollTop>200) {
    //     scroll_top = document.documentElement.scrollTop;
    //     console.log(scroll_top);
    //   } else if (document.body) {
    //     scroll_top = document.body.scrollTop;
    //   }
    //   return scroll_top;
    // },
    handleScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop >= 1500) {
        this.isshow = true;
      }
      if (scrollTop >= 2600) {
        this.siyoushow = true;
      }
    },
    changeOver(index) {
      //this.info.tradeList
      //tradeObj
      this.industryIndex = index;
    },

    yingxiaoRoll() {
      const that = this;

      that.yingxiaoTimer = setInterval(() => {
        if (that.yingxiaoIndex >= 9) {
          that.yingxiaoIndex = 0;
        } else {
          that.yingxiaoIndex++;
        }
      }, 7000);
    },
    hangyeRoll() {
      const that = this;
      that.hangyeTimer = setInterval(() => {
        if (that.industryIndex >= that.info.tradeList.length - 1) {
          that.industryIndex = 0;
        } else {
          that.industryIndex++;
        }
      }, 7000);
    },
    startRollyx() {
      this.yingxiaoRoll();
    },
    stopRollyx() {
      clearInterval(this.yingxiaoTimer);
    },
    startRoll() {
      this.hangyeRoll();
    },
    stopRoll() {
      clearInterval(this.hangyeTimer);
    },
    showMongolia(num) {
      if (num == 0) {
        this.mongoliaBool0 = true;
      } else if (num == 1) {
        this.mongoliaBool1 = true;
      } else if (num == 2) {
        this.mongoliaBool2 = true;
      }
    },
    hideMongolia(num) {
      if (num == 0) {
        this.mongoliaBool0 = false;
      } else if (num == 1) {
        this.mongoliaBool1 = false;
      } else if (num == 2) {
        this.mongoliaBool2 = false;
      }
    },
    bannerImgChange(e) {
      this.bannerIndex = e;
    },
    bannerChangeClick(e) {
      this.$refs.bannerImg.setActiveItem(e);
    },
    freeCreate() {
      this.$router.push({ name: "buyTpl" });
    },
    playVideo(src) {
      this.isPlay = true;
      this.playObj = {
        fileType: this.$commConst.FILETYPE.video,
        picPath: src,
      };
    },
    openPage(src) {
      if (src) {
        window.open(src);
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.yingxiaoTimer);
    clearInterval(this.hangyeTimer);
  },
};
</script>
<style lang="scss" scoped src="./home.scss"></style>

<style lang="scss">
.codeToolTip {
  text-align: center;
  p {
    text-align: center;
  }
}
.el-tooltip__popper[x-placement^="top"] .popper__arrow {
  border-top-color: transparent !important;
}

.el-tooltip__popper.is-light {
  border: unset;
  box-shadow: 0px 0px 10px #333;
}
.home-page {
  div.banner {
    .el-carousel__arrow--code {
      position: absolute;
      left: unset;
      right: 295px;
      top: unset;
      bottom: 0px;
      background: rgba(20, 23, 25, 0.7);
      &:hover .code {
        color: #22b4fa;
      }
    }
    .code {
      font-size: 18px;
      color: #bbb;
    }

    div.el-carousel__container {
      height: 740px;
      .el-carousel__arrow {
        background: rgba(20, 23, 25, 0.7);
      }
      img {
        height: 100%;
      }
      .el-carousel__arrow--right {
        right: 190px;
        top: unset;
        bottom: 0px;
        &:hover i {
          color: #22b4fa;
        }
      }
      .el-carousel__arrow--left {
        left: unset;
        right: 243px;
        top: unset;
        bottom: 0px;
        &:hover i {
          color: #22b4fa;
        }
      }
    }
  }

  div.project-service {
    div.el-carousel__container {
      height: 350px;
    }
  }
}
</style>

