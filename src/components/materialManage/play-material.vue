<template>
  <div class="play-material">
    <el-dialog
      :visible.sync="isPlay"
      :fullscreen="false"
      :modal="true"
      :show-close="true"
      :before-close="onbeforeClose"
      :close-on-click-modal="false">
      <template v-if="isPlay && url">
        <iframe
          :src="url"
          frameborder="0"
          webkitallowfullscreen=""
          mozallowfullscreen=""
          allowfullscreen=""
          :class="playClass"
        ></iframe>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["isPlay", "url", "playClass"],
  data() {
    return {
      // isModel: false
    };
  },
  // watch: {
  //   isPlay(val) {
  //     if (val) {
  //       this.isModel = this.url.includes("code") ? true: false
  //     }
  //
  //   }
  // },
  methods: {
    onbeforeClose() {
      this.$emit("closeDialog");
    },
  },
};
</script>
<style lang="scss">
div.play-material {
  div.el-dialog {
    background: transparent;
    margin: 0 !important;
    width: 100%;
    height: 100%;
    div.el-dialog__header {
      height: 0;
      padding: 0;
      .el-dialog__headerbtn {
        top: 15px;
      }
      .el-dialog__close {
        color: #909399;
        font-size: 26px;
        background: #fff;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        line-height: 30px;
      }

    }
    div.el-dialog__body {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      height: 100%;
      .picIframe{
        width: 100%;
        height: 100%;
      }
      .modelIframe{
        padding: 10px;
        background-color: #fff;
        width: 80vw;
        height: 45vw;
      }
      .modelIframe2{
        width: 100%;
        height: 100vw;
      }
      .editorIframe{
        width: 90vw;
        height: 47vw;
      }
    }
  }
}
</style>
