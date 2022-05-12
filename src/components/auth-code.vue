<template>
  <div>
    <div class="auth-code">
      <div class="compound">
        <el-input
            v-model="code"
            @input="input"
            placeholder="请输入短信验证码"
            maxlength="6"
            autocomplete="new-password"
        ></el-input>
        <el-button
            :class="flag ? 'counter-btn' : ''"
            type="primary"
            :disabled="disabled"
            @click="getCode"
        >{{ btnText }}
        </el-button>
      </div>
    </div>
    <el-dialog
        class="showSlideVerify"
        title=""
        :visible="showSlideVerify"
        :modal="false"
        :show-close="false"
        style="margin-top: 0vh">
      <div class="verifyBox">
        <slide-verify
            :l="42"
            :r="20"
            :w="362"
            :h="140"
            slider-text="向右滑动"
            @success="onSuccess"
            @fail="onFail"
            @refresh="onRefresh"
            :style="{width:'362px'}"
            class="slide-box"
            ref="slideBlock"
            v-show="showSlideVerify"
            :imgs="verifyImg"
        ></slide-verify>
      </div>

    </el-dialog>
  </div>

</template>
<script>
  import SlideVerify from './slide-verify.vue'
  export default {
    name: "auth-code",
    props: ["value", "phone", "flag", "isNeedRegister"],
    components:{
      SlideVerify
    },
    data() {
      return {
        graphCode: "",
        code: this.value,
        timer: null,
        count: -1,
        showSlideVerify: false,
        verifyImg: [],
        verifyCode: ""
        // codeImg: this.$http.getCodeImg + "?time=" + new Date().getTime(),
      };
    },
    computed: {
      disabled() {
        if (this.$utils.check.mobile(this.phone)) {
          return false;
        } else {
          return true;
        }
      },
      btnText() {
        if (this.count >= 0) {
          return this.count;
        } else {
          return "获取验证码";
        }
      },
    },
    mounted() {
    },
    methods: {
      // 拼图成功
      onSuccess() {
        let me = this;
        me.$refs.slideBlock.reset()
        me.showSlideVerify = false;
        me.$http
          .sendCode({telephone: me.phone, codeId: me.verifyCode})
          .then((res) => {
            me.timerRun();
          })
          .catch(() => {
            // me.graphCode = "";
            // me.changeCodeImg();
          });
      },
      // 拼图失败
      onFail() {
        this.getVerifyImg()
      },
      // 拼图刷新
      onRefresh() {
        // alert(拼图刷新);
        this.getVerifyImg()
      },
      input(e) {
        this.$emit("input", e);
      },

      // changeCodeImg() {
      //   this.codeImg = this.$http.getCodeImg + "?time=" + new Date().getTime();
      // },

      // 获取图形验证码背景图
      getVerifyImg() {
        let me = this;
        me.$http.getVerifyImg().then((res) => {
          me.verifyImg.push(res.imageUrl);
          me.verifyCode = res.codeId;
          me.showSlideVerify = true
        })
      },

      getCode() {
        //获取验证码之前先校验该手机号是否注册
        var me = this;
        if (me.$utils.check.mobile(me.phone) && me.count <= -1) {
          if (me.isNeedRegister) {
            me.$http
              .phoneIsLogin({telephone: me.phone})
              .then(async (res) => {
                //获取图形验证码图片
                me.getVerifyImg()
              })
          } else {
            //获取图形验证码图片
            me.getVerifyImg()
          }
        }
      },
      timerRun() {
        var me = this;
        me.count = 60;
        me.timer = setInterval(() => {
          me.count--;
          if (me.count <= -1) {
            window.clearInterval(me.timer);
          }
        }, 1000);
      },
    },
    watch: {
      value(val) {
        if (val != this.code) {
          this.code = val;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  /*验证码和获取验证码的按钮*/
  .verifyBox {
    background-color: #fff;
  }

  .auth-code {
    div.compound {
      display: flex;
      /*margin-bottom: 20px;*/
      .codeImg {
        width: 112px;
        height: 40px;
        position: relative;
        &:hover {
          span {
            opacity: 1;
          }
        }
        img {
          display: block;
          width: 112px;
          height: 40px;
        }
        span {
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, .5);
          color: #fff;
          text-align: center;
          cursor: pointer;
        }
      }
      div.el-input {
        margin-right: 10px;
      }

      button.el-button {
        border: 1px solid rgba(35, 184, 255, 1);
        border-radius: 3px;
        font-size: 14px;
        background: rgba(239, 251, 255, 1);
        color: #23b8ff;
        width: 120px;

        &.is-disabled {
          background: #aaa;
          color: #fff;
          border-color: #aaa;
          /*&:hover {*/
            /*background: rgba(239, 251, 255, 1);*/
            /*color: #23b8ff;*/
          /*}*/
        }
      }

      button.el-button.counter-btn {
        width: 108px;
        background-color: rgba(35, 184, 255, 0.1) !important;
        border: 1px solid #23b8ff !important;
        border-radius: 3px;
        color: #23b8ff;
      }
    }
  }
</style>
<style lang="scss">
  .verifyBox {
    .slide-verify-slider {
      margin-top: -15px;
    }
  }
  .showSlideVerify {
    .el-dialog {
      width: 362px;
    }
    .el-dialog__body,
    .el-dialog__header{
      padding: 0;
    }
  }
</style>
