<template>
    <el-dialog :visible.sync="visible" :append-to-body="true" :show-close="false" :custom-class="'updateTips'" width="100%">
        <img src="@/assets/images/updateTips/mobileBg.png">
        <div class="txt">
            <p class="title">尊敬的3D云展用户</p>
            <div class="desc">
                您好，感谢您一直以来对3D云展平台的信任与支持！为了提升云展厅中的“商品3D模型”的编辑展示效果，我司计划对3D云展平台“模型管理”功能模块进行引擎升级。</div>
            <div class="time">
                <p>计划升级时间为：</p>
                <p>2022年2月7日  8:00 至  2022年2月22日  24:00</p>
            </div>
            <div class="desc">
                升级期间平台涉及的模型素材管理功能、模型布展功能及模型浏览等功能将无法正常使用，其它功能不受影响，请您提前做好相关演示、体验安排！期间遇到任何疑问可拨打我司服务热线<span>400-080-9959</span>。由此给您带来的不便，敬请谅解。
            </div>
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
    .updateTips{
        width: 100%;
        color: #515151;
        img{
            width: 100%;
        }
        .txt{
            position: absolute;
            left: 7%;
            top: 20%;
            padding-left: 0.5rem;
            padding-right: 0.8rem;
            font-size: 0.2rem;
            line-height: 0.4rem;
            span{
               color: #24A5FF;
            }
        }
        .title{
            font-size: 0.3rem;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #3E3E3E;
            text-align: center;
            margin-bottom: 0.2rem;
        }
        .time{
            margin: 0.3rem 0;
            font-size: 0.25rem;
            text-align: center;
            line-height: 0.5rem;
            p:last-of-type{
                color: #24A5FF;
            }
        }
        .know{
            width: 120px;
            height: 36px;
            background: linear-gradient(270deg, #1FA3FF, #76A0FF);
            border-radius: 18px;
            margin: 0.7rem auto;
            color: #FFFFFF;
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