<template>
  <div class="account-center">
    <el-dialog
      :visible.sync="visible"
      :modal="false"
      :close-on-click-modal="false"
      @close="closeDialog()"
      class="custom-dialog__wrapper"
    >
      <div :class="browerObj.isMobile ? 'box mobile' :'box'">
        <a
          v-if="!browerObj.isMobile"
          :href="bannerInfo.link ? bannerInfo.link : ''"
          target="_blank"
          rel="noopener"
          class="banner"
        >
          <img :src="bannerInfo.image" alt=""/>
        </a>
        <div class="info">
          <accountUi v-bind="options" v-on="on" v-bind:close="closeDialog" v-if="visible"></accountUi>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Logo from "@/components/logo.vue";
  import accountUi from "./account-ui";
  import brower from "@/utils/brower";

  export default {
    name: "account-center",
    props: {
      isvisible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        visible: false,
        dialogVisible: false,
        on: {},
        options: {},
        bannerInfo: "",
        browerObj: brower
      }
    },
    methods: {
      closeDialog(state) {
        this.$emit('close');
        this.visible = false;
        this._promise && this._promise.resolve(state || "cancel");
        this.options = {};
      },
      //获取banner
      getBanner() {
        this.$http.getBannerList({type: 11, showType: 1}).then((res) => {
          if (res.length > 0) {
            this.bannerInfo = res[0];
          }
        });
      },
    },
    components: {
      Logo,
      accountUi,
    },
    mounted() {
    },
    computed: {},

    watch: {
      visible(val) {
        if (val) {
          this.getBanner();
        }
      },
      isvisible(val) {
        if (val && this.bannerImg) {
          this.visible = val;
        } else {
          this.closeDialog();
        }
      }
    }
  }
</script>
<style lang="scss" scoped src="./account.scss"></style>
<style lang="scss">
  .account-center {
    .logo-componets {
      img {
        height: 38px;
      }
    }
  }
</style>

