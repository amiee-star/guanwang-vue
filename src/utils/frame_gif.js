class FrameGif {
    constructor(arg) {
        arg = arg || { width: 200, height: 200 };
        this.img = null;
        this.frame = 1;	   // 播放帧数
        this.time = 0.01; // 单帧时长

        this.current = 0; // 当前到第几帧
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.parent = null;
        this.isRuning = false;
        this.win = {
            width: arg.width,
            height: arg.height
        }
    }
    loadImg(url,attrs) {
        let img = new Image();
        attrs = attrs || {};
        for(let i in attrs){
            img[i] = attrs[i];
        }
        img.src = url;
        return new Promise((resolve, reject) => {
            img.onload = function () {
                resolve(img);
            }
            img.onerror = reject;
        });
    }
    async loadFile(file, opt) {
        this.img = await this.loadImg(URL.createObjectURL(file));
        this.setOptions(opt);
    }
    async loadUrl(url,opt){
        this.img = await this.loadImg(url,{crossOrigin:"anonymous"});
        this.setOptions(opt);
    }   
    setOptions(opt) {
        opt = opt || {};
        for (let i in opt) {
            this[i] = opt[i];
        }
        this.calcStart();
    }
    calcStart() {
        // 计算,并开始播放
        if (this.img) {
            // 计算高度
            this.h = this.img.height / this.frame;
            this.w = this.img.width;
            this.compress();
            this.canvas.width = this.cw;
            this.canvas.height = this.ch;
            this.parent.appendChild(this.canvas);
            this.current = 0;
            this.play();
        }
    }
    compress() {
        let win = this.win;
        let rate = win.width / win.height;
        let rateImg = this.w / this.h;
        if (rateImg > rate) {
            // 图片的宽度过大
            this.cw = win.width;
            this.ch = win.width / rateImg;
        } else {
            this.ch = win.height;
            this.cw = win.height * rateImg;
        }
        this.rateImg = rateImg;
    }

    loop() {
        let me = this;
        me.drawn();
        if(me.frame <= 1){
            return ;
        }
        clearTimeout(this.timeOut);
        me.timeOut = setTimeout(function () {
            if (me.isRuning) {
                me.current++;
                if (me.current >= me.frame) {
                    me.current = 0;
                }
                me.drawn();
                me.loop();
            }
        }, me.time * 1000);
    }
    drawn() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.img, 0, this.current * this.h, this.w, this.h, 0, 0, this.cw, this.ch);
    }
    pause() {
        this.isRuning = false;
        clearTimeout(this.timeOut);
    }
    play() {
        let me = this;
        this.isRuning = true;
        clearTimeout(this.timeOut);
        this.loop();
    }
}

export default FrameGif;