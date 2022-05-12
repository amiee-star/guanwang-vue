<!-- 上传模型 -->
<template>
  <div class="upload-model com-upload">
    <el-dialog
      :visible.sync="isUploadModel"
      :fullscreen="false"
      :modal="true"
      custom-class="comUpload uploadModel"
      :show-close="true"
      :before-close="onbeforeClose"
      :close-on-click-modal="false"
      @open="getHotTags"
    >
      <div class="nav">
        <span class="active">上传模型</span>
      </div>
      <div class="content" v-loading="loadOver">
        <el-form
          :model="materialUp"
          :rules="rules"
          ref="materialUp"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="素材名称：" prop="name">
            <el-input
              v-model="materialUp.name"
              placeholder="请输入素材名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label=" 上传素材："
            prop="imgURl"
            class="upImg upVideo upModel"
          >
            <el-input class="test-input" v-model="materialUp.imgURl"></el-input>
            <span class="upSpan">
              <label>
                选择glb或verge3d的zip文件
                <input
                  type="file"
                  ref="upModel"
                  @change="upModel($event)"
                  accept=".glb,.zip"
                />
              </label>
            </span>
          </el-form-item>
          <p class="explain">支持20MB以内的glb文件</p>
          <p class="explain re-upload flex-start" v-show="materialUp.imgURl">
            <img class="file-img" src="@/assets/images/self/file.png" alt />
            <span class="tow">{{ materialUp.imgURl }}</span>
            <i class="icon" @click="delModel"></i>
          </p>
          <el-form-item label=" 上传封面：" prop="glbThumbName" class="upImg">
            <el-input
              class="test-input"
              v-model="materialUp.glbThumbName"
            ></el-input>
            <span class="upSpan">
              <label>
                上传封面
                <input
                  type="file"
                  ref="upPic"
                  @change="upPic($event)"
                  accept="image/jpeg, image/png"
                />
              </label>
            </span>
            <!-- <ClipImage 
                    v-show="materialUp.videoThumb"
                    :max="200"
                    ref="ClipImage"
                    ></ClipImage> -->
          </el-form-item>
          <p class="explain">支持2MB以内的jpg、png模型封面</p>
          <p
            class="explain re-upload flex-start"
            v-show="materialUp.glbThumbName"
          >
            <img class="file-img" src="@/assets/images/self/file.png" alt />
            <span class="tow">{{ materialUp.glbThumbName }}</span>
            <i class="icon" @click="delThumb"></i>
          </p>
          <el-form-item label="分类标签：">
            <addTags
              v-model="tagList"
              ref="tags"
              v-if="isUploadModel"
            ></addTags>
          </el-form-item>
          <el-form-item label="跳转链接：" prop="url">
            <el-input v-model="materialUp.url" placeholder="http//:"></el-input>
          </el-form-item>
          <el-form-item label="素材描述：" prop="discripe" class="upDiscripe">
            <el-input
              type="textarea"
              v-model="materialUp.discripe"
              maxlength="300"
              show-word-limit
              resize="none"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer flex">
        <p>
          <el-checkbox
            label="在展厅内不可点击"
            v-model="materialUp.enable"
          ></el-checkbox>
        </p>
        <p>
          <el-button
            :disabled="isCanUploadMaterial"
            type="primary"
            @click="uploadMaterial"
            >确认上传
          </el-button>
          <el-button @click="onbeforeClose()">取 消</el-button>
        </p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import formRules from "@/config/form-rules.js";
import ClipImage from "@/components/clip-image.vue";
import JSZip from "jszip";
import addTags from "@/components/add-tags";
export default {
  name: "uploadModel",
  props: ["isUploadModel"],
  data() {
    return {
      materialUp: {
        name: "",
        url: "",
        imgURl: "",
        discripe: "",
        enable: false,
        followCamera: false,
        file: "",
        glbThumb: "",
        glbThumbName: "",
      },
      rules: {
        name: [{ required: true, message: "素材名称", trigger: "blur" }],
        imgURl: [{ required: true, message: "请上传模型", trigger: "change" }],
        glbThumbName: [
          { required: true, message: "请上传模型封面", trigger: "change" },
        ],
        discripe: [
          {
            min: 0,
            max: 300,
            message: "长度在 0 到 300 个字符",
            trigger: "blur",
          },
        ],
        url: [
          {
            validator: formRules.checkUrl,
            trigger: "blur",
          },
        ],
      },
      tagList: [],
      isCanUploadMaterial: false,
      loadOver: false,
    };
  },
  components: {
    ClipImage,
    addTags,
  },
  computed: {
    userInfo() {
      return this.$store.state.userinfo;
    },
  },
  methods: {
    commonRestData() {
      try {
        window.opener && window.opener._materialRefresh(true);
      } catch (e) {
        console.warn(e);
      }
    },
    onbeforeClose() {
      this.$emit("closeDialog");
    },
    getHotTags() {
      this.resetData();
    },
    resetData() {
      this.tagList = [];
      this.materialUp = {
        name: "",
        url: "",
        imgURl: "",
        discripe: "",
        enable: false,
        followCamera: false,
        file: "",
        glbThumb: "",
        glbThumbName: "",
      };
      this.isCanUploadMaterial = false;
      if (this.$refs["materialUp"]) {
        this.$nextTick(() => {
          this.$refs["materialUp"].resetFields();
        });
      }
    },
    async upModel(e) {
      let target = e.target.cloneNode();
      e.target.value = "";
      let file = target.files[0];
      if (!file) {
        return;
      }
      let fileType = file.name.split(".")[1];
      let fileSize = file.size / 1024 / 1024;
      if (fileType == "glb") {
        if (fileSize > 20) {
          this.$message({
            type: "warning",
            message: "glb文件大小超过20M",
          });
          return;
        }
      } else if (fileType == "zip") {
        if (fileSize > 50) {
          this.$message({
            type: "warning",
            message: "zip文件大小超过50M",
          });
          return;
        }
        var zip = new JSZip();
        let zipFile = await zip.loadAsync(file);
        if (!zipFile.files["v3d.js"]) {
          this.$message({
            type: "warning",
            message: "请上传有效的verge3d项目",
          });
          return;
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传正确的模型格式",
        });
        return;
      }
      this.materialUp.file = file;
      this.materialUp.imgURl = file.name;
      let _name = file.name.split(".")[0];
      if (_name.length > 30) {
        _name = _name.substring(0, 30);
      }
      this.materialUp.name = _name;
    },
    delModel() {
      this.materialUp.file = "";
      this.materialUp.imgURl = "";
    },
    upPic(e) {
      let target = e.target.cloneNode();
      e.target.value = "";
      let file = target.files[0];
      if (!file) {
        return;
      }
      let fileType = file.type;
      let fileSize = file.size / 1024 / 1024;
      if (fileType != "image/jpeg" && fileType != "image/png") {
        this.$message({
          type: "warning",
          message: "请上传正确的图片格式",
        });
        return;
      }
      if (fileSize > 2) {
        this.$message({
          type: "warning",
          message: "图片大小超过2M",
        });
        return;
      }
      this.materialUp.glbThumb = file;
      this.materialUp.glbThumbName = file.name;
    },
    delThumb() {
      this.materialUp.glbThumb = "";
      this.materialUp.glbThumbName = "";
    },

    async uploadMaterial() {
      let me = this;
      me.loadOver = true;
      try {
        await this.$refs["materialUp"].validate();
        me.isCanUploadMaterial = true;
        let obj = {
          ...this.materialUp,
          tags: this.tagList.join(","),
          _capcity: 1,
        };
        obj.enable = !obj.enable;
        delete obj.imgURl;
        delete obj.glbThumbName;
        await me.$http.uploadModel(obj);
        me.$refs["materialUp"].resetFields(); // 重置
        me.onbeforeClose();
        me.$Ruler.success("上传成功");
        me.commonRestData();
        me.$refs.tags.setTagsList();
      } catch (e) {
        console.log("catch", e);
      }
      me.loadOver = false;
      me.isCanUploadMaterial = false;
    },
  },
};
</script>
