
class ViewThreeImg{
	constructor(opt) {
	    opt = opt || {};
	    let config = {
	    	img:{},
	    	autoplay:false,
			turn:true,
			frequency:100, // 每张图片切换的频率
	    	progress(){},
	    	onload(){},
			playChange(){}  
	    };
	    config = Object.assign(config,opt);

		this.canvas = document.createElement('canvas')
		
		// this.dpo = window.devicePixelRatio ? window.devicePixelRatio : 1;
		this.dpo = 1;
		
		this.width = config.el.clientWidth * this.dpo;
		this.height = config.el.clientHeight * this.dpo;

		
		// 记录当前 canvas 的比例
		this._ratio = this.width / this.height;
		
		this.canvas.width = this.width
		this.canvas.height = this.height
		config.el.appendChild(this.canvas)
		this.stage = new createjs.Stage(this.canvas );
		// 要让移动端支持createjs的点击等鼠标事件时需要加上
		this.stage.enableMouseOver();
		createjs.Touch.enable(this.stage);

	    this.config = config;   
		this.turn = config.turn;
		this.playing = config.autoplay;
		
		this.time = 0;
		this.current = 0;
		
		// 鼠标事件
		this.mouse = {
			offsetX: 0,
			offsetY: 0,
			_x: 0,
			_y: 0,
			x: 0,
			y: 0,
			move: false
		};
		
		this.scale = 1;
		
	    this._init(config);
	}
	async _init(config){
        this.stage.removeAllChildren();
        this.stage.clear();
        this.stage.update();

		// 缓存解析好的图片地址
		config._paths = config.img.paths || [];
		// 清空图片的比例信息
		this.ratio = 0;

		try{
			config._imgs = await this.loadImgs();
			config.onload && config.onload();
		}catch(e){
			config.error && config.error(e);
		}
		
		
		this.initScale();
		
		this.bmp = new createjs.Bitmap(config._imgs[0]);
		this.setScale(this.scale);
		// regX 需要真实的容器宽高
		
		var bitmapPos = this.bmp.getBounds();
		this.bmp.regX = bitmapPos.width  / 2;
		this.bmp.regY = bitmapPos.height / 2;
		
		
		var bgShape = new createjs.Shape();
		this.bgShape = bgShape;
		this.setBg("#fff");
		
		this.setPos();
		
		this.stage.addChild(bgShape)
		this.stage.addChild(this.bmp);
		//this.stage.update();
		
		this.now = this.getNoW();
		this._render();
		this._eventHandler();
	}
	
	resize(stop){
		const config =  this.config;
		this.width = config.el.clientWidth * this.dpo;
		this.height = config.el.clientHeight * this.dpo;
		// 记录当前 canvas 的比例
		this._ratio = this.width / this.height;
		this.canvas.width = this.width
		this.canvas.height = this.height
		this.initScale();
		this.setScale(this.scale);
		// regX 需要真实的容器宽高
		var bitmapPos = this.bmp.getBounds();
		this.bmp.regX = bitmapPos.width  / 2;
		this.bmp.regY = bitmapPos.height / 2;
		this.setBg(this.color);
		this.current = 0
		this.mouse.offsetX = 0
		this.mouse.offsetY = 0
		this.setPos(this.mouse);
		if(stop){
			this.setPlaying(false,true);
		}
	}
	_render(){
		const config = this.config;
		const num = config._paths.length;
		if (this.current >= num) this.current = 0;
		if (this.current < 0) this.current = num - 1;
		this._draw(this.current);
		if (this.turn) {
			this.current++;
			if (this.current >= num) {
				this.turn = false
			}
		} else if (this.playing) {
			let end = this.getNoW();// this.now = 
			if(end - this.now >= config.frequency){
				// 当时间过去 100 毫秒的时候
				this.current++;
				this.now = end;
			}
		}
		window.requestAnimationFrame(this._render.bind(this))
	}
	_draw(index){
		let config = this.config;
		this.bmp.image = config._imgs[index];
		this.stage.update();
		if(!this.context){
			this.context = this.canvas.getContext("2d");
			let data
			if (this._ratio >= this.ratio) {
				data = this.context.getImageData((this.width - parseInt(this._width)) / 2, 0, 1, 1).data
			} else {
				data = this.context.getImageData(0, (this.height - this.width / this.ratio) / 2, 1, 1).data
			}
			let r = data[0]
			let g = data[1]
			let b = data[2]
			this.color = '#' + r.toString(16).padStart(2, 0) + g.toString(16).padStart(2, 0) + b.toString(
				16).padStart(2, 0);
			this.setBg(this.color)
		}
		
	}
	getNoW(){
		return window.performance.now();
	}
	setBg(color){
		this.bgShape.graphics.beginFill(color || "#fff").drawRect(0, 0, this.width, this.height);
	}
	setScale(scale){
		this.bmp.scaleX = scale;
		this.bmp.scaleY = scale;
	}
	setPlaying(play,inner){
		this.playing = play;
		this.config.playChange(play,inner);
	}
	initScale(){
		// rotio 是 图片的 宽高比
		// _height , _width 是图的宽高
		
		// _rotio 是 canvas 的宽高比
		// height , width 是canvas的宽高
		if (this._ratio > this.ratio) {
			// 宽度过大
			this._height = this.height
			this._width = this.height * this.ratio
		} else {
			// 高度过大
			this._width = this.width
			this._height = this.width / this.ratio
		}
		this.bmpScale = this._width / this.maxWidth ;
		this.scale = this.bmpScale;
		
		// this.scaleY = this._height / this.maxHeight ;
		
	}
	// 设置位置
	setPos(opt){
		// 偏移量,默认是居中
		const bmp = this.bmp;
		opt  = opt || {offsetX:0,offsetY:0};
		bmp.x = this.width/2 + opt.offsetX ;
		bmp.y = this.height/2 + opt.offsetY;
		
	}
	// 设置图片的参数 {}
	setImgParams(opt){
		if(opt){
			let img = this.config.img;
			img = Object.assign(img,opt);
			this.config.img = img;
			// reload
			
		}
	}

	// 延时
	sleep(n){
		n = n || 1;
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve();
			},n*1000);
		});
	}

	/**
	 * @param {Array} list  需要加载的图片列表
	 * @param {Object} opt	   参数 opt: { attrs:{} , max:1 ,progress:func, time:1} 
	 * @return {Promise<array>} 返回所有被加载好的图片
	 */
	loadImgs(){
		const me = this;
		let config = me.config;
		let list = config._paths || [];
		let imgConf = config.img || {};
		let attrs = imgConf.attrs || {}; // 图片属性 
		let max = imgConf.max || 1; // 失败后尝试的加载次数
		let time = imgConf.time || 1 ; // 如果失败了，多长时间以后重试
		let progress = config.progress || function(){}; // 进度
		let count = 1; // 当前加载到第几张了
		let len = list.length;
		
		if(len == 0){
			return Promise.reject("参数不能为空");
		}
		/**
		 * @param {String} src  图片的地址
		 */
		function load(src){
			let img = new Image();
			for(let i in attrs){
				img[i] = attrs[i];
			}
			img.src = src;
			return new Promise(function(resolve,reject){
				img.onload = function(){
					try{
						progress({loaded:count,total:len});
						count++;
						if(!me.ratio){
							me.ratio = img.width / img.height;
							me.maxWidth = img.width;
							me.maxHeight = img.height;
						}
					}catch(e){
						console.log(e);
					}
					resolve(img);
				}
				img.onerror = reject;
			});
		}
		
		// 尝试加载图片，如果失败则再次尝试
		async function  loadtry(src,c){
			try{
				let res = await load(src);
				return Promise.resolve(res);
			}catch(e){
				if(c <= max){
					console.log(`加载 ${src} 失败，第 ${c} 次尝试`);
					await me.sleep(time);
					let res = await loadtry(src,++c);
					return Promise.resolve(res);
				}else{
					return Promise.reject(e);
				}
			}
		}
		
		let task = [];
		for(let i = 0; i < list.length; i++){
			task.push(loadtry(list[i]));
		} 
		
		return Promise.all(task);
	}
	_eventHandler(){
		// 事件处理
		let that = this
		const bmp = this.bmp;
		const addScale =  0.05;
		const mousemove = event => {
			if (!this.mouse.move) return
			this.mouse.x = event.clientX
			this.mouse.y = event.clientY
			if (event.which == 1) { // 鼠标左键
				if (this.mouse.x < this.mouse._x) {
					this.current++
				} else {
					this.current--
				}
			} else if (event.which == 3) { // 鼠标右键
				if (this.scale > this.bmpScale) {
					// 只有在放大的情况下,可以拖拽
					var bitmapPos = bmp.getTransformedBounds();
					if (bitmapPos.width > this.width) {
						this.mouse.offsetX += this.mouse.x - this.mouse._x
						let maxX = (bitmapPos.width - this.width) / 2
						if (this.mouse.offsetX >= maxX) this.mouse.offsetX = maxX
						else if (this.mouse.offsetX < -maxX) this.mouse.offsetX = -maxX
					}
					if (bitmapPos.height > this.height) {
						this.mouse.offsetY += this.mouse.y - this.mouse._y
						let maxY = (bitmapPos.height - this.height) / 2
						if (this.mouse.offsetY >= maxY) this.mouse.offsetY = maxY
						else if (this.mouse.offsetY < -maxY) this.mouse.offsetY = -maxY
					}
					this.setPos(this.mouse)
				}
			}
			this.mouse._x = this.mouse.x
			this.mouse._y = this.mouse.y
			
		}
		
		const scale = direction => {
			if (direction) { //放大
				var bitmapPos = bmp.getBounds();
				let s =  this.scale + addScale;
				if (bitmapPos.height * s < this.maxHeight) {
					this.scale = s;
					this.setScale(s);
				}
			} else { //缩小
				let s =  this.scale - addScale;
				if ( s > this.bmpScale) {
					this.scale = s;
				} else {
					this.scale = this.bmpScale;
				}
				this.setScale(this.scale);
				this.mouse.offsetX = 0
				this.mouse.offsetY = 0
				this.setPos(this.mouse)
			}
		
		}
		
		const mousewheel = event => {
			event.preventDefault();
			const direction = (event.wheelDelta || -event.detail) > 0 ? 1 : 0;
			
			if (this.playing) this.setPlaying(false,true);
			scale(direction);
		}
		
		this.canvas.oncontextmenu = _ => {
			return false
		}
		this.canvas.addEventListener('mousedown', event => {
			that.mouse._x = event.clientX
			that.mouse._y = event.clientY
			that.mouse.move = true
			if (this.playing) this.setPlaying(false,true);
			document.addEventListener('mousemove', mousemove, false)
			document.addEventListener('mouseup', _ => {
				that.mouse.move = false
				document.removeEventListener('mousemove', mousemove)
				
			}, {
				once: true
			})
		}, false)
		
		let mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
		this.canvas.addEventListener(mousewheelevt, mousewheel, false)
		
		const touchmove = event => {
			event.preventDefault();
			if (!this.mouse.move) return
			let touches = event.touches
			this.mouse.x = touches[0].clientX
			this.mouse.y = touches[0].clientY
			if (touches.length == 1) {
				let _maxDis = (this.scale/this.bmpScale) * 0.2 + 0.3
				let maxDis = Math.min(_maxDis, 3)
				if (Math.abs(this.mouse.x - this.mouse._x) > maxDis) {
					if (this.mouse.x < this.mouse._x) {
						this.current++
					} else {
						this.current--
					}
				}
			} else {
				let {
					clientX: startX,
					clientY: startY
				} = touches[0]
				let {
					clientX: endX,
					clientY: endY
				} = touches[1]
				this.mouse.endDis = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))
				if (Math.abs(this.mouse.endDis - this.mouse.startDis) < 1.8) {
					if (this.scale > this.bmpScale) {
						var bitmapPos = bmp.getTransformedBounds();
						if (bitmapPos.width > this.width) {
							this.mouse.offsetX += this.mouse.x - this.mouse._x
							let maxX = (bitmapPos.width - this.width) / 2
							if (this.mouse.offsetX >= maxX) this.mouse.offsetX = maxX
							else if (this.mouse.offsetX < -maxX) this.mouse.offsetX = -maxX
						}
						if (bitmapPos.height > this.height) {
							this.mouse.offsetY += this.mouse.y - this.mouse._y
							let maxY = (bitmapPos.height - this.height) / 2
							if (this.mouse.offsetY >= maxY) this.mouse.offsetY = maxY
							else if (this.mouse.offsetY < -maxY) this.mouse.offsetY = -maxY
						}
						this.setPos(this.mouse)
					}
				} else {
					let mark = this.mouse.endDis > this.mouse.startDis ? true : false
					scale(mark)
				}
		
				this.mouse.startDis = this.mouse.endDis
			}
			this.mouse._x = this.mouse.x
			this.mouse._y = this.mouse.y
			return false
		}
		
		this.canvas.addEventListener('touchstart', event => {
			event.preventDefault()
			if (this.playing){
				this.setPlaying(false,true)
			} 
			that.mouse.move = true
			let touches = event.touches
			that.mouse._x = touches[0].clientX
			that.mouse._y = touches[0].clientY
			if (touches.length == 1) {
				that.mouse.move = true
			} else {
				let {
					clientX: startX,
					clientY: startY
				} = touches[0]
				let {
					clientX: endX,
					clientY: endY
				} = touches[1]
				this.mouse.startDis = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))
			}
			document.addEventListener('touchmove', touchmove, { passive: false })
			document.addEventListener('touchend', _ => {
				that.mouse.move = false
				document.removeEventListener('touchmove', touchmove)
			}, {
				once: true
			})
		}, { passive: false })
		
		window.addEventListener('resize', _ => {
			that.resize()
		}, false);
	}
}


export default ViewThreeImg;