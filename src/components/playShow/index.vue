<template>
    <div class="comPlayWrap">
        <el-dialog
            :visible.sync="isPlay"
            :fullscreen="false"
            :modal="true"
            custom-class="comPlay"
            :show-close="true"
            :before-close="onbeforeClose"
            :close-on-click-modal="false"
            >
            <template v-if="isPlay">
                <video width="100%" height="100%" v-if="playObj.fileType == fileType.video" :src="playObj.picPath" autoplay controls ></video>
                <threeImg class="threeImg" v-if="playObj.fileType == fileType.zip" :extobj="extobj" ></threeImg>
                <div class="picgif" v-if="playObj.fileType == fileType.picgif">
                    <div ref="picgif"></div>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import threeImg from "./three-img";
import FrameGif from '@/utils/frame_gif.js';
export default {
    props:["isPlay","playObj"],
    components:{
       threeImg
    },
    data(){
        
        return{
           extobj:{},
           fileType: this.$commConst.FILETYPE,
           gif:new FrameGif()
        }
    },
    watch:{
        playObj(val){
            if(val){
                this.handleData();
            }
        }
    },
    methods:{
      handleData(){
        if(this.playObj.fileType == this.fileType.zip){
            let obj = {
                src:"",
                num:0,
            }
            obj.src = this.playObj.picPath;
            obj.num = this.playObj.delay.delay.length || 0;
            this.extobj = obj;
        }
        if(this.playObj.fileType == this.fileType.picgif){
            let totalSize = this.playObj.delay.delay.length;
            let time = this.playObj.delay.delay[0]/1000;
            this.$nextTick(()=>{
                this.gif.loadUrl(this.playObj.picPath,
                {
                parent:this.$refs.picgif,
                frame:totalSize,
                time:time,
                win:{width:400,height:400}
                });
            });
        }
      },
      onbeforeClose(){
        
         this.$emit("closeDialog")
      }  
    }
}
</script>
<style lang="scss" src="./index.scss"></style>