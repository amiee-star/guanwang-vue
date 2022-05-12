<template>
  <div class="mhome">
    <div class="banner">
      <swiper :options="swiperOptionBanner" ref="bannerImg">
        <swiper-slide v-for="(item, index) in bannerList" :key="index">
          <img v-if="item.link === ''" :src="item.image" />
          <a v-else :href="item.link" target="_blank"
            ><img :src="item.image"
          /></a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="hallValue">
      <ul class="why">
        <li>快速构建3D可视化场景<br />一键玩转数字互动营销</li>
      </ul>
      <div>
        <div>
          <div v-for="(item, index) in valueList" :key="index">
            <ul class="valueList">
              <li v-for="(one, index) in item" :key="index" class="flex-start">
                <svg-icon :icon-class="one.img"></svg-icon>
                <div>
                  <p v-html="one.title"></p>
                  <p>{{ one.desc }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="swiper-pagination" slot="pagination"></div>
        </div>
      </div>
    </div>
    <div class="orderHall">
      <ul>
        <li style="fontSize:0.4rem">核心产品及服务</li>
      </ul>
      <div class="list">
        <svg-icon icon-class="zizu"></svg-icon>
        <div class="title">模板自主布展</div>
        <div class="desc">
          用3D数字化定义现实，打造沉浸式新体验<br />
          丰富展厅模板，超低成本超快速度，一站式满足各<br />行各业场景化展示需求，基于3D高保真立体模型和场景，<br />帮助企业快速拥有3D展厅，给用户创造极致线上体验
        </div>
        <div class="btn" @click="toMore('免费试用')">免费试用 ></div>
      </div>
      <div class="list">
        <svg-icon icon-class="dingzhi"></svg-icon>
        <div class="title">展厅个性定制</div>
        <div class="desc">
          满足全行业个性化定制需求<br />
          凸显企业品牌形象，3D助力企业数字化转型，5G快速<br />实现云端与空间仿真的跨次元联动，让企业畅享3D高<br />新技术带来的无限可能
        </div>
        <div class="btn" @click="toMore('定制需求')">定制需求 ></div>
      </div>
      <div class="list">
        <svg-icon icon-class="zanhui"></svg-icon>
        <div class="title">3D云展会系统</div>
        <div class="desc">
          展商对接、自主布展、展台发布、在线观展一站式服务<br />
          系统提供独立页面对接内嵌，包括展会创建、展会导<br />览、展商接入及管理、数据包离线下载及部署、API及<br />SDK对接等服务
        </div>
        <div class="btn" @click="toMore('查看更多')">查看更多 ></div>
      </div>
    </div>
    <div class="template">
      <ul class="halls">
        <li>产品的价值及核心能力</li>
      </ul>
      <div class="buzan">
        <div class="title">极速布展</div>
        <div class="miaoshu">布展+3D场景+3D产品，让展示和交互更真实</div>
        <div class="iconList">
          <div class="item" v-for="(item, index) in iconList" :key="index">
            <div class="icon">
              <svg-icon :icon-class="item.name"></svg-icon>
            </div>
            <p class="ms">{{ item.desc }}</p>
          </div>
        </div>
        <div class="tourl" @click="experience('/mobileShow', 2)">
          探索更多功能 >
        </div>
        <div class="img">
          <img src="@/assets/images/jisubuzan.png" alt="" />
        </div>
      </div>
      <div class="buzan tt">
        <div class="title">3D逛展</div>
        <div class="miaoshu">突破空间限制，创造沉浸式体验</div>
        <div class="iconList">
          <div class="item" v-for="(item, index) in iconList2" :key="index">
            <div class="icon">
              <svg-icon :icon-class="item.name"></svg-icon>
            </div>
            <p class="ms">{{ item.desc }}</p>
          </div>
        </div>
        <div class="tourl" @click="experience('/mobileShow', 1)">
          探索更多功能 >
        </div>
        <div class="img">
          <img src="@/assets/images/home/value21.png" alt="" />
        </div>
      </div>
      <div class="buzan th">
        <div class="title">增值功能</div>
        <div class="miaoshu">高效营销裂变，AI大数据分析</div>
        <div class="iconList">
          <div class="item" v-for="(item, index) in iconList3" :key="index">
            <div class="icon">
              <svg-icon :icon-class="item.name"></svg-icon>
            </div>
            <p class="ms">{{ item.desc }}</p>
          </div>
        </div>
        <div class="tourl" @click="experience('/mobileShow', 3)">
          探索更多功能 >
        </div>
        <div class="img">
          <img src="@/assets/images/zengzhigongneng.png" alt="" />
        </div>
      </div>
    </div>
    <div class="fangan">
      <div class="title">行业解决方案</div>
      <div class="tab">
        <div
          v-for="(tab, index) in tabList"
          :key="index"
          class="tab_head"
          :class="{ actives: isIndex == index }"
          @click="
            () => {
              isIndex = index;
            }
          "
        >
          {{ tab.name }}
        </div>
      </div>
      <div v-if="isIndex == 0" class="tab_body">
        <!-- <div
          class="desc"
          v-for="(iteam, index) in JSON.parse(zanhui.description)"
          :key="index"
        >
          {{ iteam }}
        </div> -->
        <div v-if="zanhui.description">
          {{ zanhui.description.replace(/\["/g, "").replace(/"\]/g, "") }}
        </div>
        <div class="more" @click="toUrl(zanhui.moreLink)">
          解决方案 >
        </div>
        <div
          class="imgs"
          v-for="(img, index) in zanhui.cases"
          :key="index + '5'"
        >
          <div class="img" @click="toUrl(img.url)">
            <img :src="img.image" alt="" />
            <div class="Imgtitle">{{ img.name }}</div>
          </div>
        </div>
      </div>
      <div v-if="isIndex == 1" class="tab_body">
        <!-- <div
          class="desc"
          v-for="(iteam, index) in JSON.parse(yingxiao.description)"
          :key="index"
        >
          {{ iteam }}
        </div> -->
        <div v-if="yingxiao.description">
          {{ yingxiao.description.replace(/\["/g, "").replace(/"\]/g, "") }}
        </div>
        <div class="more" @click="toUrl(yingxiao.moreLink)">
          解决方案 >
        </div>
        <div
          class="imgs"
          v-for="(img, index) in yingxiao.cases"
          :key="index + '1'"
        >
          <div class="img" @click="toUrl(img.url)">
            <img :src="img.image" alt="" />
            <div class="Imgtitle">{{ img.name }}</div>
          </div>
        </div>
      </div>
      <div v-if="isIndex == 2" class="tab_body">
        <!-- <div
          class="desc"
          v-for="(iteam, index) in JSON.parse(shangcheng.description)"
          :key="index"
        >
          {{ iteam }}
        </div> -->
        <div v-if="shangcheng.description">
          {{ shangcheng.description.replace(/\["/g, "").replace(/"\]/g, "") }}
        </div>
        <div class="more" @click="toUrl(shangcheng.moreLink)">
          解决方案 >
        </div>
        <div
          class="imgs"
          v-for="(img, index) in shangcheng.cases"
          :key="index + '2'"
        >
          <div class="img" @click="toUrl(img.url)">
            <img :src="img.image" alt="" />
            <div class="Imgtitle">{{ img.name }}</div>
          </div>
        </div>
      </div>
      <div v-if="isIndex == 3" class="tab_body">
        <!-- <div
          class="desc"
          v-for="(iteam, index) in JSON.parse(junshi.description)"
          :key="index"
        >
          {{ iteam }}
        </div> -->
        <div v-if="junshi.description">
          {{ junshi.description.replace(/\["/g, "").replace(/"\]/g, "") }}
        </div>
        <div class="more" @click="toUrl(junshi.moreLink)">
          解决方案 >
        </div>
        <div
          class="imgs"
          v-for="(img, index) in junshi.cases"
          :key="index + '3'"
        >
          <div class="img" @click="toUrl(img.url)">
            <img :src="img.image" alt="" />
            <div class="Imgtitle">{{ img.name }}</div>
          </div>
        </div>
      </div>
      <div v-if="isIndex == 4" class="tab_body">
        <!-- <div
          class="desc"
          v-for="(iteam, index) in JSON.parse(wenbo.description)"
          :key="index"
        >
          {{ iteam }}
        </div> -->
        <div v-if="wenbo.description">
          {{ wenbo.description.replace(/\["/g, "").replace(/"\]/g, "") }}
        </div>
        <div class="more" @click="toUrl(wenbo.moreLink)">
          解决方案 >
        </div>
        <div
          class="imgs"
          v-for="(img, index) in wenbo.cases"
          :key="index + '4'"
        >
          <div class="img" @click="toUrl(img.url)">
            <img :src="img.image" alt="" />
            <div class="Imgtitle">{{ img.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="private templateCreat">
      <div class="private-h">
        <p class="tit">超20000家企业选择3D云展</p>
      </div>
      <div class="swipers" v-once>
        <swiperHome :arr="customModule"></swiperHome>
      </div>
      <div class="hezuo">
        <img src="@/assets/images/hezuo.png" alt="" />
      </div>
    </div>

    <div class="jiaru">
      <p class="ones">即刻加入</p>
      <p class="twos">开启3D数字化2.0时代</p>
      <div class="btns" @click="experience('/case', 0)">立即体验 ></div>
    </div>
<!--    <mobileUpdateTips/>-->
    <div class="foot-center">
      <div class="foot-titles">联系我们</div>
      <div class="foot-box">
        <p class="p">电话</p>
        <p class="p-content">400-080-9959</p>
        <a href="tel:400-080-9959"><i></i></a>
      </div>
      <div class="foot-box">
        <p class="p">邮箱</p>
        <p class="p-content">service@jimuyida.com</p>
      </div>
      <div class="foot-box foot-bottom">
        <p class="p">地址</p>
        <p class="p-content">深圳市南山区深南大道9996号松日鼎盛大厦21D</p>
      </div>
    </div>
  </div>
</template>
<script>
import swiperCertify from "@/components/swiper-certify/swiper-certify.vue";
import swiperHome from "mobile/components/swiper-home.vue";
import mobileUpdateTips from "@/components/mobile-updateTips"
import wx from "weixin-js-sdk";
export default {
  data() {
    const me = this;
    return {
      zanhui: [],
      yingxiao: [],
      shangcheng: [],
      junshi: [],
      wenbo: [],
      isIndex: 0,
      isvisible: true,
      isPlay: false,
      isShowVideoCut: true,
      bannerIndex: 0,
      swiperOptionBanner: {
        //显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        slidesPerView: "auto",
        loop: true,
        autoplay: {
          delay: 3000, //自动切换的时间间隔，单位ms
          stopOnLastSlide: false, //当切换到最后一个slide时停止自动切换
          disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。
        },
      },
      bannerImg: {
        //显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        slidesPerView: "auto",
        nextButton: ".swiper-button-next", //绑定下一页的控制按钮
        prevButton: ".swiper-button-prev", //绑定上一页的控制按钮
      },
      // bannerImg: {},

      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000, //自动切换的时间间隔，单位ms
          stopOnLastSlide: false, //当切换到最后一个slide时停止自动切换
          disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。
        },
        initialSlide: 4,
        loopedSlides: 4,
        on: {
          slideChange: function() {
            me.$refs.applicatNav.swiper &&
              me.$refs.applicatNav.swiper.slideTo(this.activeIndex, 0);
          },
        },
      },
      bgSize: "",
      iconList: [
        { name: "mobanzixuan", desc: "模板自选" },
        { name: "shucaiguanli", desc: "素材管理" },
        { name: "tuwenbuzan", desc: "图文布展" },
        { name: "moxingbuzan", desc: "模型布展" },
        { name: "ziyoutuozhuai", desc: "自由拖拽" },
        { name: "redianpeizhi", desc: "热点配置" },
        { name: "daolanpeizhi", desc: "导览配置" },
        { name: "jieshuobeijingyin", desc: "解说背景音" },
      ],
      iconList2: [
        { name: "ziyoumanyou", desc: "自由漫游" },
        { name: "ditudanlan", desc: "地图导览" },
        { name: "zanpingdaohang", desc: "展品导航" },
        { name: "zidongxunguan", desc: "自动巡馆" },
        { name: "redianhudong", desc: "热点互动" },
        { name: "zhenrenjiangjie", desc: "真人讲解" },
        { name: "dianzanliuyan", desc: "点赞留言" },
        { name: "yijianfenxiang", desc: "一键分享" },
      ],
      iconList3: [
        { name: "zaixianzhibo", desc: "在线直播" },
        { name: "zaixiankefu", desc: "在线客服" },
        { name: "zaixianbiaodan", desc: "在线表单" },
        { name: "vrdaikan", desc: "VR带看" },
        { name: "jiamifangwen", desc: "加密访问" },
        { name: "fangwentongji", desc: "访问统计" },
        { name: "fangkexinxi", desc: "访客信息" },
        { name: "lixianbushu", desc: "离线部署" },
      ],
      tabList: [
        { name: "云上展会" },
        { name: "企业营销" },
        { name: "3D商城" },
        // { name: "党政军史" },
        { name: "文博工艺" },
      ],
      mobilePhone: [
        require("@/assets/images/home/service1.png"),
        require("@/assets/images/home/service2.png"),
        require("@/assets/images/home/service3.png"),
        require("@/assets/images/home/service4.png"),
      ],
      mobilePhoneIndex: 0,
      valueList: [
        [
          {
            title: "海量展厅模板供选择",
            desc: "3D形象馆、3D展台、3D商城一应俱全",
            img: "moban",
          },
          {
            title: "自由陈列 快速布展",
            desc: "可展示文本、图片、视频、3D模型等素材",
            img: "buzan",
          },
          {
            title: "快速保存 一键发布",
            desc: "支持多次编辑、效果预览和实时渲染发布",
            img: "fabu",
          },
          {
            title: "兼容多渠道 高效裂变",
            desc: "一键链接官网、APP、微信、微博、抖音等",
            img: "liebian",
          },
          {
            title: "沉浸式体验 所见即所得",
            desc: "用户720°动态漫游，零距离与产品互动",
            img: "tiyan",
          },
        ],
      ],
      bannerList: [],
      valueIndex: 1,
      customCase: [
        {
          img: require("@/assets/images/home/case_oriental_red.jpg"),
          link:
            "http://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=5137d69b-06ad-295f-d49e-1c2a5001d61b",
        },
        {
          img: require("@/assets/images/home/case_huamei.jpg"),
          link:
            "http://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=58c9f77d-4e29-b52c-261b-1d0b7fdbd23b",
        },
        {
          img: require("@/assets/images/home/case_chaoshan.jpg"),
          link:
            "http://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=dba10d80-a672-c9f5-fa48-7f4f9ffbc07e",
        },
      ],
      customModule: [
        {
          img: require("@/assets/images/home/choose1.png"),
          link: "https://wbh-oss.jimuyida.com/#/",
          desc:
            "3D云展系统非常易于使用，已经为我们公司提供了很多技术帮助，让我们可以轻松地对接任何展会项目，使我们可以更加轻松为客户服务。",
          title: "—— 某展会代表Mike",
          num1: "50+",
          title1: "累计协助办展",
          num2: "2.76万+",
          title2: "累计参展商",
          num3: "8945万+",
          title3: "累计浏览次数",
        },
        {
          img: require("@/assets/images/home/choose2.png"),
          link:
            "https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=63cd95c986104192bc0570db175ebfe2",
          desc:
            "3D云展系统非常易于使用，已经为我们公司提供了很多技术帮助，让我们可以轻松地对接任何展会项目，使我们可以更加轻松为客户服务。",
          title: "—— 某电子商务企业代表",
          num1: "3mins",
          title1: "停留时长",
          num2: "1.7万+",
          title2: "累计展品",
          num3: "87.6%",
          title3: "转化率",
        },
        {
          img: require("@/assets/images/home/choose3.png"),
          link:
            "https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=a055ef12e61b4cd5bfde391a984aba10",
          desc:
            "3D云展让我们企业的品牌“活”起来，使得我们可以顺利转型，并持续聚合流量，深度打造数字化。",
          title: "—— 某企业代表",
          num1: "30400㎡",
          title1: "展示面积超",
          num2: "203％",
          title2: "曝光率增加",
          num3: "78%",
          title3: "获客成本降低",
        },
        {
          img: require("@/assets/images/home/choose4.png"),
          link:
            "https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=743fb2bbfc574adeba219630e916069c",
          desc:
            "喜欢3D云展既能够高度还原和保护文献文物且展示形式更新颖，介绍更全面，又能够突破时间空间限制，使得文化传播更便捷，中国文化覆盖更广阔。",
          title: "—— 某博物馆馆长",
          num1: "100+",
          title1: "累计搭建",
          num2: "5mins",
          title2: "建模最快",
          num3: "0.01mm",
          title3: "模型精度达",
        },
      ],
      serviceArr: [
        {
          img: require("@/assets/images/home/banner_server1.png"),
        },
        {
          img: require("@/assets/images/home/banner_server2.png"),
        },
        {
          img: require("@/assets/images/home/banner_server3.png"),
        },
      ],
    };
  },
  components: {
    swiperCertify,
    swiperHome,
    mobileUpdateTips
  },
  created() {
    this.$http.getBanners().then((res) => {
      this.bannerList = res;
    });
    this.$http.getTrades().then((res) => {
      this.zanhui = res[0];
      this.yingxiao = res[1];
      this.shangcheng = res[2];
      this.junshi = res[3];
      this.wenbo = res[4];
    });
  },
  mounted() {
    var me = this;
    setTimeout(() => {
      me.bgSize = "bgSize";
    }, 1000);
    me.$http.shareConfig({ url: encodeURI(location.href) }).then((res) => {
      if (res) {
        console.log(
          `${process.env.VUE_APP_pdfHost}/wxsharedefault/wxsharedefault.png`
        );
        const { appId, timestamp, noncestr, signature } = res;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId, // 必填，公众号的唯一标识
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: noncestr, // 必填，生成签名的随机串
          signature: signature, // 必填，签名，见附录1
          jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"],
        });
        let config = {
          title: "3D云展-一站式3D数字化营销服务平台",
          desc: "即刻加入-开启3D数字化2.0时代",
          imgUrl: `https://obs.3dyunzhan.com/wxsharedefault/wxsharedefault.png`,
          link: location.href,
        };
        wx.ready(function() {
          wx.onMenuShareTimeline(config);
          wx.onMenuShareAppMessage(config);
        });
      }
    });
  },
  methods: {
    // bannerImgChange(e) {
    //     this.bannerIndex = e;
    // },
    toUrl(val) {
      window.open(val);
    },

    experience(path, number) {
      this.number = number;
      //let routeData =
      this.$router.push({
        path: path,
        query: { number: this.number },
      });
      //window.open(routeData.href, "_blank");
    },

    toMore(val) {
      if (val == "定制需求") {
        // this.$store.commit("setStates", {
        //   k: "isShowCounter",
        //   v: true,
        // });
        console.log("定制需求");
        this.experience("/makeNeed", 0);
      } else if (val == "免费试用") {
        this.experience("/case", 0);
      } else if (val == "查看更多") {
        this.experience("/mobileServiced", 0);
      }
    },

    clickVideoCut() {
      this.isShowVideoCut = false;
      this.play();
    },

    bannerChangeClick(e) {
      this.$refs.bannerImg.setActiveItem(e);
    },
    play() {
      let me = this;
      let { video } = this.$refs;
      if (video.paused) {
        video.play();
        me.isPlay = true;
      } else {
        video.pause();
        me.isPlay = false;
      }
    },
    //查看更多
    moreHandle() {
      this.$router.push("/case");
    },
  },
};
</script>
<style lang="scss" scoped src="./home.scss"></style>
<style lang="scss">
.mhome {
  div.banner {
    div.el-carousel__container {
      height: 6.5rem;

      div.el-carousel__item {
        width: 100%;
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }

  div.project-service {
    div.imgbg-wrap {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      padding: 0 0.37rem;

      div.el-carousel {
        height: 100%;
        width: 100%;

        div.el-carousel__container {
          height: 100%;

          div.el-carousel__item {
            height: 100%;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
}
</style>
