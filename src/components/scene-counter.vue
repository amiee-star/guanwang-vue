<template>
  <div>
    <el-dialog
      class="scene-counter"
      :visible.sync="$store.state.isShowCounter"
      :before-close="close"
    >
      <div class="content">
        <div class="from">
          <div class="title">
            展厅定制计算器
            <span>累计定制展厅：{{ sceneNum }}个</span>
          </div>
          <el-form
            ref="counterForm"
            :model="counterForm"
            label-width="95px"
            :rules="rules"
          >
            <el-form-item label="定制类型：" prop="type">
              <el-select
                v-model="counterForm.type"
                placeholder="请选择定制类型"
              >
                <el-option
                  label="虚拟展厅定制"
                  v-for="(item, index) in typeOptions"
                  :key="item.id"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展台面积：" prop="area">
              <el-select
                v-model="counterForm.area"
                placeholder="请选择展台面积"
                @change="changearea"
              >
                <el-option
                  v-for="(item, index) in areaOptions"
                  :key="item.id"
                  :label="item.remark"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号码：" prop="phone">
              <el-input
                v-model="counterForm.phone"
                placeholder="请输入手机号码"
                maxlength="11"
              ></el-input>
            </el-form-item>
            <el-form-item label="">
              <auth-code
                v-model="counterForm.code"
                :phone="counterForm.phone"
                :flag="isCounter"
                ref="authCode"
              ></auth-code>
            </el-form-item>
            <!-- <el-form-item label="验证码：" class="code">
              <el-input v-model="counterForm.code" placeholder="请输入验证码"></el-input>
              <el-button type="primary" plain >获取验证码</el-button>
            </el-form-item> -->
          </el-form>
        </div>
        <div class="explain">
          <div class="text">
            <div class="title">{{ rightContent[activeIndex].title }}</div>
            <div class="desc">{{ rightContent[activeIndex].desc }}</div>
          </div>
          <ul :class="activeIndex == 0 ? 'firstBlock' : 'secondBlock'">
            <li
              v-for="(item, index) in stepData[activeIndex].content"
              :key="index"
            >
              <img :src="item.img" alt="" />
              <span class="name">{{ item.name }}</span>
              <span class="icon el-icon-arrow-right"></span>
            </li>
          </ul>
          <div class="count-btn" @click="quoteHandle">
            <img src="../assets/images/counter/count-btn-bg.png" alt="" />
            <div class="box-shadow"></div>
            <div class="btn">报价<br />计算</div>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog class="quote-content" :visible.sync="dialogVisible">
      <div class="price">
        <img src="../assets/images/counter/house.png" alt="" />
        <p class="desc">30分钟内将有专属顾问与您联系</p>
        <h3>您的定制展厅预算</h3>
        <p class="money">
          约： <span>{{ scenePrice }}</span> 万元
        </p>
      </div>
      <div class="QRCode">
        <div class="content">
          <p class="title">3D云展企业微信顾问</p>
          <img src="@/assets/images/home/gzhs.png" />
          <p class="desc">添加微信了解详细定制服务流程及更多定制案例</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import formRules from "@/config/form-rules.js";
export default {
  data() {
    return {
      sceneNum: 0,
      isCounter: true,
      dialogVisible: false,
      counterForm: {
        type: "",
        area: "",
        phone: "",
        code: "",
      },
      rightContent: [
        {
          title: "虚拟展厅定制说明：",
          desc:
            "根据企业行业特性及使用场景，量身设计线上虚拟场馆，满足企业个性化展示需求；支持作为模板使用，二次布展，重复编辑。",
        },
        {
          title: "实景展厅扫描说明：",
          desc:
            "线下真实场景利用三维扫描仪采集为3D数据，线上1:1还原展示；同时支持二次布展，添加互动元素。",
        },
      ],
      activeIndex: 0,
      stepData: [
        {
          content: [
            {
              img: require("../assets/images/counter/message.png"),
              name: "需求沟通",
            },
            {
              img: require("../assets/images/counter/modeling.png"),
              name: "场景建模",
            },
            {
              img: require("../assets/images/counter/image.png"),
              name: "效果图确认",
            },
            {
              img: require("../assets/images/counter/scene.png"),
              name: "展厅合成",
            },
          ],
        },
        {
          content: [
            {
              img: require("../assets/images/counter/message.png"),
              name: "需求沟通",
            },
            {
              img: require("../assets/images/counter/scan.png"),
              name: "进场扫描",
            },
            {
              img: require("../assets/images/counter/scene.png"),
              name: "展厅合成",
            },
          ],
        },
      ],
      // 下拉框面积数据
      areaOptions: [],
      // 展厅类型数据
      typeOptions: [],
      rules: {
        type: [
          { required: true, message: "请选择定制类型", trigger: "change" },
        ],
        area: [
          { required: true, message: "请选择展台面积", trigger: "change" },
        ],
        phone: [
          { required: true, validator: formRules.checkPhone, trigger: "blur" },
        ],
        code: [
          { required: true, validator: formRules.checkCode, trigger: "blur" },
        ],
      },
      scenePrice: "",
      areaRemark: "",
    };
  },
  mounted() {
    this.getCustomTypes();
    this.getAreas();
    this.getHallCount();
  },
  methods: {
    getById(id, myArray) {
      return myArray.filter(function(obj) {
        if (obj.id == id) {
          return obj;
        }
      });
    },

    changearea(val) {
      let item1 = this.getById(val, this.areaOptions);
      let areaItem = item1[0];

      this.areaRemark = areaItem.remark;
    },
    close() {
      this.$store.commit("setStates", {
        k: "isShowCounter",
        v: false,
      });
      this.$refs.authCode.count = -1;
      this.removeUnScroll();
    },
    selectType(val) {
      this.activeIndex = Number(val) - 1;
    },
    quoteHandle() {
      let me = this;
      this.$refs["counterForm"].validate((valid) => {
        if (valid) {
          let params = {
            telephone: me.counterForm.phone,
            verifyCode: me.counterForm.code,
            type: me.counterForm.type,
            areaPriceId: me.counterForm.area,
            areaRemark: me.areaRemark,
          };
          me.$http
            .handleHallInfo(params)
            .then((res) => {
              this.scenePrice = res;
              this.$store.state.isShowCounter = false;
              this.dialogVisible = true;
            })
            .catch(() => {})
            .finally(() => {
              // this.$refs.authCode.count = -1;
            });
        } else {
          return false;
        }
      });
    },
    // 获取定制类型数据
    getCustomTypes() {
      let me = this;
      me.$http
        .getCustomTypes()
        .then((res) => {
          me.typeOptions = res;
        })
        .catch(() => {});
    },
    // 获取展台面积数据
    getAreas() {
      let me = this;
      me.$http
        .getAreas()
        .then((res) => {
          me.areaOptions = res;
        })
        .catch(() => {});
    },
    // 获取累计定制展厅数量
    getHallCount() {
      let me = this;
      me.$http
        .getHallCount()
        .then((res) => {
          me.sceneNum = res;
        })
        .catch(() => {});
    },
    //禁止滚动条滚动
    unScroll() {
      var top = $(document).scrollTop();
      $(document).on("scroll.unable", function(e) {
        $(document).scrollTop(top);
      });
    },
    //移除禁止滚动条滚动
    removeUnScroll() {
      $(document).unbind("scroll.unable");
    },
  },
  watch: {
    "$store.state.isShowCounter": function(val) {
      if (val) {
        this.unScroll();
        if (this.$refs.counterForm) {
          this.$refs.counterForm.resetFields();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.quote-content {
  &::v-deep {
    .el-dialog {
      width: 1040px !important;
      height: 560px;
      box-sizing: border-box;
    }

    .el-dialog__header {
      padding: 0;
    }

    .el-dialog__body {
      padding: 0;
      width: 100%;
      height: 100%;
    }

    .el-form-item {
      margin-bottom: 24px;
    }

    .el-form-item__label {
      color: #000;
      font-weight: 400;
      font-size: 14px;
    }

    .el-input__inner,
    .el-select-dropdown__item {
      color: #000;
    }

    .el-dialog__headerbtn {
      z-index: 1;
    }
  }

  .price {
    height: 211px;
    background: url("../assets/images/counter/price_bg.png") #fff no-repeat
      center center;
    text-align: center;
    padding-top: 55px;
    font-family: "Source Han Sans CN";
    margin-bottom: 106px;
    position: relative;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 90%;
      -webkit-animation: 3s 0.1s living linear infinite backwards normal;
      animation: 3s 0.1s living linear infinite backwards normal;
      -webkit-animation-delay: -1.1s;
    }

    .desc {
      font-size: 12px;
      line-height: 12px;
      font-weight: 400;
      color: #999999;
      margin-bottom: 14px;
    }

    h3 {
      font-size: 24px;
      line-height: 24px;
      font-weight: 400;
      color: #000000;
      margin-bottom: 30px;
    }

    .money {
      color: #000000;
      font-size: 16px;

      span {
        color: #ec712e;
        font-size: 46px;
      }
    }
  }

  .QRCode {
    height: 200px;
    background: url("../assets/images/counter/QRCode-bg.png") #fff no-repeat
      center center;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
      width: 180px;
      text-align: center;
      font-family: "Source Han Sans CN";
      margin-top: -40px;
    }

    p.title {
      font-size: 16px;
      font-weight: 400;
      color: #000000;
    }

    img {
      width: 100%;
    }

    p.desc {
      font-size: 12px;
      font-family: "Source Han Sans CN";
      font-weight: 400;
      color: #999999;
    }
  }
}

.scene-counter {
  &::v-deep {
    .el-dialog {
      width: 1040px !important;
      height: 460px;
      box-sizing: border-box;
      background: url("../assets/images/counter/counter-bg.png") #fff no-repeat
        center center;
    }

    .el-dialog__header {
      padding: 0;
    }

    .el-dialog__body {
      padding: 0;
      width: 100%;
      height: 100%;
    }

    .el-form-item {
      margin-bottom: 24px;
    }

    .el-form-item__label {
      color: #000;
      font-weight: 400;
      font-size: 14px;
    }

    .el-input__inner,
    .el-select-dropdown__item {
      color: #000;
    }

    .el-dialog__headerbtn {
      z-index: 1;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .from {
      width: 50%;
      border-right: 1px solid #eeeeee;
      padding: 45px 101px 93px 48px;

      .title {
        font-size: 24px;
        font-family: "Source Han Sans CN";
        font-weight: 400;
        color: #000000;
        margin-bottom: 30px;

        span {
          font-size: 14px;
          color: #eb6665;
          margin-left: 5px;
        }
      }

      .code {
        &::v-deep {
          .el-form-item__content {
            line-height: 32px;
            display: flex;
          }

          .el-input {
            margin-right: 10px;
          }

          .el-button {
            width: 108px;
            background-color: rgba(35, 184, 255, 0.1) !important;
            border: 1px solid #23b8ff !important;
            border-radius: 3px;
            color: #23b8ff;
          }
        }
      }

      .el-select {
        width: 280px;
      }
    }

    .explain {
      width: 50%;
      padding: 105px 49px 123px 107px;
      color: #000;
      position: relative;

      .title {
        margin-bottom: 20px;
      }

      .text {
        margin-bottom: 60px;
        font-size: 16px;
      }

      ul.firstBlock,
      ul.secondBlock {
        display: flex;
        justify-content: space-between;

        li {
          width: 80px;
          position: relative;
          text-align: center;

          img {
            display: block;
            width: 38px;
            height: 38px;
            margin-left: 20px;
            margin-bottom: 15px;
          }

          .name {
            text-align: center;
            font-size: 16px;
          }

          .icon {
            color: #dddddd;
            position: absolute;
            top: 12px;
            right: -12px;
            font-weight: bold;
          }

          &:last-child {
            .icon {
              display: none;
            }
          }
        }
      }

      ul.secondBlock {
        li {
          .icon {
            right: -35px;
          }
        }
      }

      .count-btn {
        width: 120px;
        height: 120px;
        position: absolute;
        top: 50%;
        left: -60px;
        transform: translateY(-50%);
        cursor: pointer;

        img {
          transition: 0.5s;
          animation: rotate 3s linear infinite;
        }

        .btn {
          width: 90px;
          height: 90px;
          line-height: 22px;
          border-radius: 50%;
          text-align: center;
          position: absolute;
          top: 14px;
          left: 15px;
          background-color: #23b8ff;
          color: #fff;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .box-shadow {
          width: 130px;
          height: 130px;
          line-height: 100px;
          border-radius: 50%;
          position: absolute;
          top: -5px;
          left: -5px;
          background-color: rgba(35, 184, 255, 0.1);
        }
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
