<template>
    <div class="search-page">
        <div class="headers">
            <searchCase  :aoutfocus="true"  @onsearched="onsearched"> </searchCase >
            <span class="cancel" @click="$router.go(-1)">取消</span>
        </div>
    </div>
</template>
<script>
import searchCase from "mobile/components/search-case.vue";
export default {
    name:"search",
    components:{
        searchCase
    },
    methods:{
        onsearched(e){
            console.log(e);
            this.$router.push({
                name:"case",
                query:{
                    keyword:e
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.search-page{
    .headers{
        height: 1rem;
        background: #252525;
        padding: 0 .36rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span.cancel{
            color: #fff;
            margin-left: .37rem;
        }
    }
}
</style>