<template>
    <div class="m-create">
        <navHeader title="创建展厅"></navHeader>
        <div class="title">视 创<span>小程序</span></div>
        <p>快速创建3D展厅</p>
        <p>在掌心 "畅游" 3D数字艺术</p>
        <div class="gif">
            <img src="@/assets/mimg/create/loading.gif" alt="">
        </div>
        <div class="tip">
            <span v-if="weixin">长按识别小程序码</span>
            <span v-else>微信里搜索 "<b>视创</b>" 小程序</span>
        </div>
    </div>
</template>
<script>
import brower from '@/utils/brower';
import navHeader from "mobile/components/nav-header.vue";
export default {
    name:"m-create",
    data(){
        return {
            weixin: brower.versions.weixin
        }
    },
    components:{
        navHeader
    },
    mounted(){
    }
}
</script>
<style lang="scss" scoped>
.m-create{
    text-align: center;
    div.title{
        font-size: .42rem;
        color: #000;
        font-weight: bold;
        padding-top: 1.6rem;
        margin-bottom: .34rem;
        position: relative;
        span{
            background: #2BA245;
            color: #fff;
            font-size: .22rem;
            padding: 0.02rem 0.1rem;
            margin-left: .64rem;
            position: absolute;
            bottom: 0.04rem;
            left: 50%;

        }
    }
    p{
        margin-bottom: .1rem;
        font-size: .3rem;
        color: #666666;
        font-weight: bold;
    }
    div.gif{
        // margin-top: 1rem;
        margin: 1rem auto 0;
        width: 2.6rem;
        height: 2.6rem;
        >img{
            width: 100%;
            height: 100%;
        }
    }
    div.tip{
        color: #999999;
        font-size: .22rem;
        margin-top: .22rem;
        font-weight: bold;
        b{
            color: #2BA245;
        }
    }
}
</style>