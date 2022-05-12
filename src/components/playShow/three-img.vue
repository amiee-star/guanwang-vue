<template>
    <div class="three-img">
        <div ref="main" class="img"></div>
    </div>
</template>
<script>
import threeImg from "./3d-plus.js";
export default {
    name:"three-img",
    props:{
        extobj:{
            
        },
        autoplay:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {

        }
    },
    watch:{
      extobj(val){
          if(val){
             this.handleData()
          }
      } 
    },
    mounted(){
       this.handleData()
    },
    methods:{
        handleData(){
        const me = this;
        if(!this.d3){
            this.d3 = new threeImg({
            // 需要挂载到页面的DOM元素（必填）
            el: this.$refs.main,
            // 图片相关参数
            img:{
                // 图片所在的文件夹（必填）
                // dir:dir,
                // //  图片数量（必填）
                // num: 30,
                // // 图片后缀
                // suffix:"png",
                // // 图片加载需要添加的属性 (选填)
                // 所有图片的地址
                paths: me.resolvePath(),
                attrs:{
                crossOrigin:"anonymous"
                },
                // 如果加载失败，最多加载多少次 (选填)
                max:5, 
                // 如果加载失败，间隔多少秒，尝试一次  (选填)
                time:1,
            },
            // 是否自动播放  （选填）  默认为false
            autoplay:me.autoplay,
            // 初始化完成后，自动选择一周, 默认为 true
            turn:false, 
            // 图片切换的频率 (选填) 默认为 10ms
            frequency:200,
            // 进度条  {loaded 已加载的图片个数  total 图片总个数  }  （选填）
            progress: function(e) { 
                //console.log(e)
            },
            // 加载完毕（选填）
            onload: function() {},
            // 加载出错 （选填）
            error:function(){},
            // 播放动作来源 （选填）
            playChange(play,isInner){
                // play  true  和 false
                // isInner 是外部调用，内部停止
                me.$emit("playChange",{play,isInner})
            }
            });
        }else{
            this.d3.config.img.paths = me.resolvePath()
            this.d3._init(this.d3.config)
        }

        },
        resolvePath(){
            const me = this;
            let obj = new URL(me.extobj.src);
            let nm = obj.pathname.split("/").pop() || "";
	        obj.pathname = obj.pathname.replace(nm,"");
            let search = obj.search;
            obj.search = "";
            let dir = obj.toString();
            let suffix = nm.split(".").pop(); // 后缀
            let num = me.extobj.num || 0; // 图片数量
            let paths = [];
            for(let i = 0; i < num; i++){
                let k = String(i).padStart(2,"0");
                paths.push(`${dir}${k}.${suffix}${search}`);
            }
            return paths;
        }
    }
}
</script>
<style lang="scss" scoped>
.three-img{
    height:100%;
    .img{
        height: 100%;
    }
}
</style>