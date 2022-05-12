<template>
  <div class="modelManage">
    <div class="container">
      <ul class="list">
        <li v-for="(item, index) in modeList" :key="index" v-if="count > 0">
          <singleModel
            :data="item"
            :token="userInfo.token"
            @getList="getSceneList"
          />
        </li>
      </ul>
      <div class="commonPagina paging" v-if="count > 11">
        <el-pagination
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :page-size="11"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
<!--    <exhibitionSet ref="exhibitionSet"></exhibitionSet>-->
  </div>
</template>

<script>
import singleModel from "./singleModel";
export default {
  name: "model",
  components: {
    singleModel,
  },
  data() {
    return {
      currentPage: 1,
      modeList: [],
      count: 0,
      isUpload: false,
    };
  },
  computed: {
    userInfo() {
      console.log(this.$store.state.userinfo);
      return this.$store.state.userinfo;
    },
  },
  methods: {
    handleCurrentChange(val) {
      let me = this;
      me.currentPage = val;
      me.getSceneList();
    },
    getSceneList() {
      let me = this;
      me.modeList = [];
      me.$http
        .getPageList({
          pageSize: 12,
          pageNum: me.currentPage,
        })
        .then((res) => {
          console.log(res, 63);
          me.modeList = res.list;
          me.count = res.count;
        });
    },
  },
  mounted() {
    let me = this;
    me.getSceneList();
  },
  watch: {
    "$store.state.isUpload"(val) {
      //上传成功之后刷新列表
      if (!val) {
        this.getSceneList();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.modelManage {
  .container {
    // padding: 36px 40px 90px 40px;
    background: #fff;
    min-height: 800px;
    margin: 0;
    position: relative;
    .title {
      font-size: 26px;
      color: rgba(51, 51, 51, 1);
    }
    ul.list {
      display: flex;
      flex-wrap: wrap;
      padding-top: 30px;
      > li {
        width: 285px;
        height: 215.6px;
        margin-left: 20px;
        margin-bottom: 20px;
        /*padding-top: 20.2%;*/
        //box-shadow: 0px 4px 19px 1px rgba(0, 0, 0, 0.3);
        position: relative;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
        @media screen and(min-width: 1920px) {
          width: 325px;
          height: 245.86px;
        }

        &:nth-child(4n + 1) {
          margin-left: 0;
        }
        &:nth-child(1) {
          // cursor: pointer;
          div.box {
            padding: 10px;
            div.add {
              height: 100%;
              width: 100%;
              background: rgba(248, 250, 252, 1);
              text-align: center;
              div {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translateX(-50%) translateY(-50%);
                p {
                  color: #23b8ff;
                  font-size: 14px;
                  padding-top: 16px;
                }
              }
            }
          }
        }
        div.box {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
    .paging {
      position: absolute;
      left: 0;
      bottom: 30px;
      width: 100%;
    }
  }
}
</style>
