<template>
  <div class="tpl-buy">
    <page-header :gradual="false"></page-header>
    <div class="main">
      <div class="base-container">
        <ul class="nav">
          <li class="active">
            <img src="@/assets/images/self/step1.png" alt="" class="bg" />
            <div>
              <img
                src="@/assets/images/self/tpl1.png"
                alt=""
                class="icon"
              />选购展厅空间模板
            </div>
          </li>
          <li>
            <img src="@/assets/images/self/step2.png" alt="" class="bg" />
            <div>
              <img
                src="@/assets/images/self/tpl2.png"
                alt=""
                class="icon"
              />布置展厅空间
            </div>
          </li>
          <li>
            <img src="@/assets/images/self/step3.png" alt="" class="bg" />
            <div>
              <img
                src="@/assets/images/self/tpl3.png"
                alt=""
                class="icon"
              />发布并分享展厅
            </div>
          </li>
        </ul>
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
          <ul>
            <li
              v-for="(item, index) in list"
              :key="index"
              :class="{
                'thumbnail-w': item._thumbnail,
                active: selected.tempId === item.tempId,
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
                <div v-else-if="item.type === $commConst.TPLTYPE.general">
                  <div class="price " v-if="item._priceState === price.free">
                    免费
                  </div>
                  <div
                    class="price "
                    v-else-if="item._priceState === price.freeLimit"
                  >
                    限时免费
                  </div>
                  <div
                    class="price discountLimit"
                    v-else-if="item._priceState === price.discount"
                  >
                    {{ item._discount }}折 &yen;{{ item._price }}
                  </div>
                  <div
                    class="price discountLimit"
                    v-else-if="item._priceState === price.discountLimit"
                  >
                    <svg-icon iconClass="limitTime"></svg-icon>
                    {{ item._discount }}折 &yen;{{ item._price }}
                  </div>
                  <div
                    class="price num"
                    v-else-if="item._priceState === price.original"
                  >
                    &yen;{{ item.price }}
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
                <div
                  class="chooseItem"
                  v-if="item.type == $commConst.TPLTYPE.general"
                >
                  <span>{{
                    selected.tempid === item.tempid ? "取消选择" : "选择模板"
                  }}</span>
                  <span class="select"
                    ><img src="@/assets/images/create/right.png" alt=""
                  /></span>
                </div>
                <div
                  class="qykf"
                  @click.stop="$utils.showKf"
                  v-else-if="item.type == $commConst.TPLTYPE.enterprise"
                >
                  <svg-icon iconClass="qykf" class="iconkf"></svg-icon>
                  <span>在线咨询</span>
                </div>
                <div class="bottom">
                  <p>
                    <template v-if="item.tags">编号：{{ item.tags }}</template>
                  </p>
                  <span>{{ item._sz }}{{ item._floorNum }}</span>
                </div>
              </div>
            </li>
            <div class="nodata" v-show="list.length <= 0 && !isLoading">
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
    <div class="footer-info"><payFooter :selected="selected"></payFooter></div>
    <fixed-tool></fixed-tool>
  </div>
</template>
<script>
import PageHeader from "@/components/page-header/page-header.vue";
import screenFilter from "@/components/screen-tags-filter.vue";
import payFooter from "@/components/pay-footer/pay-footer.vue";
export default {
  name: "tpl-buy",
  data() {
    return {
      isLoading: false,
      currentPage: 1,
      pageSize: 20,
      hasData: true,
      list: [],
      selected: {},
      search: {},
      price: this.$commConst.PRICE,
      keyword: this.$route.query.keyword || "",
    };
  },
  components: {
    PageHeader,
    screenFilter,
    payFooter,
  },
  async mounted() {
    // this.$Ruler.payment();
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
    $route: function(nval, oval) {
      this.search.keyword = nval.query.keyword;
      this.search.currentPage = 1;
      this.getList();
    },
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
        console.log(res);
        if (this.currentPage == param.currentPage) {
          //没有被改变了,避免数据错乱
          this.currentPage++;
          var list = res.list || [];
          me.$utils.formatList(list);
          me.list = me.list.concat(list);
          if (param.pageSize > list.length) {
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
      var url = `/tpl/view/${item.tempid}`;
      window.open(url, "_blank");
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onscroll);
  },
};
</script>
<style lang="scss" scoped src="./tpl.scss"></style>
