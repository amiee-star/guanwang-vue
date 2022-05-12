<template>
    <el-dialog :visible.sync="isUploadArticle"
               :fullscreen="false"
               :modal="true"
               custom-class="uploadVideo"
               :show-close="true"
               width="800px"
               :before-close="onbeforeClose"
               :close-on-click-modal="false">
        <div class="nav">
            <span class="active">添加文章</span>
        </div>
        <el-form :model="materialUp"
                 :rules="rules"
                 ref="materialUp"
                 @submit.native.prevent
                 class="content"
                 label-width="100px">
            <el-form-item label="文章标题：" prop="name">
                <el-input v-model="materialUp.name" placeholder="请输入文章标题(1-32个字符)" minlength="1" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="文章内容：" prop="content">
                <editor ref="editor" :data="materialUp.content" @contentChange="contentChange"/>
            </el-form-item>
        </el-form>
        <div class="dialog-footer flex-end">
            <div class="handleBtn">
                <el-button :disabled="isCanUploadMaterial" type="primary" @click="uploadMaterial">确认上传
                </el-button>
                <el-button @click="onbeforeClose()">取 消</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    import editor from "@/components/materialManage/editor";
  export default {
    name: "uploadArticle",
    props: ["isUploadArticle", "id"],
    data() {
      return {
        materialUp: {
          name: "",
          content: ""
        },
        rules: {
          name: [
            {required: true, message: '请输入文章标题', trigger: 'blur'},
          ],
          content: [
            {required: true, message: '请输入文章内容', trigger: 'blur'},
          ]
        },
        isCanUploadMaterial: false
      }
    },
    components: {
      editor
    },
    methods: {
      onbeforeClose(val) {
        let me = this;
        me.$refs.materialUp.resetFields();
        me.$refs.materialUp.clearValidate();
        me.$emit('closeDialog', typeof val == "boolean" ? true : false)
      },
      async uploadMaterial() {
        let me = this;
        me.isCanUploadMaterial = true;
        try {
          me.materialUp.content = me.$refs.editor.getHtml();
          await me.$refs.materialUp.validate();
          let obj = {
            title: me.materialUp.name,
            content: me.materialUp.content
          }
          if (me.id) {
            obj['newsId'] = me.id;
            await me.$http.updArticle(obj)
          } else {
            await me.$http.saveArticle(obj)
          }
          me.onbeforeClose(true)
        }catch (e) {
          console.log(e);
        }
        me.isCanUploadMaterial = false;
      },
      contentChange(val) { // 清除验证
        if (val) {
          let me = this;
          me.$refs.materialUp.clearValidate('content');
        }
      }
    },
    watch: {
      async isUploadArticle(val) {
        let me = this;
        if (val && me.id) {
          let info = await me.$http.mediaInfo({
            newsId: me.id
          })
          me.materialUp = {
            name: info.title,
            content: info.content
          }
        }
      }
    }

  }
</script>
