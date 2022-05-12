<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="400px"
      @close="close"
      custom-class="dialog"
      @open="open"
    >
      <div class="miaoshu">
        请选择用户通过此模板创建展厅时，是否需要将拖
      </div>
      <div class="miaoshu">
        入进模板空间中的素材复制到新的展厅中
      </div>
      <div class="btn">
        <el-radio v-model="radio" :label="1">不复制素材</el-radio>
        <el-radio v-model="radio" :label="2">复制素材</el-radio>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="tijiao">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisible", "data", "createType"],
  data() {
    return {
      radio: "",
    };
  },
  methods: {
    open() {
      const me = this;

      me.radio = me.data.createType
      console.log(me.radio);
    },
    close() {
      // done();
      // this.dialogVisible = false;
      this.$emit("closeDialog");
    },
    tijiao() {
      // this.dialogVisible = false;
      let obj = {
        tempId: this.data.tempId,
        createType: this.radio,
      };
      this.$http.tempConfig(obj).then((res) => {
        this.$emit("closeDialog", true);
        // console.log(res, 5);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  .miaoshu {
    width: 100%;
    text-align: center;
  }
  .btn {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }
  .el-dialog__footer {
    text-align: center;
  }
}
</style>
