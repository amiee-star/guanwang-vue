<template>
    <div class="uplode-dialog" v-if="isUploadModel">
        <el-dialog :title="title" :width="width" :close-on-click-modal="false" :visible.sync="isUploadModel"
                   :before-close="isFinish ? fullInfoClose : handleDialogClose">
            <!--<el-dialog id="modelForm" title="补充模型资料" width="760px" :close-on-click-modal="false" :visible.sync="isFinish" append-to-body :before-close="fullInfoClose">-->
            <el-progress v-if="isFinish&&!uploadeSuccess" :text-inside="true" :stroke-width="18"
                         :percentage="parseInt(progress)" color="#AAD3F7"></el-progress>
            <el-form v-if="isFinish&&!uploadeSuccess" ref="form" :rules="rules" :model="modelForm"
                     label-width="80px">
                <el-form-item label="模型名称" prop="name">
                    <el-input v-model="modelForm.name" maxlength="15"></el-input>
                </el-form-item>
<!--                <el-form-item label="模型类型" prop="region">-->
<!--                    <el-cascader-->
<!--                            placeholder="请选择分类"-->
<!--                            :options="options"-->
<!--                            filterable-->
<!--                            v-model="modelForm.region"-->
<!--                    ></el-cascader>-->
<!--                </el-form-item>-->
            </el-form>
            <div v-if="isFinish&&!uploadeSuccess" slot="footer" class="dialog-footer">
                <el-button id="uplodeModel_isSuccess" type="primary" @click="submitModelForm('form')"
                           :disabled="!isClickSuccess" :class="isClickSuccess?'isClickSuccess':''">确认上传
                </el-button>
            </div>
            <!--</el-dialog>-->
            <el-upload
                    v-if="!isFinish&&!uploadeSuccess"
                    ref="elUpload"
                    class="upload-demo"
                    action="customize"
                    :http-request="uploadSectionFile"
                    multiple
                    :limit="1"
                    accept=".zip"
                    :file-list="fileList"
                    :auto-upload="false"
                    :on-change="onchange">
                <el-button class="uplodeBtton" ref="uplodeBtton" size="small" type="primary"
                           @click="changeFile()"></el-button>
                <div class="changeTip">
                    <div slot="tip" class="el-upload__tip">上传要求：仅支持zip压缩包，压缩包需小于20MB；</div>
                    <div slot="tip" class="el-upload__tip">模型格式：仅支持obj、fbx、stl、glb、gltf模型格式，面数控制在30w以下，超过平台将自动压缩；</div>
                    <div slot="tip" class="el-upload__tip">
                        贴图要求：支持jpg、png贴图，数量小于16张，请尽量控制分辨率在2048以下，部分高分辨率贴图平台将自动压缩；
                    </div>
                    <div slot="tip" class="el-upload__tip">
                        打包上传：将 .obj 文件 .mtl 文件和所有贴图放在同一个文件夹，将文件夹压缩为ZIP压缩包上传；
                    </div>
                </div>
            </el-upload>
            <div slot="footer" class="dialog-footer" v-if="!isFinish&&!uploadeSuccess">
                <el-button class="submitZip" ref="elButton" type="primary" :disabled='!able' :class="able?'able':''"
                           @click="submitFile()">上传
                </el-button>
                <p class="userDetail" @click="goToDetail">使用说明</p>
            </div>
            <div v-if="uploadeSuccess&&!isFinish" class="changeMargin">
                <div class="uploadeSuccess"><img src="@/assets/images/upload/uploadeSuccess.png"></div>
                <p class="successTips">平台将对您的模型进行预处理，预计花费1-3分钟</p>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="continueFun()">继续上传</el-button>
                    <el-button type="primary" @click="routerLinkTo">完成</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import JsZip from 'jszip';
  import API from "../../../config/api";
  export default {
    name: "uploadModel",
    props: ["isUploadModel"],
    data() {
      return {
        title: "上传新模型",
        width: "760px",
        isFinish: false,
        uploadeSuccess: false,
        isClickSuccess: false,
        able: false,
        doubleClick: false,
        progress: 0,
        filePath: "",
        fileType: 0,
        fileList: [],
        rules: {
          name: [
            {required: true, message: "请输入模型名称", trigger: "blur"},
            {max: 24, message: '名称长度最多24个字符', trigger: 'blur'}
          ],
          region: [
            {type: 'array', required: true, message: "请选择模型类型", trigger: "blur"}
          ]
        },
        modelForm: {
          name: '',
          region: [],
        },
        options: []
      }
    },
    watch: {
      isFinish(val) {
        if (val) {
          this.title = "补充模型资料";
        } else {
          this.title = "上传新模型";
        }
      },
      uploadeSuccess(val) {
        if (val) {
          this.title = "上传成功";
          this.width = "30%";
        } else {
          this.title = "上传新模型";
          this.width = "760px";

        }
      }
    },
    methods: {
      getTypeAllLists() {
        this.$http.getTypeAllLists().then((res) => {
          this.options = JSON.parse(
            JSON.stringify(res).replace(/code/g, 'value').replace(/name/g, 'label').replace(/list/g, 'children'));
        })
      },
      submitFile() {

        this.$refs.elUpload.submit();
        this.$refs.elUpload.clearFiles();
        this.isFinish = true;
        this.able = false;
        let btn = document.querySelector('.uplodeBtton');
        btn.classList.remove('change');
        btn.classList.remove('distroy');
        // this.getTypeAllLists();

      },
      submitModelForm(formName) {
        if (this.doubleClick) {
          return;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.doubleClick = true;
            let typeCode = this.modelForm.region;
            this.$http.upload51ModelInfo({
              modelPath: this.filePath,
              name: this.modelForm.name,
              // typeCode: typeCode[typeCode.length - 1],
              fileType: this.fileType,
            }).then(() => {
              this.uploadeSuccess = true;
              this.isFinish = false;
              this.$refs[formName].resetFields();
              this.modelForm = {
                name: '',
                region: []
              };
              this.doubleClick = false;
              this.filePath = ''
              this.isClickSuccess = false;
            })
          } else {
            return false;
          }
        })

      },

      handleDialogClose() {
        this.changeFile();
        this.isClickSuccess = false;
        this.$emit("closeDialog")
      },

      async uploadSectionFile(param) {
        let file = param.file;
        let token = this.$store.state.modelsToKen
        let progressCallback = {
          onUploadProgress: (data) => {
            let percent = (data.loaded / data.total * 100) || 0
            this.progress = percent;
          },
          headers: {
            "Content-Type": "multipart/form-data;",
            "Authorization": 'token ' + token
          }
        }
        let data = new FormData()  // 创建form对象
        data.append('Content', file)  // 通过append向form对象添加数据
        data.append('SrvType', 'mp');
        this.$http.upload51Model(data, progressCallback).then((res) => {
          this.filePath = res;
          if (this.filePath && this.progress === 100) {
            let progress = document.querySelector('.el-progress-bar__outer');
            progress.classList.add('finish');
            this.isClickSuccess = true;
          }
        })
      },
      onchange(file) {
        let idx = file.name.lastIndexOf(".");
        let type = file.name.substr(idx + 1);
        this.modelForm.name = file.name.substr(0, idx);
        let _obj = Object;
        if (type === "zip") {
          const isLt2M = file.size / 1024 / 1024 < 20;
          if (!isLt2M) {
            // 文件大小超过30M,报错
            this.$message({
              message: '上传文件大小不能超过 20MB!',
              type: 'warning'
            });
          } else {
            let new_zip = new JsZip();
            new_zip.loadAsync(file.raw).then((file) => {
              let _array = _obj.values(file.files);
              let hasObjFile = false;
              for (let i in _array) {
                let name = _array[i].name;
                let index = name.lastIndexOf(".");
                let ext = name.substr(index + 1).toLowerCase();
                if (
                  ext === "obj" ||
                  ext === "fbx" ||
                  ext === "stl" ||
                  ext === "glb" ||
                  ext === "gltf"
                ) {
                  hasObjFile = true;
                  switch (ext) {
                    case "obj":
                      this.fileType = 1;
                      break;
                    case "fbx":
                      this.fileType = 2;
                      break;
                    case "stl":
                      this.fileType = 8;
                      break;
                    case "glb":
                      this.fileType = 9;
                      break;
                    case "gltf":
                      this.fileType = 10;
                      break;
                  }
                }
              }
              if (!hasObjFile) {
                let btn = document.querySelector('.uplodeBtton');
                btn.classList.remove('change');
                btn.classList.add('distroy');

                this.$refs.elUpload.abort();
                this.$refs.elUpload.clearFiles();
                this.$message.error("压缩包不包含obj或者fbx文件！")
              } else {
                this.able = true;
                let btn = document.querySelector('.uplodeBtton');
                btn.classList.add('change');
                btn.classList.remove('distroy');

              }
            })
          }
        } else {
          this.$refs.elUpload.abort();
          this.$refs.elUpload.clearFiles();
          this.$message.error("不是zip文件！")
        }

      },
      goToDetail() {
        window.open('https://www.51jianmo.com/helpWord?id=ca7f54f1-fede-4cfa-5418-585fc963513b ')
        this.$emit("closeDialog")
        // this.toUpload(false);
      },
      changeFile() {
        if (this.$refs.elUpload) {
          this.$refs.elUpload.abort();
          this.$refs.elUpload.clearFiles();
          let btn = document.querySelector('.uplodeBtton');
          btn.classList.remove('change');
          btn.classList.remove('distroy');
        }
        this.able = false;
      },

      fullInfoClose() {
        this.$confirm('当前模型正在上传中，是否确定退出?', '取消上传', {
          confirmButtonText: '确定退出',
          cancelButtonText: '再想想',
          type: 'warning'
        }).then(() => {
          this.$emit("closeDialog",true)
          this.isFinish = false;
          this.uploadeSuccess = false;
          this.isClickSuccess = false;
          this.modelForm = {
            name: '',
            region: []
          };
          let form = this.$refs.form;
          form.resetFields();
        })
      },
      continueFun() {
        this.uploadeSuccess = false;
        this.isFinish = false;
        let form = this.$refs.form;
        if (form) {
          form.resetFields();
        }
        this.modelForm = {
          name: '',
          region: []
        };

      },

      routerLinkTo() {
        this.$emit("closeDialog",true)
        this.uploadeSuccess = false;
        this.isFinish = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
    .uplode-dialog {
        /*.isClickSuccess {*/
        /*    background: #00B0B7;*/
        /*}*/

        .uplodeBtton {
            width: 170px;
            height: 170px;
            border-radius: 50%;
            background: #fff url('~@/assets/images/upload/before_uplode.png');
            border: none;
            background-size: cover;
            position: relative;
            margin: 0 auto;
            display: block;

            &:hover {
                background: #fff url('~@/assets/images/upload/hover_before_uplode.png');
                background-size: cover;

                &:after {
                    content: "选择上传";
                    color: #fff;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%)
                }
            }

            &.change {
                background: #fff url('~@/assets/images/upload/change_uplode.png');
                background-size: cover;

                &:hover {
                    background: #fff url('~@/assets/images/upload/hover_change.png');
                    background-size: cover;

                    &:after {
                        content: "更换文件";
                        color: #fff;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%)
                    }
                }
            }

            &.distroy {
                background: #fff url('~@/assets/images/upload/distroy.png');
                background-size: cover;

                &:hover {
                    background: #fff url('~@/assets/images/upload/hover_distroy.png');
                    background-size: cover;

                    &:after {
                        content: "重新上传";
                        color: #fff;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%)
                    }
                }
            }
        }

        .el-upload__tip {
            font-size: 13px;
            color: #797979;
            line-height: 24px;
            text-align: left
        }

        .dialog-footer {

            position: relative;
            text-align: center;
            width: 100%;
        }

        .submitZip {
            width: 100px;
            height: 40px;
            background: #e6e6e6;
            letter-spacing: 3px;
            border: none;

            &.able {
                background: #19A0F1;
            }
        }

        .userDetail {
            margin-top: 10px;
            line-height: 40px;
            font-size: 14px;
            color: #19A0F1;
            cursor: pointer;

            &::before {
                display: inline-block;
                width: 20px;
                height: 1px;
                content: "";
                background: #19A0F1;
                margin-bottom: 5px;
                margin-right: 3px;
            }

            &::after {
                display: inline-block;
                width: 20px;
                height: 1px;
                content: "";
                background: #19A0F1;
                margin-bottom: 5px;
                margin-left: 3px;
            }
        }

        .uploadeSuccess {
            width: 48px;
            margin: 0 auto
        }

        .successTips {
            text-align: center;
            margin: 15px 0 50px;
        }

        .changeMargin {
            margin-top: 15px;
        }
    }

    .uplode-dialog::v-deep .el-dialog__body {
        /*padding-top: 230px*/
        padding-top: 0 !important;
        padding-left: 0;
        padding-right: 0;
    }

    .uplode-dialog::v-deep .el-form {
        padding-left: 60px;
        padding-right: 60px;
        margin-top: 40px
    }

    .uplode-dialog::v-deep .el-progress-bar__inner {
        border-radius: 0
    }

    .uplode-dialog::v-deep .el-progress-bar__outer {
        border-radius: 0;
        height: 25px !important;

        &:after {
            content: "正在上传...";
            color: #eee;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%)
        }
    }

    .uplode-dialog::v-deep .el-progress-bar__innerText {
        position: relative;
        margin-right: 10px;

        &:after {
            content: "";
            display: block;
            border-top: 4px solid transparent;
            border-bottom: 4px solid transparent;
            border-left: 4px solid #fff;
            position: absolute;
            right: -7px;
            top: 50%;
            transform: translateY(-50%)
        }
    }

    .uplode-dialog::v-deep .el-upload-list__item-name {
        padding-left: 57px;

    }

    .uplode-dialog::v-deep .el-progress-bar__outer.finish:after {
        content: "上传完成";
        color: #eee;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%)
    }

    .uplode-dialog::v-deep .el-cascader {
        width: 100%
    }

    .upload-demo::v-deep .el-upload {
        width: 100%;
    }

    .upload-demo {
        // padding-left: 57px;
    }

    .changeTip {
        margin-top: 25px;
        padding-left: 57px;
    }

</style>