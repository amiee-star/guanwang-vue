<template>
  <div class="create-zhanting">
    <el-dialog
      :visible.sync="visible"
      :modal="false"
      :close-on-click-modal="false"
      @close="closeDialog"
      class="custom-dialog__wrapper"
    >
      <div class="box onscroll">
        <div class="step-two">
          <div class="h1">使用模板新建</div>
          <screenFilter @change="selctChange" :showType="false" ref="screenFilter"></screenFilter>
          <ul class="list">
            <li v-for="(item,index) in entities" :key="index" :class="item._thumbnail">
              <img :src="item.thumbnail" alt class="thumbnail" />
              <div class="guankan" @click="guankan(item)">
                <img src="@/assets/images/self/guankan.png" alt />
              </div>
              <p class="name">{{item.tags || ''}}</p>
              <div class="use" @click="userTpl(item)">使用该模板</div>
            </li>
          </ul>
          <div class="commonPagina" v-if="total>pageSize">
            <span class="total">共{{total}}个项目</span>
            <el-pagination
              layout="prev, pager, next"
              :total="total"
              :pager-count="5"
              :page-size="pageSize"
              :current-page.sync="currentPage"
              @current-change="getList"
            ></el-pagination>
          </div>
          <div class="notlike">
            没有找到喜欢的模板？可以拨打
            <span>400-080-9959</span>客服电话定制空间模板
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
import screenFilter from "@/components/screen-tags-filter.vue";
import router from "@/router";
export default {
  props: ["isvisible"],
  data() {
    return {
      visible: this.isvisible || false,
      sceneType: [],
      total: 0,
      pageSize: 6,
      currentPage: 1,
      entities: [],
      search: {}
    };
  },
  components: {
    screenFilter
  },
  methods: {
    closeDialog() {
      this.$emit("close");
      this.visible = false;
      this._promise && this._promise.resolve("cancel");
    },
    selctChange(search) {
      this.search = search;
      this.currentPage = 1;
      this.getList(1);
    },
    getList(currentPage) {
      var me = this;
      me.currentPage = currentPage;
      let params = {
        pageSize: me.pageSize,
        currentPage: currentPage,
        ...me.search
      };
      me.$http
        .getTemplate(params)
        .then(res => {
          if (me.currentPage == currentPage) {
            //没有被改变了,避免数据错乱
            var entities = res.entities || [];
            me.$utils.formatList(entities);
            me.entities = entities;
            me.total = res.count || 0;
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    guankan(item) {
      var url =  this.$utils.getArtViewUrl({G_TEMP_ID:item.tempid})
      window.open(url, "_blank");
    },
    async userTpl(item) {
      var me = this;
      var token = store.state.userinfo.token;
      var tempid = item.tempid;
     await me.$http.getCopyTempid({ token, tempid })
      let url = await me.$utils.getArtEditorUrl({tempid:tempid});
      window.location.href = url;

    }
  },
  watch: {
    isvisible(val) {
      if (val) {
        this.visible = val;
      } else {
        this.closeDialog();
      }
    },
    visible(val) {
      if (val) {
        this.selctChange({});
      } else {
        this.$refs.screenFilter && this.$refs.screenFilter.clear();
        this.search = {};
      }
    }
  }
};
</script>
<style lang="scss" scoped src="./create.scss"></style>
