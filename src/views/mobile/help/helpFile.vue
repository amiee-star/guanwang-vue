<template>
  <div class="help-file">
    <div class="title">
      <div class="left">
        <img src="@/assets/logo-w.png" alt="" />
        <span>|</span>
        <span class="helpFileTitle">帮助文档</span>
      </div>
      <div class="right" @click="toHelp">返回官网</div>
    </div>
    <div class="contentBox"></div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  methods: {
    toHelp() {
      this.$router.push("/help");
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.help-file {
  width: 100%;
  height: 100%;
  background: #f4f5f9;
  .title {
    width: 100%;
    height: 60px;
    background-color: #000204;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 320px;
    line-height: 60px;
    color: #fff;
    .left {
      display: flex;
      img {
        width: 110px;
        height: 28px;
        margin-top: 16px;
        margin-right: 16px;
      }
      .helpFileTitle {
        margin-left: 16px;
        font-size: 20px;
      }
    }
    .right {
      cursor: pointer;
    }
  }
  .contentBox {
    width: 1280px;
    margin: 0 auto;
  }
}
</style>
