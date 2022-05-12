<template>
  <div class="swiper-grid">
    <swiper :options="swiperOption">
      <swiper-slide
        v-for="(item, index) in arr"
        :key="index"
        @click.native="skipTo(item)"
      >
        <div class="box">
          <div class="img">
            <img :src="item.img" alt="" />
            <div class="desc">{{ item.desc }}</div>
            <div class="title">{{ item.title }}</div>
            <div class="nums">
              <div class="chid">
                <div class="num">{{ item.num1 }}</div>
                <div class="miaoshu">{{ item.title1 }}</div>
              </div>
              <div class="chid">
                <div class="num">{{ item.num2 }}</div>
                <div class="miaoshu">{{ item.title2 }}</div>
              </div>
              <div class="chid">
                <div class="num">{{ item.num3 }}</div>
                <div class="miaoshu">{{ item.title3 }}</div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
export default {
  name: "swiper-grid",
  props: {
    arr: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: "auto",
      },
    };
  },
  methods: {
    skipTo(item) {
      if (item.link) {
        window.open(item.link, "__blank");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.swiper-grid {
  width: 100%;
  // position: relative;
  // left: 50%;
  // transform: translateX(-50%);
  padding: 0 !important;
  .swiper-container {
    height: 100%;
    padding: .3rem 0;
    .swiper-slide {
      width: 335px;
      height: 370px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      background: #ffffff;
      // box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
      &:last-child {
        .box {
          margin-right: 0;
        }
      }
    }
  }
  div.box {
    padding-top: 30px;
    width: 310px;
    height: 370px;
    margin-right: 0.36rem;
    background: #fff;
    box-shadow: 0px 0.06rem 0.24rem 0px rgba(0, 0, 0, 0.1);
    position: relative;

    border-radius: 0.18rem;
    div.img {
      width: 100%;
      border-radius: 0.14rem;
      padding: 0 34px;
      position: relative;
      img {
        width: 150px;
        height: 120px;
        object-fit: cover;
        border-radius: 0.14rem;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
      .desc {
        width: 100%;
        text-align: center;
        margin-top: 24px;
      }
      .title {
        width: 100%;
        text-align: center;
        margin-top: 18px;
      }
      .nums {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 14px;
        .chid {
          text-align: center;
          .num {
            font-size: 16px;
            font-family: SourceHanSansCN-Bold;
            color: #2c2c2c;
          }
          .miaoshu {
            font-size: 12px;
            font-family: SourceHanSansCN-Regular;
            color: #888888;
          }
        }
      }
    }
    div.content {
      padding: 0.35rem 0.33rem;
      div.name {
        color: #333333;
        font-size: 0.32rem;
      }
      p {
        color: #999999;
        font-size: 0.26rem;
        margin-top: 0.28rem;
      }
      div.link {
        position: absolute;
        left: 0;
        bottom: 0.7rem;
        width: 100%;
        padding: 0 0.33rem;
        color: #23b8ff;
        font-size: 0.26rem;
        cursor: pointer;
        span {
          margin-left: 0.1rem;
        }
      }
    }
  }
}
</style>
