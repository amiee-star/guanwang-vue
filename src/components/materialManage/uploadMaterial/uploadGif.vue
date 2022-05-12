<!-- 上传GIF -->
<template>
  <div class="upload-gif com-upload">
    <el-dialog
      :visible.sync="isUploadGif"
      :fullscreen="false"
      :modal="true"
      :custom-class="
        fileType == fileTypes.pic
          ? 'comUpload uploadGif gifpic'
          : 'comUpload uploadGif'
      "
      :show-close="true"
      :before-close="onbeforeClose"
      :close-on-click-modal="false"
      @open="getHotTags"
    >
      <div class="nav">
        <span class="active">上传动图</span>
      </div>
      <div class="content" v-loading="uploadOver">
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
              maxlength="30"
              placeholder="请输入素材名称"
            ></el-input>
          </el-form-item>
          <el-form-item label=" 上传素材：" prop="imgURl" class="upImg upGif">
            <el-input class="test-input" v-model="materialUp.imgURl"></el-input>
            <span class="upSpan">
              <label>
                选择图片
                <input
                  type="file"
                  accept="image/gif"
                  ref="upZip"
                  @change="upZip($event)"
                />
              </label>
            </span>
          </el-form-item>
          <p class="explain">支持5MB以内的GIF，分辨率不超过1024</p>
          <p class="explain re-upload flex-start" v-if="materialUp.imgURl">
            <img class="file-img" src="@/assets/images/self/file.png" alt />
            <span class="tow">{{ materialUp.imgURl }}</span>
            <i class="icon" @click="delZip"></i>
          </p>
          <template v-if="fileType == fileTypes.pic">
            <el-form-item label="总帧数" prop="totalSize">
              <el-input
                v-model="materialUp.totalSize"
                @blur="picFrame($event)"
              ></el-input>
            </el-form-item>
            <el-form-item label="总时长" prop="allTime">
              <el-input
                v-model="materialUp.allTime"
                @blur="picAllTime($event)"
              ></el-input>
            </el-form-item>
            <el-form-item label="单帧时长" prop="time">
              <el-input
                v-model="materialUp.time"
                @blur="picTime($event)"
              ></el-input>
            </el-form-item>
            <el-form-item label="播放方式" prop="playType">
              <el-radio v-model="materialUp.playType" :label="0"
                >自动播放</el-radio
              >
              <el-radio v-model="materialUp.playType" :label="1"
                >点击播放</el-radio
              >
            </el-form-item>
          </template>
          <el-form-item label="分类标签：">
            <addTags v-model="tagList" ref="tags" v-if="isUploadGif"></addTags>
          </el-form-item>
          <!--          <el-form-item label="跳转链接：" prop="url">-->
          <!--            <el-input v-model="materialUp.url" placeholder="http//:"></el-input>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="素材描述：" prop="discripe" class="upDiscripe">-->
          <!--            <el-input-->
          <!--              type="textarea"-->
          <!--              v-model="materialUp.discripe"-->
          <!--              maxlength="300"-->
          <!--              show-word-limit-->
          <!--              resize="none"-->
          <!--            ></el-input>-->
          <!--          </el-form-item>-->
        </el-form>
        <div class="preview" v-if="fileType == fileTypes.pic">
          <div ref="wrap"></div>
        </div>
      </div>
      <div class="dialog-footer flex">
        <div>
          <el-checkbox
            label="在展厅内不可点击"
            v-model="materialUp.enable"
          ></el-checkbox>
        </div>
        <div class="handleBtn">
          <el-button
            :disabled="isCanUploadMaterial"
            type="primary"
            @click="uploadMaterial()"
            >确认上传</el-button
          >
          <el-button @click="onbeforeClose">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import formRules from "@/config/form-rules.js";
import JSZip from "jszip";
import FrameGif from "@/utils/frame_gif.js";
import addTags from "@/components/add-tags";
export default {
  name: "uploadGif",
  props: ["isUploadGif"],
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
        totalSize: 1,
        allTime: 0.1,
        time: 0.1,
        playType: 0,
        setHot: false,
      },
      rules: {
        name: [{ required: true, message: "素材名称", trigger: "blur" }],
        imgURl: [{ required: true, message: "请选择素材", trigger: "change" }],
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
      hotTags: [],
      isCanUploadMaterial: false,
      fileTypes: {
        zip: 3,
        gif: 1,
        pic: 2,
      },
      fileType: 1,
      accept: [".zip", ".gif", , ".png", ".jpg", ".jpeg"],
      gif: new FrameGif(),
      uploadOver: false,
    };
  },
  components: {
    addTags,
  },
  computed: {
    userInfo() {
      return this.$store.state.userinfo;
    },
  },
  methods: {
    picFrame(e) {
      // e
      let totalSize = parseInt(e.target.value) || 1;
      if (totalSize < 1) {
        totalSize = 1;
      }
      if (totalSize > 999) {
        totalSize = 999;
      }

      let allTime = this.materialUp.allTime || 0.1;
      let time = Number((allTime / totalSize).toFixed(2));
      if (time < 0.01) {
        time = 0.01;
      }
      allTime = (time * totalSize).toFixed(2);
      this.materialUp.allTime = allTime;
      this.materialUp.time = time;
      this.materialUp.totalSize = totalSize;
      this.gif.setOptions({
        time: time,
        frame: totalSize,
      });
    },
    picAllTime(e) {
      let allTime = parseFloat(e.target.value) || 0.1;
      allTime = allTime.toFixed(2);
      let totalSize = this.materialUp.totalSize || 1;
      let time = Number((allTime / totalSize).toFixed(2));
      if (time < 0.01) {
        time = 0.01;
      }
      allTime = (time * totalSize).toFixed(2);
      this.materialUp.allTime = allTime;
      this.materialUp.time = time;
      this.materialUp.totalSize = totalSize;
      this.gif.setOptions({
        time: time,
        frame: totalSize,
      });
    },
    picTime(e) {
      let totalSize = this.materialUp.totalSize || 1;
      let time = parseFloat(e.target.value) || 0.1;
      if (time < 0.01) {
        time = 0.01;
      }
      let allTime = (time * totalSize).toFixed(2);
      this.materialUp.allTime = allTime;
      this.materialUp.time = time;
      this.materialUp.totalSize = totalSize;
      this.gif.setOptions({
        time: time,
        frame: totalSize,
      });
    },
    commonRestData() {
      try {
        window.opener && window.opener._materialRefresh(true);
      } catch (e) {
        console.warn(e);
      }
    },
    onbeforeClose(val) {
      this.$emit("closeDialog", typeof val == "boolean" ? true : false);
    },
    delZip() {
      this.materialUp.file = "";
      this.materialUp.imgURl = "";
    },
    upZip(e) {
      var target = e.target.cloneNode();
      e.target.value = "";
      var upfile = target.files[0];
      if (!upfile) {
        return;
      }
      // console.log(upfile);
      let fileType = upfile.name.split(".").pop() || "";
      fileType = fileType.toLocaleLowerCase();
      fileType = "." + fileType;

      let fileSize = upfile.size / 1024 / 1024;

      if (fileType !== ".gif") {
        this.$message({
          type: "warning",
          message: "请上传正确的素材格式",
        });
        return;
      }
      // if(fileType == '.zip') {
      //     if(fileSize > 20) {
      //       this.$message({
      //         type: 'warning',
      //         message: "请上传不大于20M的压缩包"
      //       })
      //       return;
      //     }
      //     let _obj = Object;
      //     var zip = new JSZip();
      //     zip.loadAsync(upfile).then(file => {
      //       let _test = _obj.keys(file.files);
      //       // console.log(upfile)
      //       let canUpload =  this.testZipChildName(_test)
      //       if(canUpload) {
      //          this.fileType = this.fileTypes.zip;
      //           this.commonChangeName(upfile)
      //       }
      //     })
      // }
      if (fileType == ".gif") {
        if (fileSize > 5) {
          this.$message({
            type: "warning",
            message: "请上传不大于5M的gif",
          });
          return;
        }
        this.fileType = this.fileTypes.gif;
        this.commonChangeName(upfile);
      }

      // if(fileType == ".png" || fileType == ".jpg" ||  fileType == ".jpeg"){
      //   if(fileSize > 20) {
      //       this.$message({
      //         type: 'warning',
      //         message: "请上传不大于20M的单张序列帧"
      //       })
      //       return;
      //     }
      //   this.fileType = this.fileTypes.pic;
      //   this.commonChangeName(upfile)
      //   this.$nextTick(()=>{
      //     this.gif.loadFile(upfile,
      //     {
      //     parent: this.$refs.wrap,
      //     frame:this.materialUp.totalSize,
      //     time:this.materialUp.time
      //     });
      //   });
      // }
    },
    commonChangeName(upfile) {
      this.materialUp.file = upfile;
      this.materialUp.imgURl = upfile.name;
      let _name = upfile.name.split(".")[0];
      if (_name.length > 30) {
        _name = _name.substring(0, 30);
      }
      this.materialUp.name = _name;
    },
    testZipChildName(list) {
      let len = list.length;
      if (len < 7 || len > 36) {
        this.$message({
          type: "warning",
          message: "压缩图片仅支持7-36张",
        });
        return false;
      }
      let obj = {};
      for (let i = 0; i < len; i++) {
        obj[list[i]] = true;
      }
      let suffix = list[0].split(".").pop();
      if (suffix !== "png" && suffix !== "jpg") {
        this.$message({
          type: "warning",
          message: "请上传png或jpg的序列帧压缩包",
        });
        return false;
      }
      for (let i = 0; i < len; i++) {
        let fileName = String(i).padStart(2, "0") + "." + suffix;
        if (!obj[fileName]) {
          this.$message({
            type: "warning",
            message: "请上传正确序列帧的压缩包",
          });
          return false;
        }
      }
      return true;
    },
    async uploadMaterial() {
      let me = this;
      me.uploadOver = true;
      try {
        await this.$refs["materialUp"].validate();
        this.isCanUploadMaterial = true;
        let tags = this.tagList.slice(0);

        let obj = { ...this.materialUp, tags: tags.join(","), _capcity: 1 };
        delete obj.imgURl;
        obj.enable = !obj.enable;
        if (this.fileType == this.fileTypes.pic) {
          obj.time = obj.time * 1000;
          delete obj.allTime;
        } else {
          delete obj.allTime;
          delete obj.time;
        }
        await me.$http.uploadGif(obj);
        me.$refs["materialUp"].resetFields(); // 重置
        me.onbeforeClose(true);
        me.$Ruler.success("上传成功");
        me.commonRestData();
        me.$refs.tags.setTagsList();
      } catch (e) {
        console.log("catch--", e);
      }
      me.uploadOver = false;
      me.isCanUploadMaterial = false;
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
        totalSize: 1,
        allTime: 0.1,
        time: 0.1,
        playType: 0,
        setHot: false,
      };
      this.fileType = this.fileTypes.gif;
      this.isCanUploadMaterial = false;
      if (this.$refs["materialUp"]) {
        this.$nextTick(() => {
          this.$refs["materialUp"].resetFields();
        });
      }
    },
  },
};
</script>
