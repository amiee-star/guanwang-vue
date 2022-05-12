<template>
  <div class="case-page" id="case-page">
    <div class="banner">
      <div class="banner-img" @click="toPage(bannerInfo.link)">
        <img :src="bannerInfo.image" alt="" style="width:100%" />
      </div>
    </div>

    <div class="search-nav">
      <div class="base-container">
        <screenFilter
          :selectData="selectData"
          :filterTitle="true"
          @change="selctChange"
          :isLoading="isLoading"
          :defval="defFilter"
        ></screenFilter>
        <div class="search-fixed">
          <searchWord v-model="keyword" @onsearched="onsearched"></searchWord>
        </div>
      </div>
    </div>
    <div class="cases-w">
      <div class="base-container">
        <ul class="cardData flex-wrap-start">
          <li v-for="(item, index) in entities" :key="index">
            <card-box :data="item" :index="index" :isToDetail="isToDetail"></card-box>
          </li>
        </ul>
        <div class="nodata" v-show="entities.length <= 0 && !isLoading">
          <img src="@/assets/images/case/nodata.png" alt="" />
          <p>抱歉，没有找到相关信息</p>
        </div>
        <div class="loading" ref="loading" v-show="hasData && isLoading">
          <span
            ><img
              src="@/assets/images/case/jiazai.png"
              alt=""
              class="ant-custom-rotate"
            />正在加载中...</span
          >
        </div>
      </div>
    </div>
    <fixed-tool></fixed-tool>
  </div>
</template>
<script>
import cardBox from "@/components/card-box.vue";
import scaleImage from "@/components/scale-image.vue";
import searchWord from "@/components/search-case.vue";
import PageFooter from "@/components/page-footer/page-footer.vue";
import PageHeader from "@/components/page-header/page-header.vue";
import screenFilter from "@/components/screen-tags-filter.vue";
export default {
  data() {
    let defFilter = this.$route.query;

    return {
      isToDetail: true,
      recommands: Object.freeze([
        {
          url:
            "//3dshichuang.com/scene-portal/view/template?tempid=25481870-ea6f-d11e-51d6-cefbbaa48a2f",
          tempid: "25481870-ea6f-d11e-51d6-cefbbaa48a2f",
          thumbnail: require("@/assets/images/case/firstShow.jpg"),
          icon: require("@/assets/images/case/haibin.jpg"),
          name: "海滨别墅",
          userId: "f6152bd9-60fd-3f34-84d7-af9fe00ebf9e",
          headimgurl: require("@/assets/images/case/base64Image.png"),
          username: "JioJio",
          browserCount: 3022,
          favoriteCount: 1314,
          objStatus: true,
        },
        {
          url:
            "//3dshichuang.com/scene-portal/view/template?tempid=41d2ad66-2769-84a3-ac0e-b79069a0b0c0",
          tempid: "41d2ad66-2769-84a3-ac0e-b79069a0b0c0",
          thumbnail: require("@/assets/images/case/secondShow.jpg"),
          icon: require("@/assets/images/case/tiane.jpg"),
          name: "天鹅绒洞穴",
          userId: "f6152bd9-60fd-3f34-84d7-af9fe00ebf9e",
          headimgurl: require("@/assets/images/case/base64Image.png"),
          username: "JioJio",
          browserCount: 2286,
          favoriteCount: 1314,
          objStatus: true,
        },
        {
          url:
            "//3dshichuang.com/scene-portal/view/template?tempid=6e062f80-542d-2ec1-edb0-69df2b15273f",
          tempid: "6e062f80-542d-2ec1-edb0-69df2b15273f",
          thumbnail: require("@/assets/images/case/space.jpg"),
          icon: require("@/assets/images/case/hangkong.jpg"),
          name: "航空母舰博物馆",
          userId: "f6152bd9-60fd-3f34-84d7-af9fe00ebf9e",
          headimgurl: require("@/assets/images/case/base64Image.png"),
          username: "JioJio",
          browserCount: 2088,
          favoriteCount: 1314,
          objStatus: true,
        },
        {
          url:
            "//3dshichuang.com/scene-portal/view/template?tempid=38da7502-cb1c-7690-3cf5-bc615dc0c80b",
          tempid: "38da7502-cb1c-7690-3cf5-bc615dc0c80b",
          thumbnail: require("@/assets/images/case/beer.jpg"),
          icon: require("@/assets/images/case/beerLogo.jpg"),
          name: "微型啤酒厂",
          userId: "f6152bd9-60fd-3f34-84d7-af9fe00ebf9e",
          headimgurl: require("@/assets/images/case/base64Image.png"),
          username: "JioJio",
          browserCount: 2898,
          favoriteCount: 1314,
          objStatus: true,
        },
        {
          url:
            "//3dshichuang.com/scene-portal/view/template?tempid=f911d069-bc68-17a6-9acc-d5a944d757e4",
          tempid: "f911d069-bc68-17a6-9acc-d5a944d757e4",
          thumbnail: require("@/assets/images/case/villa.jpg"),
          icon: require("@/assets/images/case/jiazhou.jpg"),
          name: "加州别墅",
          userId: "f6152bd9-60fd-3f34-84d7-af9fe00ebf9e",
          headimgurl: require("@/assets/images/case/base64Image.png"),
          username: "JioJio",
          browserCount: 2558,
          favoriteCount: 1314,
          objStatus: true,
        },
        {
          url:
            "//3dshichuang.com/scene-portal/view/template?tempid=501ae65a-ac24-160e-028a-24e34a0f8f26",
          tempid: "501ae65a-ac24-160e-028a-24e34a0f8f26",
          thumbnail: require("@/assets/images/case/superMarket.jpg"),
          icon: require("@/assets/images/case/tiexiu.jpg"),
          name: "铁锈带市场",
          userId: "f6152bd9-60fd-3f34-84d7-af9fe00ebf9e",
          headimgurl: require("@/assets/images/case/base64Image.png"),
          username: "JioJio",
          browserCount: 2669,
          favoriteCount: 1314,
          objStatus: true,
        },
        {
          url:
            "//3dshichuang.com/scene-portal/view/template?tempid=8d44e5ff-408a-7f17-c6da-6debeebb7128",
          tempid: "8d44e5ff-408a-7f17-c6da-6debeebb7128",
          thumbnail: require("@/assets/images/case/hotel.jpg"),
          icon: require("@/assets/images/case/wende.jpg"),
          name: "温德姆纽约客酒店",
          userId: "f6152bd9-60fd-3f34-84d7-af9fe00ebf9e",
          headimgurl: require("@/assets/images/case/base64Image.png"),
          username: "JioJio",
          browserCount: 2288,
          favoriteCount: 1314,
          objStatus: true,
        },
      ]),
      bannerTopImg: "",
      entities: [],
      pageSize: 20,
      currentPage: 1,
      hasData: true,
      isLoading: false,
      keyword: this.$route.query.keyword || "",
      keyworded: false,
      search: { ...defFilter },
      defFilter: defFilter,
      selected: {},
      selectData: [
        {
          name: "行业",
          value: "styleId",
          type: "style",
          options: [],
        },
        {
          name: "类型",
          value: "cateId",
          type: "cate",
          options: [],
        },
      ],
      bannerInfo: {},
    };
  },
  computed: {
    quality() {
      //精选静态的显示隐藏
      if (this.$route.query.keyword !== undefined || this.keyworded) {
        return false;
      }
      let keys = Object.keys(this.search);
      if (keys.length > 0) {
        return false;
      }
      return true;
    },
  },
  components: {
    scaleImage,
    cardBox,
    searchWord,
    PageFooter,
    PageHeader,
    screenFilter,
  },
  mounted() {
    window.addEventListener("scroll", this.onscorll);
    this.getBanner();
    this.getList();
  },
  methods: {
    toPage(link) {
      if (link) {
        window.open(link);
      }
    },
    //获取banner
    getBanner() {
      this.$http.getBannerList({ type: 2, showType: 1 }).then((res) => {
        if (res.length > 0) {
          this.bannerInfo = res[0];
        }
      });
      // this.bannerTopImg = res.image;
    },
    selctChange(search) {
      this.search = search;
      this.onsearched();
    },
    searchParams() {
      let query = { ...this.search };
      if (this.keyword) {
        query["keyword"] = this.keyword;
      }
      this.$router.replace({ name: "case", query: query });
    },
    onsearched(e) {
      if (this.isLoading) {
        return;
      }
      this.hasData = true;
      this.currentPage = 1;
      this.keyworded = true;

      this.searchParams();
      this.getList();
    },
    toCreate() {
      this.$router.push({ name: "buyTpl" });
    },
    onscorll() {
      //console.log($(window).scrollTop(),$(this.$refs.loading).offset().top - $(window).height());
      // var offset = $(this.$refs.loading).offset();
      let scrollHeight = $(document).height();
      if ($(window).scrollTop() >= scrollHeight - $(window).height() - 500) {
        //需要数据
        this.getList();
      }
    },
    getList() {
      var me = this;
      if (!me.hasData || me.isLoading) {
        return;
      }
      var list = [];
      if (me.currentPage > 1) {
        list = me.entities;
      }
      me.isLoading = true;
      let params = {
        // type: 0,
        pageSize: me.pageSize,
        pageNum: me.currentPage,
      };
      for (let i in me.search) {
        params[i] = me.search[i];
      }
      params.keyword = me.keyword || "";
      me.$http
        .getSceneList(params)
        .then((res) => {
          // console.log(res.list);
          var entities = res.list || [];
          me.$utils.formatList(entities);
          if (entities.length < me.pageSize) {
            me.hasData = false;
          }
          me.currentPage = ++me.currentPage;
          me.entities = list.concat(entities);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          me.isLoading = false;
        });
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.onscorll);
  },
  watch: {
    $route(a, b) {
      if (a.name === "case" && this.keyword !== a.query.keyword) {
        this.keyword = a.query.keyword;
        this.onsearched();
      }
    },
  },
};
</script>
<style lang="scss" scoped src="./case.scss"></style>
