<template>
  <div class="order">
<!--    <page-header :gradual="false"></page-header>-->
    <div class="self-base-container">
      <div class="content">
        <div class="head">
          <div class="ti">
            <span class="title">账户余额：</span
            ><span class="jine">￥{{ banlances }}</span>
          </div>

          <div class="kefu">
            <div class="recharge" @click="recharge">立即充值</div>
            <el-tooltip
              class="item"
              effect="dark"
              content="400-080-9959"
              placement="top"
            >
              <div style="display:flex">
                <span>有疑问吗？联系客服</span>
                <svg-icon iconClass="kefu"></svg-icon>
              </div>
            </el-tooltip>
          </div>
        </div>
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="outTradeNo" label="订单号" width="250px">
            </el-table-column>
            <el-table-column
              prop="serverTypeName"
              label="服务类型"
              label-class-name="name"
              align="center"
            >
              <!-- <template slot-scope="scope">
                <span
                  class="name"
                  @click="toView(scope.row)"
                >{{
                  scope.row.product
                }}</span>
              </template> -->
            </el-table-column>
            <el-table-column prop="platform" align="center" label="消费平台">
            </el-table-column>
            <el-table-column prop="fee" label="金额" align="center">
            </el-table-column>
            <el-table-column
              prop="createTs"
              label="订单时间"
              align="center"
              width="250px"
            >
              <template slot-scope="scope">
                <span>{{ $utils.commonDateFormat(scope.row.createTs, "yyyy-MM-dd hh:mm:ss") }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="订单状态" align="center" width="130">
              <template slot-scope="scope">
                <div
                  :class="{
                    success: scope.row.status == '已完成',
                    warning: scope.row.status == '待支付',
                    info: scope.row.status == '已取消',
                  }"
                  class="orderStatus"
                >
                  {{ scope.row.status }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="caozuo" label="操作" align="center">
              <template slot-scope="scope">
                <div class="more" @click="getDetail(scope.row)">查看详情</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="commonPagina">
          <span class="total">共{{ total }}个项目</span>
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :pager-count="5"
            :page-size="pageSize"
            :current-page.sync="currentPage"
            @current-change="getList"
          ></el-pagination>
        </div>
      </div>
    </div>
    <fixed-tool></fixed-tool>
    <el-dialog title="订单详情" :visible.sync="detailVisible" show-close>
      <div class="detail-text">
        <div class="detail-text-title">订单编号：</div>
        <div class="detail-text-info">{{ detail.outTradeNo }}</div>
      </div>
      <div class="detail-text">
        <div class="detail-text-title">服务类型：</div>
        <div class="detail-text-info">{{ detail.serverType }}</div>
      </div>
      <div class="detail-text" v-if="detail.product">
        <div class="detail-text-title">服务内容：</div>
        <div class="detail-text-info">
          <!--          <div v-if='detail.product.indexOf("[")<0'>-->
          <!--            {{detail.product}}-->
          <!--          </div>-->
          <div v-for="item in JSON.parse(detail.product)" class="f-mb5">
            {{ item.name }}:(￥{{ item.price.toFixed(2) }})
          </div>
        </div>
      </div>
      <div class="detail-text" v-if="detail.serverType !== '账户充值'">
        <div class="detail-text-title">展厅名称：</div>
        <div class="detail-text-info">{{ detail.sceneTemplateName }}</div>
      </div>
      <div class="detail-text" v-if="detail.serverType !== '账户充值'">
        <div class="detail-text-title">展厅ID：</div>
        <div class="detail-text-info">{{ detail.sceneTemplateId }}</div>
      </div>
      <div class="detail-text" v-if="detail.serverType === '发布展厅'">
        <div class="detail-text-title">建展面积：</div>
        <div class="detail-text-info">{{ detail.validSz }}</div>
      </div>
      <div class="detail-text">
        <div class="detail-text-title">支付平台：</div>
        <div class="detail-text-info">{{ detail.platform }}</div>
      </div>

      <div class="detail-text">
        <div class="detail-text-title">金额：</div>
        <div class="detail-text-info">{{ detail.fee }}</div>
      </div>
      <div class="detail-text">
        <div class="detail-text-title">订单时间：</div>
        <div class="detail-text-info">{{ $utils.commonDateFormat(detail.createTs, "yyyy-MM-dd hh:mm:ss") }}</div>
      </div>
      <div class="detail-text">
        <div class="detail-text-title">订单状态：</div>
        <div
          class="detail-text-info"
          :class="{
            success: detail.status == '已完成',
            warning: detail.status == '待支付',
            info: detail.status == '已取消',
          }"
        >
          {{ detail.status }}
        </div>
      </div>
    </el-dialog>
    <!--    <newPayMent-->
    <!--      :visible="dialogFormVisible"-->
    <!--      :balances="userinfo.balances"-->
    <!--      @close="closePay"-->
    <!--    ></newPayMent>-->
    <fixed-tool></fixed-tool>
<!--    <page-footer></page-footer>-->
  </div>
</template>
<script>
import PageHeader from "@/components/page-header/page-header.vue";
import PageFooter from "@/components/page-footer/page-footer.vue";
import newPayMent from "@/components/newPayMent/newPayMent.vue";
import { Message } from "element-ui";
import store from "@/store";
export default {
  name: "order",
  data() {
    return {
      tableData: [{ outTradeNo: "1111111111" }],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      dialogFormVisible: false,
      payType: "1",
      payQrcode: "",
      balance: 0,
      checkOrderStatusTimer: null,
      detail: {
        createTs: 0,
        fee: "",
        outTradeNo: "",
        platform: "",
        product: "",
        serverType: "",
        status: "",
      },
      detailVisible: false,
    };
  },
  components: {
    PageHeader,
    PageFooter,
    newPayMent,
  },
  mounted() {
    this.getList();
    this.getUserInfo();
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    },
    banlances() {
      return store.state.userinfo.balance;
    },
    getDetailProduct(product) {
      if (product.indexOf("[") >= 0) {
        return product;
      } else {
        return JSON.parse(product);
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.checkOrderStatusTimer);
  },
  methods: {
    recharge() {
      this.$Ruler.payment({ balances: this.userinfo.balance }).then((res) => {
        // console.log(res);
      });
    },
    getUserInfo() {
      var me = this;
      var token = me.userinfo.token;
      me.$store.dispatch("getUserInfo", { token: token });
    },
    closePay(val) {
      // if (val) {
      //   this.$http
      //     .updateBalance({
      //       outTradeNo: val.outTradeNo,
      //       payType: val.payType,
      //       version: val.version,
      //     })
      //     .then((res) => {
      //       Message.success("支付成功");
      //     });
      // }

      this.dialogFormVisible = false;
    },
    async getList() {
      let res = await this.$http.getBillPageList({
        pageSize: this.pageSize,
        pageNum: this.currentPage,
      });
      this.total = res.count;
      this.tableData = res.list;
    },
    getDetail(data) {
      let me = this;
      this.detailVisible = true;
      this.$http
        .getBillDetail({
          id: data.id,
          serverType: data.serverType,
        })
        .then((rslt) => {
          console.log(rslt);
          me.detail = rslt;
        })
        .catch(() => {
          me.detail = {
            createTs: "",
            fee: "",
            outTradeNo: "",
            platform: "",
            product: "",
            serverType: "",
            status: "",
          };
        });
    },
  },
};
</script>
<style lang="scss" scoped src="./order.scss"></style>
