<template>
  <div class="wrap" id="wrap">
    <div id="box">
      <div id="marquee">{{text}}</div>
    </div>
    <div id="node">{{text}}</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'Scroller',
    props: ['lists'], // 父组件传入数据， 数组形式 [ "连雨不知春去"，"一晴方觉夏深"]
    data () {
      return {
        text: '', // 数组文字转化后的字符串
        list: [],   //默认的滚动文字,
        boxWidth: "",
        timer: ""
      }
    },
    methods: {
      move () {
        // 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
        this.boxWidth = document.getElementById('wrap').getBoundingClientRect().width
        let nodeWidth = document.getElementById('node').getBoundingClientRect().width   //文字的宽度
        let box = document.getElementById('box')
        let distance = -nodeWidth - 170*2// 初始化位置
        let me = this;
        // 定时器设置位移
        me.timer = setInterval(function () {
          distance = distance + 1
          // 文字从右到左滚动播放
          if (distance >= me.boxWidth) {
            distance = -nodeWidth - 170*2
          }
          box.style.transform = 'translateX(' + -distance + 'px)'   // 沿x轴运动
        }, 30)
      }
    },
    // 把父组件传入的arr转化成字符串
    mounted: function () {
      this.list = this.lists
      for (let i = 0; i < this.list.length; i++) {
        this.text += '  ' + this.list[i]
      }
      let me = this;
      window.onresize = () => {
        me.boxWidth = document.getElementById('wrap').getBoundingClientRect().width
      }
    },
    // 更新的时候运动
    updated: function () {
         //box的宽度
      this.move()
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped type="text/css" lang="scss">
  .wrap {
    width: calc(100% - 170px);
    /*max-width: 1280px;*/
    overflow: hidden;
    color: #fff;
    font-size: 16px;
    margin: 0 auto;
  }
  #megaphone {
    float:left;
  }
  #box {
    /*width: 100%;*/
    width: 600px;
    float: right;
    height: 100%;
    white-space: nowrap;
    transform: translateX(580px);
  }
  #box div {
    float: right;
  }
  #marquee {
    margin: 0 16px 0 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #node {
    position: absolute;
    z-index: -99;
    top: -9999px;
    opacity: 0;
  }
</style>