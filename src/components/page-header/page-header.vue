<template>
  <div class="header-w" :style="height">
    <div class="header" :style="style" @mouseleave="leaveHandle">
      <div class="width80">
        <div class="left-nav">
          <div class="logo">
            <logo></logo>
          </div>
          <ul class="navs">
            <router-link :to="{ name: 'index' }" exact tag="li" @mouseover.native="enterHandle('')">
              <div>
                首页
              </div>
            </router-link>
            <router-link
                class="about"
                id="goMarketing"
                to=""
                tag="li"
                @mouseover.native="enterHandle('about')"
            >
              <div>
                产品
              </div>
            </router-link>
            <li
                @click="refresh"
                :class="{ 'router-link-exact-active': $route.name === 'case' }"
                @mouseover="enterHandle('')"
            >
              <div>精品案例</div>
            </li>
            <router-link
                id="goMarketing"
                to=""
                class="about"
                tag="li"
                @mouseover.native="enterHandle('solution')"
            >
              <div>解决方案</div>
            </router-link>
            <router-link :to="{ name: 'help' }" exact tag="li" @mouseover.native="enterHandle('')">
              <div>
                帮助中心
              </div>
            </router-link>
          </ul>
        </div>


        <div class="right-nav">
          <div class="login-register">
            <div class="notlogin" v-if="!userinfo || !$utils.getUserToken()">
              <div class="box" @click="login(0)">
                <span>注册</span>
                <span>/</span>
                <span>登录</span>
              </div>
            </div>
            <div class="logined" v-if="userinfo && $utils.getUserToken()">
              <div class="avatar">
                <img
                    :src="userinfo.avatar ? userinfo.avatar : defaultImg"
                    alt
                />
              </div>
              <ul class>
                <router-link tag="li" :to="{ name: 'selfMain' }">
                  <svg-icon iconClass="mySpace"></svg-icon>
                  我的空间
                </router-link>
                <router-link tag="li" :to="{ name: 'selfMaterial' }">
                  <svg-icon iconClass="mg_material"></svg-icon>
                  素材管理
                </router-link>
                <router-link v-if="userinfo.devFlag" tag="li" :to="{ name: 'exhibitionSetMeal' }">
                  <svg-icon iconClass="mg_model"></svg-icon>
                  展会工作台
                </router-link>
                <router-link tag="li" :to="{ name: 'selfAccount' }">
                  <svg-icon iconClass="mg_account"></svg-icon>
                  账户管理
                </router-link>
                <router-link tag="li" :to="{ name: 'order' }">
                  <svg-icon iconClass="order"></svg-icon>
                  我的账户
                </router-link>
                <li @click="loginOut">
                  <svg-icon iconClass="loginout"></svg-icon>
                  退出
                </li>
              </ul>
            </div>
            <ul class="nav">
              <li @click="goFree" class="freeButton">
                <div class="made3d">{{userinfo? "模板中心" : "免费使用"}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="slideDown">
        <ul>
          <li v-for="item in slideDownArr" :key="item.link" @click="goDetails(item.link)">
            <img :src="item.img" alt="">
            <div class="text">
              <h5>{{item.title}}</h5>
              <p>{{item.desc}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import logo from "@/components/logo.vue";
  import searchWord from "@/components/search-case.vue";
  import Scroller from '@/components/scroller.vue'

  export default {
    props: {
      gradual: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        devFlag: false,
        openSearch: false,
        scrollTop: 0,
        routerName: "",
        imgshow: true,
        list: ["尊敬的3D云展用户：您好，为了提升云展厅中的“商品3D模型”的编辑展示效果，3D云展平台“模型管理”功能模块计划于2022年2月7日8:00至2022年2月22日24:00进行引擎升级，升级期间平台的模型素材管理功能、模型布展及模型浏览等功能将无法正常使用，其它功能不受影响，如有带来不便，敬请谅解！"],
        defaultImg:
          "//3dshichuang.com/scene-portal/resources/wxapp/images/avatar.png",
        slideDownArr: [],
        aboutArr: [{
          link: "/show",
          img: require("@/assets/images/home/about-show.png"),
          title: "3D展厅",
          desc: "提供全行业3D数字化展厅解决方案"
        }, {
          link: "/serviced",
          img: require("@/assets/images/home/about-serviced.png"),
          title: "3D展会定制系统",
          desc: "云上展会一站式搭建+服务系统"
        }, {
          link: "/saasServiced",
          img: require("@/assets/images/home/about-saas.png"),
          title: "3D展会SAAS系统",
          desc: "云上展会标准化SAAS服务平台"
        }],
        solutionArr: [{
          link: "/solution/marketing",
          img: require("@/assets/images/home/solution-marketing.png"),
          title: "企业营销",
          desc: "5G+AI+3D，数字化营销升级利器"
        }, {
          link: "/solution/mall",
          img: require("@/assets/images/home/solution-mall.png"),
          title: "3D商城",
          desc: "云逛街场景+营销玩法，电商新趋势"
        },
          //   {
          //   link: "/solution/government",
          //   img: require("@/assets/images/home/solution-government.png"),
          //   title: "党政军史",
          //   desc: "定制化服务，新技术助力传统文化传承"
          // },
          {
            link: "/solution/exposition",
            img: require("@/assets/images/home/solution-exposition.png"),
            title: "数字文博",
            desc: "面向文博工艺领域的全栈式解决方案"
          }, {
            link: "/solution/exhibition",
            img: require("@/assets/images/home/solution-exhibition.png"),
            title: "云上展会",
            desc: "高效、安全、稳定的3D展会系统"
          }]
      };
    },
    computed: {
      userinfo() {
        return this.$store.state.userinfo;
      },
      style() {
        let opacity = 0.1;
        if (this.gradual) {
          let x = this.scrollTop;
          if (x !== 0) {
            opacity = 0.1 * Math.log10(x) * Math.log10(x);
            if (opacity > 1) {
              opacity = 1;
            }
          }
        } else {
          opacity = 1;
        }
        return {backgroundColor: `rgba(25,25,25,${opacity})`};
      },
      height() {
        if (!this.gradual) {
          return {
            height: "62px",
          };
        }

        return {};
      },
    },
    components: {
      logo,
      searchWord,
      Scroller
    },
    created() {
      // this.$http.getUserInfo().then((res) => {
      //   console.log(res, 1111);
      //   if (res.devFlag) {
      //     this.devFlag = true;
      //   } else {
      //     this.devFlag = false;
      //   }
      // });
    },
    mounted() {
      if (this.gradual) {
        window.addEventListener("scroll", this.scroll);
      }
    },
    methods: {
      //跑马灯效果
      lampHandle() {
        var wrapper = document.getElementById('wrapper');
        var inner = wrapper.getElementsByClassName('inner')[0];
        var p = document.getElementsByClassName('p')[0];
      },
      scroll(e) {
        this.scrollTop = $(document).scrollTop();
      },
      searchw() {
        this.imgshow = false;
      },
      goFree() {
        if (this.userinfo && this.$utils.getUserToken()) {
          this.$router.push({name: "buyTpl"})
        } else {
          this.$Ruler.account({
            options: {
              operate: 0,
            },
          });
        }
      },
      login(operate) {
        this.$Ruler.account({
          options: {
            operate: operate,
          },
        });
      },
      oncreate() {
        this.$router.push({name: "buyTpl"});
      },
      async loginOut() {
        //推出登录
        await this.$http.logout()
        this.$store.commit("setUserInfo", "");
        location.reload();
        if (this.$route.meta && this.$route.meta.requireAuth) {
          this.$router.push({name: "index"});
        }
      },
      toCase(e) {
        if (this.$route.name === "case") {
          this.$router.replace({
            path: "/case",
            query: {
              keyword: e,
            },
          });
        } else if (this.$route.name === "buyTpl") {
          this.$router.push({
            path: "/self/buy/tpl",
            query: {
              keyword: e,
            },
          });
        } else {
          this.$router.push({
            path: "/case",
            query: {
              keyword: e,
            },
          });
        }
      },
      refresh() {
        if (this.$route.name === "case") {
          this.$router.push({name: "case"}, () => {
            location.reload()
          });
        } else {
          this.$router.push({name: "case"});
        }
      },
      goDetails(val) {
        if (val === '/show' || val === '/serviced') {
          this.$router.push(val)
        } else {
          this.$router.push(val, () => {
            location.reload()
          })
        }
      },
      // toExhibitionSetMeal() {
      //   this.$router.push({ path: "/exhibitionSetMeal" });
      // },
      enterHandle(v) {
        if (v === 'about') {
          this.slideDownArr = this.aboutArr;
          $(".slideDown").removeClass("solution").addClass("about").show();
        } else if (v === 'solution') {
          this.slideDownArr = this.solutionArr;
          $(".slideDown").removeClass("about").addClass("solution").show();
        } else {
          $(".slideDown").hide();
        }

      },
      leaveHandle() {
        $(".slideDown").hide();
      }
    },
    watch: {
      $route(to, from) {
        this.openSearch = false;
        if (this.gradual) {
          window.addEventListener("scroll", this.scroll);
        }
      },
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.scroll);
    },
  };
</script>

<style lang="scss" scoped src="./page-header.scss"></style>
