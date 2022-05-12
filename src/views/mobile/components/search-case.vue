<template>
  <div class="input">
    <svg-icon iconClass="search"></svg-icon>
    <div class="input-w">
      <input
        type="text"
        placeholder="请输入展厅名称搜索"
        ref="input"
        v-model="val"
        @change="onsearched"
        @input="onput"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ["aoutfocus", "value"],
  name: "msearchcase",
  data() {
    return {
      val: this.value || "",
    };
  },
  mounted() {
    if (this.aoutfocus) {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
  },
  methods: {
    onsearched() {
      this.$emit("onsearched", this.val);
    },
    onput() {
      this.$emit("input", this.val);
    },
  },
  watch: {
    value(a) {
      this.val = a;
    },
  },
};
</script>
<style lang="scss" scoped>
.input {
  flex: 1;
  display: flex;
  color: #999999;
  align-items: center;
  background: #3b3b3b;
  height: 0.62rem;
  border-radius: 0.05rem;
  div.input-w {
    flex: 1;
    margin-left: 0.1rem;
  }
  input {
    background: transparent;
    border: none;
    outline: none;
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    text-indent: 0.5em;
    color: #ffffff;
  }
  svg {
    font-size: 0.6rem;
    margin-left: 0.14rem;
  }
}
</style>
