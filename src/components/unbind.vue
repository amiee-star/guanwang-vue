<template>
  <div class="unbind">
    <el-dialog
      :visible.sync="visible"
      :modal="false"
      :close-on-click-modal="false"
      @close="closeDialog"
      class="custom-dialog__wrapper"
    >
      <div class="box">
        <div class="title">解绑</div>
        <div class="desc">
          为了您的账户安全，在解绑第三方账户前，您需要先验证绑定的手机号：
        </div>
        <div class="binded">
          <span class="phone">{{ userinfo.telephone }}</span
          ><span class="txt">（已绑定手机号）</span>
        </div>
        <auth-code v-model="code" :phone="userinfo.telephone"></auth-code>
        <div class="btn">
          <el-button
            type="primary"
            :disabled="code.length != 6"
            @click="confirm"
            class="confirm"
            >确认</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["isvisible"],
  data() {
    return {
      visible: this.isvisible || false,
      code: "",
    };
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    },
  },
  mounted() {
    this.$store.dispatch("getUserInfo", { token: this.userinfo.token });
  },
  methods: {
    closeDialog() {
      this.$emit("close");
      this.visible = false;
      this._promise && this._promise.resolve("cancel");
    },
    confirm() {
      var me = this;
      me.$http
        .unbindwx({
          // token: me.userinfo.token,
          verifyCode: me.code,
          telephone: me.userinfo.telephone,
        })
        .then(() => {
          me.closeDialog();
          me.$store.commit("setUserInfoKeyVal", {
            k: "isBindWeChat",
            v: false,
          });
          me.$Ruler.success("解除绑定成功");
        });
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.code = "";
      }
    },
    isvisible(val) {
      if (val) {
        this.code = "";
        this.visible = val;
      } else {
        this.closeDialog();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.unbind {
  .box {
    width: 400px;
    /*height: 380px;*/
    background: #fff;
    box-shadow: 0px 8px 36px 0px rgba(0, 0, 0, 0.41);
    border-radius: 3px;
    padding: 35px 32px;
    div.title {
      color: #666666;
      font-size: 28px;
      text-align: center;
    }
    div.desc {
      padding-top: 26px;
      color: #666666;
      font-size: 14px;
      line-height: 22px;
      font-weight: bold;
      width: 256px;
    }
    div.binded {
      padding: 30px 0;
      span.phone {
        color: #000000;
        font-size: 24px;
      }
      span.txt {
        color: #bbbbbb;
        font-size: 14px;
        padding-left: 10px;
      }
    }

    div.btn {
      padding-top: 20px;
      button {
        width: 100%;
      }
    }
  }
}
</style>
