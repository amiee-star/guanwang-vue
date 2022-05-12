<template>
  <div class="fixed-tools">
    <ul :class="showGoTop ? 'showGoTop' : ''">
      <li class="kef flex-center-column" @click="onOnlineService">
        <svg-icon icon-class="kf"></svg-icon>
        <span>在线客服</span>
      </li>
      <el-tooltip placement="left" effect="dark" popper-class="fixed_contact" :offset="-42">
        <div class="box" slot="content">
          <p class="title">电话咨询</p>
          <p class="phone">400-080-9959</p>
          <p>
            预约回电将有技术服务人员尽快向您致电，请注意接听。
          </p>
          <el-form :model="form" :rules="rules" ref="form" label-width="0">
            <el-form-item label="" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号" maxlength="15"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :disabled="disabled" type="primary" @click="submitForm('form')">立即预约</el-button>
            </el-form-item>
          </el-form>
        </div>
        <li class="flex-center-column phoneLi">
          <svg-icon icon-class="phone"></svg-icon>
          <span>电话咨询</span>
        </li>
      </el-tooltip>
      <li class="flex-center-column" @click="boutiqueCase">
        <svg-icon icon-class="boutique-case"></svg-icon>
        <span>精品案例</span>
      </li>
      <li class="flex-center-column" @click="toCreat">
        <svg-icon icon-class="createHall"></svg-icon>
        <span>免费使用</span>
        <span class="small">
                  数千款3D模板
                </span>
      </li>
      <li class="flex-center-column" @click="scrollTop">
        <svg-icon icon-class="toTop"></svg-icon>
      </li>
    </ul>
    <contact-us :isvisible="contactUs" @close="contactUs = false"></contact-us>
  </div>
</template>

<script>
  import contactUs from "@/components/contact-us.vue";
  import ElInput from "element-ui/packages/input/src/input";
  import formRules from "@/config/form-rules.js";

  export default {
    name: "fixed-tools",
    data() {
      return {
        disabled: true,
        contactUs: false,
        showGoTop: false,
        clickBool: false,
        form: {
          phone: '',
        },
        rules: {
          phone: [
            {required: true, message: '请输入正确手机号码', validator: this.checkPhone, trigger: 'change'},
          ],
        }
      };
    },
    components: {
      ElInput,
      contactUs,
    },
    computed: {
      userinfo() {
        return this.$store.state.userinfo;
      }
    },
    mounted() {
      window.addEventListener("scroll", this.scroll);
      let me = this;
      $(".phoneLi").hover(
        () => {
          me.$refs["form"].resetFields()
          me.disabled = true;
        }
      )
    },
    methods: {
      checkPhone(rule, value, callback) {
        var mobile = /^1[23456789]\d{9}$/
        if (!value) {
          this.disabled = true;
          callback(new Error("手机号不能为空"));
        } else {
          if (mobile.test(value)) {
            this.disabled = false;
            callback();
          } else {
            this.disabled = true;
            return callback(new Error("请输入正确的手机号"));
          }
        }
      },
      submitForm(formName) {
        let me = this;
        me.$refs[formName].validate(async (valid) => {
          if (valid) {
            let params = {
              telephone: me.form.phone,
              type: 7
            }
            await me.$http.application(params);
            me.$Ruler.success("提交成功");
          } else {
            return false;
          }
        });
      },
      scrollTop() {
        $("body,html")
          .stop(true, true)
          .animate({scrollTop: 0}, 100);
        history.replaceState(null, "", location.pathname + location.search);
      },
      scroll() {
        let scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop ||
          0;
        if (scrollTop > 600) {
          this.showGoTop = true;
        } else {
          this.showGoTop = false;
        }
      },
      //联系客服
      onOnlineService() {
        this.$utils.showKf();
      },
      toCreat() {
        if (this.userinfo && this.$utils.getUserToken()) {
          this.$router.push({name: "buyTpl"})
        } else {
          this.$Ruler.account({
            options: {
              operate: 0,
            },
          });
        }
      },
      boutiqueCase() {
        // this.$store.commit("setStates", {
        //   k: "isShowCounter",
        //   v: true,
        // });
        this.$router.push("/case")
      }
    },
    destroyed() {
      window.removeEventListener("scroll", this.scroll);
    },
  };
</script>

<style lang="scss" scoped>
  .fixed-tools {
    position: fixed;
    right: 20px;
    top: 50%;
    z-index: 40;

    ul {
      width: 65px;
      border-radius: 30px;
      box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);
      background: #fff;
      padding: 18px 0;
      height: 290px;
      justify-content: space-between;
      overflow: hidden;
      transition: all 0.5s;
      &.showGoTop {
        height: 335px;
      }
      /*div.kef {
          cursor: pointer;
          position: relative;
          width: 98px;
          height: 100px;
          left: -22px;
          top: -18px;

          .roll {
              position: absolute;
              left: 47px;
              top: 8px;
              transform-origin: 0 37px;
              animation: ballRoll 2.5s infinite linear;
              z-index: 1;
          }

          .kfbg {
              position: absolute;
          }

          .kfbtn {
              position: absolute;
              z-index: 2;
              bottom: 0;
          }
      }
      */
      li {
        text-align: center;
        cursor: pointer;
        padding-top: 25px;

        &:first-of-type {
          padding-top: 0;
        }

        .svg-icon {
          width: 60px;
          font-size: 20px;
          margin-bottom: 3px;
        }
        span {
          font-size: 12px;
          &.small {
            width: 120%;
            transform: scale(0.67);
            color: #FBB03B;
            margin-top: -3px;
          }
        }
        &:hover {
          span {
            color: #19A0F1;
            &.small {
              color: #FBB03B;
            }
          }
        }

        /*border: solid 1px #d9d9d9;
        &:nth-of-type(1) {
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border-bottom: none;
        }

        &:nth-of-type(2) {
            border-radius: none;
            border-bottom: none;
        }

        &:nth-of-type(3) {
            border-radius: none;
            border-bottom: none;
        }

        &:nth-of-type(4) {
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
        }

        &:nth-of-type(5) {
            border-radius: 4px;
            margin-top: 5px;
            box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
        }

        p {
            font-size: 12px;
            color: #333;
        }

        img {
            width: 27px;
            height: 27px;
            margin: 0px auto;
            //transform: translateX(-50%) translateY(-50%);
            display: none;
        }

        img.normal {
            display: block;
        }

        .gzhBox {
            height: 185px;
            width: 160px;
            position: absolute;
            left: -165px;
            top: 120px;
            line-height: 55px;
            font-size: 20px;
            color: #23b8ff;
            margin: auto;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
            background-size: 100% 100%;
            transform: scale(0, 0);
            opacity: 0;
            transition: 0.3s;
            transform-origin: right;
            text-align: center;

            img {
                width: 148px;
                height: 148px;
                display: block;
            }

            p {
                font-size: 14px;
                color: #333;
                margin: 0px;
                height: 30px;
                line-height: 30px;

                &:hover {
                    color: #333;
                }
            }
        }

        .phoneBox {
            height: 55px;
            width: 160px;
            position: absolute;
            left: -165px;
            line-height: 55px;
            font-size: 20px;
            color: #23b8ff;
            margin: auto;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
            background-size: 100% 100%;
            transform: scale(0, 0);
            opacity: 0;
            transition: 0.3s;
            transform-origin: right;
            text-align: center;
        }

        &:hover {
            > p {
                color: #23b8ff;
            }

            img.hover {
                display: block;
            }

            img.normal {
                display: none;
            }

            .phoneBox {
                opacity: 1;
                transform: scale(1, 1);
            }

            .gzhBox {
                opacity: 1;
                transform: scale(1, 1);
            }
        }
        */

      }
    }
  }

  @keyframes ballRoll {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }


</style>
<style lang="scss">
  .el-tooltip__popper.is-dark {
    background-color: #33383E;
  }

  .el-tooltip__popper.fixed_contact.is-dark[x-placement^=left] {
    max-width: 261px !important;
    .popper__arrow {
      border-left-color: #33383E !important;
    }
  }

  .fixed_contact {

    div.box {
      width: 261px;
      padding: 15px 11px 0px 12px;
      /*width: 210px;*/
    }

    p {
      color: #EBEBEB;
      font-size: 12px;
      margin-bottom: 10px;
      line-height: 24px;
      &.title {
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 0;
      }
    }

    .el-input {
      width: 220px;
      height: 40px;
      .el-input__inner {
        background: rgba(82, 90, 99, 0.39);
        border: 1px solid #5B5B5B;
        opacity: 1;
        border-radius: 3px;
        color: #fff;
      }
    }

    .el-button {
      position: relative;
      left: 50%;
      transform: translateX(-60%);
      width: 100px;
      height: 40px;
      background: #19A0F1;
      border-color: #19A0F1;
      margin-top: 13px;
      border-radius: 3px;
      color: #fff;
      &.is-disabled {
        background: #525A63;
        border-color: #525A63;
      }
    }

    .phone {
      color: #19a0f1;
      font-size: 20px;
      line-height: 20px;
      margin-bottom: 5px;
    }

    .email {
      color: #666;
    }

  }

  /*.el-tooltip__popper.fixed_contact {*/
  /*    .popper__arrow {*/
  /*        border-left-color: #fff;*/
  /*    }*/
  /*}*/
</style>
