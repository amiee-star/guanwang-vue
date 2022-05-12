<template>
    <div class="media">
<!--         <page-header :gradual="false"></page-header>-->
         <div class="marginTop">
             <p class="page-title">新闻媒体</p>
            <ul>
                <li v-for="item in list" :key="item.id" @click="toDetail(item)"><div class="imgbox"><img :src="item.image" alt="加载中..." class=""></div><div class="newsbox"><p class="newsTitle">{{item.title}}</p><p class="newsTime">{{item.author}}</p><p class="newsAbstract">{{item.summary}}</p></div></li>
            </ul>
            <p class="notmore" v-show="!hasData" ref="loading">已经是全部内容了</p>
         </div>
<!--         <PageFooter></PageFooter>-->
         <fixed-tool></fixed-tool>
    </div>
</template>
<script>
export default {
    name:"aboutMedia",
    data(){
        return {
            pageSize:6,
            currentPage:1,
            hasData:true,
            loading:false,
            list:[]
        }
    },
    mounted(){
        this.getList();
        window.addEventListener("scroll",this.loadMore)
    },
    methods:{
        loadMore(){
             var offset = $(this.$refs.loading).offset();
            if(offset && ($(window).scrollTop() >= offset.top - $(window).height())){
                //需要数据
                this.getList();
            }
        },
        async getList(){
            if(!this.hasData || this.loading){
                return ;
            }
            this.loading = true;
            let res = await this.$http.mediaList({
                currentPage:this.currentPage,
                pageSize:this.pageSize,
                type :1
            });
            this.currentPage++;
            let entities = res.entities || [];
            if(entities.length < this.pageSize){
                this.hasData = false;
            }
            this.loading = false;
            this.list = this.list.concat(entities);
        },
        toDetail(item){
            this.$router.push({name:"aboutMediaDetail",params:{id:item.id}})
        }
    },
    beforeDestroy(){
        window.removeEventListener("scroll",this.loadMore)
    }

}
</script>
<style lang="scss" scoped src="./media.scss"></style>