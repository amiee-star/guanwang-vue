<template>
  <div class="count-number">
    <div class="see">
      <img src="@/assets/mimg/case/heart.png" alt />
      <span>{{info.favoriteCount || 0}}</span>
    </div>
    <div class="msg">
      <img src="@/assets/mimg/case/msg.png" alt />
      <span>{{info.commentCount || 0}}</span>
    </div>
    <div class="share">
      <img src="@/assets/mimg/case/share.png" alt />
      <span>{{info.shareCount || 0}}</span>
    </div>
  </div>
</template>
<script>
export default {
    name:"count-number",
    props:{
        info:{
            type:Object,
            default(){
                return {

                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
     div.count-number{
        height: .88rem;
        line-height: .88rem;
        display: flex;
        justify-content: space-between;
        color: #848484;
        font-size: .24rem;
        box-shadow:0px -1px 0px 0px rgba(4,0,0,0.05);
        cursor: pointer;
        padding: 0 .6rem;
        img{
            width: .37rem;
            height: .38rem;
            position: relative;
            top: 0.08rem;
        }
        span{
            padding-left: .1rem;
        }
        div.msg{
            img{
                top: 0.1rem;
            }
        }
    }
</style>