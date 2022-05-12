<template>
    <el-dialog :visible.sync="visible" :append-to-body="true" :show-close="false" :custom-class="'updateTips'" width="800px">
        <div class="box">
            <p class="title">3D云展平台升级维护通知</p>
            <p class="title1">尊敬的3D云展用户： </p>
            <div class="desc">
                您好，感谢您一直以来对3D云展平台的信任与支持！为了提升云展厅中的“商品3D模型”的编辑展示效果，我司计划对3D云展平台“模型管理”功能模块进行引擎升级。</div>
            <div class="time">
                <p>计划升级时间为：</p>
                <p>2022年2月7日  8:00 至  2022年2月22日  24:00</p>
            </div>
            <div class="desc">
                升级期间平台涉及的模型素材管理功能、模型布展功能及模型浏览等功能将无法正常使用，其它功能不受影响，请您提前做好相关演示、体验安排！期间遇到任何疑问可拨打我司服务热线<span>400-080-9959</span>。由此给您带来的不便，敬请谅解。
            </div>
            <div class="img"></div>
            <div class="know flex-center-column cursor" @click="visible=false">我知道了</div>
        </div>
    </el-dialog>


</template>

<script>
  export default {
    name: "updateTips",
    data() {
      return {
        visible: true
      }
    }
  }
</script>

<style scoped lang="scss">
    .box{
        height: 500px;
        padding: 65px 85px;
        background: url("~@/assets/images/updateTips/pcBg.png") no-repeat;
        font-size: 14px;
        color: #353535;
        .title{
            font-size: 20px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #1589FF;
            text-align: center;
        }
        .title1{
            font-size: 16px;
            font-weight: Bold;
            color: #3E3E3E;
            line-height: 30px;
        }
        .desc{
            line-height: 30px;
            span{
                color: #24A5FF;
            }
        }
        .time{
            margin: 30px 0;
            font-size: 16px;
            line-height: 36px;
            p:last-of-type{
                color: #24A5FF;
            }
        }
        .know{
            width: 120px;
            height: 36px;
            background: linear-gradient(270deg, #1FA3FF, #76A0FF);
            border-radius: 18px;
            margin: 20px auto;
            color: #FFFFFF;
        }
        .img{
            width: 156px;
            height: 132px;
            background: url("~@/assets/images/updateTips/pc1.png") no-repeat;
            position: absolute;
            right: 106px;
            top: 174px;
        }
    }
</style>
<style lang="scss">
   .updateTips{
       background: transparent;
       box-shadow: none;
       .el-dialog__header{
           padding: 0;
       }
       .el-dialog__body{
           padding: 0;
       }
   }
</style>