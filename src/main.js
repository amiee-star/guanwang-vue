import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import QS from "qs";

import brower from "@/utils/brower";

//按需导入 element
import element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import PageHeader from "@/components/page-header/page-header.vue";
import PageFooter from "@/components/page-footer/page-footer.vue";

import Rouler from "@/config/plugin/index";
//自己的 Ui 插件
import plugin from "@/config/plugin/plugin";

import utils from "@/utils/utils";

import "@/assets/css/common.scss";
import "@/assets/css/animate-custom.css";
import $http from "@/config/api";

import commConst from "@/utils/comm_const";

import authCode from "@/components/auth-code.vue"; //自定义的，输入验证码，发送验证码组件
import vueScroll from "@/components/vue-scroll.vue"; //滚动条插件
import fixedTool from "@/components/fixed-tools.vue"; //返回首页
import mobileHeader from "@/views/mobile/components/nav-header";


import "@/assets/icons";

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);
import Calendar from "./utils/lib/install";
Vue.use(Calendar);

import * as filter from "@/config/filter";
import http from "./config/http";
import API from "./config/api";
Object.keys(filter).forEach((key) => {
  Vue.filter(key, filter[key]);
});
Vue.prototype.$http = $http;
Vue.prototype.$utils = utils;
Vue.prototype.$commConst = commConst;
Vue.config.productionTip = false;

Vue.use(element);
Vue.use(plugin);

Vue.prototype.$message = function(msg) {
  element.Message({...msg, duration: msg.duration || 1500})
}
Vue.prototype.$message.success = function(msg) {
  element.Message.success({message: msg, duration: 1500})
}
Vue.prototype.$message.warning = function(msg) {
  element.Message.warning({message: msg, duration: 1500})
}
Vue.prototype.$message.error = function(msg) {
  element.Message.error({message: msg, duration: 1500})
}

Vue.component("auth-code", authCode);
Vue.component("vue-scroll", vueScroll);
Vue.component("fixed-tool", fixedTool);
Vue.component("mobile-teader", mobileHeader);
Vue.component("PageHeader", PageHeader);
Vue.component("PageFooter", PageFooter);



//加载配置
window.artHost = process.env.VUE_APP_artHost;

//设置字体大小
if (brower.isMobile) {
  //手机端的适配
  (function() {
    function loaded() {
      try {
        if (brower.versions.iPad) {
          //是 ipad
          document.getElementsByTagName("html")[0].style.fontSize = "50px";
        } else {
          var width = document.documentElement.clientWidth;
          document.getElementsByTagName("html")[0].style.fontSize =
            width / 7.5 + "px";
        }
      } catch (e) {
        console.error(e);
      }
    }
    document.addEventListener("DOMContentLoaded", loaded);
    loaded();
  })();
}

try {
  //51 项目那边，登录的用，带上 _token 过来，在这边做一次登录
  //存在 其他项目传来的 _token
  let urlArr = window.location.href.split("?");
  let query = QS.parse(urlArr[1]);
  if (query._token && query._token != "undefined") {
    utils.setUserToken(query._token);
    delete query._token;
    let queryStr = QS.stringify(query);
    if (queryStr) {
      queryStr = urlArr[0] + "?" + queryStr;
    } else {
      queryStr = urlArr[0];
    }
    window.location.replace(queryStr);
  }

  //从微信从定向过来的 unionid
  if (query.openid && query.openid != "undefined" && !utils.getUserToken()) {
    $http.wxInfo(query.openid).then(async (res) => {
      if (res.isBindWeChat) {
        await store.dispatch("getUserInfo", { token: res.accessToken });
        location.search = "";
      } else {
        if(location.pathname == "/self/buy/tpl") {
          let options = {
            operate: 4,
            openid: query.openid,
            isLogin: true,
          };
          Rouler.account({
            options,
          });
        }
      }
    });
  }



  if (query.utm_from) {
    utils.store.setCookie("utm_from", query.utm_from, 1)
  }
} catch (e) {
  console.warn("外部项目参数获取错误:", e);
}

var token = utils.getUserToken() || "";

store.commit("initToken", token);




new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
