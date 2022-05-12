<template>
  <div class="exhibitionSetMeal">
<!--    <page-header :gradual="false"></page-header>-->
    <div class="banner">
      <img src="@/assets/images/banner.png" alt="" />
    </div>
    <div class="tab self-base-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="账户信息" name="first">
          <Information v-if="activeName == 'first'" />
        </el-tab-pane>
        <el-tab-pane label="套餐状态" name="second">
          <SetMeal v-if="activeName == 'second'" />
        </el-tab-pane>
        <el-tab-pane label="模板管理" name="third">
          <Template v-if="activeName == 'third'" />
        </el-tab-pane>
        <div class="tishi" v-if="issee">
          <img src="@/assets/images/tishi.png" alt="" />
          <span>如需升级套餐、订购增值服务请联系客服：</span>
          <span class="tel">400-080-9959</span>
        </div>
      </el-tabs>
    </div>
    <fixed-tool></fixed-tool>
<!--    <page-footer></page-footer>-->
  </div>
</template>

<script>
import PageFooter from "@/components/page-footer/page-footer.vue";
import PageHeader from "@/components/page-header/page-header.vue";
import Information from "./components/information.vue";
import SetMeal from "./components/setMeal.vue";
import Template from "./components/template.vue";
export default {
  data() {
    return {
      activeName: "first",
      issee: false,
    };
  },
  components: {
    PageFooter,
    PageHeader,
    Information,
    SetMeal,
    Template,
  },
  methods: {
    handleClick() {
      if (this.activeName == "second") {
        this.issee = true;
      } else {
        this.issee = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./exhibitionSetMeal.scss"></style>
