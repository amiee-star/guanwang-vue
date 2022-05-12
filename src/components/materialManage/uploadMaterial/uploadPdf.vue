<template>
  <el-dialog :visible.sync="isUploadPdf"
             :fullscreen="false"
             :modal="true"
             custom-class="comUpload uploadPdf"
             :show-close="true"
             :before-close="onbeforeClose"
             :close-on-click-modal="false">
    <div class="nav">
      <span class="active">上传文件</span>
    </div>
    <el-form :model="materialUp"
             :rules="rules"
             ref="materialUp"
             class="content"
             @submit.native.prevent
             label-width="100px">
      <el-form-item label="文件名称：" prop="name">
        <el-input v-model="materialUp.name" placeholder="请输入素材名称(1-32个字符)" minlength="1" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="上传文件：" prop="file">
        <el-upload
          class="upload-demo"
          action=""
          accept="application/pdf"
          :auto-upload="false"
          v-model="materialUp.file"
          :on-remove="removeFile"
          :on-change="handleExceed"
          :file-list="fileList">
          <el-button type="primary">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">支持50MB以内的PDF文件</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="dialog-footer flex-end">
      <div class="handleBtn">
        <el-button
          :disabled="isCanUploadMaterial"
          type="primary"
          @click="uploadMaterial()"
        >确认上传</el-button>
        <el-button @click="onbeforeClose">取 消</el-button>
      </div>
    </div>
    <div  class="video-progress">
      <el-dialog :visible.sync="videoProgressShow "
                 :fullscreen="true" :modal="false" :show-close="false">
        <div class="progress-content">
          <div class="text">文件正在上传中，请稍等片刻...</div>
          <div class="step-process">
            <el-progress :text-inside="true"  :stroke-width="18" :percentage="videoProgress" ></el-progress>
            <span v-if="videoProgress!=100" class="close" @click="abortVideo"><i class="el-icon-error"></i></span>
          </div>
          <div class="tooltip">提示：上传过程中请不要关闭此页面</div>
        </div>
      </el-dialog>
    </div>
  </el-dialog>
</template>

<script>
  import {checkFile} from '@/utils/files'
  import axios from "axios";
  export default {
    name: "uploadPdf",
    props: ['isUploadPdf'],
    data() {
      return {
        materialUp: {
          name: '',
          file: ''
        },
        fileList: [],
        isCanUploadMaterial: false,
        rules:  {
          name: [
            {required: true, message: '请输入素材名称', trigger: 'blur'},
          ],
          file: [
            {required: true, message: '请上传文件', trigger: 'blur'},
          ]
        },
        videoProgressShow: false,
        videoProgress: 0,
        videoCancel: ''
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.userinfo
      }
    },
    methods: {
      onbeforeClose(val) {
        let me = this;
        me.videoProgressShow = false
        me.$refs.materialUp.resetFields();
        me.$refs.materialUp.clearValidate();
        me.fileList = [];
        this.$emit('closeDialog', typeof val == "boolean" ? true : false)
      },
      async uploadMaterial() {
        let me = this;
        me.isCanUploadMaterial = true;
        try {
          let obj = {
            file:me.materialUp.file,
            name:me.materialUp.name,
            _capcity:1
          }
          await me.$refs.materialUp.validate();
          me.videoProgressShow = true;
          let CancelToken = axios.CancelToken;
          let config = {
            onUploadProgress: progressEvent => {
              me.videoProgress  = parseInt(progressEvent.loaded / progressEvent.total * 100)  || 0;
            },
            cancelToken : new CancelToken(function executor(c) {
              me.videoCancel = c;
            })
          };
          await me.$http.imgMaterial(obj, config);
          me.onbeforeClose(true);
        } catch (e) {
          console.log(e);
        }
        me.videoProgressShow = false;
        me.isCanUploadMaterial = false;
      },
      handleExceed(file) {
        let me = this;
        me.fileList = [];
        let right = checkFile(file.raw, 50, 'application/pdf');
        if (right) {
          me.materialUp.file = file.raw
          me.fileList.push({
            name: file.name
          })
          me.$refs.materialUp.clearValidate(['name','file']);
          me.materialUp.name = file.name
        }

      },
      removeFile() {
        this.fileList = [];
        this.materialUp.file = "";
      },
      abortVideo(){
        var me = this;
        if( me.videoCancel){
          me.$Ruler.confirm("您确定要取消上传吗?").then((res)=>{
            if(res == "ok"){
              this.videoCancel && this.videoCancel("取消成功");
              this.videoProgressShow = false;
              this.isCanUploadMaterial = false;
            }
          }).catch(()=>{})
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .content{
    .el-form-item__label{
      color: #bbb!important;
    }
    .el-button--primary{
      background:rgba(255,255,255,1);
      border:1px solid rgba(35,184,255,1);
      border-radius:3px;
      color: #23B8FF;
      &:hover {
        background: #23B8FF;
        color: #fff;
      }
    }
    .el-upload__tip{
      color: #999999;
    } 
  }

</style>
<style lang="scss">
  .uploadPdf{
    margin-top: 27vh!important;
  }
</style>
