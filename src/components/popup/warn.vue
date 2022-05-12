<template>
  <transition name="el-zoom-in-center">
    <div class="warn_dialog_wrap">
      <el-dialog :visible.sync="visible"
                 :modal="false"
                 customClass="warn_dialog" :show-close="false" @open="autoClose">
        <img :src="img">
        <p class="msg-tips">{{msg}}</p>
        <p class="desc" v-if="desc">{{desc}}<span v-if="num">{{num}}</span></p>
        <el-button @click="closeDialog('ok')">知道了</el-button>
      </el-dialog>
    </div>
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
      desc:{
        type:String,
        default:""
      },
      num: {
        type: String
      },
      img: {
        default: require('@/assets/images/warning.png')
      }
    },
    data () {
      return {
        visible: this.isvisible
      }
    },
    methods: {
      closeDialog (val) {
        this.$emit('close');
        this.visible = false;
        this._promise && this._promise.resolve(val);
      },
      autoClose(){
        var $this=this;
        clearTimeout($this.timer);
        $this.timer = setTimeout(function () {
         $this.closeDialog('no');
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
<style lang="scss">
  .warn_dialog_wrap{
    .warn_dialog {
      width: 400px ;
      box-shadow:0px 8px 36px 0px rgba(0, 0, 0, 0.41);
      border-radius:12px;
      .el-dialog__header {
        padding: 0;
      }
      .el-dialog__body {

        padding: 35px;
        text-align: center;
        position: relative;
        .msg-tips {
          font-size: 24px;
          color: #666666;
          /*padding-top: 20px;*/
          /*font-weight:bold;*/
        }
        .desc{
          color: #666666;
          font-size:14px;
          padding-top: 10px;
          margin-bottom: 23px;
          span{
            color: #FF4F4F;
          }
        }
        img{
          margin-top: -100px;
        }
      }
      .el-button {
        padding: 12px 26px;
      }
    }
  }
</style>
