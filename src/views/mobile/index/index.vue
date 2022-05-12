<template>
    <div class="mobile-index">
        <pageHeader />
        <div class="index-apps"><router-view/></div>
        <pageFooter />
    </div>
</template>
<script>
import pageHeader from "mobile/components/page-header/page-header.vue";
import pageFooter from "mobile/components/page-footer/page-footer.vue";
export default {
    name:"mobile-index",
    components:{
        pageHeader,
        pageFooter
    }
}
</script>
<style>
    .mobile-index {
        /*padding-bottom: 1rem;*/
    }
</style>
