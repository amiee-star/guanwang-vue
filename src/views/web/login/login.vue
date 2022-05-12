<template>
    <div class="page-login">
        <div class="base-container">
            <div class="logo"><logo></logo></div>
        </div>
        <div class="banner">
            <div class="banner-img"></div>
            <div class="login-box-w">
                <div class="base-container">
                    <div class="login-box">
                        <accountUi></accountUi>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <img src="@/assets/images/gongan.png" alt=""> 粤ICP备2021054921号-1 | Copyright © 2021 深圳积木易搭科技技术有限公司，保留一切权利。
        </div>
    </div>
</template>

<script>
import logo from "@/components/logo.vue";
import accountUi from "@/components/account/account-ui";
export default {
    data(){
        return {

        }
    },
    mounted(){

    },
    components:{
        logo,
        accountUi
    }
}
</script>

<style lang="scss" scoped src="./login.scss"></style>
