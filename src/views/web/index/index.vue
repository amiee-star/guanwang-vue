<template>
  <div class="index-nav">
    <page-header v-if="!isHide && !isIframe" :gradual="gradual"></page-header>
    <div class="index-apps">
      <router-view />
    </div>
    <!-- <fixed-tool></fixed-tool> -->
    <page-footer v-if="!noFooter"></page-footer>
  </div>
</template>
<script>
// @ is an alias to /src\
import PageFooter from "@/components/page-footer/page-footer.vue";
import PageHeader from "@/components/page-header/page-header.vue";
export default {
  name: "home",
  components: {
    PageFooter,
    PageHeader,
  },
  data() {
    return {
      isIframe: window.parent !== window,
      gradual: false,
      isHide: false,
      noFooter: false
    }
  },
  mounted() {
    const me = this
    me.gradual = me.$route.meta.gradual
    me.isHide = me.$route.meta.isHide
    me.noFooter = me.$route.meta.noFooter
  },
  watch:{
    $route: {
      handler(to) {
        if (to) {
          const me = this
          me.gradual = to.meta.gradual
          me.isHide = to.meta.isHide
          me.noFooter = to.meta.noFooter
        }
      },
      deep: true,
      immediate: true
    },
  }
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
