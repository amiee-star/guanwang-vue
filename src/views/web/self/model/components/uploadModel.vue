<template>
    <div class="uploadModel flex-center-column" v-if="isUpload">
        <div class="contain">
            <p class="flex">新建展厅模板<i class="el-icon-close cursor" @click="close"></i></p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
                <el-form-item label="模板名称：" prop="name">
                    <el-input v-model="ruleForm.name" maxlength="24"></el-input>
                </el-form-item>
                <el-form-item label="全景图：" prop="skyPic">
                    <el-upload
                            class="upload-demo"
                            action=""
                            :on-change="picChange"
                            :file-list="picList"
                            :auto-upload="false">
                        <el-button>上传全景图压缩包</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="模型文件：" prop="modelFile">
                    <el-upload
                            class="upload-demo"
                            action=""
                            :on-change="ModelChange"
                            :file-list="modelList"
                            :auto-upload="false">
                        <el-button>上传展馆模型压缩包</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div class="tips">
                <p>压缩包文件名只能包含字母、数字、下划线和减号。</p>
                <p>获取<a class="cursor" target="_blank" download="yunzhan.pdf" :href="pdfHref">详细数据说明及制作标准</a></p>
            </div>
            <div class="flex-end footer">
                <el-button @click="close">取消</el-button>
                <el-button :disabled="canSubmit" type="primary" @click="submitForm()">确定</el-button>
            </div>
        </div>
        <loading :disvisible="disvisible"/>
    </div>
</template>

<script>
  import {checkZip} from '@/utils/files'
  import jsZip from 'jszip'
  import loading from "@/components/popup/loading";
  export default {
    name: "uploadModel",
    components: {
      loading
    },
    data() {
      return {
        ruleForm: {
          name: '',
          skyPic: '',
          modelFile: '',
        },
        rules: {
          name: [
            {required: true, message: '请填写模板名称', trigger: 'blur'}
          ],
          skyPic: [
            {required: true, message: '请上传全景图', trigger: 'change'}
          ],
          modelFile: [
            {required: true, message: '请上传模型文件', trigger: 'change'}
          ]
        },
        picList: [],
        modelList: [],
        disvisible: false,
        isUpload: false,
        canSubmit: false,
        pdfHref: process.env.VUE_APP_data
      }
    },
    methods: {
      close() {
        // this.$store.commit('setStates', {k: 'modelId',v: ''});
        this.$store.commit('toUploadModel', false)
      },
      picChange(file) {
        let me = this;
        me.picList = [];
        let reg =  /[A-Za-z0-9_\-]/;
        let r = checkZip(file.name, reg);
        if (r) {
          let zip = new jsZip();
          zip.loadAsync(file.raw).then(one => {
            let _test = Object.keys(one.files);
            let isRight = me.checkSky(_test);
            if (!isRight) {
              me.$message.warning('全景图文件不符合规范');
              return
            }
            me.picList.push({
              name: file.name
            })
            me.ruleForm.skyPic = file.raw;
            me.ruleForm.cameraZipTotalSize = file.size;
            me.$refs.ruleForm.clearValidate('skyPic');
          })
        } else {
          me.$message.warning('文件命名不符合规范或不是zip包');
        }
      },
      checkSky(file) {
        let isRight = true;
        file.forEach(item => {
          if (item.indexOf(',') < 0 || item.indexOf('jpg') < 0) {
            isRight = false;
          } else {
            let name = item.split('.jpg')[0].split(',');
            name.some(item => {
              if (isNaN(Number(item))) {
                isRight = false
              }
            })
          }
        })
        return isRight
      },
      ModelChange(file) {
        let me = this;
        me.modelList = [];
        let reg = /[A-Za-z0-9_\-]/;
        let r = checkZip(file.name, reg);
        if (r) {
          let zip = new jsZip();
          zip.loadAsync(file.raw).then(one => {
            let _test = Object.keys(one.files);
            let isObj = me.checkObj(_test);
            if (!isObj) {
              me.$message.warning('模型文件不符合规范');
              return
            }
            me.modelList.push({
              name: file.name
            })
            me.ruleForm.modelFile = file.raw;
            me.ruleForm.pcObjTotalSize = file.size;
            me.$refs.ruleForm.clearValidate('modelFile');
          })
        } else {
          me.$message.warning('文件命名不符合规范或不是zip包');
        }
      },
      checkObj(file) {
        let isObj = false;
        let reg = /[A-Za-z0-9_\-]/;
        file.forEach(item => {
          if (!reg.test(item.split('.')[0])) {
            return false
          }
          if (item.indexOf('.obj') >= 0) {
            isObj = true
          }
        })
        return isObj
      },
      submitForm() {
        let me = this;
        let {ruleForm} = me.$refs;
        ruleForm.validate(async (validate) => {
          if (validate) {
            try {
              me.canSubmit = true;
              me.disvisible = true;
              let pic = await me.$http.uploadFile({file: me.ruleForm.skyPic});
              let model = await me.$http.uploadFile({file: me.ruleForm.modelFile});
              await me.$http.sceneCreate({
                sceneName: me.ruleForm.name,
                cameraZipPath: pic,
                pcObjZipPath: model,
                pcObjTotalSize: me.ruleForm.pcObjTotalSize,
                cameraZipTotalSize: me.ruleForm.cameraZipTotalSize,
              });
              me.$Ruler.success("上传成功");
              me.close();
            } catch (e) {

            }
            me.disvisible = false;
            me.canSubmit = false;
          }


        })
      },
    },
    watch: {
      '$store.state.isUpload'(val) {
        this.isUpload = val;
      }
    },

  }
</script>

<style scoped lang="scss">
    .uploadModel {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 20;

        .contain {
            width: 500px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 6px 8px 22px 0px rgba(0, 0, 0, 0.3);
            border-radius: 5px;

            > p {
                padding: 20px;
                border-bottom: 1px solid #DDDDDD;
                font-size: 16px;
                color: rgba(51, 51, 51, 1);

            }

            &::v-deep {
                .el-form {
                    margin-top: 30px;
                    padding-left: 20px;
                    padding-right: 40px;
                }

                .upload-demo {
                    button {
                        width: 160px;
                        background: #F6F6F6;
                    }
                }
            }

            .tips {
                padding-left: 40px;
                color: rgba(153, 153, 153, 1);
                line-height: 22px;

                a {
                    color: #19A0F1;
                }
            }

            .footer {
                border-top: 1px solid #E7E7E7;
                padding: 26px 20px;
                margin-top: 36px;
            }
        }
    }
</style>