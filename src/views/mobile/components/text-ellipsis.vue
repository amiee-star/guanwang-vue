<template>
    <div class="text-ellipsis" :style="wrapStyle" ref="textWrap">
        <div class="text-content" ref="textContent">
            <slot></slot>
        </div>
        <div class="btns" v-if="needBtn">
            <div class="gradient" :class="{closed:expanded}"></div>
            <div class="expand" v-show="!expanded" @click="expanded=true">展开</div>
            <div class="close" v-show="expanded" @click="expanded=false">收起</div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        rows:{
            type:Number,
            default:3
        }
    },
    computed:{
        wrapStyle(){
            if(this.expanded){
                return {lineHeight:this.lineHeight+'rem', paddingBottom:this.lineHeight+'rem'}
            }else{
                return {maxHeight:this.lineHeight*this.rows + 'rem',lineHeight:this.lineHeight+'rem'}
            }
        }
    },

    data(){
        return {
            expanded:false,
            needBtn:false,
            lineHeight:0.42
        }
    },
    updated(){
        this.init();
    },
    mounted(){
       this.init();
    },
    methods:{
        init(){
            var h = this.$refs.textWrap.clientHeight;
            var th = this.$refs.textContent.scrollHeight;
            if(h < th){
                //需要展开按钮
                this.needBtn = true;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    div.text-ellipsis{
        overflow: hidden;
        position: relative;
        div.text-content{
            word-break: break-all;
            word-wrap: break-word;
            text-align: justify;
        }
        div.btns{
            position: absolute;
            right: 0;
            bottom: 0;
            color: #23B8FF;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            user-select:none;
            div.gradient{
                width:56px;
                background:linear-gradient(270deg,rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
                &.closed{
                    background: transparent;
                }
            }
            div.expand{
                background: #fff;
            }
            div.close{
                background: transparent;
            }
        }
    }
</style>

