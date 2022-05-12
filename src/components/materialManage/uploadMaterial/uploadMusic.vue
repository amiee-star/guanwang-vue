<template>
  <div class="uploadMusic">
    <el-dialog
      :visible.sync="isUploadModel"
      :fullscreen="false"
      :modal="true"
      custom-class="comUpload uploadModel"
      :show-close="true"
      :before-close="onbeforeClose"
      :close-on-click-modal="false"
    >
      <div class="nav">
        <span class="active">上传音乐</span>
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
              maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item label=" 上传素材：" prop="imgURl" class="upImg upVideo">
            <el-input class="test-input" v-model="materialUp.imgURl"></el-input>
            <span class="upSpan">
              <label>
                选择MP3文件
                <input
                  type="file"
                  @change="upMusic($event)"
                  :accept="accept.join(',')"
                />
              </label>
            </span>
          </el-form-item>
          <p class="explain">
            支持5MB以内的音频文件（mp3），建议码率不超过320kbps
          </p>
          <p class="explain re-upload flex-start" v-show="materialUp.imgURl">
            <img class="file-img" src="@/assets/images/self/file.png" alt />
            <span class="tow">{{ materialUp.imgURl }}</span>
            <i class="icon" @click="delMusic"></i>
          </p>
<!--          <el-form-item label="歌手名：" prop="singer">-->
<!--            <el-input v-model="materialUp.singer"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="音频分类" prop="musicTypeId">-->
<!--            <el-select v-model="materialUp.musicTypeId" placeholder="请选择">-->
<!--              <el-option-->
<!--                v-for="item in musicTypes"-->
<!--                :key="item.musicTypeId"-->
<!--                :label="item.name"-->
<!--                :value="item.musicTypeId"-->
<!--              >-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="时长：" prop="timeStr">
            <span>{{ materialUp.timeStr }}</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer flex">
        <p></p>
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
export default {
  name: "uploadMusic",
  props: ["isUploadModel"],
  data() {
    return {
      materialUp: {
        name: "",
        url: "",
        imgURl: "",
        file: "",
        time: 0,
        timeStr: "00:00",
        musicTypeId: "",
        singer: "",
      },
      rules: {
        name: [{ required: true, message: "素材名称", trigger: "blur" }],
        imgURl: [
          { required: true, message: "请上传MP3文件", trigger: "change" },
        ],
        musicTypeId: [
          { required: true, message: "请选择音乐类型", trigger: "blur" },
        ],
      },
      accept: ["audio/mp3", "audio/mpeg"],
      isCanUploadMaterial: false,
      loadOver: false,
      musicTypes: [],
    };
  },
  mounted() {
    this.getMusicType();
  },
  computed: {
    userInfo() {
      return this.$store.state.userinfo;
    },
  },
  methods: {
    onbeforeClose(val) {
      this.materialUp = {
        name: "",
        url: "",
        imgURl: "",
        file: "",
        time: 0,
        timeStr: "00:00",
        musicTypeId: "",
        singer: "",
      };
      this.$refs["materialUp"].resetFields();

      this.$emit("closeDialog", typeof val == "boolean" ? true : false);
    },
    async getMusicType() {
      this.musicTypes = await this.$http.getMusicType();
    },
    async upMusic(e) {
      let target = e.target.cloneNode();
      e.target.value = "";
      let file = target.files[0];
      if (!file) {
        return;
      }
      let fileSize = file.size / 1024 / 1024;
      if (this.accept.indexOf(file.type) < 0) {
        this.$message({
          type: "warning",
          message: "请上传正确的MP3格式",
        });
        return;
      }
      if (fileSize > 5) {
        this.$message({
          type: "warning",
          message: "文件大小超过5M",
        });
        return;
      }
      this.materialUp.file = file;
      this.materialUp.imgURl = file.name;
      // if(this.materialUp.name == ''){
      //     let _name = file.name.split('.')[0];
      //     if(_name.length >15){
      //         _name = _name.substring(0,15);
      //     }
      //     this.materialUp.name = _name;
      // }
      let _name = file.name.split(".")[0];
      if (_name.length > 30) {
        _name = _name.substring(0, 30);
      }
      this.materialUp.name = _name;
      let audio = await this.getAudio(file);
      let duration = parseInt(audio.duration);
      this.materialUp.time = duration;
      this.materialUp.timeStr = this.$utils.formatAudioTime(duration);
    },

    getAudio(file) {
      return new Promise(function(resolve, reject) {
        let audio = new Audio();
        audio.oncanplay = function() {
          resolve(audio);
        };
        audio.onerror = reject;
        audio.src = URL.createObjectURL(file);
      });
    },
    delMusic() {
      this.materialUp.file = "";
      this.materialUp.imgURl = "";
      this.materialUp.time = 0;
      this.materialUp.timeStr = "00:00";
    },
    async uploadMaterial() {
      let me = this;
      me.loadOver = true;
      try {
        await this.$refs["materialUp"].validate();
        me.isCanUploadMaterial = true;
        let obj = { ...this.materialUp, _capcity: 1 };
        delete obj.imgURl;
        delete obj.timeStr;
        await me.$http.musicUpload(obj);
        me.$refs["materialUp"].resetFields(); // 重置
        this.materialUp.time = 0;
        this.materialUp.timeStr = "00:00";
        me.onbeforeClose(true);
        me.$Ruler.success("上传成功");
      } catch (e) {
        console.log("catch", e);
      }
      me.loadOver = false;
      me.isCanUploadMaterial = false;
    },
  },
};
</script>
<style lang="scss" src="./uploadCom.scss"></style>
<style lang="scss" scoped>
.uploadMusic {
}
</style>
