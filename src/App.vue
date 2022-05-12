<template>
  <div id="app" :class="isMobile ? 'mobile' : 'pc'">
    <router-view />
    <uploadModel />
    <sceneCounter></sceneCounter>
  </div>
</template>

<script>
import brower from "@/utils/brower";
import uploadModel from "./views/web/self/model/components/uploadModel";
import sceneCounter from "@/components/scene-counter";
export default {
  data() {
    return {
      isMobile: brower.isMobile,
    };
  },
  components: {
    uploadModel,
    sceneCounter
  },
};
</script>

<style lang="scss">
#app.pc {
  height: auto;
  min-width: 1200px;
}
#app.mobile {
  height: 100%;
  width: 100%;
}
body {
  .el-loading-mask {
    background-color: unset;
    .el-loading-spinner {
      width: 80px;
      height: 80px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      left: 47.8%;
      top: 47.8%;
      background-color: rgba(1, 1, 1, 0.7);
      border-radius: 10px;
    }
  }
}
</style>
