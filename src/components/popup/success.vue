<template>
  <transition name="el-zoom-in-center">
    <el-dialog :visible.sync="visible"
               :modal="false"
               customClass="success_dialog" :show-close="false" @close="closeDialog" @open="autoClose">
      <img src="@/assets/images/allRight.png">
      <p class="msg-tips">{{msg}}</p>
      <p class="tips" v-if="tips">{{tips}}</p>
      <el-button size="mini" @click="closeDialog">知道了</el-button>
    </el-dialog>
  </transition>
</template>

<script>

  export default {
    props: {
      isvisible: {
        type: Boolean
      },
      msg: {
        type: String
      },
      tips: {
        type: String
      }
    },
    data () {
      return {
        visible: this.isvisible
      }
    },
    methods: {
      closeDialog () {
        this.$emit('close');
        this.visible = false;
        this._promise &&  this._promise.resolve();
      },
      autoClose(){
        var $this=this;
        clearTimeout($this.timer);
        $this.timer = setTimeout(function () {
          $this.closeDialog();
        },1500)
      }
    },
    watch: {
      isvisible (val) {
        this.visible = val;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .success_dialog {
    width: 300px !important;
    box-shadow:0px 8px 36px 0px rgba(0, 0, 0, 0.41);
    border-radius:12px;
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      
      padding: 40px 0 34px;
      text-align: center;
      position: relative;
      .tips {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        margin-bottom: 23px;
      }
      .msg-tips {
        font-size: 24px;
        color: #666666;
        /*padding-top: 20px;*/
        font-weight:bold;
        margin-bottom: 20px;
      }
      .desc{
          color: #666666;
          font-size:15px;
          padding-top: 10px;
        span{
          color: #FF4F4F;
        }
      }
      button {
        height: 36px;
      }
      img{
        margin-top: -100px;
      }
    }

    .el-button {
      padding: 12px 26px;
    }
    /*.el-button--primary {*/
      /*background-color: #19A0F1;*/
      /*border-color: #19A0F1;*/
    /*}*/
    /*.el-button--default{*/
      /*background-color: #373737;*/
      /*border-radius: 3px;*/
      /*border: solid 1px #626466;*/
    /*}*/

  }
</style>
