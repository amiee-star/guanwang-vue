<template>
  <div class="page-detail">
<!--    <page-header :gradual="false"></page-header>-->
    <div class="detail-content">
      <detail :hideLogo="true" :tempid="tempid" ref="detail"></detail>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/page-header/page-header.vue";
import detail from "@/components/they/detail/detail";
export default {
  data() {
    return {
      tempid: this.$route.params.tempid,
    };
  },
  mounted() {
    console.log(this.tempid);
  },
  components: {
    PageHeader,
    detail,
  },
};
</script>

<style lang="scss" scoped>
.page-detail {
  height: 100vh;

  .detail-content {
    margin-top: 8px;
    height: calc(100% - 65px);
    .content-w {
      height: 100%;
    }
  }
}
</style>
<style lang="scss">
.page-detail {
  .detail-content {
    div.they-detail-page {
      .content-w {
        height: 100%;
        padding: 20px 48px;
      }
    }
  }
}
</style>
