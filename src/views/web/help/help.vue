<template>
  <!-- 帮助中心页面 -->
  <div class="help-page">
<!--    <page-header :gradual="false"></page-header>-->
    <div class="help-page-banner">
      <div class="help-banner-content"></div>
      <div class="help-title">欢迎来到3D云展帮助中心</div>
      <div class="help-search-input">
        <el-input
          placeholder="请输入关键词"
          v-model="searchInput"
          :maxlength="maxlength"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            class="search-btn"
            @click="toSearch"
            >搜 索</el-button
          >
        </el-input>
        <!-- <div class="hotWord">
          <span class="hotTitle">热搜词:</span>
          <span
            v-for="(item, index) in hotKeyWords"
            :key="index"
            @click="searchHotWord(item)"
            >{{ item }}</span
          >
        </div> -->
      </div>
    </div>

    <div v-if="!isSearch">
      <!-- 帮助视频 -->
      <div class="help-video">
        <template>
          <div class="help-video-title">
            <div class="title">帮助视频</div>
            <div class="look-more " @click="toHelpVideo">
              查看更多
              <div class="lookIcon"></div>
            </div>
          </div>
          <div class="video-list">
            <div
              @click="toOpenVideo(item)"
              class="videoBox"
              v-for="(item, index) in videoList"
              :key="index"
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
              <div class="vname">{{ item.videoName }}</div>
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
              <div class="lookIcon"></div>
            </div>
          </div>
          <div class="help-file-content">
            <div
              class="file-content-box"
              v-for="(item, index) in fileCotentList"
              :key="item.text"
              @click="handleClick(item, index)"
            >
              <img :src="item.categoryUrl" alt="" />
              <div class="text">{{ item.categoryName }}</div>
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
            <div class="lookIcon"></div>
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
                <span>{{ item.issueName }}</span>
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
            <pre class="problem-content" v-if="item.active">{{
              item.answer
            }}</pre>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="searchBox">
      <div class="contentBox">
        <div class="totalTips">
          <span class="from" @click="toHelp">帮助中心</span>
          >
          <span class="searchWord"> "{{ searchInput }}"</span>
          的搜索结果共{{ searchCount }}条
        </div>
        <div v-if="!searchNull">
          <div
            @click="toFileDetail(item)"
            class="searchBox2"
            v-for="(item, index) in searchList"
            :key="index"
          >
            <div class="titlename">{{ item.categoryName }}</div>
            <div class="origin">
              来源:
              <span class="helpIndex" @click="toHelp" style=" cursor: pointer;">
                帮助中心
              </span>
              >{{ item.categoryName }}>{{ item.titleName }}
            </div>
            <div
              style="display: none"
              class="content"
              v-html="item.titleContent"
            ></div>
            <p class="twoLine">{{ item.innertext }}</p>
          </div>
        </div>
        <div v-else class="SearchNull">
          <div class="nullBox">
            <div class="tipImg">
              <img src="@/assets/images/help/searchNull.png" alt="" />
            </div>
            <div class="tipText">抱歉,没有找到相关的信息</div>
          </div>
        </div>
      </div>
    </div>
<!--    <PageFooter></PageFooter>-->
    <fixed-tool></fixed-tool>
  </div>
</template>

<script>
import PageHeader from "@/components/page-header/page-header.vue";
import PageFooter from "@/components/page-footer/page-footer.vue";
export default {
  data() {
    return {
      searchInput: "",
      fileCotentList: [],
      fileActive: "",
      problemList: [],
      videoList: [],
      hotKeyWords: ["账号", "素材管理", "布展", "逛展", "分享", "模型"],
      isSearch: false,
      searchList: [],
      searchNull: false,
      searchCount: 0,
      maxlength: 10,
      fileHost: process.env.VUE_APP_pdfHost
    };
  },
  components: {
    PageHeader,
    PageFooter,
  },
  methods: {
    // 获取视频
    async getVideoList() {
      let params = {
        pageNum: 1,
        pageSize: 3,
      };
      let res = await this.$http.getVideo(params);
      this.videoList = res.list;
    },
    // 获取文档分类
    async getFile() {
      let res = await this.$http.getFile({
        pageSize: 6,
        pageNum: 1,
      });

      this.fileCotentList = res.list;
    },
    // 获取常见问题
    async getProblem() {
      let problemParams = {
        pageNum: 1,
        pageSize: 6,
      };
      let problemRes = await this.$http.getProblem(problemParams);
      this.problemList = problemRes.list;
    },
    handleClick(item, index) {
      this.fileActive = index;
      this.$router.push({
        path: "/helpFile",
        query: {
          fileId: item.id,
        },
      });
    },
    openProblem(item, index) {
      // console.log(item, index);
      this.$set(item, "active", true);
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
    // searchHotWord(i) {
    //   console.log(i);
    //   this.searchInput = i;
    // },
    // 搜索
    toSearch() {
      if (this.searchInput.trim()) {
        let searchParams = {
          pageNum: 1,
          pageSize: 1000,
          titleName: "",
          keyword: this.searchInput.trim(),
        };
        this.$http.searchInfo(searchParams).then((res) => {
          if (res.code === 200 || res.count !== 0) {
            let list = (this.searchList = res.list);
            this.searchCount = res.count;
            this.searchNull = false;

            this.$nextTick(() => {
              list.forEach((item, index) => {
                let text = document.getElementsByClassName("content")[index]
                  .innerText;
                this.$set(item, "innertext", text);
              });
              this.list = list;
            });
          } else {
            this.searchNull = true;
            this.searchCount = 0;
            this.$message("抱歉,没有找到相关信息");
          }
        });
        this.isSearch = true;
      }
    },
    toHelp() {
      this.isSearch = false;
      this.searchInput = "";
    },
    toOpenVideo(i) {
      console.log(i);

      let routeUrl = this.$router.resolve({
        path: "/videoDetail",
        query: {
          videoId: i.id,
        },
      });
      window.open(routeUrl.href, "_blank");
    },
    // 跳转文档详情
    toFileDetail(i) {
      console.log(i);
      this.$router.push({
        path: "/helpFile",
        query: {
          childId: i.id,
        },
      });

      // let
    },
  },
  mounted() {
    this.getVideoList();
    this.getFile();
    this.getProblem();
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
    background-image: url("~@/assets/images/help/helpBanner.png");
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
      height: 52px;
      margin: 0 auto;
      margin-top: 36px;

      // /deep/ .el-input__inner {
      //   width: 100%;
      //   height: 100% !important;
      // }

      ::v-deep .el-input-group__append {
        width: 120px;
        background-color: #19a0f1;
        color: #ffffff;
        height: 40px;
        border: none;
        .search-btn {
          width: 100%;
          margin: 0;
          padding: 0;
          text-align: center;
          line-height: 40px;
        }
      }
    }
  }
  // 热搜词
  .hotWord {
    width: 800px;
    height: 36px;
    box-sizing: border-box;
    padding: 0 150px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: #ffffff;
    margin-top: 15px;
    span {
      cursor: pointer;
    }
  }
  .searchBox {
    width: 100%;
    background-color: #f4f5f9;
    padding-bottom: 20px;
    // padding: 0 320px;
    box-sizing: border-box;
    .contentBox {
      width: 1280px;
      margin: 0 auto;
      .totalTips {
        font-size: 14px;
        color: #999999;
        // margin: 24px 0;
        height: 50px;
        line-height: 50px;
        .from {
          color: #333333;
          cursor: pointer;
        }
        .searchWord {
          color: #fe5a60;
        }
      }
      .searchBox2 {
        width: 1280px;
        background: #ffffff;

        // margin-bottom: 20px;
        box-sizing: border-box;
        margin-bottom: 20px;
        padding: 42px 50px 42px 48px;
        cursor: pointer;
        .titlename {
          font-size: 24px;
          color: #333333;
          line-height: 42px;
        }
        .titlename:hover {
          color: #19a0f1;
        }
        .origin {
          font-size: 14px;
          color: #888888;
          line-height: 25px;
          margin-top: 20px;
          margin-bottom: 32px;
          .helpIndex {
            cursor: pointer;
          }
        }
        .content1 {
          font-size: 16px;
          color: #333333;
          line-height: 28px;
        }
      }
      .searchBox2:hover {
        box-shadow: 0px 8px 14px rgba(0, 0, 0, 0.1);
      }
      .SearchNull {
        width: 100%;
        height: 620px;
        background: #f4f5f9;
        opacity: 1;
      }
      .nullBox {
        width: 1280px;
        height: 500px;
        background: #fff;
        opacity: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .tipImg {
          margin-bottom: 32px;
          img {
            width: 275px;
          }
        }
        .tipText {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          line-height: 24px;
          color: #999999;
        }
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

      // .help-video-more {
      //   color: #19a0f1;
      // }
    }
    .video-list {
      width: 1280px;
      height: 230px;
      margin-top: 45px;
      display: flex;
      // justify-content: space-between;
      .videoBox {
        width: 406px;
        height: 230px;
        margin-right: 30px;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        position: relative;
        img {
          width: 406px;
          height: 230px;
        }
        .vname {
          position: absolute;
          left: 0%;
          bottom: 0;
          color: #fff;
          z-index: 1;
          font-size: 20px;
          padding-left: 30px;
          width: 406px;
          height: 90px;
          box-sizing: border-box;
          padding-top: 40px;
          background: linear-gradient(
            180deg,
            rgba(28, 35, 46, 0) 0%,
            rgba(28, 35, 46, 0.7) 100%
          );
          opacity: 1;
        }
      }
    }
  }
  // 帮助文档
  .help-file {
    width: 100%;
    height: 834px;

    background-color: #f4f5f9;
    .help-file-title {
      width: 1280px;
      height: 42px;
      margin: 0 auto;
      padding-top: 102px;
      margin-bottom: 48px;
      line-height: 42px;
      display: flex;
      justify-content: space-between;
      text-align: center;
    }
    .help-file-content {
      height: 552px;
      width: 1280px;
      margin: 0 auto;
      margin-top: 48px;
      display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
      .file-content-box {
        width: 405px;
        height: 260px;
        background-color: #fff;
        cursor: pointer;
        margin-top: 32px;
        margin-right: 30px;
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
      .file-content-box:nth-child(3),
      .file-content-box:nth-child(6) {
        margin-right: 0;
      }
      .file-content-box:hover {
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
          white-space: pre-wrap;
          line-height: 22px;
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
    display: flex;
    .lookIcon {
      width: 18px;
      height: 18px;
      margin-top: 10px;
      margin-left: 5px;
      background: url("~@/assets/images/help/lookMoreGray.png");
      vertical-align: middle;
    }
  }
  .look-more:hover {
    color: #19a0f1;
    .lookIcon {
      background: url("~@/assets/images/help/lookMore.png");
    }
  }
}
</style>
