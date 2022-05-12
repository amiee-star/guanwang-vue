<template>
  <div id="makeNeedBox">
    <page-header></page-header>
    <div class="content">
      <div>
        <span class="contentTitle">展厅定制计算器</span>
        <span class="sceneNum">累计定制展厅：{{ sceneNum }}个</span>
      </div>
      <div class="form">
        <el-form
          ref="counterForm"
          :model="counterForm"
          label-width="95px"
          :rules="rules"
          :hide-requied-aterisk="false"
        >
          <el-form-item label="定制类型：" prop="type">
            <el-select v-model="counterForm.type" placeholder="请选择定制类型">
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
          <div class="checkBox">
            <el-checkbox v-model="checked"></el-checkbox>
            <span class="protocol"
              >我已阅读并接受《服务协议》，为了您的权益，您的隐私将被严格保护</span
            >
          </div>
        </el-form>
        <el-divider class="priceBtn">
          <div class="count-btn" @click="quoteHandle">
            <img src="../../../assets/images/counter/count-btn-bg.png" alt="" />
            <div class="box-shadow"></div>
            <div class="btn">报价<br />计算</div>
          </div>
        </el-divider>
        <div class="remarkBox">
          <div class="remarkTitle">虚拟展厅定制说明：</div>
          <div class="remarkContent">
            根据企业行业特性及使用场景，量身设计线上虚拟场馆，满足企业个性化展示需求；支持作为模板使用，二次布展，重复编辑。
          </div>
          <ul class="firstBlock">
            <li v-for="(item, index) in content" :key="index">
              <img :src="item.img" alt="" />
              <span class="name">{{ item.name }}</span>
              <span class="icon el-icon-arrow-right"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageHeader from "mobile/components/page-header/page-header.vue";
import formRules from "@/config/form-rules.js";
export default {
  data() {
    return {
      sceneNum: 0,
      isCounter: true,
      counterForm: {
        type: "",
        area: "",
        phone: "",
        code: "",
      },
      // 展厅类型数据
      typeOptions: [],
      // 下拉框面积数据
      areaOptions: [],
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
        checkCode: [
          {
            required: true,
            message: "请选择服务协议",
            trigger: "change",
          },
        ],
      },
      checked: false,
      content: [
        {
          img: require("../../../assets/images/counter/message.png"),
          name: "需求沟通",
        },
        {
          img: require("../../../assets/images/counter/modeling.png"),
          name: "场景建模",
        },
        {
          img: require("../../../assets/images/counter/image.png"),
          name: "效果图确认",
        },
        {
          img: require("../../../assets/images/counter/scene.png"),
          name: "展厅合成",
        },
      ],
    };
  },
  components: {
    pageHeader,
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
    quoteHandle() {
      console.log(this.checked);
      if (this.checked) {
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
                console.log(res);
                this.scenePrice = res;
                this.$router.push({
                  path: "/makeNeed/needPrice",
                  query: {
                    price: res,
                  },
                });
              })
              .catch(() => {})
              .finally(() => {
                // this.$refs.authCode.count = -1;
              });
          } else {
            return false;
          }
        });
      } else {
        this.$message({
          message: "请勾选《服务协议》",
          type: "warning",
        });
      }
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
  },
};
</script>

<style lang="scss" scoped src="./makeNeed.scss"></style>
