<template>
  <div class="main-content4">
    <div class="layout">
      <div class="content4-title">
        请提交您的相关需求，将有专属顾问与您对接
      </div>
      <div class="content4-detail">支持定制需求对接</div>
      <el-form
        class="demo-form-inline main4-top"
        ref="customFrom"
        :model="customFrom"
        :rules="rules"
      >
        <el-form-item prop="enterpriseName">
          <el-input
            v-model="customFrom.enterpriseName"
            placeholder="公司"
            class="input"
          ></el-input>
        </el-form-item>
        <el-form-item prop="realName">
          <el-input
            v-model="customFrom.realName"
            placeholder="姓名"
            class="input"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="telephone">
          <el-input
            v-model="customFrom.telephone"
            placeholder="电话 *"
            class="input"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="requirementDesc">
          <el-input
            type="textarea"
            class="textarea"
            maxlength="200"
            show-word-limit
            v-model="customFrom.requirementDesc"
            placeholder="需求说明 *"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="proof">
          <el-button type="primary" @click="submitHandle"
          >需求提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import formRules from "@/config/form-rules.js";
  export default {
    data() {
      return {
        isSuccess: false,
        customFrom: {
          enterpriseName: "",
          realName: "",
          telephone: "",
          requirementDesc: "",
        },
        rules: {
          telephone: [
            {
              required: true,
              validator: formRules.checkPhone,
              trigger: "change",
            },
          ],
          requirementDesc: [
            {
              required: true,
              trigger: "blur",
              message: "需求说明不能为空",
              maxlength: 200,
            },
          ],
        },
      }
    },
    methods: {
      //需求提交
      submitHandle() {
        let me = this;
        this.$refs["customFrom"].validate((valid) => {
          if (valid) {
            let params = {
              ...me.customFrom,
              type: 6,
            };
            me.$http
                .submitForms(params)
                .then((res) => {
                  // this.isSuccess = true;
                  this.$emit("success", true);
                  if (this.$refs["customFrom"].resetFields()) {
                    this.$refs["customFrom"].resetFields();
                  }
                })
                .catch(() => {});
          } else {
            return false;
          }
        });
      },
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  .main-content4 {
    background-image: url("../assets/images/serviced/banner4.png");
    padding: 90px 0;
    .layout {
      width: 1280px;
      margin: 0 auto;
      font-size: 18px;
      font-family: Source Han Sans CN;
      color: #ffffff;

      .content4-title {
        font-size: 32px;
        //font-family: SourceHanSansCN-Regular;
      }
      .content4-detail {
        font-size: 18px;
        margin-top: 25px;
        opacity: 0.5;
        //font-family: SourceHanSansCN-Regular;
      }
      .main4-top {
        margin-top: 51px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .input:focus {
          border-radius: 3px;
        }
        ::v-deep.el-input__inner {
          background-color: #ffffff15;
          border-radius: 3px;
          border: none;
          color: #ffffff;
          width: 390px;
          font-size: 14px;
          //font-family: SourceHanSansCN-Regular;
        }
        ::v-deep.el-input__inner:focus {
          border: 1px solid #fff;
          border-radius: 3px;
        }
        ::v-deep.el-textarea__inner:focus {
          border: 1px solid #fff;
          border-radius: 3px;
        }
        ::v-deep.el-textarea__inner {
          border: none;
          background-color: #ffffff15;
          width: 1280px;
          height: 118px;
          resize: none;
          border-radius: 3px;
          font-size: 14px;
          //font-family: SourceHanSansCN-Regular;
          color: #fff;
        }
        .proof {
          margin: 0 auto;
        }
        ::v-deep.el-button {
          margin-top: 22px;
          width: 168px;
          height: 48px;
          border-radius: 24px;
          background-color: #19a0f1;
          color: #ffffff;
          font-size: 16px;
          //font-family: SourceHanSansCN-Regular;
        }
        ::v-deep.el-textarea .el-input__count {
          background-color: transparent;
        }
      }
    }
  }
</style>