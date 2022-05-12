<template>
<div class="search-inp">
    <input type="text" :placeholder="placeholder" v-model="keyword" @keydown.enter="toCase" @input="onput">
    <svg-icon iconClass="search" @click="toCase"></svg-icon>
</div>
</template>
<script>
export default {
    name:"searchCase",
    props:["value"],
    data(){
        return {
            keyword:this.value || "",
            placeholder:'输入展厅名称搜索',
        }
    },
    mounted(){
        // if(location.href.indexOf('self/buy/tpl') == -1){
        //     this.placeholder = '输入展厅名称搜索'
        // }else{
        //     this.placeholder = '输入关键词或编号'
        // }
    },
    methods:{
        toCase(){
            this.$emit("onsearched",this.keyword);
        },
        onput(e){
            this.$emit("input",this.keyword);
        }
    },
    watch:{
        value(a,b){
            this.keyword = a;
        }
    }
}
</script>
<style lang="scss" scoped>
            div.search-inp{
                 svg{
                    font-size: 28px;
                    cursor: pointer;
                    vertical-align: middle;
                }
                height: 36px;
                line-height: 36px;
                width: 320px;
                background: #fff;
                display: inline-block;
                vertical-align: middle;
                position: relative;
                border-radius:3px;
                input{
                    background: transparent;
                    border: none;
                    outline: none;
                    -webkit-appearance: none;
                    width: 100%;
                    height: 100%;
                    text-indent: .5em;
                }
                svg{
                    position: absolute;
                    right: 10px;
                    top: 4px;
                }
            }
</style>