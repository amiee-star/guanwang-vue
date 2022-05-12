<template>
    <div>
        <el-dialog
                width="636px"
                title="修改支付密码"
                :visible.sync="visible"
                :modal="false"
                :close-on-click-modal="false"
                @close="closeDialog()"
                class="revisePay-dialog">
            <div class="revisePay">
               <ul class="flex steps">
                   <li v-for="(item, index) in step" :key="index" class="flex" :class="{'active': item.active}">
                       <span class="flex-center-column">{{index+1}}</span>{{item.text}}
                   </li>
               </ul>
                <el-form label-width="130px" v-show="active == 0">
                    <el-form-item label="手机号：">
                        <p v-if="userinfo.telephone">{{ userinfo.telephone }}</p>
                    </el-form-item>
                    <el-form-item label="短信验证码：">
                        <auth-code
                                v-model="phoneCode"
                                :phone="userinfo.telephone"
                        ></auth-code>
                    </el-form-item>

                </el-form>
                <el-form ref="account" label-width="130px" :model="account" :rules="rules" v-show="active == 1">
                    <el-form-item label="新支付密码：" prop="payPassword">
                        <el-input
                                v-model="account.payPassword"
                                type="password"
                                maxlength="6"
                                placeholder="密码为6位数字"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="确认支付密码：" prop="rePayPassword">
                        <el-input
                                v-model="account.rePayPassword"
                                type="password"
                                maxlength="6"
                                placeholder="请重复输入密码"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <p v-show="active == 2" class="successTip">
                    <i class="el-icon-circle-check"></i>
                    修改支付密码成功！
                </p>
                <el-button type="primary" @click="next">{{active == 2?"完成":"下一步"}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import store from "@/store.js";
  import md5 from "js-md5";
  export default {
    name: "revisePay",
    props: {
      visible: {
        type: Boolean
      }
    },
    data() {
      var me = this;

      function aginPwd(rule, value, callback) {
        if (value !== me.account.payPassword) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
        }
      }

      return {
        active: 0,
        phoneCode: "",
        account: {
          payPassword: "",
          rePayPassword: "",
        },
        rules: {
          payPassword: [{validator: this.checkPass, trigger: "blur"}],
          rePayPassword: [{validator: aginPwd, trigger: "blur"}],
        },
        step: [
          {
            text: "身份验证",
            active: true
          }, {
            text: "设置新密码",
            active: false
          }, {
            text: "完成",
            active: false
          },
        ]
      }
    },
    computed: {
      userinfo() {
        return store.state.userinfo;
      },
    },
    methods: {
      async next() {
        let me = this;
        switch (me.active) {
          case 0:
            await me.$http.checkCode({
              telephone: me.userinfo.telephone,
              verifyCode: me.phoneCode,
            })
            me.active++;

            break;
          case 1:
            await me.$refs.account.validate();
            await me.$http.payPass({
              telephone: me.userinfo.telephone,
              verifyCode: me.phoneCode,
              payPassword: md5(me.account.payPassword),
              rePayPassword: md5(me.account.rePayPassword),
            })
            me.active++;
            break;
          case 2:
            this.closeDialog()
        }
        me.step[me.active].active = true;
      },
      closeDialog() {
        let me =this;
        me.visible= false;
        me.active = 0;
        me.phoneCode = "";
        me.step = [
          {
            text: "身份验证",
            active: true
          }, {
            text: "设置新密码",
            active: false
          }, {
            text: "完成",
            active: false
          },
        ]
        me.$refs.account.resetFields();
      },
      checkPass(rule, value, callback) {
        let reg = /^\d{6}$/;
        if (!value) {
          callback(new Error("请输入密码"));
        } else if (!reg.test(value)) {
          callback(new Error("请输入6位数字"));
        } else {
          callback()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .revisePay {
        /*width: 636px;*/
        padding: 0 20px 20px 20px;
        background: #fff;
        font-family: Source Han Sans CN;
        .steps{
            margin-bottom: 30px;
            li{
                font-size: 16px;
                color: #999999;
                align-items: center;
                &::after{
                    content: "";
                    width: 90px;
                    height: 1px;
                    background: #000000;
                    opacity: 0.06;
                    display: inline-flex;
                    margin-left: 23px;
                }
                &:last-of-type::after{
                    width: 0;
                }
               span{
                   display: inline-flex;
                   width: 32px;
                   height: 32px;
                   border: 1px solid rgba(0, 0, 0, 0.14901960784313725);
                   border-radius: 50%;
                   margin-right: 8px;
                   font-size: 14px;
                   font-family: SFProText-Regular;
                   color: rgba(0, 0, 0, 0.25);
               }
            }
            .active{
                color: #333333;
                span{
                    background: #19A0F1;
                    border-color: #19A0F1;
                    color: #fff;
                }
            }
        }
        button{
            display: block;
            margin: 40px auto 0;
        }
        .successTip{
            text-align: center;
            font-size: 18px;
            font-family: Alibaba PuHuiTi;
            i{
               color: #39AF5A;
                font-size: 32px;
                margin-right: 12px;
                vertical-align: sub;
            }
        }
    }
</style>
<style lang="scss">
    .revisePay-dialog{
        .el-dialog__header{
            box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
            .el-dialog__title{
                font-family: Alibaba PuHuiTi;
                font-size: 16px;
                color: #707070;
            }
        }
    }
</style>