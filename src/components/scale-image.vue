<template>
    <div class="scale-image">
        <img :src="bannerTopImg" alt="" :class="cls">
    </div>
</template>

<script>
export default {
    props:["bannerTopImg"],
    data(){
        return {
            cls:""
        }
    },
    mounted(){
        var me = this;
        setTimeout(() => {
            me.cls = "bgSize";
        }, 500);
    }
}
</script>
<style lang="scss" scoped>
div.scale-image{
    height: 100%;
    width: 100%;
    img{
        height: 100%;   
        width: 100%;
        object-fit: cover;
        transition: all 15s linear;
        &.bgSize{
            transform: scale(1.3);
        }
    }
}
</style>

