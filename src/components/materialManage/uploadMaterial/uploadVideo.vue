<!-- 上传视频 -->
<template>
  <div class="upload-video com-upload">
    <el-dialog
      :visible.sync="isUploadVideo"
      :fullscreen="false"
      :modal="true"
      custom-class="comUpload uploadVideo"
      :show-close="true"
      :before-close="onbeforeClose"
      :close-on-click-modal="false"
      @open="getHotTags"
    >
      <div class="nav">
        <span class="active">上传视频</span>
      </div>
      <div class="content">
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
              maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item label=" 上传素材：" prop="imgURl" class="upImg upVideo">
            <el-input class="test-input" v-model="materialUp.imgURl"></el-input>
            <span class="upSpan">
              <label>
                选择文件
                <input
                  type="file"
                  @change="upVideo($event)"
                  accept="video/mp4"
                />
              </label>
            </span>
          </el-form-item>
          <p class="explain">
            支持50MB以内的mp4文件，建议H.264编码，分辨率720P，帧数不高于25
            fps，码率不超过5Mbps。
          </p>
          <p class="explain re-upload flex-start" v-if="materialUp.imgURl">
            <img class="file-img" src="@/assets/images/self/video.png" alt />
            <span class="tow">{{ materialUp.imgURl }}</span>
            <i class="icon" @click="delVideo"></i>
          </p>
          <el-form-item
            v-show="materialUp.imgURl"
            label=" 截取封面："
            prop="videoThumbName"
            class="upImg"
          >
            <el-input
              class="test-input"
              v-model="materialUp.videoThumbName"
            ></el-input>
            <span class="upSpan">
              <label @click="isClip = true">
                截取视频封面
                <!--                <input type="file" ref="upPic" @change="upPic($event)" accept="image/jpeg, image/png"/>-->
              </label>
            </span>
            <ClipImage
              v-show="materialUp.videoThumb"
              :max="200"
              ref="ClipImage"
            ></ClipImage>
          </el-form-item>
<!--          <p class="explain" v-show="materialUp.imgURl">支持jpg、png视频封面</p>-->
          <p
            class="explain re-upload flex-start"
            v-if="materialUp.videoThumbName"
          >
            <img class="file-img" src="@/assets/images/self/file.png" alt />
            <span class="tow">{{ materialUp.videoThumbName }}</span>
            <i class="icon" @click="delThumb"></i>
          </p>
          <el-form-item label="分类标签：">
            <addTags
              v-model="tagList"
              ref="tags"
              v-if="isUploadVideo"
            ></addTags>
          </el-form-item>
          <!--                    <el-form-item label="素材描述：" prop="discripe" class="upDiscripe">-->
          <!--                        <el-input-->
          <!--                                type="textarea"-->
          <!--                                v-model="materialUp.discripe"-->
          <!--                                maxlength="300"-->
          <!--                                show-word-limit-->
          <!--                                resize="none"-->
          <!--                        ></el-input>-->
          <!--                    </el-form-item>-->
        </el-form>
      </div>
      <div class="dialog-footer flex">
        <p>
          <el-checkbox label="设为背景透明" v-model="materialUp.backLucency"></el-checkbox>
          <el-tooltip popper-class="needOpacity" effect="dark" content="若选择“背景透明”属性，则视频背景需为绿幕（#00ff00）才可生效；常用于解说人物等。" placement="top">
            <i class="el-icon-warning-outline"></i>
          </el-tooltip>
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
    <div class="video-progress">
      <el-dialog
        :visible.sync="videoProgressShow"
        :fullscreen="true"
        :modal="false"
        :show-close="false"
      >
        <div class="progress-content">
          <div class="text">视频正在上传中，请稍等片刻...</div>
          <div class="step-process">
            <el-progress
              :text-inside="true"
              :stroke-width="18"
              :percentage="videoProgress"
              :color="videoError ? '#f56c6c' : '#19A0F1'"
            ></el-progress>
            <span v-if="videoProgress != 100" class="close" @click="abortVideo"
              ><i class="el-icon-error"></i
            ></span>
          </div>
          <div class="tooltip">提示：上传过程中请不要关闭此页面</div>
        </div>
      </el-dialog>
    </div>
    <videoThumbnail
      :isClip="isClip"
      :video="materialUp.file"
      @close="closeThumbnail"
    />
  </div>
</template>
<script>
import formRules from "@/config/form-rules.js";
import axios from "axios";
import ClipImage from "@/components/clip-image.vue";
import addTags from "@/components/add-tags";
import videoThumbnail from "./video-thumbnail";
export default {
  name: "uploadVideo",
  props: ["isUploadVideo"],
  data() {
    return {
      materialUp: {
        name: "",
        url: "",
        imgURl: "",
        enable: false,
        followCamera: false,
        backLucency: false,
        file: "",
        videoThumb: "", // 新增视频封面
        videoThumbName: "",
      },
      rules: {
        name: [{ required: true, message: "素材名称", trigger: "blur" }],
        imgURl: [{ required: true, message: "请上传视频", trigger: "change" }],
        videoThumbName: [
          { required: true, message: "请截取视频封面", trigger: "change" },
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
      videoProgressShow: false,
      videoError: "",
      videoProgress: 0, //视频上传的进度
      videoCancel: "",
      isClip: false,
    };
  },
  components: {
    ClipImage,
    addTags,
    videoThumbnail,
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
        backLucency: false,
        file: "",
        videoThumb: "",
        videoThumbName: "",
      };
      this.isCanUploadMaterial = false;
      this.videoProgressShow = false;
      this.videoProgress = 0;
      if (this.$refs["materialUp"]) {
        this.$nextTick(() => {
          this.$refs["materialUp"].resetFields();
        });
      }
    },
    onbeforeClose(val) {
      this.$emit("closeDialog", typeof val == "boolean" ? true : false);
    },
    async uploadMaterial() {
      //    确认上传
      let me = this;
      try {
        await this.$refs["materialUp"].validate();
        let videoThumb = me.materialUp.videoThumb;
        let clipImg = me.$refs.ClipImage.exportFile(
          videoThumb.name,
          videoThumb.type
        );
        me.materialUp.videoThumb = clipImg;
        me.isCanUploadMaterial = true;
        let obj = {
          ...this.materialUp,
          tags: this.tagList.join(","),
          _capcity: 1,
        };
        delete obj.imgURl;
        delete obj.videoThumbName;
        obj.enable = !obj.enable;
        me.videoProgressShow = true;
        let CancelToken = axios.CancelToken;
        let config = {
          onUploadProgress: (progressEvent) => {
            me.videoProgress =
              parseInt((progressEvent.loaded / progressEvent.total) * 100) || 0;
          },
          cancelToken: new CancelToken(function executor(c) {
            me.videoCancel = c;
          }),
        };
        await me.$http.imgMaterial(obj, config);
        me.$refs["materialUp"].resetFields();
        me.onbeforeClose(true);
        me.$Ruler.success("上传成功");
        me.commonRestData();
        me.$refs.tags.setTagsList();
      } catch (e) {
        console.log("catch--", e);
      }
      me.videoProgressShow = false;
      me.isCanUploadMaterial = false;
    },
    async upVideo(e) {
      // 上传视频
      var target = e.target.cloneNode();
      e.target.value = "";
      var file = target.files[0];
      if (!file) {
        return;
      }
      var fileType = file.type;
      var fileSize = file.size / 1024 / 1024;
      if (fileType !== "video/mp4") {
        this.$message({
          type: "warning",
          message: "请上传正确的视频格式",
        });
        return;
      }
      if (fileSize > 50) {
        this.$message({
          type: "warning",
          message: "视频大小超过50M",
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
      let loadVideo = await this.$utils.load.video(file, { autoplay: false });
      this.$refs.ClipImage.setClip({
        width: loadVideo.videoWidth,
        height: loadVideo.videoHeight,
      });
    },
    upPic(e) {
      // 上传封面
      var target = e.target.cloneNode();
      e.target.value = "";
      var file = target.files[0];
      if (!file) {
        return;
      }
      var fileType = file.type;
      // var fileSize = file.size / 1024 / 1024;
      if (fileType != "image/jpeg" && fileType != "image/png") {
        this.$message({
          type: "warning",
          message: "请上传正确的图片格式",
        });
        return;
      }
      // if (fileSize > 2) {
      //   this.$message({
      //     type: 'warning',
      //     message: "图片大小超过2M"
      //   })
      //   return
      // }
      this.materialUp.videoThumb = file;
      this.materialUp.videoThumbName = file.name;
      let imgSrc = URL.createObjectURL(file);
      this.$refs.ClipImage.setSrc(imgSrc);
    },
    delVideo() {
      this.materialUp.file = "";
      this.materialUp.imgURl = "";
    },
    delThumb() {
      this.materialUp.videoThumb = "";
      this.materialUp.videoThumbName = "";
    },
    abortVideo() {
      var me = this;
      if (me.videoCancel) {
        me.$Ruler
          .confirm("您确定要取消上传吗?")
          .then((res) => {
            if (res == "ok") {
              this.videoCancel && this.videoCancel("取消成功");
              this.videoProgressShow = false;
              this.isCanUploadMaterial = false;
            }
          })
          .catch(() => {});
      }
    },
    closeThumbnail(val) {
      let me = this;
      me.isClip = false;
      if (typeof val == "string") {
        me.$refs.ClipImage.setSrc(val);
        me.materialUp.videoThumbName = me.materialUp.file.name;
      }
    },
  },
};
</script>
<style lang="scss" src="./uploadCom.scss"></style>
