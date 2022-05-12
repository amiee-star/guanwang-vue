<template>
    <div class="nav-header-w">
        <div class="nav-header">
            <i><img src="@/assets/images/back.png" alt=""  @click="backTo"></i>
            <div class="title">{{headerTitle}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"nav-header",
    props:["title"],
    data(){
        return {
        }
    },
    computed:{
        headerTitle(){
            return this.title || this.$route.meta.title || "3D数字展厅"
        }
    },
    mounted(){
       
    },
    methods:{
         backTo(){
             // this.$router.replace({name:"index"});
             if(window.history.length <= 1){
                console.log(1)
                this.$router.replace({name:"index"});
             }else{
                console.log(2)
                this.$router.go(-1)
             }
             
          
        }
    }
}
</script>
<style lang="scss" scoped>
.nav-header-w{
    height: 1rem;
}
.nav-header{
    height: 1rem;
    line-height: 1rem;
    background: #252525;
    color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 66;
    div.title{
        font-size: .32rem;
        text-align: center;
        padding: 0 .64rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    i{
        position: absolute;
        left: 0;
        top: 50%;
        padding: 0 .1rem 0 .3rem;
        transform: translateY(-50%);
        font-size: 0;
        cursor: pointer;
        img{
            object-fit: cover;
            width: .24rem;
            vertical-align: middle;
        }
    }
}
</style>