<template>
  <div class="center">
    <div class="head">
      <img src="@/assets/images/solve/head.png" alt="" />
    </div>
    <div class="body">
      <div class="body-head">
        <div class="body-title">全面整合云端资源 极速构建展会新模式</div>
        <div class="body-banner1">
          <img src="@/assets/images/solve/banner1.png" alt="" />
        </div>
        <div class="box1">
          <div class="box1-img1">
            <img src="@/assets/images/solve/box1-img1.png" alt="" />
          </div>
          <div class="box1-img2">
            <img src="@/assets/images/solve/box1-img2.png" alt="" />
          </div>
          <div class="box1-title">
            <ul>
              <li>
                积木易搭3D布展系统，快速实现上千家展商同时搭建云上展台；
              </li>
              <br />
              <li>
                积木易搭3D导览系统，安全稳定运行，并将会展中心立体呈现在云上，让观众在云端身临其境观展；
              </li>
              <br />
              <li>
                3D云展标准开放接口，让主办方及参展方对会场管理和参展数据一目了然。
              </li>
            </ul>
          </div>
          <div class="box1-button">
            <a href="http://www.cnicif.com/#/">了解更多</a>
          </div>
        </div>
        <div class="body-banner2">
          <img src="@/assets/images/solve/banner2.png" alt="" />
        </div>
        <div class="box2">
          <div class="box2-img1">
            <img src="@/assets/images/solve/box2-img1.png" alt="" />
          </div>
          <div class="box2-title" v-if="1">
            <ul>
              <li>
                积木易搭3D云展系统与智造重镇的结合，围绕大数据智能化主线，聚焦工业互联网、智能化改造、智能产品等领域。
              </li>
              <br />
              <li>
                3D导览系统集合场景应用、互动体验、新技术发展等功能全方位展示
                “智造重镇”立体化发展趋势。
              </li>
            </ul>
          </div>
          <div class="box2-title" v-else="0">
            {{ box2Title2 }}
          </div>
          <div class="box2-button">
            <a
              href="https://obs.3dshichuang.com/scene-portal/a4b44c12-4ea6-8f48-3d15-a0bf644595b1.html"
              >了解更多</a
            >
          </div>
        </div>
      </div>
      <div class="body-foot">
        <div class="title">
          3D云端展厅+3D立体展品 让观众沉浸式观展与展品零距离交互
        </div>
        <div class="foot1-1">
          <img src="@/assets/images/solve/foot1-1.png" alt="" />
        </div>
        <div class="foot1-2">
          <img src="@/assets/images/solve/foot1-2.png" alt="" />
          <div class="title">
            积木易搭3D云展系统助力高交会70余家企业产品入选官方颁奖展厅，从智能家居到潮酷生活，从人工智能到生态环保，通过3D模型的展现形式，云集在3D云端展厅。
          </div>
          <div class="button">
            <a
              href="https://oss.3dshichuang.com/scene-portal/f3697a40-a0de-a283-dfe1-ec68bbfd7c58.html"
              >了解更多</a
            >
          </div>
        </div>
        <div class="foot2-1">
          <img src="@/assets/images/solve/foot2-1.png" alt="" />
          <div class="title">
            积木易搭3D云展系统以7x24小时全天候跨区域云端立体展示优势，助力农博会“4+365”（线上开展4天，运营365天）不落幕。
            11个国家的40余家企业和国内16个省市的700余家企业，组成5大板块32个展馆汇聚“云端”，在线推介各地农产品及技术，进行全球跨境产销对接。
          </div>
          <div class="button">
            <a href="https://vr.siaexpo.net.cn/agriculture/index.html"
              >了解更多</a
            >
          </div>
        </div>
        <div class="foot2-2">
          <img src="@/assets/images/solve/foot2-2.png" alt="" />
        </div>
        <div class="foot3-1">
          <img src="@/assets/images/solve/foot3-1.png" alt="" />
        </div>
        <div class="foot3-2">
          <img src="@/assets/images/solve/foot3-2.png" alt="" />
          <div class="title">
            积木易搭3D云展系统助力近百家中东欧企业入驻云上展馆，11位中东欧使节参与云端远程推介，超150万名观众云端参与。
            通过3D场景+3D实物交互的系统能力满足消费临场感+商品所见即所得的需求，助力品牌营销多样化，消费热点聚焦化。
          </div>
          <div class="button">
            <a href="http://zd.jimuyida.com/#/">了解更多</a>
          </div>
        </div>
        <div class="foot4-1">
          <img src="@/assets/images/solve/foot4-1.png" alt="" />
          <div class="title">
            线上农高会通过云管理、云直播、云交易、云展览、云会议、云洽谈六大板块，以脱贫攻坚为主线，集合国家农业展、国际种业展、智慧农业技术集成展、乡村振兴暨脱贫攻坚展、创意农业展、品牌农业展、农业机械展等41个专题展。
            52个参展国家和地区、6800家企业云端参展、150万参会人次、促成5+亿云上交易额及1103亿签约投资。
          </div>
          <div class="button">
            <a
              href="https://nghevent.digitalexpo.com/427a3cc129c81236d20a632393e20aa1?exhibitionId=1&X-Access-Lang=zh-cn&channelId=0&origin=0"
              >了解更多</a
            >
          </div>
        </div>
        <div class="foot4-2">
          <img src="@/assets/images/solve/foot4-2.png" alt="" />
        </div>
        <div class="foot5-1">
          <img src="@/assets/images/solve/foot5-1.png" alt="" />
        </div>
        <div class="foot5-2">
          <img src="@/assets/images/solve/foot5-2.png" alt="" />
          <div class="title">
            本届人博会依托3D云展系统+大数据平台，多维度展示企事业用人单位需求、人才需求、人才政策等数据分析，以3D云端展馆形式进行全方位立体展示，全程数字化为供求双方提供精准职位匹配、远程面试等服务
            实现线上平台注册人数29401人，线上平台浏览量累计达944.82万人次，求职人才投递简历数累计达124743人次。
          </div>
          <div class="button">
            <a
              href="https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=84a3c2dc-e887-a83c-bbe3-e370198a5565"
              >了解更多</a
            >
          </div>
        </div>
        <div class="foot6-1">
          <img src="@/assets/images/solve/foot6-1.png" alt="" />
          <div class="title">
            积木易搭作为首届云上展会唯一指定的3D云展技术服务商，为本届广交会在云端展示企业品牌形象及新品发布创造互利共赢的新商机服务。
            16个品类、50个展区实现3D云端VR展位，从而获得线上品牌及商品立体化曝光，提升运营转化效率。
          </div>
          <div class="button">
            <a href="https://obs.3dyunzhan.com/static/gjh/index.html"
              >了解更多</a
            >
          </div>
        </div>
        <div class="foot6-2">
          <img src="@/assets/images/solve/foot6-2.png" alt="" />
        </div>
      </div>
    </div>
    <div class="foot">
      <img src="@/assets/images/solve/foot.png" alt="" />
    </div>
  </div>
</template>

<script>
//import logo from "@/components/logo.vue";
//import accountUi from "@/components/account/account-ui";
export default {
  data() {
    return {
      box2Title2: `
      <ul>
        
      </ul>`,
    };
  },
  mounted() {},
  components: {},
};
</script>

<style lang="scss" scoped src="./solve.scss"></style>
