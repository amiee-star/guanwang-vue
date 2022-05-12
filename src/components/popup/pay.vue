<template>
    <transition name="el-zoom-in-center">
        <div class="pay_dialog">
            <el-dialog :visible="visible"
                       :modal="false"
                       :title="obj.title"
                       width="460px"
                       custom-class="" @close="closeDialog">
                <div class="flex contain">
                    <img :src="obj.image?obj.image:require('@/assets/images/payimg.png')"/>
                    <ul class="serverList">
                        <li class="flex-start" v-for="(item, index) in obj.list" :key="index" v-if="!obj.noPrice">
                            <p class="text">{{item.title}}：</p>
                            <p class="price" v-if="item.num">{{item.text | getYear}}</p>
                            <p class="price" v-else>{{item.text}}</p>
                        </li>
                        <li v-else class="noPrice">
                            <p class="text">{{item.title}}</p>
                        </li>
                    </ul>
                </div>

                <!--        <el-button v-if="obj.balance >= obj.totalPrices && !hasPass" @click="hasPass=true" class="pay right">立即支付</el-button>-->
                <template v-if="!showPay">
                    <div class="flex-center writePass" v-if="obj.discountRate === 10">
                        <el-input v-model="couponCode" placeholder="请输入优惠码后点击验证"></el-input>
                        <el-button :disabled="checkSuccess || couponCode.length === 0" @click="checkCode(couponCode)" class="pay check"
                                   :class="{checkSuccess: checkSuccess}">验证
                        </el-button>
                    </div>
                    <ul class="flex-start couponTip" v-if="checkSuccess">
                        <li>
                            <i class="el-icon-success"></i>验证成功!
                        </li>
                        <li>
                            {{couponInfo.name}}
                        </li>
                        <li v-if="((1 - couponInfo.discountAmount)* obj.totalPrices) > couponInfo.highestDeductionAmount && couponInfo.highestDeductionAmount">
                            最高抵扣{{couponInfo.highestDeductionAmount}}元
                        </li>
                    </ul>
                    <div class="money flex" v-if="!obj.noPrice">
                        <p>余额：<span>￥{{obj.balance }}</span></p>
                        <p>
                          <span class="discount" v-if="obj.discountRate && obj.discountRate !== 10">{{obj.discountRate}}折</span>
                          金额：<span class="totalPrices">￥{{ totalPrices}}</span>
                        </p>
                    </div>
                </template>
                <template v-else>
                    <div class="password">
                        <input autofocus ref="pwd" type="password" maxlength="6" v-model="payPass"
                               style="position: absolute;z-index: -1;left:-100%;opacity: 0"/>
                        <ul class="pwd-wrap flex-start" @click="focus">
                            <li><i v-if="msgLength > 0"></i></li>
                            <li><i v-if="msgLength > 1"></i></li>
                            <li><i v-if="msgLength > 2"></i></li>
                            <li><i v-if="msgLength > 3"></i></li>
                            <li><i v-if="msgLength > 4"></i></li>
                            <li><i v-if="msgLength > 5"></i></li>
                        </ul>
                    </div>
                    <div class="lastPrice">
                        支付金额：<span class="totalPrices">￥{{ totalPrices}}</span>
                    </div>
                </template>
                <div class="flex-center writePass">
                    <el-button v-if="obj.leftBtn && obj.noPrice" @click="experience" class="leftBtn">
                        {{obj.leftBtn}}
                    </el-button>
                    <el-button v-if="obj.noPrice" @click="open" class="pay"
                               :style="{background: obj.bgColor,borderColor: obj.bgColor}">{{obj.rigthBtn}}
                    </el-button>
                    <el-button v-if="!showPay && !obj.noPrice" @click="next" class="pay"
                               :style="{background: obj.bgColor,borderColor: obj.bgColor}">{{obj.rigthBtn}}
                    </el-button>
                    <el-button v-if="showPay && !obj.noPrice" @click="pay" class="pay"
                               :style="{background: obj.bgColor,borderColor: obj.bgColor}">{{obj.rigthBtn}}
                    </el-button>
                </div>
                <p class="tips"><i class="el-icon-warning-outline"></i>{{obj.tips}}</p>
            </el-dialog>
        </div>
    </transition>
</template>

<script>
  export default {
    name: "pay",
    props: {
      visible: {
        type: Boolean
      },
      obj: {
        type: Object,
        default: () => {
          return {
            title: "",
            image: "",
            balance: "",
            totalPrices: "",
            bgColor: "",
            list: [],
            noPrice: false
          }
        }
      },
    },
    data() {
      return {
        vm: window.vm,
        payPass: "",
        couponCode: "",
        couponInfo: {},
        checkSuccess: false,
        showPay: false,
        msgLength: 0
      }
    },
    methods: {
      //体验带看
      experience() {
        window.open("https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=b986d4487bb04eae8a1448a06559c476", "_blank");
      },
      next() {
        if (this.obj.balance < this.obj.totalPrices) {
          this.payPass = "nomoney"
          this.$emit("pay", this.payPass)
          this.payPass = ""
        } else {
          if (Object.keys(this.couponInfo).length === 0) {
            this.couponCode = ""
          }
          this.showPay = true
          this.obj.rigthBtn = "确认支付"
        }


      },
      checkCode(code) {
        let me = this;
        me.$http.couponCode(code).then(res => {
          me.couponInfo = res
          me.checkSuccess = true
        })
      },
      closeDialog() {
        // this.visibles = false
        // this.hasPass = false
        this.$emit("pay")
        this.payPass = this.couponCode = ""
        this.showPay = this.checkSuccess = false
        this.couponInfo = {};

      },
      pay() {
        if (this.payPass === "") {
          this.$message.warning("请填写密码")
          return
        }
        if(this.obj.title === "VR带看") {
          this.$emit("pay", this.payPass, "vr")
        }else {
          this.$emit("pay", this.payPass, this.couponCode)
        }
        this.payPass = ""
      },
      focus() {
        console.log('ppp');
        this.$refs.pwd.focus();
      },
      //立即开通
      async open() {
        this.$emit("open")
      },

    },
    watch: {
      visible(val) {
        console.log(val);
      },
      payPass(curVal) {
        if (/[^\d]/g.test(curVal)) {
          this.payPass = this.payPass.replace(/[^\d]/g, '');
        } else {
          this.msgLength = curVal.length;
        }
      },
    },
    computed: {
      totalPrices() {
        if (this.couponInfo.discountAmount) {
          let discount = (1 - this.couponInfo.discountAmount) * this.obj.totalPrices
          if (this.couponInfo.highestDeductionAmount && discount > this.couponInfo.highestDeductionAmount) {
            return (this.obj.totalPrices - this.couponInfo.highestDeductionAmount).toFixed(2)
          } else {
            return (this.obj.totalPrices * this.couponInfo.discountAmount).toFixed(2)
          }
        } else {
          return this.obj.totalPrices
        }
      }
    }
  }
</script>

<style lang="scss">
    .pay_dialog {
        font-family: Alibaba PuHuiTi;

        .el-dialog__header {
            box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);

            .el-dialog__title {
                font-size: 16px;
                font-family: Alibaba PuHuiTi;
                color: #707070;
            }
        }

        .el-dialog__body {
            padding: 30px 40px 84px 40px;
        }

        .contain {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            padding-bottom: 30px;

            .serverList {
                width: 53%;
                line-height: 34px;

                .text {
                    color: #999999;
                    margin-right: 10px;
                    width: 72px;
                    text-align: right;
                }

                .price {
                    color: #333333;
                }

                .noPrice {
                    .text {
                        width: auto;
                        text-align: left;
                        margin-right: 0;
                        line-height: 24px;
                    }
                }
            }
        }

        .money {
            padding-top: 25px;

            p {
                color: #999999;

                span {
                    color: #333333;
                }

                .totalPrices {
                    color: #FE5A60;
                }
            }

            .discount {
                color: rgb(246, 154, 35);
                margin-right: 15px;
            }
        }

        .tips {
            width: 100%;
            height: 44px;
            background: rgba(246, 154, 35, 0.1);
            position: absolute;
            left: 0;
            bottom: 0;
            color: #F69A23;
            text-align: center;
            line-height: 44px;

            i {
                margin-right: 5px;
            }
        }

        .check {
            background: #DDDDDD;

            &:hover {
                background: #1877F2;
            }
        }

        .checkSuccess {
            background: #19A0F1;
        }

        .pay {
            display: block;
            color: #FFFFFF;
        }

        .right {
            background: #FE5A60;
            border-color: #FE5A60;
            margin: 30px auto 0 auto;
        }

        .writePass {
            margin: 30px auto 0 auto;

            .pay {
                margin-left: 15px;
            }
        }

        .couponTip {
            font-family: Alibaba PuHuiTi;
            margin: 8px 0;
            color: #333333;

            li:first-of-type {
                color: #14AC1C;
                margin-right: 5px;
                margin-left: 10px;

                i {
                    margin-right: 3px;
                }
            }
        }

        .password {
            position: relative;
            margin-top: 30px;

            .pwd-wrap {
                width: 90%;
                height: 44px;
                padding-bottom: 1px;
                margin: 0 auto;
                background: #fff;
                border: 1px solid #ddd;
                display: flex;
                cursor: pointer;

                li {
                    text-align: center;
                    line-height: 44px;
                    flex: 1;
                    border-right: 1px solid #ddd;

                    &:last-of-type {
                        border-right: none;
                    }

                    i {
                        height: 10px;
                        width: 10px;
                        border-radius: 50%;
                        background: #000;
                        display: inline-block;
                    }
                }
            }
        }
        .lastPrice{
            margin: 36px auto;
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            line-height: 34px;
            color: #999999;
            text-align: center;
            span{
                color: #FE5A60;
            }
        }

    }
</style>
