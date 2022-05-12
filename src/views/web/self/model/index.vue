<template>
  <div class="modelManage">
<!--    <page-header :gradual="false"></page-header>-->
    <div class="self-base-container">
      <p class="title">模板管理</p>
      <ul class="list">
        <!-- <li @click="addModel">
          <div class="box">
            <div class="add">
              <div>
                <img src="@/assets/images/self/add.png" alt="" />
                <p>新增模板</p>
              </div>
            </div>
          </div>
        </li> -->

        <li v-for="(item, index) in modeList" :key="index" v-if="count > 0">
          <singleModel
            :data="item"
            :token="userInfo.token"
            @getList="getSceneList"
          />
        </li>
      </ul>
      <div class="commonPagina paging" v-if="count > 20">
        <el-pagination
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :page-size="20"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
<!--    <page-footer></page-footer>-->
    <!--        <uploadModel v-if="isUpload" @close="isUpload=false"/>-->
  </div>
</template>

<script>
import singleModel from "./components/singleModel";
import uploadModel from "./components/uploadModel";
export default {
  name: "model",
  components: {
    singleModel,
    uploadModel,
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
        .getModelList({
          pageSize: 20,
          pageNum: me.currentPage,
        })
        .then((res) => {
          console.log(res);
          me.modeList = res.list;
          me.count = res.count;
        });
    },
    addModel() {
      let me = this;
      // if (me.userInfo.role) {
      me.$store.commit("toUploadModel", true);
      // me.isUpload = true
      // } else {
      //   me.$Ruler.warn({
      //     img: require("@/assets/images/confirm.png"),
      //     msg: "您没有权限创建展厅模板",
      //     desc: "请联系客服",
      //     num: "40-080-9959",
      //   });
      // }
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
  background: #f5f5f5;
  .self-base-container {
    padding: 36px 40px 90px 40px;
    background: #fff;
    min-height: 800px;
    margin: 30px auto;
    position: relative;
    .title {
      font-size: 26px;
      color: rgba(51, 51, 51, 1);
    }
    ul.list {
      display: flex;
      flex-wrap: wrap;
      padding-top: 40px;
      > li {
        width: 285px;
        height: 215.6px;
        margin-left: 20px;
        margin-bottom: 20px;
        /*padding-top: 17.6%;*/
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
          cursor: pointer;
          div.box {
            /*padding: 10px;*/
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
