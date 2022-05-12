<template>
  <div class="help-problem">
<!--    <page-header :gradual="false"></page-header>-->
    <div class="content-box">
      <div class="titleBox">
        <span class="span1" @click="toHelp">帮助中心</span>
        <span class="span2"> > 常见问题</span>
      </div>
      <div class="problemBox">
        <div class="problem" v-for="(item, index) in problemList" :key="index">
          <div class="title">
            <div class="left">
              <img src="@/assets/images/help/problemActive.png" alt="" />
              <span>{{ item.issueName }}</span>
            </div>
            <!-- <div class="right">x</div> -->
          </div>
          <pre class="content">{{item.answer}}</pre>
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
  name: "",
  components: { PageHeader, PageFooter },
  data() {
    return {
      problemList: [],
      total: 0,
      pageNum: 1,
      pagesize: 10,
    };
  },
  methods: {
    toHelp() {
      this.$router.push("/help");
    },
    // 获取常见问题
    async getProblem() {
      let problemParams = {
        pageNum: this.pageNum,
        pageSize: 10,
      };
      let problemRes = await this.$http.getProblem(problemParams);
      console.log(problemRes);
      this.problemList = problemRes.list;
      this.total = problemRes.count;
    },
    currentChange(i) {
      console.log(i);
      this.pageNum = i;
      this.getProblem();
    },
  },
  mounted() {
    this.getProblem();
  },
};
</script>
<style lang="scss" scoped>
.help-problem {
  width: 100%;
  height: 100%;
  .content-box {
    width: 1280px;
    margin: 0 auto;
    margin-bottom: 60px;
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
    .problemBox {
      width: 100%;
      margin-bottom: 30px;
      .problem {
        width: 100%;
        .title {
          width: 100%;
          display: flex;
          justify-content: space-between;
          height: 60px;
          line-height: 60px;
          color: #333;
          font-size: 16px;
          .left {
            img {
              width: 24px;
              height: 24px;
              margin-right: 10px;
              vertical-align: middle;
            }
          }
          .right {
            color: #bbb;
          }
        }
        .content {
          width: 100%;
          padding: 48px 40px;
          box-sizing: border-box;
          background: #f4f5f9;
          white-space: pre-wrap;
          line-height: 22px;
          font-family: "Source Han Sans CN";
          color: #333;
        }
      }
    }
  }
}
</style>
