<template>
  <div class="tpl-buy">
    <div class="banner">
      <div class="banner-img">
        <a
            :href="bannerInfo.link ? bannerInfo.link : ''"
            target="_blank"
            rel="noopener"
            class="bannerLink"
        >
          <img :src="bannerInfo.image" alt="" style="width:100%"/>
        </a>
      </div>
    </div>
    <div class="main">
      <div class="base-container">
        <div class="tplfilter">
          <screenFilter
              @change="selctChange"
              :isLoading="isLoading"
              :selectData="selectData"
              :defval="defFilter"
          >
          </screenFilter>
          <div class="search-fixed">
            <searchWord
                v-model="tempName"
                @onsearched="onsearched"
            ></searchWord>
          </div>
        </div>
        <div class="tpls">
          <ul class="dataContain flex-wrap-start" v-if="list.length">
            <li v-for="(item, index) in list" :key="index" @mouseleave="mouseleaveIcon(index)">
              <div
                  v-if="
                    list[index].discountRate < 1 && list[index].discountRate > 0
                  "
                  class="discount"
              >
                {{ (list[index].discountRate * 10).toFixed(1) }}折
              </div>
              <div :class="item._thumbnail" class="thumb flex-center-column" @click.stop="toView(item)">
                <img class="thumbnail" :src="item.thumb" alt=""/>
              </div>
              <!--<div-->
              <!--class="iconbox"-->
              <!--@mousemove="toShowInfo(item)"-->
              <!--@mouseout="toHiddenInfo(item)"-->
              <!--&gt;-->
              <!--<i class="el-icon-warning-outline"></i>-->
              <!--</div>-->

              <ul class="operationIcon">
                <li v-for="item2 in operationIcon" :key="item2.icon" @mouseenter="mouseenterIcon(item2.icon, index)"
                    @click.stop="clickIcon(item2.icon, item)">
                  <svg-icon :iconClass="item2.icon"></svg-icon>
                </li>
              </ul>

              <div class="popbox">
                <p>{{ item.tempName }}</p>
                <div
                    class="itemLine"
                    v-if="item.tempWidth && item.tempLength"
                >
                  <span>展厅长宽:</span>
                  <span>{{ item.tempLength }}m x {{ item.tempWidth }}m</span>
                </div>
                <div class="itemLine" v-if="item.validSz">
                  <span>展厅面积:</span>
                  <span>{{ item.validSz }}m²</span>
                </div>
                <div class="itemLine" v-if="item.roamNumber">
                  <span>漫游点位:</span>
                  <span>{{ item.roamNumber }}个</span>
                </div>
                <div class="itemLine" v-if="item.cdrNumber">
                  <span>推荐素材:</span>
                  <span>{{ item.cdrNumber }}个</span>
                </div>
                <!--                  <div class="itemLine" v-if="item.createTs">-->
                <!--                    <span>创建时间:</span>-->
                <!--                    <span>{{-->
                <!--                      Date.CustomerDateFormat(item.createTs, "yyyy-MM-dd")-->
                <!--                    }}</span>-->
                <!--                  </div>-->
                <div class="itemLine industry" v-if="item.styleList">
                  <span>适用行业:</span>
                  <div class="idxBox">
                    <div
                        class="industryItem "
                        v-for="(item1, index1) in item.styleList"
                        :key="index1"
                    >
                      {{ item1.styleName }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="preview flex">
                <!-- <div class="iconbox">
                  <i class="el-icon-warning-outline"></i>
                </div> -->
                <!--<p @click="toView(item)" class="view flex-center">-->
                <!--<svg-icon icon-class="view"></svg-icon>预览展厅-->
                <!--</p>-->
                <p @click="toCreate(item)" class="creat flex-center">
                  免费建展
                </p>
              </div>
              <div class="bottom">
                <p class="tow">
                  {{ item.tempName }}
                </p>
                <p>
                  <span>
                    <svg-icon iconClass="mianji"></svg-icon>
                    {{ item.validSz || 0 }}m²
                  </span>
                  <span>
                    <svg-icon iconClass="liulan1"></svg-icon>
                    {{ item.viewCount | formatnum }}
                  </span>
                </p>
              </div>
            </li>
          </ul>
          <div v-else>
            <div class="list-none">
              <img src="@/assets/images/self/none.png" alt=""/>
              <div class="text">抱歉，没有找到相关信息</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <fixed-tool></fixed-tool>
    <!--    <page-footer></page-footer>-->
  </div>
</template>

<script>
  import PageHeader from "@/components/page-header/page-header.vue";
  import PageFooter from "@/components/page-footer/page-footer.vue";
  import screenFilter from "@/components/screen-tags-filter.vue";
  import payFooter from "@/components/pay-footer/pay-footer.vue";
  import scaleImage from "@/components/scale-image.vue";
  import searchWord from "@/components/search-case.vue";

  export default {
    name: "freeExhibition",

    data() {
      let defFilter = this.$route.query;
      return {
        isLoading: false,
        pageNum: 1,
        pageSize: 20,
        hasData: true,
        list: [],
        selected: {},
        search: {},
        price: this.$commConst.PRICE,
        tempName: this.$route.query.tempName || "",
        bannerTopImg: "",
        search: {...defFilter},
        defFilter: defFilter,
        selectData: [
          {
            name: "分类",
            value: "typeId",
            type: "type",
            options: [],
          },
          {
            name: "面积",
            value: "code",
            type: "area",
            options: [],
          },
        ],
        bannerInfo: {},
        operationIcon: [{icon: "browse"}, {icon: "tips"}],
      };
    },
    components: {
      PageHeader,
      PageFooter,
      screenFilter,
      payFooter,
      scaleImage,
      searchWord,
    },
    async mounted() {
      this.getBanner();
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
        this.search.tempName = nval.query.tempName;
        this.pageNum = 1;
        this.getList();
      },
    },
    methods: {
      //获取banner
      getBanner() {
        this.$http.getBannerList({type: 3, showType: 1}).then((res) => {
          if (res.length > 0) {
            this.bannerInfo = res[0];
          }
        });
      },
      mouseenterIcon(icon, index) {
        switch (icon) {
          case 'tips':
            $(".dataContain > li").eq(index).find(".popbox").css("display", "block");
            break;
        }
      },
      mouseleaveIcon(index) {
        $(".dataContain > li").eq(index).find(".popbox").css("display", "none");
      },

      clickIcon(icon, item) {
        switch (icon) {
          case 'browse':
            this.toView(item)
            break;
        }
      },

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
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          };
          for (let i in me.search) {
            param[i] = me.search[i];
          }
          param.tempName = me.tempName || "";
          let res = await this.$http.getTemplate(param);
          // if (this.pageNum == param.pageNum) {
          //没有被改变了,避免数据错乱
          this.pageNum++;
          var list = res.list || [];
          me.$utils.formatList(list);
          me.list = me.list.concat(list);
          if (this.pageNum > res.totalPage) {
            this.hasData = false;
            this.pageNum++;
          }
          // }
        } catch (e) {
          console.warn(e);
        }
        this.isLoading = false;
      },
      onscroll(e) {
        // var offset = $(this.$refs.loading).offset();
        // var scrollTop = $(document).scrollTop();
        // var scrollHeight = $(document).height();
        // var windowHeight = $(window).outerHeight(true);
        // var footerHeight = $(".page-footer").height();
        // if (scrollTop + windowHeight >= scrollHeight - footerHeight) {
        //   this.getList();
        // }

        let scrollHeight = $(document).height();
        if ($(window).scrollTop() >= scrollHeight - $(window).height() - 500) {
          //需要数据
          this.getList();
        }

        delete this.search.tempName;
        // if (offset && $(window).scrollTop() >= offset.top - $(window).height()) {
        //   //需要数据
        //   this.getList();
        // }
      },
      selctChange(opt) {
        this.search = opt;
        this.onsearched();
        this.pageNum = 1;
        this.list = [];
        this.hasData = true;
        this.getList();
      },
      searchParams() {
        let query = {...this.search};
        if (this.tempName) {
          query["tempName"] = this.tempName;
        }
        this.$router.replace({name: "buyTpl", query: query});
      },
      onsearched(e) {
        if (this.isLoading) {
          return;
        }
        this.hasData = true;
        this.pageNum = 1;
        this.keyworded = true;
        this.list = [];
        this.searchParams();
        this.getList();
      },
      toArt(item) {
        var url = `/tpl/view/${item.tempid}`;
        window.open(url, "_blank");
      },
      toCreate(item) {
        let me = this;
        let token = this.$store.state.token.token;
        if (!token) {
          me.$Ruler.account({
            options: {
              operate: 0,
            },
          });
        } else {
          me.$Ruler
            .confirm({
              msg: "是否创建展厅？",
              desc: `${item.tempName}(${item.validSz}㎡)`,
            })
            .then(async (res) => {
              if (res === "ok") {
                var tempId = item.tempId;
                let scenId = await me.$http.getCopyTempid(tempId);
                let url = await me.$utils.getArtEditorUrl({
                  tempId: scenId,
                  token,
                });
                window.open(url);
              }
            });
        }
      },
      async toView(item) {
        let tempId = item.tempId,
          me = this;
        let url = await me.$utils.getArtPreviewUrl({
          G_TEMP_ID: tempId,
          isBuild: true,
          token: this.$store.state.token.token,
        });
        window.open(url);
      },
      toShowInfo(i) {
        // this.$set(i, "isShow", true);
        // console.log(i, "=====");
      },
      toHiddenInfo(i) {
        // i.isShow = false;
      },
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.onscroll);
    },
  };
</script>

<style lang="scss" scoped src="./tpl.scss"></style>
<style lang="scss">
  .popBigBox {
    width: 305px;
    margin: 0;
    .bottomBox {
      margin-top: 20px;
      .industryBox {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
</style>
