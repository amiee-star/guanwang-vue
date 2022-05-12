<template>
  <el-dialog
    :visible="visible"
    @close="closeRechargeModal"
    width="460px"
    custom-class="payMent"
  >
    <div slot="title">
      {{ rechargeType }}
    </div>
    <div class="recharge-part" v-show="rechargeType == '账户充值'">
      <el-form>
        <el-form-item label="账户余额：" :label-width="formLabelWidth">
          ￥{{ balances }}
        </el-form-item>
        <el-form-item label="充值金额：" :label-width="formLabelWidth">
          <el-input v-model="money" @input="changeMoney"></el-input>
        </el-form-item>
        <el-form-item label="充值方式：" :label-width="formLabelWidth">
          <p class="payWay">
            <span
              class="flex-center-column"
              :class="{ active: payWay == 2 }"
              slot="label"
              @click="payWay = 2"
            >
              <svg-icon iconClass="pay-zfb"></svg-icon>
            </span>
            <span
              class="flex-center-column"
              :class="{ active: payWay == 1 }"
              slot="label"
              @click="payWay = 1"
            >
              <svg-icon iconClass="pay-wx" class="labelheight"></svg-icon>
            </span>
          </p>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button :disabled="isDisabled" class="sure" @click="congzhi()"
          >立即充值</el-button
        >
      </div>
      <div class="tishi">
        <svg-icon iconClass="tishi"></svg-icon>
        请确保账户余额充足，以免影响展厅服务
      </div>
    </div>
    <div class="qrcode-part" v-show="rechargeType == '扫码快捷支付'">
      <div class="recharge-money">￥{{ money }}</div>
      <div class="qrcode" ref="aliQrCodeUrl"></div>
      <span @click="buyHandle">购买须知</span>
    </div>
  </el-dialog>
</template>

<script>
import QRCode from "qrcodejs2";
import { Message } from "element-ui";
import store from "@/store";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    balances: {
      type: Number,
    },
  },
  data() {
    return {
      rechargeType: "账户充值",
      checkOrderStatusTimer: null,
      aliQrcode: null,
      wxQrcode: null,
      money: "",
      formLabelWidth: "120px",
      aliOrder: "",
      wxOrder: "",
      isDisabled: true,
      payWay: 2,
    };
  },
  watch: {
    money() {
      if (parseInt(this.money) >= 100000) {
        this.money = 100000;
        return;
      }
      this.money = this.money.replace(/[^\d\.]/g, "");
    },
  },
  // computed: {
  //   banlances() {
  //     return store.state.userinfo.balance;
  //   },
  // },
  methods: {
    buyHandle() {
      let routeData = this.$router.resolve({
        name: "userProtocol",
        params: { type: "serviceAgreement" || "user" },
      });
      window.open(routeData.href, "_blank");
      clearInterval(this.checkOrderStatusTimer);
    },
    changeMoney(val) {
      let reg = /^(([1-9]\d*(.\d*[1-9])?)|(0.\d*[1-9]))$/;
      if (reg.test(val)) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    async handleClick(tab) {
      clearInterval(this.checkOrderStatusTimer);
      switch (tab.name) {
        case "aliQrCodeUrl":
          if (this.wxOrder.outTradeNo) {
            // 清除订单
            this.$http.platform({ outTradeNo: this.wxOrder.outTradeNo });
          }

          break;
        case "weixinQrCodeUrl":
          if (this.aliOrder.outTradeNo) {
            // 清除订单
            this.$http.platform({ outTradeNo: this.aliOrder.outTradeNo });
          }
          //生成微信支付二维码
          this.wxOrder = await this.$http.wxOrder({
            money: this.money,
          });
          this.creatQrCode(
            "wxQrcode",
            this.$refs.weixinQrCodeUrl,
            this.wxOrder.qrCodeUrl
          );
          this.checkOrderStatusTimer = setInterval(() => {
            this.$http
              .checkOrderStatus({ outTradeNo: this.wxOrder.outTradeNo })
              .then((rslt) => {
                this.$emit("close", {
                  version: this.wxOrder.version,
                  outTradeNo: this.wxOrder.outTradeNo,
                  payType: rslt.payType,
                });
                clearInterval(this.checkOrderStatusTimer);
                this.rechargeType = "账户充值";
              }).catch(e => {
                return false
            })
          }, 1000);
          break;
      }
    },
    async congzhi() {
      if (!this.isDisabled) {
        this.rechargeType = "扫码快捷支付";
        clearInterval(this.checkOrderStatusTimer);
        // 生成二维码
        this.aliOrder = await this.$http.payCode({
          money: this.money,
          payType: this.payWay,
        });
        this.creatQrCode(
          "aliQrcode",
          this.$refs.aliQrCodeUrl,
          this.aliOrder.qrCodeUrl
        );

        this.checkOrderStatusTimer = setInterval(() => {
          this.$http
            .checkOrderStatus({ outTradeNo: this.aliOrder.outTradeNo })
            .then((rslt) => {
              console.log(101);
              this.$emit("close");
              this.$Ruler.success("充值成功！");
              // location.reload();
              clearInterval(this.checkOrderStatusTimer);
              // this.rechargeType = "账户充值";
              this.closeRechargeModal().then((res) => {
                location.reload();
              });
            });
        }, 1000);
      }
      // this.dialogFormVisible = false;
    },
    creatQrCode(type, dom, src) {
      if (this[type]) {
        this[type].clear();
      } else {
        this[type] = new QRCode(dom, {
          text: src,
          width: 160,
          height: 160,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
      }
    },
    closeRechargeModal() {
      this.$emit("close");
      this.visible = false;
      if (this.rechargeType === "扫码快捷支付") {
        location.reload();
      }
      // this._promise && this._promise.resolve("cancel");
      clearInterval(this.checkOrderStatusTimer);
    },
    backToRecharge() {
      this.rechargeType = "账户充值";
      clearInterval(this.checkOrderStatusTimer);
    },
  },
};
</script>

<style lang="scss" src="./newPayMent.scss"></style>
