<template>
  <div class="show-content">
    <div class="main">
      <div class="bannerBox">
        <div class="content">
        </div>
      </div>
      <div class="service">
        <div class="base-container">
          <div class="content">
            <div class="title">
              <p>3D云上展会SaaS系统</p>
              <p class="small">云上展会标准化SaaS服务平台</p>
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
      <div v-for="(item, index) in functionList" :key="index" class="function homeAnimation"
           :class="index === 0 ? 'first': ''">
        <div class="base-container">
          <div class="content">
            <div v-if="index === 0 && item.show" class="title">
              <p>核心功能</p>
            </div>
            <div v-if="index%2 === 0" class="flex-center">
              <img v-if="item.show" :style="{width: item.width + 'px'}" class="left l-l" :src="item.mainImg" alt="">
              <div v-if="item.show" class="right">
                <div class="tit">
                  <img :src="item.titleImg" alt="">
                  <span :style="{top: item.top + 'px'}">{{item.title}}</span>
                </div>
                <div class="text">{{item.text}}</div>
              </div>
            </div>
            <div v-else class="flex-center">
              <div v-if="item.show" class="right r-r">
                <div class="tit tit-r">
                  <img :src="item.titleImg" alt="">
                  <span :style="{top: item.top + 'px'}">{{item.title}}</span>
                </div>
                <div class="text">{{item.text}}</div>
              </div>
              <img v-if="item.show" :style="{width: item.width + 'px'}" class="left" :src="item.mainImg" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="boutique">
        <div class="title">
          <p>精品案例</p>
        </div>
        <div class="body-head">
          <div class="banner">
            <el-carousel :autoplay="false" arrow="always" trigger="click">
              <el-carousel-item v-for="item in ICIFList" :key="item.title">
                <div class="box">
                  <img class="bg" :src="item.bg" alt=""/>
                  <div class="content">
                    <div class="top">
                      <img class="left" :src="item.img" alt=""/>
                      <div class="desc">
                        <img :src="item.imgLogo" alt=""/>
                        <h5>{{ item.title }}</h5>
                        <div class="text">
                          <p v-for="item3 in item.desc" :key="item3">
                            {{ item3 }}
                          </p>
                        </div>
                        <button @click="getMore(item.link)">了解更多</button>
                      </div>
                    </div>
                    <ul class="bottom">
                      <li v-for="item2 in item.numList" :kye="item2.name">
                        <p>
                          <span class="num">{{ item2.num }}</span>
                          <span class="unit">{{ item2.unit }}</span>
                        </p>
                        <p class="name">
                          {{ item2.name }}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="banner banner2">
            <el-carousel :autoplay="false" arrow="always" trigger="click">
              <el-carousel-item v-for="item in SmartExpo" :key="item.title">
                <div class="box">
                  <img class="bg" :src="item.list[active1].list.bg" alt=""/>
                  <div class="content">
                    <div class="top">
                      <img
                          class="left"
                          :src="item.list[active1].list.img"
                          alt=""
                      />
                      <div class="desc">
                        <img :src="item.list[active1].list.imgLogo" alt=""/>
                        <h5>{{ item.list[active1].list.title }}</h5>
                        <div class="text">{{ item.list[active1].list.desc }}</div>
                        <button @click="getMore(item.list[active1].list.link)">
                          了解更多
                        </button>
                        <div class="tab">
                        <span
                            v-for="(item2, index2) in item.list"
                            :key="item2.name"
                            @click="active1 = index2"
                            :class="index2 === active1 ? 'active' : ''"
                        >{{ item2.name }}</span
                        >
                        </div>
                      </div>
                    </div>
                    <ul class="bottom">
                      <li
                          v-for="item3 in item.list[active1].list.numList"
                          :kye="item3.name"
                      >
                        <p>
                          <span class="num">{{ item3.num }}</span>
                          <span class="unit">{{ item3.unit }}</span>
                        </p>
                        <p class="name">
                          {{ item3.name }}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="more">
          <span @click="getMoreCase">获取更多案例</span>
        </div>
      </div>
    </div>
    <customized @success="successHandle"></customized>
    <success
        :isvisible="isSuccess"
        msg="提交成功"
        tips="专属顾问会尽快与您联系"
        @close="isSuccess = false"
    ></success>
    <fixed-tool></fixed-tool>
  </div>
</template>
<script>
  import PageFooter from "@/components/page-footer/page-footer.vue";
  import PageHeader from "@/components/page-header/page-header.vue";
  import countNumberVue from "../../mobile/components/count-number.vue";
  import logo from "@/components/logo.vue";
  import searchWord from "@/components/search-case.vue";
  import success from "@/components/popup/success.vue";
  import customized from "@/components/customized.vue";

  export default {
    name: "show",
    props: {
      gradual: {
        type: Boolean,
        default: true,
      },
    },
    components: {
      logo,
      searchWord,
      PageFooter,
      PageHeader,
      success,
      customized
    },
    data() {
      return {
        active1: 0,
        active2: 0,
        show: false,
        isSuccess: false,
        homeAnimationArr: [],
        serviceList: [{
          title: "云上展会筹备时长",
          num: "-70%",
          desc: "一站式SaaS服务平台，赋能主办方/承办方高效自主办展"
        }, {
          title: "云上办展技术成本",
          num: "-80%",
          desc: "展商可使用平台海量3D展台模板库低成本快速布展"
        }, {
          title: "云上展会运营效率",
          num: "+300%",
          desc: "后台实时监控展会布展进度，多维度数据报表高效评估活动效果"
        }],
        functionList: [{
          mainImg: require("@/assets/images/saasServiced/mainImg1.png"),
          titleImg: require("@/assets/images/saasServiced/titleImg1.png"),
          title: "独立品牌曝光",
          text: "支持创建展会专属域名、登录页面及logo，满足独立品牌曝光需求",
          top: 70,
          width: 700,
          show: false
        }, {
          mainImg: require("@/assets/images/saasServiced/mainImg2.png"),
          titleImg: require("@/assets/images/saasServiced/titleImg2.png"),
          title: "展台模板管理",
          text: "可为展商配置平台海量3D展台模板库或展会专属模板，展商可使用展台模板快速创建自有展台",
          top: 58,
          width: 770,
          show: false
        }, {
          mainImg: require("@/assets/images/saasServiced/mainImg3.png"),
          titleImg: require("@/assets/images/saasServiced/titleImg3.png"),
          title: "展商监控管理",
          text: "可查看和管理展商制作进度，实时监控展会布展进度",
          top: 52,
          width: 687,
          show: false
        }, {
          mainImg: require("@/assets/images/saasServiced/mainImg4.png"),
          titleImg: require("@/assets/images/saasServiced/titleImg4.png"),
          title: "展商资源管理",
          text: "可为每个展商单独配置展厅发布资源及创建展台数量，实现资源合理分配",
          top: 62,
          width: 680,
          show: false
        }, {
          mainImg: require("@/assets/images/saasServiced/mainImg5.png"),
          titleImg: require("@/assets/images/saasServiced/titleImg5.png"),
          title: "展商自主布展",
          text: "展商可通过布展工具自主上传图片、文字、视频、模型等素材自主布展",
          top: 45,
          width: 713,
          show: false
        }, {
          mainImg: require("@/assets/images/saasServiced/mainImg6.png"),
          titleImg: require("@/assets/images/saasServiced/titleImg6.png"),
          title: "数据统计分析",
          text: "提供用户、展厅、访问统计分析，多维度评估展会活动效果，助力营销决策",
          top: 67,
          width: 734,
          show: false
        }],
        ICIFList: [
          {
            bg: require("@/assets/images/solve/box1.png"),
            img: require("@/assets/images/solve/box1-img2.png"),
            imgLogo: require("@/assets/images/solve/box1-logo.png"),
            title: "第十七届中国（深圳）国际文化产业博览交易会",
            desc: [
              "被誉为“中国文化产业第一展”的深圳文博会是中国一个国家级、国际化、综合性的文化产业博览交易会，本届云上文博会平台通过模拟线下文博会场景，将六个展馆展览内容在云上平台进行同步展示，通过云上文博会平台同步向海内外客商展示项目、产品交易等情况，对线下展示和交易进行大数据分析，并在线上增设互联网馆和“一带一路”·国际馆。",
            ],
            link: "https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=52d7048a0ca9410e85cd9751be4fff06",
            numList: [
              {
                num: "6+1",
                unit: "个",
                name: "展馆",
              },
              {
                num: "67",
                unit: "个",
                name: "分会场",
              },
              {
                num: "868",
                unit: "家",
                name: "线上参展企业",
              },
              {
                num: "2468",
                unit: "家",
                name: "参展商",
              },
              {
                num: "4000",
                unit: "个",
                name: "文化产业项目",
              },
              {
                num: "10",
                unit: "万件",
                name: "展品",
              },
              {
                num: "12",
                unit: "万㎡",
                name: "展览面积",
              },
              {
                num: "1831",
                unit: "万+",
                name: "浏览量",
              },
            ],
          },
          {
            bg: require("@/assets/images/solve/box1-2.png"),
            img: require("@/assets/images/solve/box1-img1.png"),
            imgLogo: require("@/assets/images/solve/box1-logo2.png"),
            title: "第十六届中国（深圳）国际文化产业博览交易会",
            desc: [
              "积木易搭3D布展系统，快速实现上千家展商同时搭建云上展台；",
              "积木易搭3D导览系统，安全稳定运行，并将会展中心立体呈现在云上，让观众在云端身临其境观展；",
              "3D云展标准开放接口，让主办方及参展方对会场管理和参展数据一目了然。",
            ],
            link: "https://wbh-oss.jimuyida.com/#/",
            numList: [
              {
                num: "1",
                unit: "个",
                name: "3D场馆",
              },
              {
                num: "12",
                unit: "个",
                name: "3D展区",
              },
              {
                num: "3243",
                unit: "家",
                name: "参展商",
              },
              {
                num: "15",
                unit: "万件",
                name: "展品",
              },
              {
                num: "1831",
                unit: "万+",
                name: "参观浏览",
              },
            ],
          },
        ],
        SmartExpo: [
          {
            name: "2021",
            list: [
              {
                name: "智博会",
                list: {
                  bg: require("@/assets/images/solve/box2-2.png"),
                  img: require("@/assets/images/solve/box2-img.png"),
                  imgLogo: require("@/assets/images/solve/box2-logo2.png"),
                  title: "2021年智博会",
                  desc:
                      "2021智博会拟采取线上线下相结合的形式举办，线上为主，严控规模。2021智博会主题为“智能化：为经济赋能，为生活添彩”。线上虚拟展为在智博会官网搭建多功能线上展示平台，并借助虚拟建模技术，提供标准化展台，为华为、中科曙光、阿里巴巴、京东科技、腾讯、浪潮等611家参展单位提供多维度展示方式。",
                  link:
                      "https://obs.3dyunzhan.com/sceneFront/index.html?groupId=006fcc9bd58d46d2b7d4e67ef7282502",
                  numList: [
                    {
                      num: "1",
                      unit: "套",
                      name: "系统",
                    },
                    {
                      num: "6",
                      unit: "大",
                      name: "3D展区",
                    },
                    {
                      num: "31",
                      unit: "个",
                      name: "国家和地区",
                    },
                    {
                      num: "611",
                      unit: "家",
                      name: "参展商",
                    },
                    {
                      num: "7",
                      unit: "万㎡",
                      name: "展览面积",
                    },
                    {
                      num: "181",
                      unit: "万+",
                      name: "参观浏览",
                    },
                    {
                      num: "8.39",
                      unit: "万+",
                      name: "点赞量",
                    },
                  ],
                },
              },
              {
                name: "重庆礼嘉",
                list: {
                  bg: require("@/assets/images/solve/box2-1-2.png"),
                  img: require("@/assets/images/solve/box2-img-2.png"),
                  imgLogo: require("@/assets/images/solve/box2-logo2.png"),
                  title: "2021年礼嘉智慧生活的一天",
                  desc:
                      "2021智博会还在礼嘉智慧公园设置了“智慧生活的一天”应用场景，打造60个体验场景、130个体验项目，全方位展示智慧生活全景，体现智能化在高品质生活中的引领作用。",
                  link: "https://3dcloud.lijiaintelligencepark.com/index.html#/",
                  numList: [
                    {
                      num: "1",
                      unit: "套",
                      name: "系统",
                    },
                    {
                      num: "11",
                      unit: "个",
                      name: "3D展馆",
                    },
                    {
                      num: "60",
                      unit: "个",
                      name: "体验场景",
                    },
                    {
                      num: "130",
                      unit: "个",
                      name: "体验项目",
                    },
                    {
                      num: "72",
                      unit: "万+",
                      name: "参观浏览",
                    },
                    {
                      num: "3.7",
                      unit: "万+",
                      name: "点赞量",
                    },
                  ],
                },
              },
            ],
          },
          {
            name: "2020",
            list: [
              {
                name: "精品馆",
                list: {
                  bg: require("@/assets/images/solve/box2.png"),
                  img: require("@/assets/images/solve/box2-img2.png"),
                  imgLogo: require("@/assets/images/solve/box2-logo.png"),
                  title: "“全球企业30强”精品馆",
                  desc:
                      "华为、阿里云、腾讯云、中国移动、中国联通、中国铁塔、京东、西门子、IBM、三菱等全球30强企业齐聚，并打造别具一格的3D品牌形象展馆。",
                  link:
                      "https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=62f94939a6b445e58f0894486caf40ab",
                  numList: [
                    {
                      num: "1",
                      unit: "套",
                      name: "展馆",
                    },
                    {
                      num: "7",
                      unit: "个",
                      name: "分会场",
                    },
                    {
                      num: "511",
                      unit: "家",
                      name: "线上参展企业",
                    },
                    {
                      num: "30",
                      unit: "天",
                      name: "参展商",
                    },
                    {
                      num: "1800",
                      unit: "万+",
                      name: "浏览量",
                    },
                  ],
                },
              },
              {
                name: "专题馆",
                list: {
                  bg: require("@/assets/images/solve/box2.png"),
                  img: require("@/assets/images/solve/box2-img2-2.png"),
                  imgLogo: require("@/assets/images/solve/box2-logo.png"),
                  title: "“智造重镇”专题馆",
                  desc:
                      "智造重镇专题馆围绕大数据智能化主线，聚焦工业互联网、智能化改造、智能产品三个方面，突出场景应用、互动体验、新技术发展等特点进行全方位展示重庆打造“智造重镇”的发展情况。",
                  link:
                      "https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=6edc2b12a292488e8b41b2260354454d",
                  numList: [
                    {
                      num: "1",
                      unit: "套",
                      name: "展馆",
                    },
                    {
                      num: "7",
                      unit: "个",
                      name: "分会场",
                    },
                    {
                      num: "511",
                      unit: "家",
                      name: "线上参展企业",
                    },
                    {
                      num: "30",
                      unit: "天",
                      name: "参展商",
                    },
                    {
                      num: "1800",
                      unit: "万+",
                      name: "浏览量",
                    },
                  ],
                },
              },
            ],
          },
        ],
      };
    },
    methods: {
      animationObj() {
        let me = this;
        let scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;
        me.homeAnimationArr.forEach((item, index) => {
          if (scrollTop >= item.top) {
            me.show = true
            me.functionList[index].show = true;
          }
        });
        // console.log(me.functionList)
      },
      successHandle(val) {
        if (val) {
          this.isSuccess = true
        }
      },
      getMoreCase() {
        window.open(`${location.origin}/case`);
      },
      getMore(link) {
        window.open(link, "_blank");
      },
    },
    async mounted() {
      let me = this;
      // let res = await me.$http.homeIndex();
      // this.info = res;
      let homeAnimation = document.getElementsByClassName("homeAnimation");
      let cliHeight = document.documentElement.clientHeight;
      let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      let reduceTop = cliHeight - scrollTop; //屏幕总高度减去scroll滚动高度
      for (var i = 0; i < homeAnimation.length; i++) {
        console.log(homeAnimation[i].offsetTop)
        if (homeAnimation[i].offsetTop) {
          let obj = {
            top: homeAnimation[i].offsetTop - reduceTop+200, //出现在可视区的高度值
            // show: `show${i}`,
          };
          homeAnimation[i].offsetTop - reduceTop;
          me.homeAnimationArr.push(obj);
        }
      }
      window.addEventListener("scroll", this.animationObj);
    },
    watch: {},
  };
</script>

<style lang="scss" scoped src="./saasServiced.scss"></style>
