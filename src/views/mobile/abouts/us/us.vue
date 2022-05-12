<template>
  <div class="about_us">
    <pageHeader :gradual="false"></pageHeader>
    <div class="banner">
      <img src="@/assets/images/about/aboutBanner.png" class="bg" />
      <div class="content m-container">
        <div class="title">
          <!-- <span class="a-left">品牌3D化</span> <span>营销数字化</span> -->
        </div>
        <!-- <div class="desc">
          致力于为每一家企业提供3D数字化营销解决方案
        </div> -->
      </div>
    </div>
    <div class="about_box2">
      <!-- <p class="box2_title">关于3D云展</p> -->
      <!-- <div class="line"></div> -->
      <div class="titlebox">
        <img src="@/assets/images/about/logoimg.png" alt="" />
      </div>
      <div class="introduce">
        <p>
          3D数字化展厅基于互联网3D展示交互技术开发，为客户提供3D立体仿真场景+动态自主漫游+商品3D展示交互+活动营销组件的整体营销工具，企业及客户无需安装任何软件或插件，仅需一个链接或者二维码，便可搭建和畅游一个互联网化的仿真营销场景，并能拟真化的体验企业产品，同时可在3D场景中参与会议、直播、服务、翻译、预约等商务及服务互动。
        </p>
        <p>
          3D云展平台，通过丰富的行业合作、高效的方案交付、顶尖的3D技术能力，为客户提供更便捷、更逼真、更易于营销管理的3D数字化解决方案，助力客户在各行各业的营销展示场景及服务领域实现突破性变革。
        </p>
        <p>
          3D云展平台属于深圳积木易搭科技技术有限公司旗下专注3D数字化营销解决方案的服务平台，积木易搭是世界领先的三维数据创造和运营服务商。公司汇集了国内外精英团队，拥有顶尖的3D技术开发团队及研发实力，获得国家高新技术企业、深圳市高新技术企业认定，累计研发投入1.8亿，专业技术人员130+人，申请各项3D专利共计60+项，软件著作权50+项。合作客户包括华为、苹果、阿里巴巴、京东、百度、中国银联、广交会组委、文博会组委等多个标杆企业和机构，共同致力于为每一家企业提供优质、高效、专业的3D数字化营销解决方案。
        </p>
        <img src="@/assets/images/about/introduce.png" alt="" />
      </div>
      <div class="resolveBOx">
        <img src="@/assets/images/about/resolve.png" alt="" />
      </div>
      <div class="oursBox">
        <div class="logo">
          <img src="@/assets/images/about/us-logo.png" alt="">
          <p>一站式3D数字化营销解决方案</p>
        </div>
        <div class="itemBox" v-for="(item, index) in oursList" :key="index">
          <div class="title1">{{ item.title }}</div>
          <div class="text" v-for="(i, idx) in item.pics" :key="idx">
            {{ i }}
          </div>
        </div>
      </div>
      <!-- <ul>
        <li>
          <img src="@/assets/images/about/aboutus_3.png" alt="" />
          <p>3D互联网先行者</p>
          <p>3D场景化营销系统</p>
          <p>3D数字化服务平台</p>
        </li>
        <li>
          <img src="@/assets/images/about/aboutus_4.png" alt="" />
          <p>专注</p>
          <p>专业</p>
          <p>高效</p>
        </li>
        <li>
          <img src="@/assets/images/about/aboutus_5.png" alt="" />
          <p>全球顶尖三维建模技术</p>
          <p>最专业的3D营销服务</p>
          <p>全球唯一3D云端展会服务商</p>
        </li>
      </ul> -->
    </div>
    <div class="about_box6">
      <p class="box6_title">联系我们</p>
      <ul>
        <li>
          <div>
            <iframe
              class="map"
              src="/static/html/jmydMap.html"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </div>
          <div class="right">
            <p class="vname">深圳积木易搭科技技术有限公司</p>
            <p>
              <svg-icon iconClass="tel" class="infoIcon"></svg-icon
              ><span class="tel"
                ><a href="tel:400-080-9959">400-080-9959</a></span
              >
            </p>
            <p>
              <svg-icon iconClass="email" class="infoIcon"></svg-icon
              ><span>service@jimuyida.com</span>
            </p>
            <p>
              <svg-icon iconClass="address" class="infoIcon"></svg-icon
              >深圳市南山区深南大道9996号松日鼎盛大厦21D
            </p>
          </div>
        </li>
      </ul>
      <div class="bottomBox">
        <div class="contactUs mAuto">
          联系我们
        </div>
        <div class="telUs mAuto">
          <div class="left">
            <p>电话</p>
            <p>400-080-9959</p>
          </div>
          <a href="tel:400-080-9959" class="right">
            <img src="@/assets/images/about/tel.png" alt="" />
          </a>
        </div>
        <div class="emailbox mAuto">
          <p>邮箱</p>
          <p>service@jimuyida.com</p>
        </div>
        <div class="addressbox mAuto">
          <p>地址</p>
          <p>深圳市南山区深南大道9996号松日鼎盛大厦21D</p>
        </div>
      </div>
    </div>

<!--    <pageFooter></pageFooter>-->
  </div>
</template>
<script>
import pageHeader from "mobile/components/page-header/page-header.vue";
import pageFooter from "mobile/components/page-footer/page-footer.vue";
export default {
  components: { pageHeader, pageFooter },
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
  methods: {},
};
</script>
<style lang="scss" scoped src="./us.scss"></style>
