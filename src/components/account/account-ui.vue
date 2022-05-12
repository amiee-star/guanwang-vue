<template>
  <div class="account-ui">
    <!-- 登录 -->
    <div class="login" v-if="step == 0 || step == 7 || step == 1 || step == 2 ">
      <!-- 微信扫码 -->
      <div class="weixin-login" v-if="step == 0 || step == 7">
        <div class="title">{{step == 0 ? "微信扫码登录注册" : "绑定微信"}}</div>
        <div v-if="step == 0" class="small-title">登录开启3D营销新世界</div>
        <div class="QRCode" id="QRCode">
        </div>
      </div>
      <div class="code-login" v-if="step == 1">
        <div class="title">短信密码登录</div>
        <div class="form">
          <el-form
            ref="account"
            label-width="0"
            :model="account"
            :rules="rules"
          >
            <el-form-item label="" prop="phone">
              <el-input
                v-model="account.phone"
                placeholder="请输入手机号"
                maxlength="11"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="code">
              <auth-code
                v-model="account.code"
                :phone="account.phone"
              ></auth-code>
            </el-form-item>
          </el-form>
        </div>
        <div class="other-methods">
          <div class="logmethd">
            <span @click="changeLoginTypeHandle(2)">账号密码登录</span>
          </div>
          <span class="forget" @click="changeLoginTypeHandle(5)">忘记密码？</span>
        </div>
        <div class="line"></div>
      </div>
      <!-- 密码登录 -->
      <div class="pwd-login" v-if="step == 2">
        <div class="title">账号密码登录</div>
        <div class="form">
          <el-form
            ref="account"
            label-width="0"
            :model="account"
            :rules="rules"
          >
            <el-form-item label="" prop="username">
              <el-input
                v-model="account.username"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="pwd">
              <el-input
                v-model="account.pwd"
                type="password"
                placeholder="请输入8-16位密码"
                @keyup.native.enter="login"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="other-methods">
          <div class="logmethd">
            <span @click="changeLoginTypeHandle(1)">短信密码登录</span>
          </div>
          <span class="forget" @click="changeLoginTypeHandle(5)">忘记密码？</span>
        </div>
      </div>
      <div v-if="step !== 7" class="box-line"></div>
      <div class="btns" v-if="step !== 0 && step !== 7">
        <el-button type="primary" class="confirm" @click="login">
          登录
        </el-button>
      </div>
      <div class="login-type">
        <span v-if="step !== 0 && step !== 7" @click="changeLoginTypeHandle(0)"><svg-icon iconClass="weixin"></svg-icon>微信登录</span>
        <span v-if="step == 0" @click="changeLoginTypeHandle(2)"><svg-icon iconClass="mobile-phone"></svg-icon>手机号登录</span>
        <span v-if="step !== 7" @click="changeLoginTypeHandle(3)">手机号注册 ></span>
      </div>
    </div>

    <!-- 注册 -->
    <div class="register" v-if="step == 3">
      <div class="title">注册账号</div>
      <div class="form">
        <el-form ref="account" label-width="0" :model="account" :rules="rules">
          <el-form-item label="" prop="phone">
            <el-input
              v-model="account.phone"
              placeholder="请输入手机号"
              maxlength="11"
              autocomplete="new-password"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="code">
            <auth-code
              v-model="account.code"
              :phone="account.phone"
            ></auth-code>
          </el-form-item>
          <el-form-item label="" style="position: absolute;left: -1000px;">
            <el-input
              type="text"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="account.password"
              type="password"
              placeholder="请输入8-16位密码"
              autocomplete="new-password"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="btns">
        <el-button
          type="primary"
          class="confirm"
          @click="registerUser"
        >注册账号
        </el-button>
      </div>
      <div class="goLogin">已有账号？ <span @click="changeLoginTypeHandle(2)">去登录</span></div>
    </div>

    <!-- 绑定手机号 -->
    <div class="bind-phone" v-if="step == 4">
      <div class="title">
        <span>绑定手机号，即可免费获取数千款3D模板</span>
        <span>3分钟发布专属3D虚拟空间</span>
      </div>
      <line-throught>绑定手机，让账户更安全</line-throught>
      <div class="form">
        <el-form ref="account" label-width="0" :model="account" :rules="rules">
          <el-form-item label="" prop="phone">
            <el-input
              v-model="account.phone"
              placeholder="请输入手机号"
              maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="code">
            <auth-code
              v-model="account.code"
              :phone="account.phone"
            ></auth-code>
          </el-form-item>
        </el-form>
      </div>
      <div class="btns">
        <el-button type="primary" class="confirm" @click="bindAccount">绑定手机号</el-button>
      </div>
      <div class="goLogin"><span @click="changeLoginTypeHandle(2)">返回登录</span></div>
    </div>

    <!-- 重新设置密码 -->
    <div class="reset-pwd" v-if="step == 5 || step == 6">
      <div class="title">修改密码</div>
      <div class="form">
        <el-form ref="account" label-width="0" :model="account" :rules="rules">
          <el-form-item label="" :prop="userinfo.telephone ? '' : 'inputPhone'">
            <p v-if="userinfo.telephone">{{ userinfo.telephone }}</p>
            <el-input
              v-else
              v-model="account.inputPhone"
              placeholder="请输入手机号"
              maxlength="11"
              autocomplete="new-password"
            ></el-input>
          </el-form-item>
          <template v-if="step == 5 || (step == 6 && isPhone)">
            <el-form-item label="" prop="code">
              <auth-code
                v-model="account.code"
                :phone="userinfo.telephone ? userinfo.telephone : account.inputPhone"
                :isNeedRegister="true"
              ></auth-code>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                v-model="account.password"
                type="password"
                placeholder="请输入8-16位新密码"
                autocomplete="new-password"
              ></el-input>
            </el-form-item>
          </template>
          <template v-if="step == 6 && !isPhone">
            <el-form-item label="" prop="oldPassword">
              <el-input
                v-model="account.oldPassword"
                type="password"
                placeholder="请输入原密码"
                autocomplete="new-password"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                v-model="account.password"
                type="password"
                placeholder="请输入8-16位新密码"
                autocomplete="new-password"
              ></el-input>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <div class="btns">
        <el-button type="primary" class="confirm" @click="setPwd">修改密码</el-button>
      </div>
      <div class="goLogin">想起密码？ <span @click="changeLoginTypeHandle(2)">去登录</span></div>
    </div>

    <div class="accept" v-if="step !== 4 && step != 7">
      登录即视为同意 <span @click="openHandle">用户协议</span> <span @click="openHandle2">版权声明</span>
    </div>
  </div>
</template>

<script>
  import LineThrought from "@/components/line-throught.vue";
  import formRules from "@/config/form-rules.js";
  import store from "@/store.js";
  import router from "@/router.js";
  import md5 from "js-md5";

  export default {
    name: "account-ui",
    props: {
      operate: {
        // 0 微信登录， 1 短信密码登录， 2 账号密码登录， 3 注册， 4 绑定手机号， 5 忘记密码， 6 账户设置修改密码， 7 账户设置绑定微信
        type: Number,
        default: 0,
      },
      close: {
        type: Function,
      },
      openid: "",
      isLogin: false,
    },
    computed: {
      userinfo() {
        return store.state.userinfo;
      },
    },

    data() {
      var me = this;

      // function aginPwd(rule, value, callback) {
      //   if (value !== me.account.newPassword && value !== me.account.password) {
      //     callback(new Error("两次密码不一致"));
      //   } else {
      //     callback();
      //   }
      // }

      return {
        step: this.operate,
        account: {},
        rules: {
          phone: [{validator: formRules.checkPhone, trigger: "blur"}],
          inputPhone: [{validator: formRules.checkPhone, trigger: "blur"}],
          password: [{validator: formRules.checkPwd, trigger: "blur"}],
          // newPassword: [{validator: formRules.checkPwd, trigger: "blur"}],
          pwd: [{required: true, message: '密码不能为空', trigger: 'blur'}],
          username: [{required: true, message: "用户名不能为空", trigger: "blur"}],
          // agin: [{validator: aginPwd, trigger: "blur"}],
          code: [{required: true, validator: formRules.checkCode, trigger: "blur"}],
        },
        isPhone: false //是否是正确的手机号
      };
    },
    mounted() {
      this.weixinLogo()
      var phone = this.userinfo.telephone;
      if (phone && this.step === 6) {
        var mobile = /^1|8[3|4|5|6|7|8|9]\d{9}$/;
        this.isPhone = mobile.test(phone);
      }
    },
    methods: {
      readCunt(type) {
        if (this.close) {
          this.close();
        }
        router.push({name: "userProtocol", params: {type: type || "user"}});
      },

      openHandle() {
        window.open(location.origin + '/userProtocol/user')
      },

      openHandle2() {
        window.open(location.origin + '/userProtocol/copyright')
      },

      restHandle() {
        this.$nextTick(() => {
          if (this.$refs["account"]) {
            this.$refs["account"].clearValidate();
            this.account = {}
          }
        });
      },

      changeLoginTypeHandle(val) {
        this.restHandle();
        this.step = val;
        if (val === 0) {
          this.weixinLogo()
        }
      },

      weixinLogo() {
        if (this.step === 0 || this.step === 7) {
          this.$http.wxLogin().then(res => {
            if (WxLogin) {
              new WxLogin({
                self_redirect: false,
                id: "QRCode",
                appid: res.appId,
                scope: res.scope,
                redirect_uri: res.redirectUri, //https://admin.3dyunzhan.com/v1/api/wechat/login/callback
                state: this.step === 0 ? encodeURIComponent(location.origin + "/self/buy/tpl") : encodeURIComponent(location.origin + location.pathname),
                style: "white",
                href: "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDE3MHB4OyBtYXJnaW4tdG9wOjMwcHg7fQouaW1wb3dlckJveCAudGl0bGUge2Rpc3BsYXk6IG5vbmU7fQouaW1wb3dlckJveCAuaW5mbyB7ZGlzcGxheTogbm9uZTt9Ci5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30="
              });
            }
          })
        }

        // 微信内嵌iframe样式（修改后转为base64加密拼接在href后面）
        // .impowerBox .qrcode {width: 170px; margin-top:30px;}
        // .impowerBox .title {display: none;}
        // .impowerBox .info {display: none;}
        // .status_icon {display: none}
        // .impowerBox .status {text-align: center;}
      },
      // weixinLogo() {
      //   //点击微信登录 encodeURIComponent
      //   var url = this.$http.wxLogin;
      //   if (this.close) {
      //     //是弹窗n
      //     url = url + "?state=" + encodeURIComponent(location.origin + location.pathname);
      //   } else {
      //     url = url + "?state=" + encodeURIComponent(location.origin);
      //   }
      //   //是登录页面
      //   window.location.href = url;
      // },
      async login() {
        //登录
        var me = this;
        try {
          //  手机验证码登录
          await me.$refs.account.validate();
          if (me.step == 1) {
            let param = {
              telephone: me.account.phone,
              verifyCode: me.account.code,
            };
            let token = await me.$http.userPhoneLogin(param);
            await store.dispatch("getUserInfo", {token: token.accessToken});
            // 账号密码登录
          } else if (me.step == 2) {
            let param = {
              username: me.account.username,
              password: md5(me.account.pwd),
            };
            let token = await me.$http.userPswLogin(param);
            await store.dispatch("getUserInfo", {token: token.accessToken});
          }
          if (me.close) {
            me.close("ok");
            if (router.history.current.meta.requireAuth) {
              window.location.reload();
            }
          } else {
            if (!me.$route.query.redirect) {
              me.$router.replace({name: "index"});
            } else {
              me.$router.replace({
                path: decodeURIComponent(me.$route.query.redirect),
              });
            }
          }
          store.dispatch("sceneHistory", {token}).catch((e) => {
            // console.log(e);
          });
        } catch (e) {
          // console.log(e);
        }
      },

      async setPwd() {
        try {
          var me = this;
          var phoneNumber = me.userinfo ? me.userinfo.telephone : this.account.inputPhone;
          await me.$refs.account.validate();
          let params = {
            telephone: me.userinfo ? me.userinfo.telephone : this.account.inputPhone,
            password: md5(me.account.password),
            verifyCode: me.account.code,
          }
          if (this.step === 5) {
            await me.$http.forgetPassword(params)
          } else {
            if (this.isPhone) {
              await me.$http.changePassword(params)
            } else {
              await me.$http.changePassword2({
                oldPassword: md5(me.account.oldPassword),
                password: md5(me.account.password),
              })
            }
          }
          me.$Ruler.success("密码重置成功");
          if(this.step === 5) {
            me.step = 2;
            me.account.username = phoneNumber
          }else {
            me.close && me.close("ok");
          }
        } catch (e) {
          console.log("catch--", e);
        }
      },
      async registerUser() {
        try {
          var me = this;
          await me.$refs.account.validate();
          await me.$http.registerLogin({
            telephone: me.account.phone,
            verifyCode: me.account.code,
            password: md5(me.account.password),
            utmFrom: me.$utils.store.getCookie("utm_from") || ""
          });
          me.$Ruler.success("注册成功").then(() => {
            me.step = 2;
            me.account.username = me.account.phone
          });
        } catch (e) {
          console.log("catch--", e);
        }
      },
      async bindAccount() {
        //绑定账户!!!!!!!!!!!!!!
        try {
          var me = this;
          await me.$refs.account.validate();
          if (this.isLogin) {
            var res = await me.$http.bindAndLogin({
              telephone: me.account.phone,
              verifyCode: me.account.code,
              openid: me.openid,
            });
            await store.dispatch("getUserInfo", {token: res.accessToken});
            // me.$router.replace({name: "index"});
          } else {
            //绑定微信时绑定手机号
            var token = await me.$http.bindwx({
              telephone: me.account.phone,
              verifyCode: me.account.code,
              openid: me.openid,
            });
            await store.dispatch("getUserInfo", {token});
            me.$Ruler.success("绑定成功");
          }

          me.close && me.close();
        } catch (e) {
          console.log("catch--", e);
        }
      },
    },
    components: {
      LineThrought,
    },
    watch: {
      operate(val) {
        this.step = val;
      },
    },
  };
</script>

<style lang="scss" scoped src="./account-ui.scss"></style>
<style lang="scss">
  .account-ui {
    .confirm {
      width: 100%;
      margin-top: 2px;
    }
    .el-checkbox__label {
      font-size: 14px;
      color: #999999;
    }
    .el-checkbox {
      margin-right: 2px;
    }
  }
</style>
