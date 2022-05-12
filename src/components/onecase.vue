@@ -0,0 +1,146 @@
/*不知道啊*/ 
<template>
  <div>
    <div class="boss">
      <div class="onecase" @mouseenter="Mouseenter()" @mouseleave="mouseleave()" :style="active">
        <img src="../../../src/assets/images/case/beer.jpg" alt class="backimg" />
        <div class="nameimg" v-show="imgshow">
          <div>
            <img src="../../../src/assets/images/case/superMarket.jpg" alt class="headimg" />
          </div>
          <p class="imgword">3d云展</p>
        </div>
        <div class="twocode" v-show="isshow">
          <img src="../../assets/images/jmydgzh.jpg" alt />
        </div>
      </div>
      <div class="bottom">
        <span class="bottomtitle">永远的东方红</span>
        <img class="eye" src="../../../src/assets/images/case/liulan.png" alt />
        <span style="color:#9B9D9F">2</span>
        <img @click="heart" class="heart" src="../../../src/assets/images/case/heart.png" alt />
        <span style="color:#9B9D9F">{{num}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isshow: false,
      imgshow: true,
      num: 0
    };
  },
  methods: {
    Mouseenter() {
      this.isshow = true;
      this.imgshow = false;
    },
    mouseleave() {
      this.isshow = false;
      this.imgshow = true;
    },
    heart() {
      this.num++;
    }
  }
};
</script>

<style lang="scss" scoped>
// img  宽370px  高232px 二维码130 130， 字体大小15px
* {
  padding: 0;
  margin: 0;
}
.boss {
  width: 370px;
  height: 276px;

  margin-left: 600px;
  .onecase {
    position: relative;
    width: 370px;
    height: 232px;
    text-align: center;
    .backimg {
      width: 370px;
      height: 232px;
    }
    .nameimg {
      background-color: black;
      position: absolute;
      top: 10px;
      left: 10px;
      height: 26px;
      width: 200px;
      opacity: 0.7;
      border-radius: 13px;
      .headimg {
        height: 26px;
        width: 26px;
        border-radius: 50%;
        float: left;
      }
      .imgword {
        height: 26px;
        max-width: 500px;
        line-height: 26px;
        font-size: 16px;
        color: white;
        float: left;
        margin-left: 10px;
      }
    }
    .twocode {
      // display: block;
      background-color: black;
      opacity: 0.6;
      width: 370px;
      height: 232px;
      position: absolute;
      top: 0;
      left: 0;
      //   display: none;
      img {
        width: 130px;
        height: 130px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
  }
  .bottom {
    height: 44px;
    width: 370px;
    background-color: gainsboro;

    line-height: 44px;
    .bottomtitle {
      margin-left: 13px;
      width: 50px;
      color: #333333;
      font-size: 13px;
      //   overflow: hidden;
      //   text-overflow: ellipsis;
      //   white-space: nowrap;
    }
    .eye {
      margin-left: 160px;
      padding-right: 8px;
    }
    .heart {
      margin-left: 25px;
      padding-right: 8px;
      font-weight: 800;
    }
  }
}
</style>