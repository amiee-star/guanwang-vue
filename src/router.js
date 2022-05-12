import Vue from "vue";
import Router from "vue-router";
import utils from "@/utils/utils";
import brower from "@/utils/brower";
import store from "@/store";

const web = (name) => () => import(`@/views/web/${name}`);
const mobile = (name) => () => import(`@/views/mobile/${name}`);
//const com = (name) => () => import(`@/components/${name}`);
const both = brower.isMobile ? mobile : web;

Vue.use(Router);

var routes = [
  {
    path: "/",
    component: both("index/index.vue"),
    children: [
      {
        path: "",
        component: both("home/home.vue"),
        name: "index",
        meta: {
          // title: "3d云展_3d展厅_企业展厅_展馆设计_线上展会",
          title: "3d云展_首页",
          showService: true,
        },
      },
      {
        path: "/self/main",
        name: "selfMain",
        component: web("self/main/main.vue"),
        meta: {
          title: "3d云展_个人空间",
          requireAuth: true,
        },
      },
      {
        path: "/self/account",
        name: "selfAccount",
        component: web("self/account/account.vue"),
        meta: {
          title: "3d云展_账户设置",
          requireAuth: true,
        },
      },

      {
        path: "/they/main/:tempId",
        name: "theySpace",
        component: web("they/main/main.vue"),
        meta: {
          title: "3d云展_个人空间",
        },
      },
      {
        path: "/userProtocol/:type",
        name: "userProtocol",
        component: web("protocol_user/userProtocol.vue"),
        meta: {
          title: "3d云展_用户协议",
          gradual: false
        },
      },
      {
        path: "/protocol/pay",
        name: "protocolPay",
        component: web("protocol_pay/protocol_pay.vue"),
        meta: {
          title: "3d云展_购买协议",
          gradual: false
        },
      },
      {
        path: "/crypto",
        component: web("crypto/cryptojs.vue"),
        name: "crypto",
        meta: {
          title: "3d云展_加密",
          gradual: false
        },
      },
      {
        path: "/about/us",
        name: "aboutUs",
        component: both("abouts/us/us.vue"),
        meta: {
          title: "3d云展_关于我们",
          showService: true,
        },
      },
      {
        path: "/about/media",
        name: "aboutMedia",
        component: web("abouts/media/media.vue"),
        meta: {
          title: "3d云展_媒体中心",
          showService: true,
          gradual: false
        },
      },
      {
        path: "/about/media/detail/:id",
        name: "aboutMediaDetail",
        component: web("abouts/media_detail/media_detail.vue"),
        meta: {
          title: "3d云展_媒体中心",
          showService: true,
          gradual: false
        },
      },
      {
        path: "/self/order",
        name: "order",
        component: web("self/order/order.vue"),
        meta: {
          title: "3d云展_支付记录",
          requireAuth: true,
          gradual: false
        },
      },
      {
        path: "/self/material",
        name: "selfMaterial",
        component: web("self/material/material.vue"),
        meta: {
          title: "3d云展_素材管理",
          requireAuth: true,
          gradual: false
        },
      },
      {
        path: "/self/article/detail/:id",
        name: "selfArticleDetail",
        component: web("self/article_detail/article_detail.vue"),
        meta: {
          title: "3d云展_文章详情",
          requireAuth: true,
          gradual: false
        },
      },
      {
        path: "/self/model",
        name: "selfModel",
        component: web("self/model/index.vue"),
        meta: {
          title: "3d云展_模板管理",
          requireAuth: true,
          gradual: false
        },
      },
      {
        path: "/self/statistics",
        name: "selfStatistics",
        component: both("self/statistics/statistics.vue"),
        meta: {
          title: "3d云展_云展统计",
          gradual: false,
          isHide: true
        },
      },
      {
        path: "/tpl/view/:tempid",
        name: "tplView",
        component: web("tpl/tpl-view/tpl-view.vue"),
        meta: {
          title: "3d云展_模板预览",
        },
      },
      {
        path: "/tplDemo/view/:tempid",
        name: "tplView",
        component: web("tpl/tpl-view/tplDemo-view.vue"),
        meta: {
          title: "3d云展_模板预览"
        },
      },
      {
        path: "/self/buy/tpl",
        name: "buyTpl",
        component: web("tpl/tpl-create/freeExhibition.vue"),
        meta: {
          title: "3d云展_模板中心",
          requireAuth: true,
          showService: true
        },
      },
      // {
      //   path: "/self/buy/tplDemo",
      //   name: "buyTplDemo",
      //   component: web("tpl/tpl-create/tplDemo.vue"),
      //   meta: {
      //     title: "3d云展_创建3D展厅",
      //     showService: true,
      //     gradual: false
      //   },
      // },
      {
        path: "/case",
        name: "case",
        component: both("case/case.vue"),
        meta: {
          title: "3d云展_精品案例",
          showService: true,
        },
      },
      {
        path: "/exhibitionSetMeal",
        name: "exhibitionSetMeal",
        component: web("exhibitionSetMeal/exhibitionSetMeal.vue"),
        meta: {
          title: "3d云展_展会工作台",
          showService: true,
          gradual: false
        },
      },
      {
        path: "/solved",
        name: "solved",
        component: both("solved/solved.vue"),
        meta: {
          title: "3D云展_解决方案",
          showService: true,
        },
      },
      {
        path: "/guide",
        name: "guide",
        component: both("guide/guide.vue"),
        meta: {
          title: "3D云展_导览岛系统",
          showService: true,
        },
      },
      {
        path: "/show/vr",
        name: "vr",
        component: both("vr/vr.vue"),
        meta: {
          title: "3D云展_VR带看",
          showService: true,
        },
      },
      {
        path: "/solution/:solutionName",
        name: "solution",
        component: both("solution/solution.vue"),
        meta: {
          title: "3D云展_解决方案_3D商城",
          showService: true,
          noFooter: true,
          gradual: false
        },
      },
      {
        path: "/show",
        // path: "/product/show",
        name: "show",
        component: both("show/show.vue"),
        meta: {
          title: "3D云展_产品_3D展厅",
          showService: true,
          gradual: false
        },
      },
      {
        path: "/makeNeed",
        // path: "/product/show",
        name: "makeNeed",
        component: mobile("makeNeed/makeNeed.vue"),
        meta: {
          title: "3D云展_产品_3D展厅定制",
          showService: true,
          gradual: false
        },
      },
      {
        path: "/makeNeed/needPrice",
        // path: "/product/show",
        name: "needPrice",
        component: mobile("makeNeed/needPrice.vue"),
        meta: {
          title: "3D云展_产品_3D展厅定制",
          showService: true,
          gradual: false
        },
      },
      {
        path: "/serviced",
        // path: "/product/serviced",
        name: "serviced",
        component: both("serviced/serviced.vue"),
        meta: {
          title: "3D展台_产品_3D展会系统",
          showService: true,
          gradual: true
        },
      },
      {
        path: "/saasServiced",
        name: "saasServiced",
        component: web("saasServiced/saasServiced.vue"),
        meta: {
          title: "3D展台_产品_3D展会SAAS系统",
          showService: true,
        },
      },
      {
        path: "/search",
        name: "search",
        component: mobile("search/search.vue"),
        meta: {
          title: "3d云展_搜索",
          showService: true,
          gradual: false
        },
      },
      {
        path: "/scheme",
        name: "scheme",
        component: both("scheme/scheme.vue"),
        meta: {
          title: "3d云展_解决方案",
          showService: true,
          gradual: false
        },
      },
      {
        path: "/detail/:tempid",
        name: "detail",
        component: both("they/detail/detail.vue"),
        meta: {
          title: "3d云展_详情",
          gradual: false
        },
      },
      {
        path: "/detail/:tempid/:materialid",
        name: "detailMaterial",
        component: both("they/detail-material/detail-material.vue"),
        meta: {
          title: "3d云展_素材详情",
          gradual: false
        },
      },
      // {
      //   path: "/create",
      //   name: "create",
      //   component: mobile("create/create.vue"),
      //   meta: {
      //     title: "3d云展_创建展厅",
      //     showService: true,
      //     gradual: false
      //   },
      // },
      {
        path: "/login",
        name: "login",
        meta: {
          title: "3d云展_登录",
          showService: true,
          gradual: false
        },
        component: web("login/login.vue"),
      },
      {
        path: "/petActive",
        name: "petActive",
        meta: {
          title: "3d云展_萌宠活动",
          gradual: false
        },
        component: mobile("petActive/petActive.vue"),
      },
      {
        path: "/help",
        name: "help",
        meta: {
          title: "3d云展_帮助中心",
        },
        component: web("help/help.vue"),
      },
      {
        path: "/helpVideo",
        name: "helpVideo",
        meta: {
          title: "3d云展_帮助视频",
          gradual: false
        },
        component: web("help/helpVideo.vue"),
      },
      {
        path: "/helpProblem",
        name: "helpProblem",
        meta: {
          title: "3d云展_常见问题",
          gradual: false
        },
        component: web("help/helpProblem.vue"),
      },
      {
        path: "/helpFile",
        name: "helpFile",
        meta: {
          title: "3d云展_帮助文档",
          gradual: false
        },
        component: web("help/helpFile.vue"),
      },
      {
        path: "/videoDetail",
        name: "videoDetail",
        meta: {
          title: "",
          gradual: false
        },
        component: web("help/openVideo.vue"),
      }
    ],
  },
];

var router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

const getService = (function() {
  let icon_module;
  // 最多尝试获取次数
  async function getDom(max) {
    max = max || 0;
    if (max <= 0) {
      return;
    }
    try {
      let res = await fn();
      return res;
    } catch (e) {
      return await getDom(--max);
    }
  }

  function fn() {
    return new Promise((resolve, reject) => {
      if (!icon_module) {
        icon_module = document.getElementById("iconDivMain1");
      }
      if (icon_module) {
        resolve(icon_module);
      } else {
        setTimeout(() => {
          reject();
        }, 1000);
      }
    });
  }

  return async function(to) {
    let show = false;
    if (to.meta && to.meta.showService) {
      // 是否显示客服
      show = true;
    }
    let dom = await getDom(10);
    if (dom) {
      if (show) {
        dom.style.display = "block";
        dom.style.opacity = 1;
      } else {
        dom.style.display = "none";
      }
    }
  };
})();

//  判断是否需要登录权限 以及是否登录


router.beforeEach((to, from, next) => {
  getService(to);

  // window_app = null
  // 修改标题
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "3D数字展厅";
  }
  if (to.matched.some((res) => res.meta.requireAuth)) {
    // 判断是否需要登录权限
    if (utils.getUserToken()) {
      // 判断是否登录
      next();
    } else {
      if(!to.query.openid) {
        store.commit("setUserInfo", "");
        // 没登录则跳转到登录界面
        if (to.path === "/login") {
          next();
        } else {
          next({
            path: "/login",
            query: { redirect: to.fullPath }, //将目的路由地址存入login的query中
          });
        }
      }else {
        next()
      }
    }
  } else {
    if (!to.query.utm_from) {
      const utm_from = utils.store.getCookie("utm_from")
      if (utm_from) {
        let query = to.query
        query.utm_from = utm_from
        router.replace({
          path: to.path,
          query
        }, () => {
          if ((to.path.includes("solution") && from.path.includes("solution")) || (from.path.includes("case") && to.path.includes("case") && !to.query.styleId)) {
            location.reload()
          }
        })
      } else {
        next()
      }

    } else {
      next()
    }
  }
});




//解决带来源参数报错的问题
const originalPush = Router.prototype.push

Router.prototype.push = function push(location, onResolve, onReject) {

  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)

  return originalPush.call(this, location).catch(err => err)

}
const originalReplace = Router.prototype.replace

Router.prototype.replace = function replace(location, onResolve, onReject) {

  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)

  return originalReplace.call(this, location).catch(err => err)

}

export default router;
