<template>
  <div class="self-account">
    <page-header :gradual="false"></page-header>
    <div class="self-base-container">
      <div class="box">
        <div class="h1">账户设置</div>
        <ul>
          <li>
            <div class="left">
              <div class="key">昵称：</div>
              <div class="val" :class="{ edting: edting == 'username' }">
                <span class="result">{{ userinfo.nickname }}</span>
                <el-input
                  class="edit"
                  v-model="userinfo.nickname"
                  placeholder="请输入用户名(2-24个字符)"
                  maxlength="10"
                  @change="editNickname($event)"
                ></el-input>
              </div>
            </div>
            <div class="right">
              <span @click="edting = 'username'">编辑</span>
            </div>
          </li>
          <li>
            <div class="left">
              <div class="key">头像：</div>
              <div class="val">
                <img :src="userinfo.avatar + '?v=' + Math.random()" alt=""/>
              </div>
            </div>
            <div class="right">
              <span @click="imagesClip = true">上传头像</span>
            </div>
          </li>
          <li>
            <div class="left">
              <div class="key">手机号码：</div>
              <div class="val">{{ userinfo.telephone }}</div>
            </div>
            <div class="right">
              <span></span>
            </div>
          </li>
          <li>
            <div class="left">
              <div class="key">登录密码：</div>
              <div class="val">************</div>
            </div>
            <div class="right">
              <span @click="resetPwd">修改</span>
            </div>
          </li>
          <li>
            <div class="left">
              <div class="key">支付密码：</div>
              <div class="val">************</div>
            </div>
            <div class="right">
              <span @click="resetPay">修改</span>
            </div>
          </li>
          <li>
            <div class="left">
              <div class="key">邮箱：</div>
              <div class="val" :class="{ edting: edting == 'email' }">
                <span class="result">{{
                  userinfo.email || "请输入邮箱地址"
                }}</span>
                <el-input
                  class="edit"
                  v-model="userinfo.email"
                  placeholder="请输入邮箱地址"
                  @change="editEmail"
                ></el-input>
              </div>
            </div>
            <div class="right">
              <span @click="edting = 'email'">编辑</span>
            </div>
          </li>
          <li>
            <div class="left">
              <div class="key">个性签名：</div>
              <div class="val" :class="{ edting: edting == 'sign' }">
                <span class="result">{{
                  userinfo.signature || "请输入个性签名(2-24个字符)"
                }}</span>
                <el-input
                  class="edit"
                  v-model="userinfo.signature"
                  placeholder="请输入个性签名(2-24个字符)"
                  maxlength="24"
                  @change="editSign"
                  @blur="edting = ''"
                ></el-input>
              </div>
            </div>
            <div class="right">
              <span @click="edting = 'sign'">编辑</span>
            </div>
          </li>
          <li>
            <div class="left">
              <div class="key">第三方帐号绑定：</div>
              <div class="val">
                <img
                  src="@/assets/images/self/weichat.png"
                  alt=""
                  v-if="userinfo.isBindWeChat"
                />
                <img src="@/assets/images/self/weichat-hui.png" alt="" v-else/>
                微信
              </div>
            </div>
            <div class="right">
              <span @click="unbind = true" v-if="userinfo.isBindWeChat"
              >解绑</span
              >
              <span v-else @click="weixinLogo">绑定</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <unbind :isvisible="unbind" @close="unbind = false"></unbind>
    <!-- avatar -->
    <imagesClip
      :isvisible="imagesClip"
      @close="imagesClip = false"
      @changeImg="changeImg"
      :coverUrl="userinfo.avatar"
    ></imagesClip>
    <fixed-tool></fixed-tool>
  </div>
</template>

<script>
  import unbind from "@/components/unbind.vue";
  import imagesClip from "@/components/image-clip.vue";
  import PageHeader from "@/components/page-header/page-header.vue";
  import router from "@/router.js";
  import Rouler from "@/config/plugin/index";

  export default {
    data() {
      return {
        edting: "",
        unbind: false,
        imagesClip: false,
      };
    },
    components: {
      unbind,
      imagesClip,
      PageHeader,
    },
    computed: {
      userinfo() {
        console.log(this.$store.state.userinfo);
        return this.$store.state.userinfo;
      },
    },
    mounted() {
      let me = this;
      window.addEventListener("click", this.setclick);
      let openId = new URL(location.href).searchParams.get("openid");
      let accessToken = new URL(location.href).searchParams.get("access_token");
      if (!this.userinfo.telephone && openId) {
        Rouler.account({
          openid: openId,
          accessToken: accessToken,
        });
      } else if (openId && this.userinfo.telephone) {
        me.$http.editBind({openid: openId}).then(() => {
          this.$store.commit("setUserInfoKeyVal", {
            k: "isBindWeChat",
            v: true,
          });
          location.search = ""
        });
      }


    },
    methods: {
      setclick(e) {
        if (
          !(
            $(e.target).closest(".right").length > 0 ||
            $(e.target).hasClass("el-input__inner")
          )
        ) {
          this.edting = "";
        }
      },
      changeInfo(k, v) {
        this.$store.commit("setUserInfoKeyVal", {k, v});
      },
      editNickname(v) {
        var me = this;
        v = v.trim();
        if (v.length < 2 || v.length > 10) {
          this.$message.error("用户名长度为2-10个字符");
          return;
        }
        me.edting = "";
        me.$http
          .editNickname({nickname: v, token: me.userinfo.token})
          .then(() => {
            me.changeInfo("nickname", v);
          });
      },
      editEmail(v) {
        var me = this;
        if (!me.$utils.check.email(v)) {
          this.$message.error("请输入正确的邮箱");
          return;
        }
        me.edting = "";
        me.$http.editEmail({email: v, token: me.userinfo.token}).then(() => {
          me.changeInfo("email", v);
        });
      },
      editSign(v) {
        var me = this;
        v = v.trim();
        if (v.length < 2) {
          me.$message.error("签名长度不能小于2");
          return;
        }
        me.edting = "";
        //
        me.$http.editSign({signature: v, token: me.userinfo.token}).then(() => {
          me.changeInfo("signature", v);
        });
      },
      changeImg(file, base) {
        var me = this;
        var dt = new FormData();
        console.log(me.userinfo.token);
        dt.append("token", me.userinfo.token);
        dt.append("file", file);
        // dt.token = me.userinfo.token;
        // dt.file = file;
        // console.log(dt, "!!!!!!!!!!!!!!!!!!!");
        me.$loading();
        me.$http
          .editHeadimg(dt)
          .then((res) => {
            console.log(res);
            setTimeout(function () {
              me.$loading().close();
            }, 500);
            // me.changeInfo("headimgurl", res + "?v=" + new Date().getTime());
            me.changeInfo("avatar", res + "?v=" + new Date().getTime());
          })
          .catch(() => {
          });
      },
      resetPwd() {
        var me = this;
        me.$Ruler.account({
          options: {
            operate: 6
          },
        })
        //   .then(res => {
        //   if (res === "ok") {
        //     me.$store.commit("setUserInfo", "");
        //     location.reload();
        //   }
        // })
      },
      resetPay() {
        var me = this;
        me.$Ruler.revisePay().then(res => {
          if (res === "ok") {
            me.$store.commit("setUserInfo", "");
            location.reload();
          }
        })
      },
      async weixinLogo() {
        // try {
        //   let res = await this.$http.editBind({ token: this.userinfo.token });
        //   if (res == 2006) {
        //     //没有绑定过
        //     //点击微信登录 encodeURIComponent
        //     var url = this.$http.isWxBind;
        //     url =
        //       url +
        //       "?state=" +
        //       encodeURIComponent(router.history.current.fullPath);
        //     window.location.href = url;
        //   } else {
        //     this.$store.commit("setUserInfoKeyVal", {
        //       k: "isBindWeChat",
        //       v: true,
        //     });
        //   }
        // } catch (e) {}
        //点击微信登录 encodeURIComponent
        // var url = this.$http.wxLoginUrl;
        // url = url + "?state=" + encodeURIComponent(location.origin+location.pathname);
        // window.location.href = url;
        let me = this;
        me.$Ruler.account({
          options: {
            operate: 7,
          },
        });

      },
    },
  };
</script>
<style lang="scss" scoped src="./account.scss"></style>
