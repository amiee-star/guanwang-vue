<template>
  <div>
    <el-dialog
      class="standard"
      title="收费标准"
      :visible.sync="$store.state.isShowStandard"
      :before-close="close"
      :lock-scroll="true"
    >
      <div class="title">
        免费建展，发布时需支付渲染、引擎、增值服务等费用，标准如下：
      </div>
      <div class="content">
        <div class="one gray flex">
          <div class="one-left border">服务类型</div>
          <div class="one-right flex1">
            <div class="one-right-top">收费标准</div>
            <div class="one-right-bottom flex">
              <div class="flex1 border">面积</div>
              <div class="flex1 border">价格</div>
              <div class="flex1 border">面积</div>
              <div class="flex1 border-bottom">价格</div>
            </div>
          </div>
        </div>
        <div class="two flex">
          <div class="two-left border">
            类型一：标准模板展厅
          </div>
          <div class="two-right flex1 flex">
            <div class="flex1">
              <div class="two-height flex1 border">≤50㎡</div>
              <div class="two-height flex1 border gray">101~200㎡</div>
              <div class="two-height flex1 border">301~500㎡</div>
              <div class="two-height flex1 border gray">701~1000㎡</div>
              <div class="two-height flex1 border">≥1501㎡</div>
            </div>
            <div class="flex1">
              <div class="two-height flex1 border">¥1960</div>
              <div class="two-height flex1 border gray">¥5960</div>
              <div class="two-height flex1 border">¥9960</div>
              <div class="two-height flex1 border gray">¥13960</div>
              <div class="two-height flex1 border">¥17960</div>
            </div>
            <div class="flex1">
              <div class="two-height flex1 border">51㎡~100㎡</div>
              <div class="two-height flex1 border gray">201~300㎡</div>
              <div class="two-height flex1 border">501~700㎡</div>
              <div class="two-height flex1 border gray">1001~1500㎡</div>
              <div class="two-height flex1 border-bottom"></div>
            </div>
            <div class="flex1">
              <div class="two-height flex1 border-bottom">¥4360</div>
              <div class="two-height flex1 border-bottom gray">¥7960</div>
              <div class="two-height flex1 border-bottom">¥11960</div>
              <div class="two-height flex1 border-bottom gray">¥15960</div>
              <div class="two-height flex1 border-bottom"></div>
            </div>
          </div>
        </div>
        <div class="three flex">
          <div class="three-left border">
            类型二：虚拟定制展厅
          </div>
          <div class="three-right flex1">
            
            <!-- <div class="three-right-top border-bottom gray">120~500元/㎡</div> -->
            <!-- <div class="three-right-bottom border-bottom"></div> -->
            虚拟定制50㎡起，我们将根据您的需求，通过系统自动计算出您的专属定制预算，详细请联系定制专属顾问（参考价：120元/㎡起）
          </div>
        </div>
        <div class="three flex">
          <div class="three-left border">
            类型三：实景复刻展厅
          </div>
          <div class="three-right flex1">
            <!-- <div class="three-right-top border-bottom gray">30~50元/㎡</div> -->
            <!-- <div class="three-right-bottom border-bottom"></div> -->
            实景定制200㎡起，我们将根据您的需求，通过系统自动计算出您的专属定制预算，详细请联系定制专属顾问（参考价：45元/㎡起）
          </div>
        </div>
        <div class="four flex">
          <div class="four-left border-right">
            增值服务
          </div>
          <div class="four-right">
<!--            <div class="four-right-top flex">-->
<!--              <div class="gray border">在线客服</div>-->
<!--              <div class="gray border">599元/厅</div>-->
<!--              <div class="gray border">访客信息</div>-->
<!--              <div class="gray border">599元/厅</div>-->
<!--            </div>-->
            <div class="four-right-top flex">
<!--              <div class="border">直播</div>-->
<!--              <div class="border">599元/厅</div>-->
              <div class="gray border">VR带看</div>
              <div class="gray border">2999元/厅</div>
              <div class="gray border">组合展厅</div>
              <div class="gray border">599元/次/5厅</div>
            </div>
            <div class="four-right-bottom flex">
              <div class="border">展厅更换模板</div>
              <div class="border">599元/次</div>
              <div class="border"></div>
              <div class="border"></div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  watch: {
    "$store.state.isShowStandard": function(val) {
      if (val) {
        this.unScroll();
      }
    },
  },
  methods: {
    close() {
      this.$store.commit("setStates", {
        k: "isShowStandard",
        v: false,
      });
      this.removeUnScroll();
    },
    //禁止滚动条滚动
    unScroll() {
      var top = $(document).scrollTop();
      $(document).on("scroll.unable", function(e) {
        $(document).scrollTop(top);
      });
    },
    //移除禁止滚动条滚动
    removeUnScroll() {
      $(document).unbind("scroll.unable");
    },
  },
};
</script>

<style lang="scss" scoped>
.standard {
  &::v-deep {
    .el-dialog {
      width: 1000px;
      margin-top: 6vh !important;
      margin: 0 auto;
    }

    .el-dialog__title {
      font-size: 14px;
      font-weight: 500;
      color: #707070;
    }

    .el-dialog__header {
      padding: 17px 20px 17px;
      box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
    }

    .el-dialog__body {
      padding-top: 20px;
    }

    .el-table {
      thead th {
        background: #eeeeee;
        border-right: 1px solid #dddddd;
      }

      td {
        padding: 11px 0;
      }
    }
  }

  .title {
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 400;
    color: #707070;
  }
  .content {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    width: 921px;
    margin: 0 auto;
    border: 1px solid #dddddd;
    text-align: center;
    .gray {
      background-color: #f6f6f6;
    }
    .flex1 {
      flex: 1;
    }
    .flex {
      display: flex;
    }
    .border {
      border-right: 1px solid #dddddd;
      border-bottom: 1px solid #dddddd;
    }
    .border-bottom {
      border-bottom: 1px solid #dddddd;
    }
    .border-right {
      border-right: 1px solid #dddddd;
    }
    .one-left {
      width: 200px;
      height: 80px;
      line-height: 80px;
    }
    .one-right {
      height: 80px;
    }
    .one-right-top {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #dddddd;
    }
    .one-right-bottom {
      height: 40px;
      line-height: 40px;
    }
    .two-left {
      font-size: 14px;
      width: 200px;
      height: 240px;
      line-height: 240px;
    }
    .two-height {
      height: 48px;
      line-height: 48px;
    }
    .three-left {
      font-size: 14px;
      width: 200px;
      height: 120px;
      line-height: 120px;
    }
    .three-right {
      text-align: left;
      padding: 40px 13px 0;
      border-bottom: 1px solid #ddd;
    }
    .three-right-top {
      padding: 0 56px 0 35px;
      height: 48px;
      line-height: 48px;
    }
    .three-right-bottom {
      padding: 13px 56px 13px 35px;
      font-size: 14px;
      height: 72px;
    }
    .four-left {
      width: 200px;
      height: 96px;
      line-height: 96px;
    }
    .four-right {
      width: calc(100% - 200px);
    }
    .four-right-top {
      width: 100%;
      div {
        flex: 1;
        height: 48px;
        line-height: 48px;
        &:last-child {
          border-right: none;
        }
      }
    }
    .four-right-bottom {
      width: 100%;
      div {
        flex: 1;
        height: 48px;
        line-height: 48px;
        border-bottom: none;
        &:last-child {
          border-right: none;
        }
      }

    }
  }
}
</style>
