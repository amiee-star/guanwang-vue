<template>
  <div class="m-contact-us">
    <div class="box">
      <!-- <img src="@/assets/mimg/home/border.png" alt="" class="bg" />
      <img
        src="@/assets/images/close.png"
        alt=""
        class="close"
        @click="closeDialog"
      /> -->
      <div class="content">
        <div class="title">请提交您的相关需求，将有专属顾问与您对接</div>
        <div class="kefu">
          <span>支持定制需求对接</span>
        </div>
        <div class="form">
          <el-form
            ref="msgForm"
            label-width="0"
            :model="msgForm"
            :rules="rules"
          >
            <el-form-item prop="enterpriseName">
              <el-input
                v-model="msgForm.enterpriseName"
                placeholder="公司"
              ></el-input>
            </el-form-item>
            <el-form-item prop="realName">
              <el-input
                v-model="msgForm.realName"
                placeholder="姓名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="telephone">
              <el-input
                v-model="msgForm.telephone"
                placeholder="电话 *"
              ></el-input>
            </el-form-item>
            <el-form-item prop="requirementDesc">
              <el-input
                type="textarea"
                v-model="msgForm.requirementDesc"
                placeholder="需求说明 *"
                maxlength="500"
                onreseize="none"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="confirm" @click="submit"
            >需求提交</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formRules from "@/config/form-rules.js";
export default {
  name: "touch",
  //props: ["isvisible"],
  data() {
    return {
      msgForm: {},
      rules: {
        telephone: [
          {
            required: true,
            message: "请输入正确手机号码",
            validator: formRules.checkPhone,
            trigger: "blur",
          },
        ],
        requirementDesc: [
          { required: true, message: "留言不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
      this.$emit("update:isvisible", false);
      this.visible = false;
      this._promise && this._promise.resolve("cancel");
    },
    async submit() {
      var me = this;
      //messageboard
      try {
        await me.$refs["msgForm"].validate();
        await me.$http.application(me.msgForm);
        me.$Ruler.success("提交成功");
        me.msgForm = {};
        me.closeDialog();
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.msgForm = {};
      }
    },
    isvisible(val) {
      if (val) {
        this.msgForm = {};
        this.visible = val;
      } else {
        this.closeDialog();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.m-contact-us {
  background-image: url("../../../assets/images/mobile-serviced/banner2.png");
  background-repeat: no-repeat;
  background-size: cover;
  .box {
    padding-bottom: 1.8rem;
    width: 100%;
    position: relative;
    img.bg {
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 0;
    }
    img.close {
      position: absolute;
      z-index: 10;
      right: 25px;
      top: 25px;
      cursor: pointer;
    }
    .content {
      position: relative;
      padding: 0 0.45rem;
      z-index: 1;
      div.title {
        padding-top: 0.68rem;
        font-size: 0.46rem;
        color: #ffffff;
      }
      div.kefu {
        text-align: left;
        padding-top: 0.32rem;
        span {
          color: #ffffff;
          font-size: 0.26rem;
          padding-right: 0.12rem;
          opacity: 0.5;
        }
        img {
          width: 2.28rem;
          vertical-align: middle;
        }
      }

      div.form {
        padding-top: 0.53rem;
        position: relative;
      }
    }
  }
}
</style>
<style lang="scss">
.m-contact-us {
  textarea {
    resize: none;
  }
  .confirm {
    width: 119px;
    height: 34px;
    line-height: 34px;
    border-radius: 17px;
    margin-top: 20px;
    padding: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .el-input__inner {
    background-color: rgb(49, 57, 69);
    color: #ffffff;
    border: none;
  }
  .el-textarea__inner {
    background-color: rgb(49, 57, 69);
    color: #ffffff;
    border: none;
  }
}
</style>
