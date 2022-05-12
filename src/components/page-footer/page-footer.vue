<template>
  <div class="page-footer" ref="footer">
    <template v-if="show">
      <div class="contain">
        <div class="base-container">
          <div class="info">
            <div class="block logo">
              <img src="@/assets/images/home/footerLogo.png" />
              <p>一站式3D数字化营销解决方案</p>
            </div>
            <div class="line"></div>
            <div class="block">
              <div class="title">解决方案</div>
              <ul>
                <li class="info">
                  <router-link :to="{ path: '/solution/marketing' }" tag="div">企业营销</router-link>
                  <router-link :to="{ name: 'guide' }" tag="div">3D智能导览系统</router-link>
<!--                  <div @click="goDetails('/solution/marketing')">企业营销</div>-->
<!--                  <div @click="goDetails('/guide')">3D智能导览系统</div>-->
                </li>
                <li class="info">
                  <router-link :to="{ path: '/solution/mall' }" tag="div">3D商城</router-link>
                  <router-link :to="{ name: 'solved' }" tag="div">3D云展系统</router-link>
<!--                  <div @click="goDetails('/solution/mall')">3D商城</div>-->
<!--                  <div @click="goDetails('/solved')">3D云展系统</div>-->
                </li>
<!--                <li @click="goDetails('/solution/government')" class="info">-->
<!--                  <div>党政军史</div>-->
<!--                </li>-->
                <li class="info">
                  <router-link :to="{ path: '/solution/exposition' }" tag="div">数字文博</router-link>
<!--                  <div>数字文博</div>-->
                </li>
                <li class="info">
                  <router-link :to="{ path: '/solution/exhibition' }" tag="div">云上展会</router-link>
<!--                  <div>云上展会</div>-->
                </li>
              </ul>
            </div>
            <div class="block">
              <div class="title about-us">关于我们</div>
              <ul>
                <router-link :to="{ name: 'aboutUs' }" tag="li"
                  >了解云展</router-link
                >
                <li @click="standardHandle">产品价格</li>
                <li @click="readCunt()">用户协议</li>
              </ul>
            </div>
            <div class="block">
              <div class="title">联系我们</div>
              <ul>
                <li>电话：<span style="color: #FFFFFF">400-080-9959</span></li>
                <li>邮箱：service@jimuyida.com</li>
                <li>地址：深圳市南山区深南大道9996号松日鼎盛大厦21D</li>
              </ul>
            </div>
          </div>
          <!-- <ul class="icons flex">
                        <li class="flex-center-column" v-for="(item, index) in icons" :key="index">
                            <p class="flex-center-column"><svg-icon :icon-class="item.icon"></svg-icon></p>
                            <p>{{item.text}}</p>
                        </li>
                    </ul> -->
        </div>
      </div>

      <div class="copyright">
        <div class="base-container">
          <p>
            <span>友情链接：</span>
            <a
              :href="item.link"
              target="_blank"
              class="item"
              v-for="(item, index) in list"
              :key="index"
            >
              {{ item.label }}
            </a>
          </p>
          <p class="flex-center cursor" @click="goDetails('https://beian.miit.gov.cn/#/Integrated/recordQuery')">
            <img src="@/assets/images/footer/备案图标.png">粤公网安备 44030502008138号 | 粤ICP备2021054921号 | Copyright © 2021
            深圳积木易搭科技技术有限公司，保留一切权利！
          </p>
        </div>
      </div>
      <standard></standard>
    </template>
  </div>
</template>
<script>
import standard from "../standard.vue";
import router from "@/router.js";
export default {
  name: "page-footer",
  data() {
    return {
      num: 0,
      mediaObj: null,
      icons: [
        {
          text: "国家高新技术认定企业",
          icon: "footer1",
        },
        {
          text: "知识产权管理体系认证",
          icon: "footer2",
        },
        {
          text: "ISO认证",
          icon: "footer3",
        },
        {
          text: "CDR创新企业认证",
          icon: "footer4",
        },
        {
          text: "百强生态联盟合作认证",
          icon: "footer5",
        },
      ],
      // list: ["积木易搭","51建模网","尺子科技","文博会","阿里巴巴","京东","华为","格力","苹果（中国）" ],
      list: [
        {
          label: "积木易搭",
          link: "https://www.jimuyida.com",
        },
        {
          label: "51建模网",
          link: "https://www.51jianmo.com",
        },
        {
          label: "尺子科技",
          link: "http://www.ruler3d.com",
        },
        {
          label: "文博会",
          link: "http://www.cnicif.com",
        },
        {
          label: "阿里巴巴",
          link: "https://www.alibabagroup.com/cn/global/home",
        },
        {
          label: "京东",
          link: "https://about.jd.com",
        },
        {
          label: "华为",
          link: "https://career.huawei.com/reccampportal/portal5/index.html",
        },
        {
          label: "格力",
          link: "https://www.gree.cn",
        },
        {
          label: "苹果（中国）",
          link: "https://www.apple.com",
        },
        // {
        //   label: "世展之窗",
        //   link: "http://www.huazhanren.cn",
        // },
      ],
      show: false,
    };
  },
  mounted() {
    // this.getMeadiaList();
    let me = this;
    me.$nextTick(() => {
      window.addEventListener("scroll", function() {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        let cliHeight = document.documentElement.clientHeight;
        let footer = me.$refs.footer;
        let offsetTop = footer ? footer.offsetTop : 0;

        if (scrollTop >= offsetTop - cliHeight) {
          me.show = true;
        }
      });
    });
  },
  components: {
    standard,
  },
  methods: {
    standardHandle() {
      this.$store.commit("setStates", {
        k: "isShowStandard",
        v: true,
      });
      console.log(this.$store.state.isShowStandard);
    },
    readCunt() {
      router.push({ name: "userProtocol", params: { type: "user" } });
    },
    goDetails(val) {
      location.href = val;
    },
    async getMeadiaList() {
      var that = this;
      let paramse = {
        type: 1,
        pageSize: 4,
        currentPage: 1,
      };
      let res = await that.$http.mediaList(paramse);
      if (res.list.length > 0) {
        that.mediaObj = res.list;
      }
    },
    toDetail(item) {
      this.$router.push({ name: "aboutMediaDetail", params: { id: item.id } });
    },
  },
};
</script>

<style lang="scss" scoped src="./page-footer.scss"></style>
