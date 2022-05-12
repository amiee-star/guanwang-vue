
class AutoImage{
    constructor(params){
        params = params || {};
        let def = {
            boundary:{
                width:300,
                height:300
            },
            gap:20
        }
        let p = Object.assign(def,params);
        let boundary =  p.boundary;
        this.boundary = boundary;
        this.gap = p.gap;
        this.canvas = params.canvas;
        
        this.opt = {
            width:boundary.width - p.gap,
            height:boundary.height - p.gap
        }
        this.canvas.width = boundary.width;
        this.canvas.height = boundary.height;

        // 线的宽度
        this.lineW = 2;
        this.lineColor = "green";
        this.minW = 20;
        this.minH = 20;

        this.cornerW = 6;
        this.cornerColor = "green";

        this.stage = new createjs.Stage(this.canvas);
        this.stage.enableMouseOver(10); // 10 updates per second
    }
    
    loadImage(url,attrs){
        let img = new Image();
        img.src = url;
        attrs = attrs || {crossOrigin:"anonymous"};
        for(let i in attrs){
            img[i] = attrs[i];
        }
        return new Promise((resolve,reject)=>{
            img.onload = function(){
                resolve(img);
            };
            img.onerror  = reject;
        });
    }
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
    }
    refreshFrame(){
        let {
            topPos,
            leftPos,
            bottomPos,
            rightPos,

            topLeft,
            topRight,
            bottomLeft,
            bottomRight,

            lineTop,
            lineRight,
            lineBottom,
            lineLeft,

            clineTLeft,
            clineTRight,
            clineBLeft,
            clineBRight
        } = this.calcPos();
        this.setFrameGraphics(this.frameTop,topPos);
        this.setFrameGraphics(this.frameLeft,leftPos);
        this.setFrameGraphics(this.frameBottom,bottomPos);
        this.setFrameGraphics(this.frameRight,rightPos);

        this.setFrameGraphics(this.cornerTLeft,topLeft);
        this.setFrameGraphics(this.cornerTRight,topRight);
        this.setFrameGraphics(this.cornerBLeft,bottomLeft);
        this.setFrameGraphics(this.cornerBRight,bottomRight);

        this.setFrameGraphics(this.lineTop,lineTop);
        this.setFrameGraphics(this.lineRight,lineRight);
        this.setFrameGraphics(this.lineBottom,lineBottom);
        this.setFrameGraphics(this.lineLeft,lineLeft);

        let frameCenter = {
            ...this.frameRect,
            c:"rgba(255,255,255,0.01)"
        }
        this.setFrameGraphics(this.frameCenter,frameCenter);

        this.setFrameGraphics(this.clineTLeft,clineTLeft);
        this.setFrameGraphics(this.clineTRight,clineTRight);
        this.setFrameGraphics(this.clineBLeft,clineBLeft);
        this.setFrameGraphics(this.clineBRight,clineBRight);
        
        this.stage.update();
    }
    
    dragLeft(e){
        if(this._mouseLeft){
            let x = e.stageX - this._mouseLeft.x
            let res = this.changeLeft(x);
            if(res){
                this.frameRect = Object.assign(this.frameRect,res);
                this.refreshFrame();
            }
        }
        this._mouseLeft = {
            x:e.stageX
        }
    }
    dragRight(e){
        if(this._mouseRight){
            let x = e.stageX - this._mouseRight.x
            let res = this.changeRight(x);
            if(res){
                this.frameRect = Object.assign(this.frameRect,res);
                this.refreshFrame(); 
            }
        }
        this._mouseRight = {
            x:e.stageX
        }
    }
    dragTop(e){
        if(this._mouseTop){
            let y = e.stageY - this._mouseTop.y
            let res = this.changeTop(y);
            if(res){
                this.frameRect = Object.assign(this.frameRect,res);
                this.refreshFrame();
            }
        }
        this._mouseTop = {
            y:e.stageY
        }
    }
    dragBottom(e){
        if(this._mouseBottom){
            let y = e.stageY - this._mouseBottom.y
            let res = this.changeBottom(y);
            if(res){
                this.frameRect = Object.assign(this.frameRect,res);
                this.refreshFrame();
            }
        }
        this._mouseBottom = {
            y:e.stageY
        }
    }
    dragCenter(e){
        if(this._mouseCenter){
            let y = e.stageY - this._mouseCenter.y;
            let x = e.stageX - this._mouseCenter.x;
            let frameRect = {...this.frameRect};
            frameRect.x += x;
            frameRect.y += y;
            if(this.changeFrameRect(frameRect)){
                this.frameRect = frameRect;
                this.refreshFrame();
            }
        }
        this._mouseCenter = {
            y:e.stageY,
            x:e.stageX
        }
    }
    dragTLeft(e){
        // 左上角
        if( this._mouseTLeft){
            let y = e.stageY - this._mouseTLeft.y;
            let x = e.stageX - this._mouseTLeft.x;
            let mis;
            if(Math.abs(y) > Math.abs(x)){
                mis = x;
            }else{
                mis = y;
            }
            
            let l = this.changeLeft(mis);
            let t = this.changeTop(mis);
            if(l && t){
                this.frameRect = Object.assign(this.frameRect,l,t);
                this.refreshFrame();
            }
        }else{
            this._mouseTLeft = {
                start:{
                    y:e.stageY,
                    x:e.stageX
                }
            }
        }
        this._mouseTLeft.y = e.stageY;
        this._mouseTLeft.x = e.stageX;
       
    }
    dragTRight(e){
        // 右上角 45 135 225 315 
        if( this._mouseTRight){
           
            let y = e.stageY - this._mouseTRight.y;
            let x = e.stageX - this._mouseTRight.x;
            let mis;
            if(Math.abs(y) > Math.abs(x)){
                mis = x;
            }else{
                mis = y;
            }
            
            if(!mis){
                return ;
            }
            let l = this.changeRight(-mis);
            let t = this.changeTop(mis);
            if(l && t){
                this.frameRect = Object.assign(this.frameRect,t,l);
                this.refreshFrame();
            }
        }else{
            this._mouseTRight = {
                start:{
                    y:e.stageY,
                    x:e.stageX
                }
            }
        }
        this._mouseTRight.y = e.stageY;
        this._mouseTRight.x = e.stageX;
    }
    dragBLeft(e){
        // 左下角
        if( this._mouseBLeft){
           
            let y = e.stageY - this._mouseBLeft.y;
            let x = e.stageX - this._mouseBLeft.x;
            let mis;
            if(Math.abs(y) > Math.abs(x)){
                mis = x;
            }else{
                mis = y;
            }
            let l = this.changeLeft(-mis);
            let t = this.changeBottom(mis);
            if(l && t){
                this.frameRect = Object.assign(this.frameRect,l,t);
                this.refreshFrame();
            }
        }else{
            this._mouseBLeft = {
                start:{
                    y:e.stageY,
                    x:e.stageX
                }
            }
        }
        this._mouseBLeft.y = e.stageY;
        this._mouseBLeft.x = e.stageX;

        
    }
    dragBRight(e){
        // 右下角
        if( this._mouseBRight){
           
            let y = e.stageY - this._mouseBRight.y;
            let x = e.stageX - this._mouseBRight.x;
            let mis;
            if(Math.abs(y) > Math.abs(x)){
                mis = x;
            }else{
                mis = y;
            }

            let l = this.changeRight(mis);
            let t = this.changeBottom(mis);
            if(l && t){
                this.frameRect = Object.assign(this.frameRect,l,t);
                this.refreshFrame();
            }
        }else{
            this._mouseBRight = {
                start:{
                    y:e.stageY,
                    x:e.stageX
                }
            }
        }
        this._mouseBRight.y = e.stageY;
        this._mouseBRight.x = e.stageX;

    }
    changeFrameRect(frameRect){
        // 完整的边界判断
        let {x,y,w,h} = frameRect;
        let limit = this.limit;
        if( x < limit.x ){
            return false;
        }
        if(x + w > limit.x + limit.w){
            return false;
        }
        if( y < limit.y){
            return false ;
        }

        if(h + y > limit.h + limit.y){
            return  false;
        }
        if(w < this.minW){
            return false;
        }
        if(h < this.minH){
            return false;
        }
        return frameRect;
    }
    changeLeft(mis){
        let {x,w} = this.frameRect;
        x += mis;
        w -= mis;
        if(w < this.minW){
            return ;
        }
        let limit = this.limit;
        if( x < limit.x ){
            return ;
        }
        return {x,w};
    }
    changeRight(mis){
        let {w,x} = this.frameRect;
        w += mis;
        if(w < this.minW){
            return ;
        }
        let limit = this.limit;
        if( x + w > limit.x + limit.w){
            return ;
        }
        return {w,x};
    }
    changeTop(mis){
        let {y,h} = this.frameRect;
        y += mis;
        h -= mis;
        if(h < this.minH){
            return ;
        }
        let limit = this.limit;
        if( y < limit.y){
            return ;
        }
        return {y,h};
    }
    changeBottom(mis){
        let {h,y} = this.frameRect;
        h += mis;
        if(h < this.minH){
            return ;
        }
        let limit = this.limit;
        if(h + y > limit.h + limit.y){
            return ;
        }
        return {h,y}; 
    }
    setFrame(){
        // 初始化边框
        this.frameTop = new createjs.Shape();
        this.frameRight = new createjs.Shape();
        this.frameLeft = new createjs.Shape();
        this.frameBottom = new createjs.Shape();


        // 拐角
        this.cornerTLeft = new createjs.Shape();
        this.cornerTRight = new createjs.Shape();
        this.cornerBLeft = new createjs.Shape();
        this.cornerBRight = new createjs.Shape();

        // 线
        this.lineLeft = new createjs.Shape();
        this.lineRight = new createjs.Shape();
        this.lineTop = new createjs.Shape();
        this.lineBottom = new createjs.Shape();

        // 线的拐角
        this.clineTLeft = new createjs.Shape();
        this.clineTRight = new createjs.Shape();
        this.clineBLeft= new createjs.Shape();
        this.clineBRight = new createjs.Shape();

        // 正中间的一块
        this.frameCenter = new createjs.Shape();
        this.frameCenter.cursor = "move";


        // 绑定事件
        this.lineTop.cursor="s-resize";
        this.lineTop.on("pressmove",this.dragTop.bind(this));
        this.frameTop.cursor = "s-resize";
        this.frameTop.on("pressmove",this.dragTop.bind(this));

        this.lineLeft.cursor="w-resize";
        this.lineLeft.on("pressmove",this.dragLeft.bind(this));
        this.frameLeft.cursor="w-resize";
        this.frameLeft.on("pressmove",this.dragLeft.bind(this));

        this.lineBottom.cursor = "s-resize";
        this.lineBottom.on("pressmove",this.dragBottom.bind(this));
        this.frameBottom.cursor = "s-resize";
        this.frameBottom.on("pressmove",this.dragBottom.bind(this));

        this.lineRight.cursor="w-resize";
        this.lineRight.on("pressmove",this.dragRight.bind(this));
        this.frameRight.cursor="w-resize";
        this.frameRight.on("pressmove",this.dragRight.bind(this));


        this.frameCenter.on("pressmove",this.dragCenter.bind(this));


        this.clineTLeft.cursor = "se-resize";
        this.clineTLeft.on("pressmove",this.dragTLeft.bind(this));

        this.clineTRight.cursor = "ne-resize";
        this.clineTRight.on("pressmove",this.dragTRight.bind(this));

        this.clineBLeft.cursor = "ne-resize";
        this.clineBLeft.on("pressmove",this.dragBLeft.bind(this));

        this.clineBRight.cursor = "se-resize";
        this.clineBRight.on("pressmove",this.dragBRight.bind(this));

        const me = this;
        window.addEventListener("mouseup",function(){
            me._mouseTop = null;
            me._mouseBottom = null;
            me._mouseLeft= null;
            me._mouseRight = null;
            me._mouseCenter = null;

            me._mouseTLeft = null;
            me._mouseTRight = null;
            me._mouseBLeft = null;
            me._mouseBRight = null;

        });


        this.stage.addChild(this.frameTop);
        this.stage.addChild(this.frameRight);
        this.stage.addChild(this.frameLeft);
        this.stage.addChild(this.frameBottom);

        this.stage.addChild(this.cornerTLeft);
        this.stage.addChild(this.cornerTRight);
        this.stage.addChild(this.cornerBLeft);
        this.stage.addChild(this.cornerBRight);

        this.stage.addChild(this.lineLeft);
        this.stage.addChild(this.lineRight);
        this.stage.addChild(this.lineTop);
        this.stage.addChild(this.lineBottom);

        this.stage.addChild(this.frameCenter);

        this.stage.addChild(this.clineTLeft);
        this.stage.addChild(this.clineTRight);
        this.stage.addChild(this.clineBLeft);
        this.stage.addChild(this.clineBRight);


        this.refreshFrame();

    }
    calcPos(){
        let frameRect = this.frameRect;
        let boundary = this.boundary;
        let lineW = this.lineW;
        let topPos = {
            x: frameRect.x,
            y: 0,
            w: frameRect.w,
            h: frameRect.y 
        };
        let leftPos = {
            x:0,
            y:frameRect.y,
            w:frameRect.x,
            h:frameRect.h
        };
        let bottomPos = {
            x:frameRect.x,
            y:frameRect.y + frameRect.h,
            w:frameRect.w,
            h:boundary.height - frameRect.y - frameRect.h
        };
        let rightPos = {
            x:frameRect.x + frameRect.w,
            y: frameRect.y,
            w: boundary.width - frameRect.x - frameRect.w,
            h: frameRect.h
        };

        // 拐角
        let topLeft = {
            x:0,
            y:0,
            w:frameRect.x,
            h:frameRect.y
        }
        let topRight = {
            x:frameRect.x + frameRect.w,
            y:0,
            w:boundary.width - frameRect.x - frameRect.w,
            h:frameRect.y
        }

        let bottomLeft = {
            x:0,
            y:frameRect.y + frameRect.h,
            w:frameRect.x,
            h:boundary.height - frameRect.y - frameRect.h,
        }
        let bottomRight = {
            x:frameRect.x + frameRect.w,
            y:frameRect.y + frameRect.h,
            w:boundary.width - frameRect.x - frameRect.w,
            h:boundary.height - frameRect.y - frameRect.h
        }


        // 线
        let lineTop = {
            x:topPos.x,
            y:topPos.y+topPos.h - lineW,
            w:topPos.w,
            h:lineW,
            c:this.lineColor
        }
        let lineRight = {
            x:rightPos.x,
            y:rightPos.y,
            w:lineW,
            h:rightPos.h,
            c:this.lineColor
        }
        let lineBottom = {
            x:bottomPos.x,
            y:bottomPos.y,
            w:bottomPos.w,
            h:lineW,
            c:this.lineColor
        }
        let lineLeft = {
            x:leftPos.x + leftPos.w - lineW,
            y:leftPos.y,
            w:lineW,
            h:leftPos.h,
            c:this.lineColor
        }
        // 修补线的拐角,往两边修复
        lineTop.x -=  lineW;
        lineTop.w += lineW*2;
        
        lineBottom.x -=  lineW;
        lineBottom.w += lineW*2;


        // 线的拐角
        let clineTLeft = {
            x: frameRect.x - this.cornerW,
            y: frameRect.y - this.cornerW,
            w: this.cornerW,
            h:this.cornerW,
            c:this.cornerColor
        }

        let clineTRight = {
            x: frameRect.x + frameRect.w,
            y: frameRect.y - this.cornerW,
            w: this.cornerW,
            h:this.cornerW,
            c:this.cornerColor
        }

        let clineBLeft = {
            x: frameRect.x - this.cornerW,
            y: frameRect.y + frameRect.h,
            w: this.cornerW,
            h:this.cornerW,
            c:this.cornerColor
        }

        let clineBRight = {
            x: frameRect.x + frameRect.w,
            y: frameRect.y + frameRect.h,
            w: this.cornerW,
            h:this.cornerW,
            c:this.cornerColor
        }

        return {
            topPos,
            leftPos,
            bottomPos,
            rightPos,

            topLeft,
            topRight,
            bottomLeft,
            bottomRight,
            
            lineTop,
            lineRight,
            lineBottom,
            lineLeft,

            clineTLeft,
            clineTRight,
            clineBLeft,
            clineBRight
        }
    }
    setFrameGraphics(frame,opt){
        var g = new createjs.Graphics();
        g.beginFill(opt.c ||  "rgba(0,0,0,0.6)").drawRect(opt.x,opt.y,opt.w,opt.h);
        frame.graphics =  g;
    }
    async setImg(src){
        // 初始化 src
        this.stage.removeAllChildren();
        this.stage.clear();
        this.stage.update();

        this.img = await this.loadImage(src);
        let bmp = new createjs.Bitmap(this.img );
        this.bmp = bmp;
        let info = this.compress(this.img);
        bmp.scaleX = info.scale;
        bmp.scaleY = info.scale;
        
        let boundary = this.boundary;
        bmp.x = (boundary.width - info.w)/2;
        bmp.y = (boundary.height - info.h)/2;
        this.stage.addChild(bmp);
        this.frameRect = {
            x:bmp.x,
            y:bmp.y,
            w:info.w,
            h:info.h
        }
        this.limit = {...this.frameRect};
        this.setFrame();
        this.stage.update();
    }
    getClipParams(){
        // 获取裁剪的参数
        let frameRect = {...this.frameRect};
        let bmp = this.bmp;
        frameRect.x -= bmp.x;
        frameRect.y -= bmp.y;
        frameRect.x /= bmp.scaleX;
        frameRect.y /= bmp.scaleX;
        frameRect.h /= bmp.scaleY;
        frameRect.w /= bmp.scaleY;
        return frameRect;
    }
    getExportCanvas(compress){
        let canvas = document.createElement("canvas");
        let frameRect = this.getClipParams();
        compress = compress || 0.95;
        canvas.width = frameRect.w*compress;
        canvas.height = frameRect.h*compress;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(this.img,frameRect.x,frameRect.y,frameRect.w,frameRect.h,0,0,frameRect.w*compress,frameRect.h*compress);
        return canvas
    }
    exportBase(mime,compress){
        // 导出图片
        let canvas = this.getExportCanvas(compress);
        return canvas.toDataURL(mime ||  "image/png");
    }
    exportFile(filename,mime){
        let base64 = this.exportBase(mime);
        return this.dataURLtoFile(base64,filename,mime);
    }
    exportBlob(filename,mine,compress){
        mine = mine || "image/png";
        let canvas = this.getExportCanvas(compress);
        return new Promise((resolve,reject)=>{
            canvas.toBlob((blob)=>{
                var file = new File([blob], filename || "test.jpg", {type: mine, lastModified: Date.now()});
                resolve(file);
            },mine)
        })
    }
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
    isCliped(){
        // 是否被裁剪了, true 是的， false 未裁剪
        let arr = ["x","y","w","h"];
        for(let i = 0; i < arr.length; i++){
            let k = arr[i];
            if(this.frameRect[k] != this.limit[k]){
                return true;
            }
        }
        return false;
    }
}


export default AutoImage;