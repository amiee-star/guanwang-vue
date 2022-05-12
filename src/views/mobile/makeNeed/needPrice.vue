<template>
  <div id="needPriceBox">
    <page-header></page-header>
    <div class="price">
      <p class="desc">30分钟内将有专属顾问与您联系</p>
      <h3>您的定制展厅预算</h3>
      <div class="money">
        约： <span>{{ scenePrice }}</span> 万元
      </div>
      <p class="tip">
        * 该价格仅供参考，请以实际报价为准
      </p>
      <p class="codeTitle">
        3D云展企业微信顾问
      </p>
      <div class="code">
        <!-- <img
          src="@/assets/images/home/gzhs.png"
          style="width:198px,height: 198px;"
        /> -->
      </div>

      <p class="descWX">添加微信了解详细定制服务流程<br />及更多定制案例</p>
    </div>
  </div>
</template>

<script>
import pageHeader from "mobile/components/page-header/page-header.vue";
export default {
  data() {
    return {
      scenePrice: this.$route.query.price,
    };
  },
  components: {
    pageHeader,
  },
  mounted() {
    console.log(this.$route.query.price);
  },
};
</script>

<style lang="scss" scoped>
#needPriceBox {
  .price {
    height: 208px;
    background: url("../../../assets/images/counter/price_bg.png") #fff
      no-repeat center center;
    text-align: center;
    padding-top: 45.5px;
    font-family: "Source Han Sans CN";
    margin-bottom: 106px;
    position: relative;
    .desc {
      font-size: 12px;
      line-height: 12x;
      font-weight: 400;
      color: #000000;
      margin-bottom: 14px;
    }
    h3 {
      font-size: 23px;
      line-height: 23px;
      font-weight: 400;
      color: #000000;
      margin-bottom: 20px;
    }
    .money {
      color: #000000;
      font-size: 16px;
      margin-bottom: 9.5px;
      span {
        color: #ec712e;
        font-size: 45px;
        line-height: 45px;
      }
    }
    .tip {
      color: #999999;
      font-size: 12px;
    }
    .codeTitle {
      margin-top: 34px;
      margin-bottom: 10px;
      color: #000000;
      font-size: 16px;
    }
    .code {
      width: 197.5px;
      height: 197.5px;
      background: url("../../../assets/images/home/gzhs.png") #fff no-repeat
        center center;
      background-size: 197.5px 197.5px;
      margin: 0 auto;
    }
    .descWX {
      color: #999999;
      font-size: 12px;
      margin-top: 7px;
    }
  }
}
</style>
