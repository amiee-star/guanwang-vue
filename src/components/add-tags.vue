<template>
  <div class="add-tages">
    <el-input
      v-model="manyTags"
      placeholder="输入标签后按“Enter”回车确认，最多支持3个"
      @keyup.enter.native="addTag(manyTags)"
      :maxlength="6"
    ></el-input>
    <p class="all-tag">
      <el-tag
        v-for="(tag, index) in tagList"
        :key="index"
        closable
        @close="deleteTag(index)"
        >{{ tag }}</el-tag
      >
    </p>
    <p class="tagTips">
      常用：
      <span
        class="tag hotTag"
        v-for="(item, index) in hotTags"
        :key="index"
        @click="addTag(item)"
      >
        {{ item }}
        <a v-if="index != hotTags.length - 1">,</a>
      </span>
    </p>
  </div>
</template>
<script>
export default {
  name: "add-tages",
  props: {
    value: {
      type: Array,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      tagList: [],
      hotTags: [],
      manyTags: "",
    };
  },
  watch: {
    value(a) {
      this.tagList = a;
    },
  },
  created() {
    this.tagList = this.value;
  },
  mounted() {
    this.getHotTags();
  },
  methods: {
    getHotTags() {
      this.hotTags = this.$utils.store.getLocalstorage("tags") || [];
    },
    setTagsList() {
      var tagList = this.hotTags.concat(this.tagList);
      var tag = this.$utils.arr.removeRepeat(tagList);
      if (tag.length && tag.length > 6) {
        tag = tag.splice(tag.length - 6, tag.length);
      }
      this.$utils.store.setLocalstorage("tags", JSON.stringify(tag));
    },
    addTag(item) {
      item = item || "";
      item = item.replace(/,/g, "").replace(/，/g, "");
      if (this.tagList && this.tagList.length > 0) {
        var msg = this.tagList.indexOf(item);
      }

      if (item == "") {
        this.$message({
          message: "标签要有内容哦",
          type: "warning",
        });
        return;
      }
      if (msg >= 0) {
        this.$message({
          message: "标签已存在哦",
          type: "warning",
        });
        return;
      }
      if (this.tagList && this.tagList.length > 2) {
        this.$message({
          message: "只允许有3个标签哦",
          type: "warning",
        });
        return;
      }
      this.manyTags = "";
      console.log(item, "===item");
      this.tagList.push(item);
      this.$emit("input", this.tagList);
    },
    deleteTag(index) {
      this.tagList.splice(index, 1);
      this.$emit("input", this.tagList);
    },
  },
};
</script>
