<template>
  <div class="create-auto">
    <el-dialog
      :visible.sync="visible"
      :modal="false"
      :close-on-click-modal="false"
      @close="closeDialog"
      class="custom-dialog__wrapper"
    >
        <div class="crop-w">
            <div class="crop-image" :style="wrapStyle">
            <img :src="url" alt="" crossOrigin="Anonymous" :style="imgStyle" v-if="url">
            <canvas ref="canvas"  @mousedown="onmousedown" @mousemove="onmousemove" @mousewheel="onmousewheel" ></canvas>
            </div>
            <div class="btns">
                <el-button plain @click="closeDialog()">取消</el-button>
                <el-button type="primary" class="confirm"  style="margin-left:60px" @click="confrim">确认</el-button>
            </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
    name:"crop-image",
    props:{
        opt:{
            type:Object,
            default(){
                return {
                    width:400,
                    height:400,
                    addScale:0.06  // 缩放的速度
                };
            }
        },
        gap:{
            type:Number,
            default:20
        },
        isvisible:{
            type:Boolean
        }
    },
    watch:{
        isvisible(val) {
            if (val) {
                this.visible = val;
            } else {
                this.closeDialog();
            }
        }
    },
    data(){
        return {
            img:null,
            url:null,
            imgInfo: null, // 压缩前的信息
            imgCInfo:null, // 压缩后的信息
            clipInfo:null, // 压缩前的信息
            clipCinfo:null, // 压缩后的信息
            gapInfo:null, // 缝隙
            ctx:null, // 画板
            pos:{x:0,y:0},
            deg:0,
            visible: this.isvisible || false,
        }
    },
    computed:{
        wrapStyle(){
            return {
                width:`${this.opt.width}px`,
                height:`${this.opt.height}px`
            }
        },
        imgStyle(){
            let imgCInfo = this.imgCInfo;
            if(imgCInfo){
                return {
                    width: `${imgCInfo.w}px`,
                    height: `${imgCInfo.h}px`,
                    left:`${this.pos.x}px`,
                    top:`${this.pos.y}px`,
                    transform: `rotateZ(${this.deg}deg)`,
                    transformOrigin: "center"
                }
            }
            return {height:"0px",height:"0px",display:"none"};
        }
    },
    mounted(){
      window.addEventListener("mouseup",this.onmouseup);
      let width = this.opt.width - this.gap*2;
      let height = this.opt.height - this.gap *2;
      this.gapInfo = {
          width,height
      };
    },
    methods:{
         closeDialog() {
            this.$emit("close");
            this.visible = false;
            this._promise && this._promise.resolve("cancel");
            this.$emit("update:isvisible",false);
        },
        async confrim(){
            let params = this.getParams();
           // let base = await this.exportBase();

            this._initPromise && this._initPromise.resolve({
                params
            });

            this.closeDialog();

        },
        getCanvas(){
            const me = this;
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    if(me.$refs.canvas){
                        resolve()
                    }else{
                        resolve(me.getCanvas());
                    }
                },100);
            });
        },
        async init(src,bound){
             await this.getCanvas();
             if(!this.ctx){
                    let canvas = this.$refs.canvas;
                    canvas.width = this.opt.width;
                    canvas.height = this.opt.height;
                    this.ctx = canvas.getContext("2d");
                }
                this.setClip(bound);
                this.setSrc(src)
            const me = this;
            return new Promise((resolve,reject)=>{
                me._initPromise = {
                    resolve,
                    reject
                }
            });
        },
        loadImage(url,attrs){
            let img = new Image();
            img.src = url;
            attrs = attrs || {crossOrigin:"Anonymous"};
            for(let i in attrs){
                // img.setAttribute(i,attrs[i]);
                img[i] = attrs[i];
            }
            return new Promise((resolve,reject)=>{
                img.onload = function(){
                    resolve(img);
                };
                img.onerror  = reject;
            });
        },
        compress(target,opt){
            // 压缩比例
             opt = opt || this.gapInfo;
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
        // 外部调用
        async setSrc(src){
            let img = await this.loadImage(src);
            this.url = src;
            this.img = img;
            this.setImg(img);
        },
        // 外部调用
        setClip(clipInfo){
            if(clipInfo){
                this.clipInfo = {
                    w:clipInfo.width,
                    h:clipInfo.height
                };
                this.clipCinfo =  this.compress(clipInfo,this.gapInfo);
                this.clipCinfo.x = (this.opt.width - this.clipCinfo.w)/2;
                this.clipCinfo.y = (this.opt.height - this.clipCinfo.h)/2;
                this.fill();
            }
        },
        async exportBase(){
            // 导出图片 base64
            let deg = this.deg;
            let pos = this.pos;
            let clipCinfo = this.clipCinfo;
            
            let imgCInfo = this.imgCInfo; // 压缩后的宽高
            let imgInfo = this.imgInfo;   // 原始的宽高
            
            let scale = imgCInfo.scale;
            let sx =  clipCinfo.x - pos.x;
            let sy =  clipCinfo.y - pos.y;
            let canvas = document.createElement("canvas");
            canvas.width = parseInt(clipCinfo.w / scale);
            canvas.height = parseInt(clipCinfo.h / scale);
            let swidth = imgInfo.w;
            let sheight = imgInfo.h;
            if(swidth < canvas.width){
                swidth = canvas.width
            }
            if(sheight < canvas.height){
                sheight = canvas.height
            }
            let ctx = canvas.getContext("2d");
            let img = this.img;
            if(deg != 0){
                img = await this.loadImage(this.getRotateImg());
                if(deg == 90 || deg == 270){
                    // 竖着的，需要坐标转换
                    let x = pos.x + (imgCInfo.w -imgCInfo.h)/2;
                    let y = pos.y  + (imgCInfo.h -imgCInfo.w)/2;
                    sx = clipCinfo.x - x;
                    sy = clipCinfo.y - y;
                }
            }
            sx /= scale;
            sy /= scale;
            ctx.drawImage(img,sx,sy,swidth,sheight,0,0,swidth,sheight);
            return  canvas.toDataURL("image/png");
        },
        getParams(){
            let pos = this.pos;
            let deg = this.deg;
            let clipCinfo = this.clipCinfo;
            let imgCInfo = this.imgCInfo; // 压缩后的宽高
            let scale = imgCInfo.scale;
            let sx =  clipCinfo.x - pos.x;
            let sy =  clipCinfo.y - pos.y;
            if(deg == 90 || deg == 270){
                    // 竖着的，需要坐标转换
                let x = pos.x + (imgCInfo.w -imgCInfo.h)/2;
                let y = pos.y  + (imgCInfo.h -imgCInfo.w)/2;
                sx = clipCinfo.x - x;
                sy = clipCinfo.y - y;
            }
            sx /= scale;
            sy /= scale;
            // 对于后端，参数取反
            return {
                x: -sx,
                y: -sy,
                w: clipCinfo.w / scale,
                h: clipCinfo.h / scale,
                deg:deg
            }
        },
        exportFile(filename,mime){
            let base64 = this.exportBase();
            return this.dataURLtoFile(base64,filename,mime);
        },
        dataURLtoFile(b64Data,filename,mime){
            filename = filename || "test.png";
             mime = mime ||  "image/png";
            var bstr = atob(b64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
            var n = bstr.length;
            var u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            // 转换成file对象
            return new File([u8arr], filename, {type:mime});

            // 转换成成blob对象
            // return new Blob([u8arr],{type:mime});
            // return blob;
        },
        rotate(flag){
            // 旋转
            let deg = this.deg;
            if(flag){
                deg += 90;
            }else{
                deg -= 90;
            }
            if(deg >= 360){
                deg -= 360;
            }
            if(deg <= 0){
                deg += 360;
            }
            this.deg = deg;
        },
        getRotateImg(){
            // 获取旋转后的图片
            let deg = this.deg;
            let imgInfo = this.imgInfo;
            let canvas = document.createElement("canvas");
            let w,h;
            if(deg == 90 || deg == 270){
                // 垂直
                w = imgInfo.h;
                h = imgInfo.w;
            }else{
                // 横着的
                w = imgInfo.w;
                h = imgInfo.h;
            }
            canvas.width = w;
            canvas.height = h;
            let ctx = canvas.getContext("2d");
            ctx.translate(w/2,h/2);
            ctx.rotate(deg * Math.PI/180 );
            ctx.drawImage(this.img,0,0,imgInfo.w,imgInfo.h,-imgInfo.w/2,-imgInfo.h/2,imgInfo.w,imgInfo.h);
            return  canvas.toDataURL("image/png");
        },
        setImg(img){
            this.imgInfo = {
                w:img.width,
                h:img.height
            };
            this.imgCInfo = this.compress(img,{width:this.clipCinfo.w,height:this.clipCinfo.h});
            let x =  (this.opt.width -  this.imgCInfo.w)/2;
            let y = (this.opt.height -  this.imgCInfo.h)/2;
            this.pos = {
                x,y
            };
        },
        onmouseup(){
            this.mouse = null;
        },
        onmousedown(e){
            this.mouse = {
                x:e.offsetX,
                y:e.offsetY
            }
        },
        onmousemove(e){
            if(this.mouse){
                this.pos.x += e.offsetX - this.mouse.x ;
                this.pos.y += e.offsetY - this.mouse.y;
                this.mouse = {
                    x:e.offsetX,
                    y:e.offsetY
                };
            }
        },
        onmousewheel(event){
            event.preventDefault();
            const direction = (event.wheelDelta || -event.detail) > 0 ? 1 : 0;
            let addScale = this.opt.addScale || 0.06;
            let w,h,scale;
            if(direction){
                // 放大
                w = this.imgCInfo.w * (1 + addScale);
            }else{
                // 缩小
                w = this.imgCInfo.w * (1 - addScale);
            }
            if(w < 10){
                w = 10;
            }
            scale = w/this.imgInfo.w;
            h = this.imgInfo.h * scale;
            let x  = this.pos.x -  (w - this.imgCInfo.w)/2;
            let y = this.pos.y -  (h - this.imgCInfo.h)/2;
            this.pos = {
                x,y
            };
            this.imgCInfo = {
                scale,
                w,
                h
            }
        },
        fill(){
            let lineWidth = 1;
            let lineHalf = lineWidth/2;
            let {w,h,x,y} =  this.clipCinfo;
            x = x - lineHalf;
            y = y - lineHalf;
            w = w + lineWidth*2;
            h = h + lineWidth*2;
            let clipctx = this.ctx;
            let opt = this.opt;
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
.crop-w{
    padding: 30px 40px;
    border-radius: 6px;
    background: #fff;
    div.btns{
        text-align: center;
       
    }
}
.crop-image{
    border: 1px solid rgb(35, 184, 255);
    margin:  20px auto;
    position: relative;
    overflow: hidden;
    background: url(data:image/png;base64,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) center repeat;
    canvas{
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
        cursor: move;
    }
    img{
        position: absolute;
        z-index: 1;
    }
}
</style>