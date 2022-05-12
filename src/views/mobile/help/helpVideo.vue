<template>
  <div class="help-video">
    <page-header :gradual="false"></page-header>
    <div class="contentBox">
      <div class="titleBox">
        <span class="span1" @click="toHelp">帮助中心</span>
        <span class="span2"> > 帮助视频</span>
      </div>
      <div class="videoBox">
        <div
          class="video"
          v-for="(item, index) in videoList"
          :key="item.titlename"
        >
          <div class="videoName">{{ item.titlename }}</div>
        </div>
      </div>
    </div>
    <PageFooter></PageFooter>
  </div>
</template>
<script>
import PageHeader from "@/components/page-header/page-header.vue";
import PageFooter from "@/components/page-footer/page-footer.vue";
export default {
  components: { PageHeader, PageFooter },
  data() {
    return {
      videoList: [
        {
          titlename: "视频名称1",
        },
        {
          titlename: "视频名称2",
        },
        {
          titlename: "视频名称3",
        },
        {
          titlename: "视频名称4",
        },
        {
          titlename: "视频名称5",
        },
        {
          titlename: "视频名称6",
        },
        {
          titlename: "视频名称7",
        },
        {
          titlename: "视频名称8",
        },
        {
          titlename: "视频名称9",
        },
      ],
    };
  },
  methods: {
    toHelp() {
      this.$router.push("/help");
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.help-video {
  width: 100%;
  height: 100%;
  .contentBox {
    width: 1280px;
    margin: 0 auto;
    .titleBox {
      font-size: 14px;
      height: 64px;
      line-height: 64px;
      .span1 {
        color: #333;
        cursor: pointer;
      }
      .span2 {
        color: #999;
      }
    }
    .videoBox {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .video {
        width: 406px;
        height: 230px;
        border: 1px solid red;
        margin-bottom: 32px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        .videoName {
          height: 40px;
          font-size: 20px;
          padding-left: 30px;
        }
      }
    }
  }
}
</style>
