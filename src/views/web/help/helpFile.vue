<template>
  <div class="help-file">
    <div class="title">
      <div class="titlebox">
        <div class="left">
          <img src="@/assets/logo-w.png" alt="" />
          <span>|</span>
          <span class="helpFileTitle">帮助文档</span>
        </div>
        <div class="right" @click="toHelp">
          <img src="@/assets/images/help/back.png" alt="" />
          返回官网
        </div>
      </div>
    </div>
    <div class="contentBox">
      <div class="leftbox">
        <el-menu
          text-color="#333"
          unique-opened
          active-text-color="#19A0F1"
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          @select="handleSelect"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="(item, index) in fileList"
            :key="item.id"
          >
            <template slot="title">
              <!-- <img src="@/assets/images/help/open.png" alt="" v-if="isOpen" />
              <img
                v-else
                src="@/assets/images/help/close.png"
                alt=""
                class="closeimg"
              /> -->

              <span> {{ item.categoryName }}</span>
            </template>
            <el-menu-item-group v-for="(items, idx) in item.docList" :key="idx">
              <el-menu-item
                :index="items.id + ''"
                @click="changeClick(items)"
                >{{ items.titleName }}</el-menu-item
              >
              <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="rightbox">
        <div class="titleName">{{ contentObj.titleName }}</div>
        <div class="contentbox" v-html="contentObj.titleContent"></div>
      </div>
    </div>
    <!--    <PageFooter></PageFooter>-->
  </div>
</template>
<script>
import PageFooter from "@/components/page-footer/page-footer.vue";
export default {
  name: "",
  components: { PageFooter },
  data() {
    return {
      fileList: [{}],
      contentObj: {},
      defaultActive: "",
      isOpen: true,
    };
  },
  methods: {
    toHelp() {
      this.$router.push("/help");
    },
    handleSelect(index, indexpath) {
      if (window.scrollY != 0) {
        window.scroll(0, 0);
      }
    },
    // 获取文档分类
    async getFileDetail() {
      let fileParent = this.$route.query.fileId;
      let childId = this.$route.query.childId;
      let res = await this.$http.getFileDetail();
      this.fileList = res;
      if (!fileParent && !childId && this.fileList.length) {
        this.contentObj = this.fileList[0].docList[0];
        this.defaultActive =
          this.fileList[0] &&
          this.fileList[0].docList[0] &&
          this.fileList[0].docList[0].id.toString();
      } else if (this.fileList.length && (fileParent || childId)) {
        res.forEach((item, index) => {
          if (fileParent) {
            if (item.id.toString() === fileParent.toString()) {
              this.contentObj = this.fileList[index].docList[0];
              this.defaultActive =
                this.fileList[index] &&
                this.fileList[index].docList[0] &&
                this.fileList[index].docList[0].id.toString();
            }
          } else if (childId) {
            item.docList &&
              item.docList.forEach((one, i) => {
                if (one.id.toString() === childId.toString()) {
                  this.contentObj = this.fileList[index].docList[i];
                  this.defaultActive = this.fileList[index].docList[
                    i
                  ].id.toString();
                }
              });
          }
        });
      }
    },
    changeClick(i) {
      this.contentObj = i;
    },
    handleOpen() {
      this.isOpe = false;
    },
    handleClose() {
      this.isOpe = true;
    },
  },
  mounted() {},
  created() {
    this.getFileDetail();
  },
};
</script>
<style lang="scss" scoped>
.help-file {
  width: 100%;
  height: 100%;
  background: #f4f5f9;

  .title {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 60px;
    background-color: #000204;
    line-height: 60px;
    color: #fff;
    .titlebox {
      width: 100%;
      padding: 0 250px;
      // margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }
    .left {
      display: flex;
      img {
        width: 110px;
        height: 28px;
        margin-top: 16px;
        margin-right: 16px;
      }
      .helpFileTitle {
        display: inline-flex;
        margin-left: 16px;
        font-size: 20px;
        width: 100px;
      }
    }
    .right {
      cursor: pointer;
      img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
  }
  .contentBox {
    width: 1280px;
    height: auto;
    margin: 0 auto;
    // height: 100%;
    margin-top: 60px;
    // background-color: #f4f5f9;
    padding-bottom: 20px;
    display: flex;
    .leftbox {
      position: sticky;
      top: 80px;
      /*left: 0;*/
      width: 240px;
      overflow: auto;
      height: 780px;
      scrollbar-width: none;
      background: #ffffff;
      margin-right: 20px;
      opacity: 1;
      ::v-deep .el-submenu__title {
        height: 48px;
        border-bottom: 1px solid #fafafa;
        text-overflow: ellipsis;
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;

        img {
          width: 14px;
          height: 14px;
          margin-right: 10px;
        }
        .closeimg {
          width: 14px;
          height: 2px;
        }
      }

      ::v-deep .el-menu-item {
        height: 48px;
        background: #fafafa;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
      }
      ::v-deep .el-menu-item-group__title {
        display: none;
      }
    }
    .leftbox::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 0 !important;
    }
    .leftbox::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      width: 0 !important;
    }
    .rightbox {
      flex: 1;
      /*margin-left: 240px;*/
      margin-top: 20px;
      min-height: 1668px;
      background: #ffffff;
      opacity: 1;
      padding: 40px 40px 60px 40px;
      margin-bottom: 20px;
      .titleName {
        font-size: 32px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 34px;
        color: #333333;
        margin-bottom: 32px;
      }
      .contentbox {
        ::v-deep img {
          max-width: 100%;
        }
      }
      img {
        width: 50px !important;
      }
    }
  }
  .page-footer {
    position: relative;
    z-index: 999;
  }
}
</style>
