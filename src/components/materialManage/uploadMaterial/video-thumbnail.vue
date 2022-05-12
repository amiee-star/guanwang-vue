<template>
  <el-dialog
          :visible.sync="isClip"
          :fullscreen="false"
          :modal="false"
          custom-class="video-clip"
          :show-close="false"
          :close-on-click-modal="false">
    <div class="title">设置视频封面</div>
    <div class="content">
      <div class="video">
        <p>选择合适的视角截屏作为封面：</p>
        <video :src="videoUrl" controls ref="video" crossOrigin="anonymous"></video>
        <div class="cilp" @click="onClip">截屏</div>
      </div>
      <div class="img">
        <p>封面预览：</p>
        <img :src="src" alt="">
        <div class="confirm" @click="confirm">完成</div>
      </div>
    </div>
    <svg-icon class-name="close" icon-class="close" @click="close"></svg-icon>
<!--    <svgCloseIcon @close="$emit('close')"></svgCloseIcon>-->
  </el-dialog>
</template>

<script>
    export default {
        name: "video-thumbnail",
        props:["video", "isClip"],
        data(){
          return {
            src:"",
            videoUrl:"",
          }
        },

      watch:{
          async isClip(val) {
            let me = this;
            if (val) {
              let blob = new Blob([me.video]), // 文件转化成二进制文件
                      url = URL.createObjectURL(blob);
              me.videoUrl = url;

            }
          }
      },
      methods:{
        async onClip(){
          let me = this;
          let {video} = me.$refs
          try {
            me.src = await me.$utils.drawImg.chooseVideo(video);
          } catch (e) {
            console.log(e);
          }

        },
        async confirm(){
          let me = this;
          if (me.src) {
            me.$emit('close', me.src);
            me.src = "";
          } else {
            me.$message({
              type: 'warning',
              message: '请先截屏'
            })
          }

        },
        close() {
          this.$emit('close')
        }
      }
    }
</script>

<style lang="scss">
  .video-clip{
    width: 870px;
    position: relative;
    .el-dialog__header{
      padding: 0!important;
    }
    .el-dialog__body{
      padding: 40px;
      background:#FFFFFF;
      box-shadow:0px 0px 22px 0px rgba(0, 0, 0, 0.3);
      border-radius:5px;
      div.title{
        font-size:22px;
        color: #333333;
      }
      div.content{
        display: flex;
        padding-top: 20px;
        color: #666;
        p{
          font-size: 16px;
          padding-bottom: 12px;
        }
        div.video{
          width: 512px;
          padding-right: 30px;
          video{
            max-width: 100%;
            max-height: 100%;
            border-radius:3px;
            margin-bottom: 16px;
          }
          div.cilp{
            height:36px;
            background:#DDDDDD;
            border:1px solid #DDDDDD;
            border-radius:3px;
            line-height: 36px;
            text-align: center;
            cursor: pointer;
            font-size: 14px;
          }
        }
        div.img{
          width: 240px;
          position: relative;
          img{
            width: 100%;
            border-radius:3px;
          }
          div.confirm{
            width: 100%;
            height:36px;
            background:rgba(9,201,255,1);
            border-radius:3px;
            line-height: 36px;
            text-align: center;
            cursor: pointer;
            font-size: 14px;
            position: absolute;
            left: 0;
            bottom: 0;
            color: #fff;
          }
        }

      }

    }
    .close{
      position: absolute;
      right: -16px;
      top: -16px;
      font-size: 32px;
      cursor: pointer;
    }
  }
</style>
