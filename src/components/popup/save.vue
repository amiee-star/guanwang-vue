<template>
  <transition name="el-zoom-in-center">
    <div class="saved_dialog">
      <el-dialog :visible="visible"
                 :modal="false"
                 custom-class="" @close="closeDialog">
        <div class="stepOne">
          <div class="title">
            <img v-if="obj.isImg" src="@/assets/images/savedsuccess.png"><span>{{obj.title}}</span>
          </div>
          <div class="smallTitle">
            <p v-if="obj.smallTitle">今天还可发布<span>{{obj.num || 0}}</span>次</p>
          </div>
          <div class="btns">
            <el-button v-if="obj.leftBtn" @click="toView">{{obj.leftBtn}}</el-button>
            <el-button v-if="!!obj.rightBtn" :style="{background: obj.bgColor,borderColor: obj.bgColor}" class="submitBtn" @click="submitBtn">{{obj.rightBtn}}</el-button>
          </div>
          <div v-if="!!obj.tips" class="tip"><i class="el-icon-warning-outline"></i>{{obj.tips}}</div>
        </div>
      </el-dialog>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean
      },
      obj: {
        type: Object,
        default: ()=>{
          return{
            isImg: false,
            leftBtn: "",
            rightBtn: "",
            bgColor: "",
            tips: "",
            num: "",
            smallTitle: false
          }
        }
      }
    },
    computed:{
      userId(){
        return this.$store.state.info.userId || "";
      },
    },
    data () {
      return {
        selfSpace:"",
        isVisible: true,
      }
    },
    methods: {
      closeDialog () {
        this.visible = false;
      },
      toView(){
        this._promise && this._promise.resolve("left");
        this.closeDialog()
      },
      submitBtn(){
        this._promise && this._promise.resolve("right");
        this.closeDialog()
      },
    },
    mounted() {
      // console.log(this.visible);
      // this.isVisible = this.visible
    }
    // watch: {
    //   visible (val) {
    //     console.log(val);
    //     this.isVisible = val;
    //   }
    // },

  }
</script>
<style lang="scss">
  .saved_dialog {
    .el-dialog{
      width:450px;
      height:228px;
      background:rgba(255,255,255,1);
      border-radius:5px;
    }
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      font-size: 14px;
      div.title{
        text-align: center;
        color: #333333;
        padding-top: 20px;
        img{
          vertical-align: middle;
          position: relative;
          top: -4px;
        }
        span{
          padding-left: 15px;
          font-size:18px;
        }
      }
      div.stepOne{
        .smallTitle {
          min-height: 1px;
          text-align: center;
          margin-top: 10px;
          span {
            color: #F56C6C;
          }
        }
        div.btns{
          text-align: center;
          margin-top: 16px;
        }
        div.tip{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          line-height: 44px;
          color: #FF6700;
          background: #FFFAEF;
          border-radius:0px 0px 5px 5px;
          text-align: center;
          i{
            font-size: 18px;
            margin-right: 4px;
            position: relative;
            top: 2px;
          }
        }
        div.tip-en {
          line-height: 22px;
          padding: 10px;
        }
      }
    }
    .el-button{
      height: auto;
      width: auto;
      min-width: 88px;
    }
    .submitBtn{
      color: #fff;
      background-color: #23B8FF;
    }
  }
</style>
