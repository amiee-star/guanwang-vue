<template>
  <div class="home-page">
    <div class="banner">
      <el-carousel
        :interval="3000"
        height="79vh"
        arrow="never"
        trigger="click"
        @change="bannerImgChange"
        ref="bannerImg"
        :indicator-position="info.bannerList.length > 0 ? '': 'none'"
      >
        <el-carousel-item v-for="(item, index) in info.bannerList" :key="index">
          <img v-if="!item.link" class="bannerImg" :src="item.image" />
          <a
            v-else
            :href="item.link"
            target="_blank"
            rel="noopener"
            class="bannerLink">
            <img class="bannerImg" :src="item.image" />
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="service">
        <div class="base-container">
          <div class="content">
            <div class="title">
              <p>3D数字化营销展示服务平台</p>
              <p class="small">每一个3D数字化场景，都是品牌营销新体验</p>
            </div>
            <ul>
              <li v-for="(item, index) in serviceList" :key="index">
                <div class="tit">
                  <span>{{item.title}}</span>
                </div>
                <div>
                  <span class="num">{{item.num}}</span>
                </div>
                <div class="bottom">{{item.desc}}</div>
              </li>
            </ul>
          </div>
        </div>
    </div>
    <div class="experience homeAnimation">
      <div class="base-container">
        <div class="content">
          <div class="title" v-if="show0">
            <p>沉浸式交互体验</p>
            <p class="small">手机、平板、电脑、全息、电视等多终端均可展示</p>
          </div>
          <ul v-if="show0">
            <li v-for="(item, index) in experienceList" :key="index" :class="experienceActive === index ? 'active' : ''" @click="clickExperinece(index)">
              <svg-icon class-name="icon" :icon-class="item.icon"></svg-icon>
              <p>{{item.title}}</p>
            </li>
          </ul>
          <div class="hall-box">
            <div class="hall">
              <iframe :src="iframeList[experienceActive].link" frameborder="0"></iframe>
            </div>
          </div>
          <div class="getMore">
            <div class="btn" @click="goBoutiqueCase">
              <span>更多案例</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="productValue homeAnimation">
      <div class="bg"></div>
      <div class="base-container base-container1">
        <div class="content">
          <template v-if="show1">
            <div class="title">
              <p>核心能力</p>
              <p class="small">一站式SAAS化服务+个性定制服务</p>
            </div>
          </template>
          <ul class="title-ul" v-if="show1">
            <li v-for="(item, index) in productTitleList"
                :key="index"
                :class="activeCarousel === index ? 'active': ''"
                @click="clickCarousel(index)">
              {{item.title}}
            </li>
          </ul>
          <el-carousel
              ref="productCarousel"
              class="carousel"
              trigger="click"
              height="600px"
              :initial-index="initialIndex"
              arrow="never"
              :interval="5000"
              @change="changeCarousel">
            <el-carousel-item key="极速布展" name="0">
              <div class="valueContain first">
                <template v-if="show1">
                  <div class="base-container flex valueInfo">
                    <div class="left">
                      <p class="valueTitle">极速布展</p>
                      <p class="valueDesc">3D场景+3D产品，让展示和交互更真实</p>
                      <ul class="flex-wrap-start">
                        <li class="flex" v-for="(one, i) in list" :key="i">
                          <p class="flex-center-column">
                            <svg-icon :icon-class="one.icon"></svg-icon>
                          </p>
                          <p>{{ one.txt }}</p>
                        </li>
                      </ul>
                      <a @click="experience('/show', 2)"
                      >探索更多功能<i class="el-icon-arrow-right"></i
                      ></a>
                    </div>
                    <img src="@/assets/images/home/value11.png" alt="" />
                  </div>
                </template>
              </div>
            </el-carousel-item>
            <el-carousel-item key="3D逛展" name="1">
              <div class="valueContain">
                <template v-if="show1">
                  <div class="base-container flex valueInfo">
                    <img src="@/assets/images/home/value21.png" alt="" />
                    <div class="left">
                      <p class="valueTitle">3D逛展</p>
                      <p class="valueDesc">突破空间限制，创造沉浸式体验</p>
                      <ul class="flex-wrap-start">
                        <li class="flex" v-for="(one, i) in list1" :key="i">
                          <p class="flex-center-column">
                            <svg-icon :icon-class="one.icon"></svg-icon>
                          </p>
                          <p>{{ one.txt }}</p>
                        </li>
                      </ul>
                      <a @click="experience('/show', 1)"
                      >探索更多功能<i class="el-icon-arrow-right"></i
                      ></a>
                    </div>
                  </div>
                </template>
              </div>
            </el-carousel-item>
            <el-carousel-item key="增值功能" name="2">
              <div class="valueContain third">
                <template v-if="show1">
                  <div class="base-container flex valueInfo">
                    <div class="left">
                      <p class="valueTitle">增值功能</p>
                      <p class="valueDesc">高效营销裂变，AI大数据分析</p>
                      <ul class="flex-wrap-start">
                        <li class="flex" v-for="(one, i) in list2" :key="i">
                          <p class="flex-center-column">
                            <svg-icon :icon-class="one.icon"></svg-icon>
                          </p>
                          <p>{{ one.txt }}</p>
                        </li>
                      </ul>
                      <a @click="experience('/show', 3)"
                      >探索更多功能<i class="el-icon-arrow-right"></i
                      ></a>
                    </div>
                    <img src="@/assets/images/home/value31.png" alt="" />
                  </div>
                </template>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="model homeAnimation">
      <div class="base-container">
        <div class="content">
          <template v-if="show2">
            <div class="title">
              <p>选择适合您的3D模板，免费建展</p>
              <p class="small">数千款3D模板持续更新，3分钟发布专属3D虚拟空间</p>
            </div>
          </template>
          <ul class="cardData flex-wrap-start">
            <li v-if="show2" v-for="(item, index) in cardData" :key="index" @click="toView(item)">
              <div :class="item._thumbnail" class="thumb flex-center-column">
                <img :src="item.thumb ? item.thumb : require('@/assets/images/self/logo-hui.png')" :class="item.thumb ? '': 'defaultImg'" alt="" />
              </div>
              <div class="bottom flex">
                <p class="tow">
                  {{ item.tempName }}
                </p>
                <p>{{ item.validSz || 0 }}m²</p>
              </div>
            </li>
          </ul>
          <div class="btn">
            <button class="getMore" @click="goBoutiqueModel">免费获取更多模板</button>
          </div>
        </div>
      </div>
    </div>
    <div class="solveWays homeAnimation">
      <p class="title whiteTitle" v-if="show3">行业解决方案</p>
      <div class="flex-start base-container" v-if="show3">
        <ul class="list" v-if="info.tradeList.length > 0">
          <li
            class="flex-center-column cursor"
            :class="{ active: solveIndex == index }"
            v-for="(item, index) in info.tradeList"
            :key="index"
            @click="moreLink(solveRight.moreLink)"
            @mouseenter="solveClick(index)">
            {{ item.name }}
          </li>
        </ul>
        <div class="right" ref="right" v-if="showSolve">
          <div class="top">
            <p class="flex">
              <span>{{ solveRight.name }}</span>
              <span @click="moreLink(solveRight.moreLink)" class="more-link"
                >解决方案<i class="el-icon-arrow-right"></i
              ></span>
            </p>
            <p>
              <span
                class="solveDesc"
                :key="i"
                v-for="(one, i) in solveRight.description"
                >{{ one }}</span
              >
            </p>
          </div>
          <div class="exemple">
            <p>相关案例</p>
            <ul class="flex">
              <li
                @click="moreLink(item.url)"
                class="flex-center-column"
                v-for="(item, index) in solveRight.cases"
                :key="index"
              >
                <img :src="item.image" />
                <span>{{item.name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="advantage homeAnimation">
      <template>
        <div class="base-container">
          <div class="content">
            <div class="title" v-if="show4">
              <p>核心优势</p>
              <p class="small">低成本快速实现高质量3D/VR内容营销</p>
            </div>
            <ul v-if="show4">
              <li v-for="(item, index) in advantageList" :key="index">
                <img :src="item.img" alt="">
                <p>{{item.title}}</p>
                <div class="bottom">{{item.desc}}</div>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
    <div class="choose homeAnimation">
      <template v-if="show5">
        <p class="title">超20000家企业选择3D云展</p>
        <el-carousel
          :interval="5000"
          height="320px"
          arrow="always"
          :autoplay="false"
          indicator-position="none"
          trigger="click"
        >
          <el-carousel-item
            class="flex"
            v-for="(item, index) in chooseList"
            :key="index"
          >
            <div
              class="flex business"
              :class="{ left: i == 0 }"
              v-for="(one, i) in item.swiper"
              :key="i"
            >
              <img
                :src="one.img"
                @mouseenter="imgMouseEnter(index, i)"
                @mouseleave="imgMouseLeave(index, i)"
                @click="clickImgHandle(one.imgLink)"
              />
              <div>
                <p class="desc">
                  <svg-icon class-name="header" icon-class="yinhao1"></svg-icon>
                  {{ one.desc }}
                  <svg-icon class-name="tail" icon-class="yinhao"></svg-icon>
                </p>
                <p class="owner">{{ one.owner }}</p>
                <ul>
                  <li
                    class="flex-center-column num"
                    v-for="(obj, j) in one.list"
                    :key="j"
                  >
                    <p>{{ obj.num }}</p>
                    <p>{{ obj.txt }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="base-container service-friend">
          <img src="@/assets/images/home/service-friend.png" alt="" />
        </div>
      </template>
    </div>
    <div class="join homeAnimation">
      <template v-if="show6">
        <div class="base-container">
          <p>即刻加入</p>
          <p>开启3D数字化2.0时代</p>
          <button @click="experience('/self/buy/tpl', 0)">
            立即体验<i class="el-icon-arrow-right"></i>
          </button>
        </div>
      </template>
    </div>

    <fixed-tool></fixed-tool>
<!--    <updateTips/>-->
  </div>
</template>

<script>
import cardBox from "@/components/card-box.vue";
import updateTips from "@/components/updateTips";
export default {
  name: "home",
  components: {
    cardBox,
    updateTips
  },
  data() {
    return {
      isToDetail: false,
      number: 0,
      creatIndex: 0,
      solveIndex: 0,
      info: {
        bannerList: [],
        tradeList: [],
      },
      advantageList: [
              {
        title: "技术优势",
        img: require("@/assets/images/home/advantage-img.png"),
        desc: "基于WebGL自主开发的3D引擎，占用内存小，浏览速度快"
      }, {
        title: "产品优势",
        img: require("@/assets/images/home/advantage-img2.png"),
        desc: "SaaS化服务，独立管理后台，内容实时编辑，所见即所得"
      }, {
        title: "品牌优势",
        img: require("@/assets/images/home/advantage-img3.png"),
        desc: "国家高新技术企业、3D发明及实用性专利百余项"
      }, {
        title: "服务优势",
        img: require("@/assets/images/home/advantage-img4.png"),
        desc: "提供一站式服务支持，售前技术评估，售中技术交流，售后无间断服务"
      }],
      masterProducts: [
        {
          icon: "product01",
          title: "模板自主布展",
          desc:
            "用3D数字化定义现实，打造沉浸式新体验<br/>丰富展厅模板，超低成本超快速度，一站式满足各行各业场景化展示需求，基于3D高保真立体模型和场景，帮助企业快速拥有3D展厅，给用户创造极致线上体验",
          btn: "免费试用",
        },
        {
          icon: "product03",
          title: "展厅个性定制",
          desc:
            "满足全行业个性化定制需求<br/>凸显企业品牌形象，3D助力企业数字化转型，5G快速实现云端与空间仿真的跨次元联动，让企业畅享3D高新技术带来的无限可能",
          btn: "定制需求",
        },
        {
          icon: "product02",
          title: "3D云展会系统",
          desc:
            "展商对接、自主布展、展台发布、在线观展一站式服务<br/>系统提供独立页面对接内嵌，包括展会创建、展会导览、展商接入及管理、数据包离线下载及部署、API及SDK对接等服务",
          btn: "查看更多",
        },
      ],
      leftIndex: 2,
      show0: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      showSolve: false,
      showImg: true,
      showInfo: true,
      homeAnimationArr: [],
      activeCarousel: 1,
      initialIndex: 1,
      experienceActive: 0,
      serviceList: [{
        title: "停留时长",
        num: "+300%",
        desc: "打造沉浸式三维空间，浏览者可足不出户获得亲临现场的全新体验"
      }, {
        title: "转化效率",
        num: "+200%",
        desc: "所见即所得，产品720°交互，vr带看，直播等多样营销玩法，开启7x24h引流获客"
      }, {
        title: "搭建成本",
        num: "-95%",
        desc: "数千款3D空间模板，3分钟发布专属3D虚拟空间，低成本实现3D/VR内容营销"
      }],
      experienceList: [{
        title: "艺术展览",
        icon: "experience-svg5",
      }, {
        title: "展览展会",
        icon: "experience-svg2",
      }, {
        title: "3D商城",
        icon: "experience-svg3",
      }, {
        title: "数字文博",
        icon: "experience-svg4",
      }, {
        title: "企业营销",
        icon: "experience-svg",
      }, {
        title: "陶瓷工艺",
        icon: "experience-svg6",
      }],
      productTitleList: [{
        title: "极速布展"
      }, {
        title: "3D逛展"
      }, {
        title: "增值功能"
      }],
      list: [
        {
          icon: "value11",
          txt: "模板自选",
        },
        {
          icon: "value12",
          txt: "素材管理",
        },
        {
          icon: "value13",
          txt: "图文布展",
        },
        {
          icon: "value14",
          txt: "模型布展",
        },
        {
          icon: "value16",
          txt: "热点配置",
        },
        {
          icon: "value17",
          txt: "导览配置",
        },
        {
          icon: "value18",
          txt: "解说背景音",
        },
        {
          icon: "value15",
          txt: "中英文界面",
        },
      ],
      list1: [
        {
          icon: "value21",
          txt: "自由漫游",
        },
        {
          icon: "value22",
          txt: "地图导览",
        },
        {
          icon: "value23",
          txt: "展品导航",
        },
        {
          icon: "value24",
          txt: "自动巡馆",
        },
        {
          icon: "value25",
          txt: "热点互动",
        },
        {
          icon: "value26",
          txt: "真人讲解",
        },
        {
          icon: "value27",
          txt: "点赞留言",
        },
        {
          icon: "value28",
          txt: "一键分享",
        },
      ],
      list2: [
        {
          icon: "value31",
          txt: "在线直播",
        },
        {
          icon: "value32",
          txt: "在线客服",
        },
        {
          icon: "value33",
          txt: "在线表单",
        },
        {
          icon: "value34",
          txt: "VR带看",
        },
        {
          icon: "value35",
          txt: "加密访问",
        },
        {
          icon: "value36",
          txt: "访问统计",
        },
        {
          icon: "value37",
          txt: "访客信息",
        },
        {
          icon: "value38",
          txt: "离线部署",
        },
      ],
      chooseList: [
        {
          swiper: [
            {
              img: require("@/assets/images/home/choose1.png"),
              imgLink: "https://wbh-oss.jimuyida.com/#/",
              desc:
                "3D云展系统非常易于使用，已经为我们公司提供了很多技术帮助，让我们可以轻松地对接任何展会项目，使我们可以更加轻松为客户服务。",
              owner: "—— 某展会代表Mike",
              list: [
                {
                  num: "50+",
                  txt: "累计协助办展",
                },
                {
                  num: "2.76万+",
                  txt: "累计参展商",
                },
                {
                  num: "8945万+",
                  txt: "累计浏览次数",
                },
              ],
            },
            {
              img: require("@/assets/images/home/choose2.png"),
              imgLink:
                "https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=63cd95c986104192bc0570db175ebfe2",
              desc:
                "自从使用3D云展以来，我们对企业品牌管理，企业营销感到更加自信，实现了一机与跨地域多种族的客户共享信息并提供新型服务。",
              owner: "—— 某电子商务企业代表",
              list: [
                {
                  num: "3mins",
                  txt: "停留时长",
                },
                {
                  num: "1.7万+",
                  txt: "累计展品",
                },
                {
                  num: "87.6%",
                  txt: "转化率",
                },
              ],
            },
          ],
        },
        {
          swiper: [
            {
              img: require("@/assets/images/home/choose3.png"),
              imgLink:
                "https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=a055ef12e61b4cd5bfde391a984aba10",
              desc:
                "3D云展让我们企业的品牌“活”起来，使得我们可以顺利转型，并持续聚合流量，深度打造数字化。",
              owner: "—— 某企业代表",
              list: [
                {
                  num: "30400㎡",
                  txt: "展示面积超",
                },
                {
                  num: "203％",
                  txt: "曝光率增加",
                },
                {
                  num: "78%",
                  txt: "获客成本降低",
                },
              ],
            },
            {
              img: require("@/assets/images/home/choose4.png"),
              imgLink:
                "https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=743fb2bbfc574adeba219630e916069c",
              desc:
                "喜欢3D云展既能够高度还原和保护文献文物且展示形式更新颖，介绍更全面，又能够突破时间空间限制，使得文化传播更便捷，中国文化覆盖更广阔。",
              owner: "—— 某博物馆馆长",
              list: [
                {
                  num: "100+",
                  txt: "累计搭建",
                },
                {
                  num: "5mins",
                  txt: "建模最快",
                },
                {
                  num: "0.01mm",
                  txt: "模型精度达",
                },
              ],
            },
          ],
        },
      ],
      imgHoverList: [
        {
          swiper: [
            {
              active: require("@/assets/images/home/choose1_active.png"),
              inactive: require("@/assets/images/home/choose1.png"),
            },
            {
              active: require("@/assets/images/home/choose2_active.png"),
              inactive: require("@/assets/images/home/choose2.png"),
            },
          ],
        },
        {
          swiper: [
            {
              active: require("@/assets/images/home/choose3_active.png"),
              inactive: require("@/assets/images/home/choose3.png"),
            },
            {
              active: require("@/assets/images/home/choose4_active.png"),
              inactive: require("@/assets/images/home/choose4.png"),
            },
          ],
        },
      ],
      iframeList: [{
        link: "https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=d9455fc3ade84a38806bf37354119755"
      }, {
        link: "https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=09b98769236e466ab0b9dec1b8aeac36"
      }, {
        link: "https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=63cd95c986104192bc0570db175ebfe2"
      }, {
        link: "https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=743fb2bbfc574adeba219630e916069c"
      }, {
        link: "https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=562ba3a33e6e419aac36660ad6ef7df7"
      }, {
        link: "https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=e1c502b16b1248398a17f057c3fe971c"
      }],
      solveRight: {},
      timer: null,
      cardData:[]
    };
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    }
  },
  methods: {
    //获取精品案例
    getCardData() {
      let me = this;
      me.$http
          .homeBoutique({pageSize: 8})
          .then((res) => {
            me.cardData = res
          })
    },
    experience(path, number) {
      this.number = number;
      let routeData = this.$router.resolve({
        path: path,
        query: { number: this.number },
      });
      window.open(routeData.href, "_blank");
    },
    bannerImgChange() {},
    imgMouseEnter(index, i) {
      this.chooseList[index].swiper[i].img = this.imgHoverList[index].swiper[
        i
      ].active;
    },
    imgMouseLeave(index, i) {
      this.chooseList[index].swiper[i].img = this.imgHoverList[index].swiper[
        i
      ].inactive;
    },
    clickImgHandle(link) {
      window.open(link, "_blank");
    },
    solveClick(index) {
      let me = this;
      me.showSolve = false;
      me.solveRight = {};
      me.solveIndex = index;
      setTimeout(() => {
        let infos = me.info.tradeList[me.solveIndex];
        if (infos.description && typeof infos.description === "string") {
          infos.description = JSON.parse(infos.description);
        }
        me.solveRight = infos;

        me.showSolve = true;
      }, 5);
    },
    animationObj() {
      let me = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      me.homeAnimationArr.forEach((item, index) => {
        if (scrollTop >= item.top) {
          me[item.show] = true;
          if (index === 4) {
            // me.solveRight = me.info.tradeList[me.solveIndex];
            let infos = me.info.tradeList[me.solveIndex];
            if (infos.description && typeof infos.description === "string") {
              infos.description = JSON.parse(infos.description);
            }
            me.solveRight = infos;
            me.showSolve = true;
          }
        }
      });
    },
    //解决方案跳转
    moreLink(link) {
      window.open(link);
    },
    toCreat() {
      this.$router.push({path: "/self/buy/tpl"})
    },
    changeCarousel(index) {
      this.activeCarousel = index
    },
    clickCarousel(index) {
      this.$refs.productCarousel.setActiveItem(index)
    },
    clickExperinece(index) {
      this.experienceActive = index
    },
    goBoutiqueModel() {
      if (this.userinfo && this.$utils.getUserToken()) {
        this.$router.push({name: "buyTpl"})
      } else {
        this.$Ruler.account({
          options: {
            operate: 0,
          },
        });
      }
    },
    goBoutiqueCase() {
      this.$router.push({name: "case"})
    },
    async toView(item) {
      let tempId = item.tempId,
          me = this;
      let url = await me.$utils.getArtPreviewUrl({
        G_TEMP_ID: tempId,
        isBuild: true,
        token: this.$store.state.token.token,
      });
      window.open(url);
    },
  },
  async mounted() {
    let me = this;
    let res = await me.$http.homeIndex();
    this.info = res;
    let homeAnimation = document.getElementsByClassName("homeAnimation");
    let cliHeight = document.documentElement.clientHeight;
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    let reduceTop = cliHeight - scrollTop; //屏幕总高度减去scroll滚动高度
    for (let i in homeAnimation) {
      if (homeAnimation[i].offsetTop) {
        let obj = {
          top: homeAnimation[i].offsetTop - reduceTop + 300, //出现在可视区的高度值
          show: `show${i}`,
        };
        homeAnimation[i].offsetTop - reduceTop;
        me.homeAnimationArr.push(obj);

      }
    }
    window.addEventListener("scroll", this.animationObj);
    me.getCardData();
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped src="./home.scss"></style>
