<template>
  <div class="solution">
    <mobileHeader></mobileHeader>
    <iframe id="iframe" :src="iframeUrl" frameborder="0"></iframe>
  </div>
</template>

<script>
import mobileHeader from "mobile/components/page-header/page-header.vue";
export default {
  data() {
    return {
      iframeUrl: process.env.VUE_APP_SolutionURL + location.pathname + ".html",
    };
  },
  created: function() {
    console.log(location.pathname);
    if (location.pathname == "/solution/marketing") {
      document.title = "3D云展_解决方案_企业营销";
    }
    if (location.pathname == "/solution/mall") {
      document.title = "3D云展_解决方案_3D商城";
    }
    // if (location.pathname == "/solution/government") {
    //   document.title = "3D云展_解决方案_党政军史";
    // }
    if (location.pathname == "/solution/exposition") {
      document.title = "3D云展_解决方案_数字文博";
    }
    if (location.pathname == "/solution/exhibition") {
      document.title = "3D云展_解决方案_云上展会";
    }
  },
  components: {
    mobileHeader,
  },
};
</script>

<style lang="scss" scoped>
.solution {
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
}
iframe {
  width: 100vw;
  height: calc(100vh - 1rem);
  position: relative;
}
</style>
