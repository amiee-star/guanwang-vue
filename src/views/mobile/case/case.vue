<template>
  <div class="m-case">
    <div class="headercase">
      <div class="header-w">
        <div class="headernav">
          <i @click="$router.push({ name: 'index' })"
            ><img src="@/assets/images/back.png" alt=""
          /></i>
          <searchCase v-model="keyword" @onsearched="onsearched"> </searchCase>
        </div>
        <div class="condation" v-on:touchstart.stop="">
          <div
            class="select"
            v-for="item in selectData"
            :key="item.value"
            @click="selectItem = item"
          >
            <span
              >{{
                search[item.value]
                  ? search[item.value].id
                    ? search[item.value].name
                    : item.name
                  : item.name
              }}
              <svg-icon iconClass="select"></svg-icon
            ></span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title=""
      :visible="!!selectItem"
      :show-close="false"
      :modal="false"
      width="100%"
    >
      <ul class="options" v-if="selectItem" v-on:touchstart.stop="">
        <li
          v-for="(opt, index) in selectItem.options"
          :key="index"
          :class="{ active: search[selectItem.value] === opt }"
          @click="selctChange(selectItem.value, opt)"
        >
          <span>{{ opt.name }}</span
          ><svg-icon iconClass="selected"></svg-icon>
        </li>
      </ul>
    </el-dialog>

    <ul class="arts" v-if="hasData || entities.length > 0">
      <li v-for="(item, index) in entities" :key="index">
        <div class="userinfo">
          <div class="avatar">
            <img :src="item.headimgurl" alt="" />
          </div>
          <div class="content">
            <div class="name">{{ item.nickname }}</div>
            <!-- <div class="time">{{ item._date }}</div> -->
          </div>
        </div>
        <div class="descText">
          <TextEllipsis>
            <span>【{{ item.tempName }}】</span>{{ item.description }}
          </TextEllipsis>
        </div>
        <div class="banner" :class="item._thumbnail" @click="toDetail(item)">
          <img :src="item.thumb" alt="" />
        </div>
        <!-- <CountNumber :info="item" /> -->
      </li>
    </ul>
    <div class="noData" v-else>
      <img src="@/assets/mimg/case/nodata.png" alt="" />
      <p>抱歉，没有搜索到相关的展厅</p>
    </div>
    <div class="loading" ref="loading" v-show="isLoading">加载中...</div>
    <pageFooter />
  </div>
</template>
<script>
import pageFooter from "mobile/components/page-footer/page-footer.vue";
import TextEllipsis from "mobile/components/text-ellipsis.vue";
import CountNumber from "mobile/components/count-number.vue";
import searchCase from "mobile/components/search-case.vue";
export default {
  name: "m-case",
  data() {
    return {
      bannerInfo: {},
      entities: [],
      pageSize: 20,
      currentPage: 1,
      hasData: true,
      isLoading: false,
      keyword: this.$route.query.keyword || "",
      selectItem: null,
      search: {},
      moldList: [
        {
          id: "",
          name: "全部",
        },
        {
          id: 1,
          cateId: 1,
          name: "实景展厅",
        },
        {
          id: 2,
          cateId: 2,
          name: "虚拟展厅",
        },
      ],
      selectData: [
        {
          name: "行业",
          value: "style",
          options: [],
        },

        // {
        //     name:"面积",
        //     value:"area",
        //     options:[]
        // },
        // {
        //     name:"楼层",
        //     value:"floor",
        //     options:[]
        // },
        {
          name: "类型",
          value: "cate",
          options: [],
        },
      ],
    };
  },
  components: {
    TextEllipsis,
    CountNumber,
    pageFooter,
    searchCase,
  },
  mounted() {
    window.addEventListener("scroll", this.onscorll);
    this.getList();
    this.getSearchData();
    this.getBanner();
    document.addEventListener("touchstart", this.touchstart.bind(this));
  },
  methods: {
    toDetail(item) {
      console.log(item)
      this.$router.push({path: `/detail/${item.tempId}`, params: {tempid: item.tempId}})
    },
    //获取banner
    getBanner() {
      this.$http.getBannerList({ type: 2, showType: 2 }).then((res) => {
        if (res.length > 0) {
          this.bannerInfo = res[0];
        }
      });
      // this.bannerTopImg = res.image;
    },
    // toUrl(url) {
    //   var url = this.$utils.getArtViewUrl({ G_TEMP_ID: url.tempId });
    //   window.open(url, "_blank");
    //   // this.$router.push({ name: "detail", params: { tempid: url.tempId } });
    // },
    getSearchData() {
      let selectData = this.selectData;
      this.$http.getStyleList().then((res) => {
        // for (let i = 0; i < selectData.length; i++) {
        let item = selectData[0];
        let item2 = selectData[1];
        let opt = res;
        opt.unshift({ id: "", name: "全部" });
        item.options = opt;
        item2.options = this.moldList;
        // }
      });
    },
    selctChange(typ, opt) {
      if (this.isLoading) {
        return;
      }
      this.$set(this.search, typ, opt);
      this.selectItem = null;
      this.onsearched();
    },
    onsearched(e) {
      if (this.isLoading) {
        return;
      }
      this.hasData = true;
      this.currentPage = 1;
      this.getList();
    },
    onscorll() {
      //console.log($(window).scrollTop(),$(this.$refs.loading).offset().top - $(window).height());
      let scrollHeight = $(document).height();
      if ($(window).scrollTop() >= scrollHeight - $(window).height() - 500) {
        //需要数据
        this.getList();
      }
    },
    touchstart(e) {
      this.selectItem = null;
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
        if (me.search[i].id) {
          params[`${i}Id`] = me.search[i].id;
        }
      }
      params.keyword = me.keyword || "";
      me.$http
        .getSceneList(params)
        .then((res) => {
          var entities = res.list || [];
          me.$utils.formatList(entities);
          if (entities.length < me.pageSize) {
            me.hasData = false;
          }
          me.currentPage = ++me.currentPage;
          me.entities = list.concat(entities);
        })
        .catch(() => {})
        .finally(() => {
          me.isLoading = false;
        });
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.onscorll);
    document.removeEventListener("touchstart", this.touchstart.bind(this));
  },
};
</script>
<style lang="scss" scoped src="./case.scss"></style>
<style lang="scss">
.m-case {
  .el-dialog__wrapper {
    top: 1.85rem;
    background: rgba(0, 0, 0, 0.5);
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
    }
    .el-dialog {
      margin: 0 !important;
      padding: 0;
    }
    ul.options {
      color: #666666;
      background: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      padding: 0 0.36rem;
      max-height: 5.15rem;
      overflow-y: auto;
      li {
        height: 0.86rem;
        white-space: nowrap;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        svg {
          display: none;
          font-size: 0.36rem;
        }
        &.active {
          color: #23b8ff;
          svg {
            display: block;
          }
        }
      }
    }
  }
}
</style>
