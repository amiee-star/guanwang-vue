<template>
  <div class="loading_dialog flex-center-column" v-if="visible">
    <div class="flex-center-column">
      <svg-icon icon-class="loading"></svg-icon>
      <p>{{msg}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name:"loading",
    props: {
      disvisible: {
        type: Boolean
      },
      msg: {
        type: String,
        default: '请稍等，正在上传中...'
      },
    },
    data () {
      return {
        visible: false,
      }
    },
    watch: {
      disvisible (val) {
        this.visible = val
      }
    }
  }
</script>

<style lang="scss">
  .loading_dialog {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 20;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);

    div{
      width:400px;
      height:236px;
      background:rgba(255,255,255,1);
      border-radius:12px;
      text-align: center;
      .svg-icon{
        font-size: 28px;
        animation: rotate 2s linear infinite;
        margin-bottom: 25px;
      }
      p{
        font-size:18px;
        font-family:Source Han Sans CN;
        color:rgba(51,51,51,1);
      }
    }

  }
  @keyframes rotate {
    from{
      transform: rotateZ(0deg);
    }
    to{
      transform: rotateZ(360deg);
    }
  }
</style>
