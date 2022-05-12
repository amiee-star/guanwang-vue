<template>
  <transition name="el-zoom-in-center">
    <el-dialog :visible.sync="visible"
               :destroy-on-close="true"
               :modal="false"
               :show-close="false"
               customClass="askAlert_dialog" @close="closeDialog">
      <img src="@/assets/images/confirm.png"/>
      <p class="msg-tips" :class="{hasdesc:!!desc}">{{msg}}</p>
      <p class="desc" v-if="desc">{{desc}}</p>
      <span>
        <el-button type="primary" @click="confirm" class="confirm">确 定</el-button>
        <el-button @click="closeDialog" class="cancel">取 消</el-button>
      </span>
    </el-dialog>
  </transition>
</template>

<script>
  export default {
    name:"confirm",
    props: {
      disvisible: {
        type: Boolean
      },
      msg: {
        type: String
      },
      desc:{
        type:String,
        default:""
      }
    },
    data () {
      return {
        visible: this.disvisible,
        // msg:"",
        // desc:""
      }
    },
    methods: {
      closeDialog () {
        this.$emit('close',"cancel");
        this.visible = false;
        this._promise &&  this._promise.resolve("cancel");
      },
      confirm () {
        this.$emit('close',"confirm");
        this.visible = false;
        this._promise &&  this._promise.resolve("ok");
      }
    },
    watch: {
      disvisible (val) {
        this.visible = val
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .askAlert_dialog {
    width: 300px!important;
    background-color: #fff!important;
    box-shadow: 5px 8px 22px 0px
    rgba(0, 0, 0, 0.3);
    border-radius: 12px!important;
    .confirm{
      background:rgba(35,181,250,1)!important;
      border:1px solid rgba(35,181,250,1);
      &:hover{
        background:rgba(0,163,255,1)!important;
        border:1px solid rgba(0,163,255,1);
      }
    }
    .cancel{
      &:hover{
        color: #19A0F1;
        border:1px solid #19A0F1;
        background: none;
      }
    }
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding-top: 44px;
      text-align: center;
      .msg-tips {
        font-size: 16px;
        color: #666666;
        font-weight: bold;
        margin-bottom: 29px;
        &.hasdesc{
          margin-bottom: 10px;
        }
      }
      .desc{
        font-size: 12px;
        color: #6b6b6b;
        padding-bottom: 20px;
      }
      img{
        margin-top: -100px;
      }
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
