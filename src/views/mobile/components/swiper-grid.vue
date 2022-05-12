<template>
    <div class="swiper-grid">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in arr" :key="index">
                <div class="box">
                    <div class="img">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="content">
                        <div class="name">{{item.name}}</div>
                        <p>{{item.desc}}</p>
                        <div class="link" @click="skipTo(item)">{{item.arrow}}<span>→</span></div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
export default {
    name:"swiper-grid",
    props:{
        arr:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    data(){
        return {
            swiperOption:{
                slidesPerView: 'auto',
            }
        }
    },
    methods:{
        skipTo(item){
            if(item.link){
                window.open(item.link,"__blank");
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.swiper-grid{
    width: 100%;
    height: 100%;
    .swiper-container{
        height: 100%;
        padding: .3rem 0;
        .swiper-slide{
            width: auto;
        }
    }
    div.box{
        width: 5.68rem;
        height: 100%;
        margin-left: .36rem;
        background: #fff;
        box-shadow:0px 0.06rem .24rem 0px rgba(0, 0, 0, 0.1);
        position: relative;
        div.img{
            height: 4.02rem;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        div.content{
            padding: .35rem .33rem;
            div.name{
                color: #333333;
                font-size: .32rem;
            }
            p{
                color: #999999;
                font-size: .26rem;
                margin-top: .28rem;
            }
            div.link{
                position: absolute;
                left: 0;
                bottom: .70rem;
                width: 100%;
                padding: 0 0.33rem;
                color: #23B8FF;
                font-size: .26rem;
                cursor: pointer;
                span{
                    margin-left: .1rem;
                }
            }
        }
        
    }
}
</style>