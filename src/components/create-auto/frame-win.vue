<template>
    <div class="frame-win">
        <canvas ref="canvas"></canvas>
    </div>
</template>
<script>
export default {
    name:"frame-win",
    props:{
        opt:{
            type:Object,
            default(){
                return {
                    width:270,
                    height:152
                }
            }
        },
        scale:{
            type:Object
        }
    },
    data(){
        return {
            scaleC:null,
            frame:null
        }
    },
    mounted(){
        let canvas = this.$refs.canvas;
        if(this.opt && this.scale){
            let {width,height} = this.opt;
            canvas.width = this.opt.width;
            canvas.height = this.opt.height;
            this.ctx = canvas.getContext("2d");
            this.scaleC = this.compress(this.scale);
            let x = (width - this.scaleC.w)/2;
            let y = (height - this.scaleC.h)/2;
            this.clipCinfo = {
                x,
                y,
                ...this.scaleC
            };
            this.fill();
        }
    },
    methods:{
        compress(target){
            // 压缩比例
            let opt = this.opt;
            let wRate = opt.width/opt.height;
            let tRate =  target.width/target.height;
            let w,h,scale;
            if(wRate > tRate){
                h = opt.height;
                scale = h/target.height;
                w = scale * target.width;
            }else{
                w = opt.width;
                scale = w / target.width;
                h = scale * target.height;
            }
            return {
                w,h,scale
            }
        },
        fill(){
            let lineWidth = 1;
            let lineHalf = lineWidth/2;
            let {w,h,x,y} =  this.clipCinfo;
            let opt = this.opt;
            let clipctx = this.ctx;
            x = x - lineHalf;
            y = y + lineHalf;
           // w = w + lineWidth;
           // h = h + lineWidth;
            clipctx.lineWidth = lineWidth;
            clipctx.clearRect(0, 0, opt.width, opt.height);
            clipctx.beginPath();
            clipctx.fillStyle = 'rgba(0,0,0,0.6)';
            clipctx.strokeStyle = "green";
            //遮罩层
            clipctx.globalCompositeOperation = "source-over";
            clipctx.fillRect(0, 0, opt.width, opt.height);
            //画框
            clipctx.globalCompositeOperation = 'destination-out';
            clipctx.fillStyle = 'rgba(0,0,0,1)';
            clipctx.fillRect(x , y , w , h);
            //描边
            clipctx.globalCompositeOperation = "source-over";
            clipctx.moveTo(x, y);
            clipctx.lineTo(x + w, y);
            clipctx.lineTo(x + w, y + h);
            clipctx.lineTo(x, y + h);
            clipctx.lineTo(x, y);
            clipctx.stroke();
            clipctx.closePath();
        }
    }
}
</script>
<style lang="scss" scoped>
.frame-win{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    canvas{
        width: 100%;
        height: 100%;
    }
}
</style>