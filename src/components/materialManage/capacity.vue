<template>
    <div class="m-capacity">
        <div class="rate-progress">
            <p class="flex"><span>上传流量：{{Math.ceil(userInfo.useSpace/1024/1024)}}MB/{{Math.ceil(userInfo.totalSpace/1024/1024)}}MB</span><span class="how" @click="howtoAdd=true">如何扩容？</span></p>
            <p class="back">
                <span class="color" :style="percentColor"></span>
            </p>
        </div>
         <!--扩容-->
        <div class="toAddContain" v-if="howtoAdd">
            <div class="list">
                <p>素材上传流量规则</p>
                <ul>
                  <li>1、默认上传流量50MB；</li>
                  <li>2、每增加一个展厅，自动增加1024MB的上传流量；</li>
                  <li>3、上传流量的有效期限与相应展厅的时效相同；</li>
                  <li>4、如需更多帮助，可咨询客服； </li>
                </ul>
                <svg-icon icon-class="close" @click="howtoAdd=false"></svg-icon>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"m-capacity",
    data(){
        return {
            howtoAdd:false
        }
    },
    computed: {
      userInfo() {
        return this.$store.state.userinfo || {};
      },
      percentColor() {
        let percent = (this.userInfo.useSpace / this.userInfo.totalSpace) * 100;
        let color = percent > 50 ? "#FF5A5F" : "#23B8FF";
        let back = {
          background: color,
          width: `${Math.ceil(percent)}%`
        }
        return back
      }
    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>
div.m-capacity{
    .rate-progress{
        width:300px;
        .how{
            color: #999999;
            cursor: pointer;
        }
        .back{
            width:100%;
            height:8px;
            background:rgba(233,233,233,1);
            position: relative;
            margin-top: 5px;
            .color{
                height: 100%;
                position: absolute;
            }
        }
    }

      .toAddContain{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 5;
        .list{
            width:382px;
            height:238px;
            background:rgba(255,255,255,1);
            border-radius:12px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 26px;
            >p{
                font-size:20px;
                margin-bottom: 25px;
            }
            li{
                line-height:30px;
                color: #666666;
            }
            .svg-icon{
                font-size: 28px;
                position: absolute;
                right: -14px;
                top: -14px;
                cursor: pointer;
            }
        }
    }

}
</style>
