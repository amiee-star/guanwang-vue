<template>
  <div class="crypto">
    <el-input v-model="keyWords" placeholder="请输入展厅id"></el-input>
    <el-button @click="handle" type="primary">加密</el-button>
    <p>{{this.password}}</p>
  </div>
</template>
<script>
  import Crypto from "@/utils/crypto.js";
  export default {
    data() {
      return {
        keyWords: "",
        password: ""
      };
    },
    methods: {
      handle() {
        this.password = escape(Crypto.set(this.keyWords));
      }
    },
  };
</script>
<style lang="scss">
  .crypto {
    min-height: 500px;
    padding: 20px;
    .el-input {
      width: 500px;
      margin-right: 10px;
    }
    p {
      margin-top: 20px;
    }
  }
</style>
