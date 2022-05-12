<template>
  <div class="tpl-buy">
    <!-- <page-header :gradual="false"></page-header> -->
    <div class="main">
      <div class="base-container">
        <div class="tplfilter">
          <screenFilter
            @change="selctChange"
            :isLoading="isLoading"
            :showCondation="false"
            :showMore="true"
            :showType="true"
          >
          </screenFilter>
        </div>
        <div class="tpls">
          <ul v-if="ispc">
            <li
              v-for="(item, index) in entities"
              :key="index"
              :class="{
                'thumbnail-w': item._thumbnail,
                active: selected.tempid === item.tempid,
              }"
              @click="changeClick(item)"
            >
              <div class="box">
                <div v-if="item.type === $commConst.TPLTYPE.enterprise">
                  <div class="qiye">
                    <svg-icon iconClass="qy"></svg-icon>
                    <span>企业专属</span>
                  </div>
                </div>
                <div class="thumb">
                  <img :src="item.thumbnail" alt="" />
                </div>
                <div class="preview" @click.stop="toArt(item)">
                  <img
                    src="@/assets/images/create/yl.png"
                    width="14"
                    alt=""
                  />预览模板
                </div>
                <div class="bottom">
                  <p>
                    <template v-if="item.tags">编号：{{ item.tags }}</template>
                  </p>
                  <span>{{ item._sz }}{{ item._floorNum }}</span>
                </div>
              </div>
            </li>
            <div class="nodata" v-show="entities.length <= 0 && !isLoading">
              <img src="@/assets/images/case/nodata.png" alt="" />
              <p>抱歉，没有找到相关信息</p>
            </div>
          </ul>
          <ul v-if="ismobli">
            <li
              v-for="(item, index) in entities"
              :key="index"
              class="mobliStyle"
              :class="{
                'thumbnail-w': item._thumbnail,
                active: selected.tempid === item.tempid,
              }"
              @click="changeClick(item)"
            >
              <div class="box">
                <div v-if="item.type === $commConst.TPLTYPE.enterprise">
                  <div class="qiye">
                    <svg-icon iconClass="qy"></svg-icon>
                    <span>企业专属</span>
                  </div>
                </div>
                <div class="thumb">
                  <img :src="item.thumbnail" alt="" />
                </div>
                <div class="preview" @click.stop="toArt(item)">
                  <img
                    src="@/assets/images/create/yl.png"
                    width="14"
                    alt=""
                  />预览模板
                </div>
                <div class="bottom">
                  <p>
                    <template v-if="item.tags">编号：{{ item.tags }}</template>
                  </p>
                  <span>{{ item._sz }}{{ item._floorNum }}</span>
                </div>
              </div>
            </li>
            <div class="nodata" v-show="entities.length <= 0 && !isLoading">
              <img src="@/assets/images/case/nodata.png" alt="" />
              <p>抱歉，没有找到相关信息</p>
            </div>
          </ul>
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
    </div>
    <fixed-tool></fixed-tool>
  </div>
</template>
<script>
// import PageHeader from "@/components/page-header/page-header.vue";
import screenFilter from "@/components/screen-tags-filter.vue";
export default {
  name: "tpl-buy",
  data() {
    return {
      ispc: true,
      ismobli:false,
      isLoading: false,
      currentPage: 1,
      pageSize: 20,
      hasData: true,
      entities: [],
      selected: {},
      search: {},
      price: this.$commConst.PRICE,
      keyword: this.$route.query.keyword || "",
    };
  },
  components: {
    // PageHeader,
    screenFilter,
  },
  async mounted() {
    this.getList();
    window.addEventListener("scroll", this.onscroll);
    if (this.$route.query.parentId) {
      let info = await this.$http.getTemplateOne({
        parentId: this.$route.query.parentId,
      });
      this.selected = this.$utils.formatItem(info);
    }
  },
  watch: {
    $route: function (nval, oval) {
      this.search.keyword = nval.query.keyword;
      this.search.currentPage = 1;
      this.getList();
    },
  },
  created() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.ispc=false;
      this.ismobli=true;
    } else {
      this.ispc=true;
      this.ismobli=false;
    }
  },
  methods: {
    changeClick(item) {
      if (item.type == this.$commConst.TPLTYPE.general) {
        this.selected.tempid === item.tempid
          ? (this.selected = {})
          : (this.selected = item);
      } else {
        let url = `/tpl/view/${item.tempid}`;
        window.open(url, "_blank");
      }
    },
    async getList() {
      const me = this;
      if (!this.hasData || this.isLoading) {
        return;
      }
      try {
        this.isLoading = true;

        let param = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
        };
        for (let i in me.search) {
          param[i] = me.search[i];
        }
        let res = await this.$http.getTemplate(param);
        if (this.currentPage == param.currentPage) {
          //没有被改变了,避免数据错乱
          this.currentPage++;
          var entities = res.entities || [];
          me.$utils.formatList(entities);
          me.entities = me.entities.concat(entities);
          if (param.pageSize > entities.length) {
            this.hasData = false;
            this.currentPage++;
          }
        }
      } catch (e) {
        console.warn(e);
      }
      this.isLoading = false;
    },
    onscroll(e) {
      var offset = $(this.$refs.loading).offset();
      delete this.search.keyword;
      if (offset && $(window).scrollTop() >= offset.top - $(window).height()) {
        //需要数据
        this.getList();
      }
    },
    selctChange(opt) {
      this.search = opt;
      this.currentPage = 1;
      this.entities = [];
      this.hasData = true;
      this.getList();
    },
    toArt(item) {
      var url = `/tplDemo/view/${item.tempid}`;
      window.open(url, "_blank");
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onscroll);
  },
};
</script>
<style lang="scss" scoped src="./tplDemo.scss">
</style>