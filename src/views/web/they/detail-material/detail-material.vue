<template>
    <div class="page-detail-material">
<!--         <page-header :gradual="false"></page-header>-->
         <div class="detail-content">
             <detail :hideLogo="true" :tempid="tempid" :materialid="materialid" ref="detail"></detail>
         </div> 
    </div>
</template>

<script>
import PageHeader from "@/components/page-header/page-header.vue";
import detail from "@/components/they/detail/detail-material";
export default {
    data(){
        return {
            tempid:this.$route.params.tempid,
            materialid:this.$route.params.materialid
        }
    },
    mounted(){
    },
    components:{
        PageHeader,
        detail
    }
}
</script>

<style lang="scss" scoped >
.page-detail-material{
    height: 100%;
    .detail-content{
        height: calc(100% - 65px);
        .content-w{
            height: 100%;
        }
    }
}
</style>
<style lang="scss">
.page-detail-material{
    .detail-content{
        div.they-detail-material-page{
            .content-w{
                height: 100% ;
             }
        }
    }
}
</style>



