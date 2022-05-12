<template>
    <div class="clip-img" :style="imgStyle">
        <img :src="url" alt="" crossOrigin="anonymous" :style="imgStyle">
        <canvas ref="canvas" :style="imgStyle"  @mousedown="onmousedown" @mousemove="onmousemove"></canvas>
    </div>
</template>
<script>
// 等比例压缩
export default {
    name:"clip-image",
    props:{
        max:{ // 缩放基准宽度或高度
            type:Number,
            default:400
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
            ctx:null, // 画板
            pos:{x:0,y:0},
            lock: "", // 锁住一个方向
            boundary:null
        }
    },
    computed:{
        imgStyle(){
            let imgCInfo = this.imgCInfo;
            if(imgCInfo){
                return {
                    width: `${imgCInfo.w}px`,
                    height: `${imgCInfo.h}px`
                }
            }
            return {height:"0px",height:"0px",display:"none"};
        }
    },
    async mounted(){
        this.clear();
        this.ctx = this.$refs.canvas.getContext("2d");
        window.addEventListener("mouseup",this.onmouseup);
    },
    methods:{
        init(src,bound){
            this.setClip(bound);
            this.setSrc(src)
        },
        // 外部调用
        async setSrc(src){
            let img = await this.loadImage(src,{crossOrigin:"anonymous"});
            this.img = img;
            this.setImg(img);
        },
        clear(){
             let obj = {
                img:null,
                url:null,
                imgInfo: null, // 压缩前的信息
                imgCInfo:null, // 压缩后的信息
                clipInfo:null, // 压缩前的信息
                clipCinfo:null, // 压缩后的信息
                ctx:null, // 画板
                pos:{x:0,y:0},
                lock: "", // 锁住一个方向
                boundary:null
             }
             for(let i in obj){
                 this[i]  = obj[i];
             }
        },
        loadImage(url,attrs){
            this.url = url;
            let img = new Image();
            img.src = url;
            attrs = attrs || {};
            for(let i in attrs){
                img[i] = attrs[i];
            }
            return new Promise((resolve,reject)=>{
                img.onload = function(){
                    resolve(img);
                };
                img.onerror  = reject;
            });
        },
        setImg(img){
            this.img = img;
            this.imgInfo = {
                w:img.width,
                h:img.height
            };
            
            // 压缩图的比例
            let w,h,scale;
            if(img.width > img.height){
                w = this.max;
                scale = w/img.width;
                h = scale*img.height;
            }else{
                h = this.max;
                scale = (h/img.height);
                w = scale * img.width;
            }
            this.imgCInfo = {
                w,
                h,
                scale
            };
            let canvas =  this.$refs.canvas;
            canvas.width = w;
            canvas.height = h;
            this.setClip();
        },
        setClip(clipInfo){
            if(clipInfo){
                this.clipInfo = {
                    w:clipInfo.width,
                    h:clipInfo.height
                };
            }
            if(this.imgCInfo && this.clipInfo){
                this.compressClip(this.imgCInfo,this.clipInfo);
                this.fill();
            }
        },
        compressClip(imgCInfo,clipInfo){
            // 压缩缩放
            let w,h,scale;
            let imgR = imgCInfo.w/imgCInfo.h;
            let clipR = clipInfo.w / clipInfo.h;
            if(imgR > clipR){
                // 图片的宽度偏大
                h = imgCInfo.h;
                scale = h/clipInfo.h;
                w = scale * clipInfo.w;
                this.lock = "h";
            }else{
                // 图片的宽度偏小
                w = imgCInfo.w;
                scale = w/clipInfo.w;
                h = scale * clipInfo.h;
                this.lock = "w";
            }
            this.clipCinfo = {
                w,
                h,
                scale
            }
            this.boundary = {
                w:this.imgCInfo.w - this.clipCinfo.w,
                h:this.imgCInfo.h - this.clipCinfo.h
            };
             
             let x = this.boundary.w/2;
             let y = this.boundary.h/2;
            this.pos = {
                x:x,
                y:y
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
                let x = e.offsetX - this.mouse.x ;
                let y = e.offsetY - this.mouse.y;
                if(this.lock == "h"){
                    x = this.pos.x + x;
                    if(x < 0){
                        x = 0;
                    }else if(x > this.boundary.w){
                        x = this.boundary.w
                    }
                    this.pos.x = x;
                }else{
                    y = this.pos.y + y;
                    if(y < 0){
                        y = 0;
                    }else if(y > this.boundary.h){
                        y = this.boundary.h
                    }
                    this.pos.y = y;
                }
                this.mouse = {
                    x:e.offsetX,
                    y:e.offsetY
                }
                this.fill();
            }
        },
        fill(){
            let {w,h} =  this.clipCinfo;
            let {x,y} = this.pos;
            let clipctx = this.ctx;
            let imgCInfo = this.imgCInfo;
            clipctx.clearRect(0, 0, imgCInfo.w, imgCInfo.h);
            clipctx.beginPath();
            clipctx.fillStyle = 'rgba(0,0,0,0.6)';
            clipctx.strokeStyle = "green";
            //遮罩层
            clipctx.globalCompositeOperation = "source-over";
            clipctx.fillRect(0, 0, imgCInfo.w, imgCInfo.h);
            //画框
            clipctx.globalCompositeOperation = 'destination-out';
            clipctx.fillStyle = 'rgba(0,0,0,1)';
            clipctx.fillRect(x, y, w, h);
            //描边
            clipctx.globalCompositeOperation = "source-over";
            clipctx.moveTo(x, y);
            clipctx.lineTo(x + w, y);
            clipctx.lineTo(x + w, y + h);
            clipctx.lineTo(x, y + h);
            clipctx.lineTo(x, y);
            clipctx.stroke();
            clipctx.closePath();
        },
        exportBase(mime){
            // 导出图片 base64
            let pos = this.pos;
            let scale = this.imgCInfo.scale;
            let sx = pos.x / scale;
            let sy = pos.y / scale;
            let swidth = parseInt(this.clipCinfo.w / scale);
            let sheight = parseInt(this.clipCinfo.h / scale);
            let canvas = document.createElement("canvas");
            canvas.width = swidth;
            canvas.height = sheight;
            let ctx = canvas.getContext("2d");  
            ctx.drawImage(this.img,sx,sy,this.imgInfo.w,this.imgInfo.h,0,0,this.imgInfo.w,this.imgInfo.h);
            mime = mime || "image/png"
            return  canvas.toDataURL(mime,0.7);
        },
        exportFile(filename,mime){
            let base64 = this.exportBase(mime);
            return this.dataURLtoFile(base64,filename,mime);
        },
        hasClip(){
            // 是否存在裁剪
            if(!this.imgCInfo || !this.clipCinfo){
                return false;
            }
            if(this.imgCInfo.w/this.imgCInfo.h === this.clipCinfo.w / this.clipCinfo.h){
                return false
            }else{
                return true;
            }
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
        }
    },
    destroyed(){
        window.removeEventListener("mouseup",this.onmouseup);
    }
}
</script>
<style lang="scss" scoped>
.clip-img{
    border: 1px solid rgb(35, 184, 255);
    // margin:  20px 0;
    margin-top: 20px;
    position: relative;
    height: 0;
    width: 0;
    overflow: hidden;
    canvas{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        cursor: move;
    }
    img{
        position: relative;
        z-index: 0;
    }
}
</style>