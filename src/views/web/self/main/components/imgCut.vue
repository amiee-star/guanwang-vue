<template>
    <div class="imgCut flex-center-column">
        <div>
            <p class="popClose" @click="close">
                <i class="el-icon-close"></i>
            </p>
            <p class="title">图片裁切</p>
            <div class="imgBox">
                <img :src="this.$utils.joinHttp(imgPath)" ref="imgBox">
            </div>
            <p class="button">
                <el-button @click="sure">确定</el-button>
                <el-button @click="close">取消</el-button>
            </p>
        </div>
    </div>
</template>

<script>
  import '@/utils/cropper.min.js'
  export default {
    name: "imgCut",
    data() {
      return{
          fileHost: process.env.VUE_APP_pdfHost
      }
    },
    props: ['imgPath'],
    methods: {
      init() {
        let { imgBox } = this.$refs;
        $(imgBox).cropper({
          aspectRatio: '1',
          autoCropArea:0.5,
          responsive:true,
          dragMode : "move"
        });
      },
      sure() {
        let that = this;
        var { imgBox } = that.$refs;
        var canvasData = $(imgBox).cropper('getCroppedCanvas',{width: that.width,height: that.height},true );
        var dataBase64 = canvasData.toDataURL(); //转成base64
        that.close(dataBase64)
      },
      close(file) {
        if (file) {
          this.$emit('close', file)
        } else {
          this.$emit('close')
        }

      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped lang="scss">
    .imgCut{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 11;
        background: rgba(0,0,0,0.7);
        >div{
            width:452px;
            height:548px;
            background:rgba(255,255,255,1);
            border-radius:5px;
            position: relative;
            padding: 40px;
            .title{
                font-size:22px;
                color:rgba(51,51,51,1);
            }
            .imgBox{
                width:372px;
                height:372px;
                margin: 24px 0;
                img{
                    max-width: 100%;
                    max-height: 100%;
                }
            }
        }
        .popClose{
            position: absolute;
            right: -13px;
            top: -13px;
        }
        .button{
            width:200px ;
            margin: 0 auto;
            >button{
                width:88px;
                height:36px;
                border-radius:3px;
                color: #666666;
                border:1px solid rgba(221,221,221,1);
                &:first-of-type{
                    background:rgba(9,201,255,1);
                    color: #fff;
                    border-color: rgba(9,201,255,1);
                }
            }
        }
    }
</style>