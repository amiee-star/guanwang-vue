<template>
  <!-- 帮助中心页面 -->
  <div class="help-page">
    <page-header :gradual="false"></page-header>
    <div class="help-page-banner">
      <div class="help-banner-content"></div>
      <div class="help-title">欢迎来到3D云展帮助中心</div>
      <div class="help-search-input">
        <el-input placeholder="请输入关键词" v-model="searchInput">
          <el-button
            slot="append"
            icon="el-icon-search"
            class="search-btn"
          ></el-button>
        </el-input>
      </div>
    </div>
    <!-- 帮助视频 -->
    <div class="help-video">
      <template>
        <div class="help-video-title">
          <div class="title">帮助视频</div>
          <div class="look-more help-video-more" @click="toHelpVideo">
            查看更多
            <img src="@/assets/images/help/lookMore.png" />
          </div>
        </div>
        <div class="video-list">
          <div class="videoBox" v-for="(item, index) in videoList" :key="index">
            <div class="vname">{{ item.vname }}</div>
          </div>
        </div>
      </template>
    </div>
    <!-- 帮助文档 -->
    <div class="help-file">
      <template>
        <div class="help-file-title">
          <div class="title">帮助文档</div>
          <div class="look-more" @click="toFile">
            查看更多
            <img src="@/assets/images/help/lookMoreGray.png" alt="" />
          </div>
        </div>
        <div class="help-file-content">
          <div
            class="file-content-box"
            v-for="(item, index) in fileCotentList"
            :key="item.text"
            @click="handleClick(item, index)"
            :class="[fileActive === index ? 'activeBox' : '']"
          >
            <img :src="item.imgSrc" alt="" />
            <div class="text">{{ item.text }}</div>
          </div>
        </div>
      </template>
    </div>
    <!-- 常见问题 -->
    <div class="common-problem">
      <div class="problem-title">
        <div class="title">常见问题</div>
        <div class="look-more" @click="toProblem">
          查看更多
          <img src="@/assets/images/help/lookMoreGray.png" alt="" />
        </div>
      </div>
      <div class="problem-list">
        <div
          class="problem-item"
          v-for="(item, index) in problemList"
          :key="index"
        >
          <div class="problem-list-title">
            <div class="left">
              <img
                v-if="!item.active"
                src="../../../assets/images/help/problem.png"
                alt=""
              />
              <img
                v-else
                src="../../../assets/images/help/problemActive.png"
                alt=""
              />
              <span>{{ item.title }}</span>
            </div>
            <div
              class="right"
              @click="openProblem(item, index)"
              v-if="!item.active"
            ></div>
            <div class="rightClose" @click="closeProblem(item, index)" v-else>
              x
            </div>
          </div>
          <pre class="problem-content" v-if="item.active">{{ item.content }}</pre>
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
  data() {
    return {
      searchInput: "",
      fileCotentList: [
        {
          imgSrc: require("../../../assets/images/help/account.png"),
          text: "账号",
        },
        {
          imgSrc: require("../../../assets/images/help/account.png"),
          text: "素材管理",
        },
        {
          imgSrc: require("../../../assets/images/help/account.png"),
          text: "布展",
        },
        {
          imgSrc: require("../../../assets/images/help/account.png"),
          text: "逛展",
        },
        {
          imgSrc: require("../../../assets/images/help/account.png"),
          text: "分享",
        },
        {
          imgSrc: require("../../../assets/images/help/account.png"),
          text: "模型",
        },
      ],
      fileActive: "",
      problemList: [
        {
          title: "woshi一个问题我是一个问题",
          content: "fksdjgfjdkgj考试机构答复进口国际快递反馈了科技股份看的更加",
        },
        {
          title: "woshi一个问题我是一个问题",
          content: "fksdjgfjdkgj考试机构答复进口国际快递反馈了科技股份看的更加",
        },
        {
          title: "woshi一个问题我是一个问题",
          content: "fksdjgfjdkgj考试机构答复进口国际快递反馈了科技股份看的更加",
        },
        {
          title: "woshi一个问题我是一个问题",
          content: "fksdjgfjdkgj考试机构答复进口国际快递反馈了科技股份看的更加",
        },
        {
          title: "woshi一个问题我是一个问题",
          content: "fksdjgfjdkgj考试机构答复进口国际快递反馈了科技股份看的更加",
        },
        {
          title: "woshi一个问题我是一个问题",
          content: "fksdjgfjdkgj考试机构答复进口国际快递反馈了科技股份看的更加",
        },
      ],
      videoList: [
        {
          vsrc: "",
          vname: "视频名称1",
        },
        {
          vsrc: "",
          vname: "视频名称2",
        },
        {
          vsrc: "",
          vname: "视频名称3",
        },
      ],
    };
  },
  components: {
    PageHeader,
    PageFooter,
  },
  methods: {
    handleClick(item, index) {
      console.log(item, "===", index);
      this.fileActive = index;
    },
    openProblem(item, index) {
      // console.log(item, index);
      this.$set(item, "active", true);
      console.log(item);
    },
    closeProblem(item) {
      item.active = false;
    },
    toHelpVideo() {
      this.$router.push("/helpVideo");
    },
    toProblem() {
      this.$router.push("/helpProblem");
    },
    toFile() {
      this.$router.push("/helpFile");
    },
  },
};
</script>

<style lang="scss" scoped>
.help-page {
  width: 100%;
  height: 100%;
  .help-page-banner {
    width: 100%;
    height: 400px;
    background-image: url("../../../assets/images/help/helpBanner.png");
    .help-title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 42px;
      color: #ffffff;
      padding-top: 116px;
    }
    .help-search-input {
      width: 800px;
      margin: 0 auto;
      margin-top: 36px;
      .search-btn {
        background-color: #19a0f1;
        color: #ffffff;
        width: 120px;
        height: 100%;
      }
    }
  }
  // 帮助视频
  .help-video {
    height: 497px;
    width: 1280px;
    padding: 90px 0;
    margin: 0 auto;
    .help-video-title {
      display: flex;
      justify-content: space-between;
      height: 42px;
      line-height: 42px;
      margin-bottom: 45px;

      .help-video-more {
        color: #19a0f1;
      }
    }
    .video-list {
      width: 1280px;
      height: 230px;
      margin-top: 45px;
      display: flex;
      justify-content: space-between;
      .videoBox {
        width: 406px;
        height: 230px;
        border: 1px solid salmon;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        .vname {
          color: #333;
          font-size: 20px;
          margin-left: 30px;
          margin-bottom: 26px;
        }
      }
    }
  }
  // 帮助文档
  .help-file {
    width: 1280px;
    height: 834px;
    margin: 0 auto;
    .help-file-title {
      width: 100%;
      height: 42px;
      padding-top: 102px;
      margin-bottom: 48px;
      line-height: 42px;
      display: flex;
      justify-content: space-between;
      text-align: center;
    }
    .help-file-content {
      height: 552px;
      width: 100%;
      margin-top: 48px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .file-content-box {
        width: 405px;
        height: 260px;
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 1;
        img {
          width: 62px;
          height: 62px;
        }
        .text {
          font-size: 24px;
          color: #333;
          margin-top: 43px;
        }
      }
      .activeBox {
        box-shadow: 0px 8px 14px rgba(0, 0, 0, 0.1);
        opacity: 1;
      }
    }
  }
  // 常见问题
  .common-problem {
    width: 1280px;
    margin: 0 auto;
    .problem-title {
      width: 100%;
      height: 42px;
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      padding-bottom: 44px;
      line-height: 42px;
    }
    .problem-list {
      width: 100%;
      margin-top: 40px;
      padding-bottom: 117px;
      .problem-item {
        width: 100%;
        margin-bottom: 50px;
        .problem-list-title {
          width: 100%;
          height: 30px;
          line-height: 30px;
          display: flex;
          justify-content: space-between;
          .left {
            img {
              width: 24px;
              height: 24px;
              margin-right: 10px;
              vertical-align: top;
            }
            span {
              font-size: 16px;
              color: #333;
            }
          }
          .rightClose {
            color: #bbb;
            font-size: 24px;
            cursor: pointer;
          }
          .right {
            width: 16px;
            height: 16px;
            cursor: pointer;
            background: url("../../../assets/images/help/open.png");
          }
          .right:hover {
            background: url("../../../assets/images/help/openActive.png");
          }
        }
        .problem-content {
          box-sizing: border-box;
          padding: 48px 40px;
          line-height: 22px;
          white-space: pre-wrap;
          font-family: "Source Han Sans CN";
          color: #333;
        }
      }
    }
  }
  .title {
    color: #333;
    font-size: 42px;
  }
  .look-more {
    font-size: 16px;
    color: #999;
    cursor: pointer;
    img {
      width: 18px;
      height: 18px;
      margin-left: 5px;
      vertical-align: middle;
    }
  }
}
</style>
