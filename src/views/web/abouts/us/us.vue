<template>
  <div class="about_us">
<!--    <page-header :gradual="false"></page-header>-->
    <div class="bannerbox" @click="toFree">
      <img src="@/assets/images/about/banner.png" alt="" />
    </div>
    <div class="introduceBox base-container">
      <div class="leftContentbox">
        <div class="bgBox"></div>
        <div class="box">
          <div class="logoImg">
            <img src="@/assets/images/about/logoimg.png" alt="" />
          </div>
          <p>
            3D数字化展厅基于互联网3D展示交互技术开发，为客户提供3D立体仿真场景+动态自主漫游+商品3D展示交互+活动营销组件的整体营销工具，企业及客户无需安装任何软件或插件，仅需一个链接或者二维码，便可搭建和畅游一个互联网化的仿真营销场景，并能拟真化的体验企业产品，同时可在3D场景中参与会议、直播、服务、翻译、预约等商务及服务互动。
          </p>
          <!-- <br /> -->
          <p>
            3D云展平台，通过丰富的行业合作、高效的方案交付、顶尖的3D技术能力，为客户提供更便捷、更逼真、更易于营销管理的3D数字化解决方案，助力客户在各行各业的营销展示场景及服务领域实现突破性变革。
          </p>
          <!-- <br /> -->
          <p>
            3D云展平台属于深圳积木易搭科技技术有限公司旗下专注3D数字化营销解决方案的服务平台，积木易搭是世界领先的三维数据创造和运营服务商。公司汇集了国内外精英团队，拥有顶尖的3D技术开发团队及研发实力，获得国家高新技术企业、深圳市高新技术企业认定，累计研发投入1.8亿，专业技术人员130+人，申请各项3D专利共计60+项，软件著作权50+项。合作客户包括华为、苹果、阿里巴巴、京东、百度、中国银联、广交会组委、文博会组委等多个标杆企业和机构，共同致力于为每一家企业提供优质、高效、专业的3D数字化营销解决方案。
          </p>
        </div>
      </div>
      <div class="rightImgBox">
        <img src="@/assets/images/about/introduce.png" alt="" />
      </div>
    </div>
    <div class="programmeBox">
      <div class="tipsbox">
        <img src="@/assets/logo-w.png" alt="" />
        <p>一站式3D数字化营销解决方案</p>
      </div>
    </div>
    <div class="oursBox">
      <div class="itembox" v-for="(item, index) in oursList" :key="index">
        <div class="our-title">{{ item.title }}</div>
        <p v-for="(items, idx) in item.pics" :key="idx">{{ items }}</p>
      </div>
    </div>
    <div class="contactBox">
      <div class="contactTitle">联系我们</div>
      <div class="flexbox">
        <div class="mapbox">
          <iframe
            class="map"
            src="/static/html/jmydMap.html"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </div>
        <div class="infobox">
          <p class="vname">深圳积木易搭科技技术有限公司</p>
          <p>
            <svg-icon iconClass="tel" class="infoIcon"></svg-icon
            ><span class="tel">400-080-9959</span>
          </p>
          <p><strong></strong>
            <svg-icon iconClass="email" class="infoIcon"></svg-icon
            ><span>service@jimuyida.com</span>
          </p>
          <p>
            <svg-icon iconClass="address" class="infoIcon"></svg-icon
            ><span>地址：深圳市南山区深南大道9996号松日鼎盛大厦21D</span>
          </p>
        </div>
      </div>
    </div>
<!--    <PageFooter></PageFooter>-->
    <fixed-tool></fixed-tool>
  </div>
</template>
<script>
import logo from "@/components/logo.vue";
export default {
  name: "about_us",
  data() {
    return {
      oursList: [
        {
          title: "愿景",
          pics: ["成为全球最具价值的3D数字化", "营销服务平台"],
        },
        {
          title: "价值观",
          pics: ["至诚守信", "追求极致", "合作共赢"],
        },
        {
          title: "使命",
          pics: ["为每一家企业提供3D数字化", "营销解决方案"],
        },
      ],
    };
  },
  components: { logo },
  methods: {
    toFree() {
      this.$router.push("/self/buy/tpl");
    },
  },
};
</script>
<style lang="scss" scoped>
.about_us {
  width: 100%;
  height: 100%;
  .bannerbox {
    width: 100%;
    height: 540px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .introduceBox {
    // width: 100%;
    // padding: 90px 320px 90px 245px;
    padding: 90px 0;
    display: flex;
    justify-content: space-between;
    .leftContentbox {
      width: 641px;
      height: 620px;
      position: relative;
      .bgBox {
        position: absolute;
        top: 64px;
        left: -71px;
        width: 754px;
        height: 300px;
        background: url("~@/assets/images/about/aboutUS.png") no-repeat;
        background-size: 100% 100%;
      }
      .box {
        position: absolute;
        // z-index: 22;
      }
      .logoImg {
        width: 200px;
        height: 52px;
        margin-bottom: 21px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        font-size: 16px;
        color: #333;
        text-align: justify;
        line-height: 32px;
        margin-bottom: 30px;
      }
    }
    .rightImgBox {
      width: 442px;
      height: 497px;
      margin-left: 155px;
    }
  }
  .programmeBox {
    height: 300px;
    width: 100%;
    background: url("~@/assets/images/about/programme.png");
    position: relative;
    .tipsbox {
      position: absolute;
      top: 90px;
      right: 403px;
      width: 275px;
      height: 330px;
      // background: url("~@/assets/images/defaultthum.png") no-repeat;
      img {
        width: 275px;
        height: 70px;
      }
      p {
        font-size: 20px;
        color: #fff;
        margin-top: 20px;
      }
    }
  }
  .oursBox {
    width: 100%;
    box-sizing: border-box;
    padding: 120px 320px;
    display: flex;
    justify-content: space-between;
    .itembox {
      width: 340px;
      height: 230px;
      text-align: center;
      .our-title {
        width: 340px;
        height: 78px;
        line-height: 78px;
        font-size: 36px;
        color: #ffffff;
        background: url("~@/assets/images/about/bg.png") no-repeat;
        margin-bottom: 40px;
      }
      p {
        font-size: 24px;
        margin-bottom: 10px;
        color: #333333;
      }
    }
  }
  .contactBox {
    width: 100%;
    box-sizing: border-box;
    padding: 120px 320px;
    padding-top: 0;
    box-sizing: border-box;
    .contactTitle {
      width: 100%;
      text-align: center;
      font-size: 42px;
      color: #333333;
      margin-bottom: 68px;
    }
    .flexbox {
      height: 400px;
      margin: 0 auto;
      display: flex;
      box-shadow: 0px 5px 24px rgba(0, 0, 0, 0.1);
      .mapbox,
      .infobox {
        width: 640px;
        height: 100%;
        .map {
          width: 100%;
          height: 100%;
        }
      }
      .infobox {
        box-sizing: border-box;
        padding: 68px 40px;
        .vname {
          height: 30%;
          border-bottom: 1px solid #ddd;
          font-size: 30px;
          color: #333333;
          margin-bottom: 40px;
        }
        p {
          height: 23%;
          font-size: 18px;
          color: #333333;
          span {
            margin-left: 10px;
          }
          .tel {
            font-weight: bold;
          }
        }
      }
    }
    // .mapbox,
    // .infobox {
    //   width: 600px;
    //   height: 400px;
    // }
  }
}
</style>
