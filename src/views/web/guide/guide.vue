<template>
  <div class="guide">
<!--    <page-header :gradual="false"></page-header>-->
    <div class="banner">
      <a :href="bannerInfo.link" target="_blank" :class="bannerInfo.link ? 'pointer' : ''">
        <img :src="bannerInfo.image" alt="">
      </a>
<!--      <div class="base-container">-->
<!--        <div class="content">-->
<!--          <h2>3D智能导览系统</h2>-->
<!--          <div class="desc">三维立体可视化导览，虚拟&现实结合，打造线上展会/智慧文博/智慧文旅等产业导览新形态</div>-->
<!--          <el-button class="service">立即咨询<i class="el-icon-arrow-right"></i></el-button>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div class="main">
      <div class="main-content1">
        <h3 class="title">3D可视化导览 多维立体化地图 沉浸式交互体验</h3>
        <div class="exhibition">
          <div class="hall" @click="goDetail">
            <img :src="imgUrl" alt="">
          </div>
          <div class="text">
            3D智能导览系统基于WebGL3.0技术、深度融合定位技术和导航技术，采用全景图+立体模型的方式，给主办方、参展商、访客提供开放式3D导览平台，所见即所得的沉浸式浏览体验，极速流畅导览，让访客轻松了解展会概况，精准触达品牌展厅，为线上展会、智慧文博、智慧文旅等行业提供高效数字化转型升级解决方案。
          </div>
        </div>
      </div>
      <div class="main-content2">
        <div class="base-container">
          <h3 class="title">多维导览 高效导览 精准触达</h3>
          <div class="floorplan">
            <img :src="require('@/assets/images/guide/floorplan.png')" alt="">
            <div class="tag">云上文博会</div>
            <button class="more" @click="moreHandle">了解更多<i class="el-icon-arrow-right"></i></button>
          </div>
          <div class="modular">
            <div class="box" v-for="item in modularList" :key="item.desc">
              <div class="image">
                <img :src="item.img" alt="">
              </div>
              <div class="btm">
                <h6>{{item.title}}</h6>
                <div class="desc">{{item.desc}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-content3">
        <div class="base-container">
          <h3 class="title">3D智能导览 无限空间 无尽可能</h3>
          <div class="content">
            <div class="left">
              <div class="left-l">
                <div class="b-l">
                  <div class="b-t">
                    <div class="box" v-for="item in list1" :key="item.text">{{item.text}}</div>
                  </div>
                  <div class="b-b">
                    <div class="box" v-for="item in list2" :key="item.text">{{item.text}}</div>
                  </div>
                </div>
                <div class="b-r">
                  <div class="box" v-for="item in list3" :key="item.text"><span>{{item.text}}</span></div>
                </div>
              </div>
              <div class="left-r">使用者</div>
            </div>
            <div class="center">
              <div class="cont">
                <div class="circle1">
                  <span>
                    使用端
                  </span>
                </div>
                <div class="circle2">
                  <span>
                    数据中心
                  </span>
                </div>
                <div class="circle3">
                  <span>
                    服务端
                  </span>
                </div>
                <div class="title">多端口 多硬件支持</div>
                <div class="cir1">互联网</div>
                <div class="cir2">物联网</div>
                <div class="cir3">云计算</div>
                <div class="line"></div>
                <div class="line2"></div>
              </div>
            </div>
            <div class="right left">
              <div class="left-r">管理者</div>
              <div class="left-l">
                <div class="b-r">
                  <div class="box" v-for="item in list4" :key="item.text"><span>{{item.text}}</span></div>
                </div>
                <div class="b-l">
                  <div class="b-t">
                    <div class="box" v-for="item in list5" :key="item.text">{{item.text}}</div>
                  </div>
                  <div class="b-b">
                    <div class="box" v-for="item in list6" :key="item.text">{{item.text}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-content4">
        <div class="base-container">
          <h3 class="title">客户案例</h3>
          <div class="content">
            <div class="box" v-for="item in caseList" :key="item.desc">
              <div class="image">
                <img :src="item.img" alt="" @click="caseHandle(item.link)">
              </div>
              <div class="btm">{{item.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <customized @success="successHandle"></customized>
<!--    <page-footer></page-footer>-->
    <success
      :isvisible="isSuccess"
      msg="提交成功"
      tips="专属顾问会尽快与您联系"
      @close="isSuccess = false"
    ></success>
  </div>
</template>
<script>
  import PageFooter from "@/components/page-footer/page-footer.vue";
  import PageHeader from "@/components/page-header/page-header.vue";
  import formRules from "@/config/form-rules.js";
  import success from "@/components/popup/success.vue";
  import customized from "@/components/customized.vue";

  export default {
    name: "solved",
    components: {
      PageFooter,
      PageHeader,
      success,
      customized
    },
    data() {
      return {
        bannerInfo: "",
        isSuccess: false,
        imgUrl: require("@/assets/images/guide/hall1.png"),
        modularList: [{
          img: require("@/assets/images/guide/modular1.png"),
          title: "关联官网",
          desc: "直接访问文博会官方网站。方便观众了解文博会的相关背景内容"
        }, {
          img: require("@/assets/images/guide/modular8.png"),
          title: "帮助功能",
          desc: "进入导视系统后，界面提示操作方法"
        }, {
          img: require("@/assets/images/guide/modular2.png"),
          title: "导览岛/主题馆数据对接",
          desc: "系统集成各类数据，便于访客了解展会中热门主题馆"
        }, {
          img: require("@/assets/images/guide/modular3.png"),
          title: "主题馆自由切换",
          desc: "后台展区管理，访客自由切换"
        }, {
          img: require("@/assets/images/guide/modular4.png"),
          title: "快速检索查询",
          desc: "观众在查询框输入想要查询的内容，即可快速进行内容定位"
        }, {
          img: require("@/assets/images/guide/modular5.png"),
          title: "参展商名录",
          desc: "访客可在名录中对于感兴趣的参展商进行直接访问"
        }, {
          img: require("@/assets/images/guide/modular6.png"),
          title: "参展商各类型的数据对接",
          desc: "对接参展商官网、网上商城、直播平台等运营系统，确保参展商能够基于各类业务数据开展工作。"
        }, {
          img: require("@/assets/images/guide/modular7.png"),
          title: "3D展厅交互对接",
          desc: "3D云展独创的多样化多层级的3D展厅/3D展台展示及交互功能"
        }, {
          img: require("@/assets/images/guide/modular9.png"),
          title: "支持H5/小程序",
          desc: "便于观众通过手机、PAD等移动端，微信端等进行访问"
        }],
        list1: [{
          text: "3D导览岛"
        },{
          text: "展馆2.5D导览"
        },{
          text: "多语言 语音导览"
        },{
          text: "楼层导览"
        },{
          text: "3D位置导航"
        },{
          text: "主体馆自由切换"
        },{
          text: "参展商名录"
        },{
          text: "全局搜索/信息查询"
        },{
          text: "官网关联"
        },{
          text: "展品列表分类"
        }],
        list2: [{
          text: "实时展品数据"
        },{
          text: "游览路线推荐"
        },{
          text: "轨迹回放"
        }],
        list3: [{
          text: "3D导览"
        },{
          text: "3D导航"
        },{
          text: "3D导购"
        },{
          text: "3D导游"
        }],
        list4: [{
          text: "访客互动"
        },{
          text: "商业营销"
        },{
          text: "现场管理"
        }],
        list5: [{
          text: "3D主题互动展厅"
        },{
          text: "3D展品建模"
        },{
          text: "客服/帮助中心"
        },{
          text: "互动小游戏"
        },{
          text: "特色IP/虚拟形象设计"
        },{
          text: "接口数据实时展示"
        },{
          text: "增值广告与推送"
        },{
          text: "数据统计"
        },{
          text: "访客画像分析"
        },{
          text: "个性定制系统"
        }],
        list6: [{
          text: "视频兼管"
        },{
          text: "访客管理"
        },{
          text: "LBS对接"
        },{
          text: "LOT对接"
        }],
        caseList: [{
          img: require("@/assets/images/guide/case7.jpg"),
          title: "2021中国公益慈善项目交流展示会",
          link: "https://3d.cncf.org.cn/index.html#/model/cn"
        }, {
          img: require("@/assets/images/guide/case8.jpg"),
          title: "第五届中国—阿拉伯国家博览会",
          link: "https://casetfinfo.3dyunzhan.com/index.html#/model/cn"
        }, {
          img: require("@/assets/images/guide/case9.jpg"),
          title: "2021云上中国（南京）国际软件产品和信息服务交易博览会",
          link: "https://software3d.wimsite.cn/index.html#/model/cn"
        }, {
          img: require("@/assets/images/guide/case10.jpg"),
          title: "2021世界智能制造大会",
          link: "https://3d.wimsite.cn/"
        }, {
          img: require("@/assets/images/guide/case11.jpg"),
          title: "第16届榆林煤博会",
          link: "http://cycechina.3dyunzhan.com/index.html#/model/cn"
        }, {
          img: require("@/assets/images/guide/case12.jpg"),
          title: "2021重庆礼嘉智慧中心",
          link: "https://3dcloud.lijiaintelligencepark.com/index.html#/"
        }, {
          img: require("@/assets/images/guide/case13.jpg"),
          title: "2021南京创新周",
          link: "https://nanjingtech.3dyunzhan.com/"
        }, {
          img: require("@/assets/images/guide/case14.jpg"),
          title: "第十二届中国中部投资贸易博览会",
          link: "https://zbh.3dyunzhan.com/?index=7"
        }, {
          img: require("@/assets/images/guide/case1.png"),
          title: "2020中东欧国家特色农产品云上博览会",
          link: "http://zd.jimuyida.com/#/"
        }, {
          img: require("@/assets/images/guide/case2.png"),
          title: "第20届沈阳国际农业博览会",
          link: "https://vr.siaexpo.net.cn/agriculture/index.html"
        }, {
          img: require("@/assets/images/guide/case3.png"),
          title: "2020 中国电子信息博览会",
          link: "http://www.51jianmo.com/modeldetail?code=M00000000001001480RTT"
        }, {
          img: require("@/assets/images/guide/case4.png"),
          title: "第十届中国国际警用装备博览会",
          link: "http://www.51jianmo.com/modeldetail?code=M0000000000100149CG3D"
        }, {
          img: require("@/assets/images/guide/case5.png"),
          title: "深圳优秀技能人才招聘会",
          link: "http://www.51jianmo.com/modeldetail?code=M00000000001001497DEQ"
        }, {
          img: require("@/assets/images/guide/case6.png"),
          title: "中印建交70周年",
          link: "http://zy.jimuyida.com/"
        }]
      };
    },
    mounted() {
      let me = this;
      me.getBanner();
    },
    methods: {
      //获取banner
      getBanner() {
        this.$http.getBannerList({ type: 10, showType: 1 }).then((res) => {
          if (res.length > 0) {
            this.bannerInfo = res[0];
          }
        });
        // this.bannerTopImg = res.image;
      },
      successHandle(val) {
        if (val) {
          this.isSuccess = true
        }
      },
      caseHandle(link) {
        window.open(link)
      },
      goDetail() {
        window.open("http://oss.3dshichuang.com/static/zhanhui/index.html")
      },
      moreHandle() {
        window.open("https://wbh-oss.jimuyida.com/#/")
      }
    }
  };
</script>

<style lang="scss" scoped src="./guide.scss"></style>
