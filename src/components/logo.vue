<template>
    <div class="logo-componets flex-center" :class="{ hover: !disabled }" @click="logoclick">
        <!-- <span class="circle">3D</span><span>3D数字展厅</span> -->
        <div class="flex jimu"></div>
        <svg-icon icon-class="logo-white-new"></svg-icon>
    </div>
</template>

<script>
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      logoclick() {
        if (!this.disabled) {
          this.$router.push({path: "/"});
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
    .logo-componets {
        color: #fff;
        text-align: center;


        /*span {*/
        /*    font-family: SourceHanSansCN-Bold;*/
        /*    display: inline-block;*/
        /*    vertical-align: middle;*/
        /*    font-weight: bold;*/
        /*    font-size: 18px;*/
        /*    color: #000000;*/

        /*    &.circle {*/
        /*        line-height: 30px;*/
        /*        text-align: center;*/
        /*        width: 30px;*/
        /*        height: 30px;*/
        /*        background: #000000;*/
        /*        border-radius: 15px;*/
        /*        color: #fff;*/
        /*        margin-right: 8px;*/
        /*    }*/
        /*}*/

        .jimu {
            width: 130px;
            height: 100%;
            background: url("~@/assets/images/logo/defult.png") no-repeat;
            background-size: 100%;
            background-position: 50% 50%;
            margin-right: 5px;
            &::after{
                content: "";
                display: block;
                padding-bottom: 47%;

            }

            /*margin-bottom:10px ;*/
        }

        svg {
            font-size: 220px;
            height: 62px;
        }
    }
</style>
