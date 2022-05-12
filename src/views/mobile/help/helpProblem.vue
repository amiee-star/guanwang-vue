<template>
  <div class="help-problem">
    <page-header :gradual="false"></page-header>
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
              <span>{{ item.titlename }}</span>
            </div>
            <!-- <div class="right">x</div> -->
          </div>
          <pre class="content">{{item.answer}}</pre>
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
  name: "",
  components: { PageHeader, PageFooter },
  data() {
    return {
      problemList: [
        {
          titlename: "zhesh问题1",
          content: "fdssjfg康复机构的风景数据东风科技",
        },
        {
          titlename: "zhesh问题2",
          content: "fdssjfg康复机构的风景数据东风科技",
        },
        {
          titlename: "zhesh问题3",
          content: "fdssjfg康复机构的风景数据东风科技",
        },
        {
          titlename: "zhesh问题4",
          content: "fdssjfg康复机构的风景数据东风科技",
        },
        {
          titlename: "zhesh问题5",
          content: "fdssjfg康复机构的风景数据东风科技",
        },
        {
          titlename: "zhesh问题6",
          content: "fdssjfg康复机构的风景数据东风科技",
        },
        {
          titlename: "zhesh问题7",
          content: "fdssjfg康复机构的风景数据东风科技",
        },
        {
          titlename: "zhesh问题8",
          content: "fdssjfg康复机构的风景数据东风科技",
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
          line-height: 22px;
          font-family: "Source Han Sans CN";
          color: #333;
        }
      }
    }
  }
}
</style>
