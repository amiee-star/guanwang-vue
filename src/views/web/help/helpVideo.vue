<template>
  <div class="help-video">
<!--    <page-header :gradual="false"></page-header>-->
    <div class="contentBox">
      <div class="titleBox">
        <span class="span1" @click="toHelp">帮助中心</span>
        <span class="span2"> > 帮助视频</span>
      </div>
      <div class="videoContent">
        <div class="videoBox">
          <div
              @click="toOpenVideo(item)"
              class="video"
              v-for="(item, index) in videoList"
              :key="item.titlename"
          >
            <img :src="fileHost + item.coverUrl" alt="" />
            <!-- <video
              width="100%"
              height="100%"
              controls="controls"
              :poster="item.coverUrl"
            >
              <source :src="item.videoUrl" />
              你的浏览器不支持HTML5视频。
            </video> -->
            <div class="videoName">{{ item.videoName }}</div>
          </div>
        </div>
      </div>

      <el-pagination
        :page-size="pagesize"
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
<!--    <PageFooter></PageFooter>-->
  </div>
</template>
<script>
import PageHeader from "@/components/page-header/page-header.vue";
import PageFooter from "@/components/page-footer/page-footer.vue";
export default {
  components: { PageHeader, PageFooter },
  data() {
    return {
      videoList: [],
      total: 0,
      pageNum: 1,
      pagesize: 9,
      fileHost: process.env.VUE_APP_pdfHost
    };
  },
  methods: {
    toHelp() {
      this.$router.push("/help");
    },
    // 获取视频
    async getVideoList() {
      let params = {
        pageNum: this.pageNum,
        pageSize: 9,
      };
      let res = await this.$http.getVideo(params);
      this.videoList = res.list;

      this.total = res.count;
      console.log(this.videoList);
      console.log(this.total);
    },
    toOpenVideo(i) {
      let routeURL = this.$router.resolve({
        path: "/videoDetail",
        query: {
          videoId: i.id,
        },
      });
      window.open(routeURL.href, "_blank");
    },
    currentChange(i) {
      console.log(i);
      this.pageNum = i;
      this.getVideoList();
    },
  },
  mounted() {
    this.getVideoList();
  },
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
    .videoContent {
      min-height: 780px;
    }
    .videoBox {
      width: 100%;
      display: flex;

      // justify-content: flex-start;
      flex-wrap: wrap;
      .video {
        width: 400px;
        height: 230px;
        margin-right: 25px;
        margin-bottom: 32px;
        // display: flex;
        // flex-direction: column;
        // justify-content: flex-end;
        position: relative;
        cursor: pointer;
        img {
          width: 406px;
          height: 230px;
        }
        .videoName {
          height: 90px;
          width: 406px;
          position: absolute;
          left: 0;
          bottom: 0;
          color: #fff;
          z-index: 1;
          font-size: 20px;
          padding-left: 30px;
          padding-top: 40px;
          background: linear-gradient(
            180deg,
            rgba(28, 35, 46, 0) 0%,
            rgba(28, 35, 46, 0.7) 100%
          );
          opacity: 1;
          box-sizing: border-box;
        }
      }
    }
    .el-pagination {
      margin-bottom: 30px;
    }
  }
}
</style>
