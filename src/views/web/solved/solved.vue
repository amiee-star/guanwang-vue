<template>
  <div class="content">
<!--    <page-header :gradual="false"></page-header>-->
    <div class="head">
      <a
        :href="bannerInfo.link ? bannerInfo.link : ''"
        target="_blank"
        rel="noopener"
        class="bannerLink"
      >
        <img :src="bannerInfo.image" alt="" style="width:100%" />
      </a>
    </div>
    <div class="body">
      <div class="body-head">
        <p class="text">全面整合云端资源 极速构建展会新模式</p>
        <div class="banner">
          <el-carousel :autoplay="false" arrow="always" trigger="click">
            <el-carousel-item v-for="item in ICIFList" :key="item.title">
              <div class="box">
                <img class="bg" :src="item.bg" alt="" />
                <div class="content">
                  <div class="top">
                    <img class="left" :src="item.img" alt="" />
                    <div class="desc">
                      <img :src="item.imgLogo" alt="" />
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
                <img class="bg" :src="item.list[active1].list.bg" alt="" />
                <div class="content">
                  <div class="top">
                    <img
                      class="left"
                      :src="item.list[active1].list.img"
                      alt=""
                    />
                    <div class="desc">
                      <img :src="item.list[active1].list.imgLogo" alt="" />
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
      <div class="body-foot">
        <div class="foot-text">
          3D云端展厅+3D立体展品<br />让观众沉浸式观展与展品零距离交互
        </div>

        <div class="box box-three" v-for="item in solvedList" :key="item.id">
          <div class=" length-img">
            <img class="img-three" :src="item.imgUrl" alt="" />
          </div>
          <div class="len-content">
            <ul>
              <li class="liTitle">{{ item.title }}</li>
              <!-- <li v-html="item.remark" class="liContext"></li> -->
              <li class="liContext">
                <code>{{ item.remark }}</code>
              </li>
            </ul>
            <div class="link link-body">
              <a :href="item.contentUrl" target="_blank">了解更多</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <img src="@/assets/images/solve/foot.png" alt="" style="width:100%" />
    </div>
  </div>
</template>
<script>
import PageFooter from "@/components/page-footer/page-footer.vue";
import PageHeader from "@/components/page-header/page-header.vue";
export default {
  name: "solved",
  components: {
    PageFooter,
    PageHeader,
  },

  data() {
    return {
      active1: 0,
      active2: 0,
      state: true,
      index: 0,
      timer: "",
      solvedList: [],
      bannerInfo: {},
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
    getSolvedList() {
      this.$http.getSolvedList().then((res) => {
        this.solvedList = res;
      });
    },
    getBanner() {
      // let
      this.$http.getBannerList({ type: 4, showType: 1 }).then((res) => {
        if (res.length > 0) {
          this.bannerInfo = res[0];
        }
      });
    },
    getMore(link) {
      window.open(link, "_blank");
    },
  },
  mounted() {
    let me = this;
    me.getSolvedList();
    me.getBanner();
    me.timer = setInterval(() => {
      if (me.index == 1) {
        me.index = 0;
      } else if (me.index == 0) {
        me.index = 1;
      }
    }, 5000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped src="./solved.scss"></style>
