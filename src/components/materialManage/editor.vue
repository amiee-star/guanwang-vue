<template>
    <div id="editor"></div>
</template>

<script>
  import E from 'wangeditor'
  export default {
    name: "editor",
    props: ['data'],
    data() {
      return {
        editor: ''
      }
    },
    mounted() {
      let me = this;
      me.$nextTick(() => {
        me.editor = new E('#editor');
        me.editor.customConfig.menus = [
          'bold',
          'fontName',  // 字体
          'fontSize',
          'italic',  // 斜体
          'underline',  // 下划线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ];
        me.editor.customConfig.fontSizes = {h1:1,h2:2,h3:3,h4:4,h5:5,h6:6,h7:7}
        me.editor.customConfig.customUploadImg = function (files, insert) {
          // files 是 input 中选中的文件列表
          // insert 是获取图片 url 后，插入到编辑器的方法

          // 上传代码返回结果之后，将图片插入到编辑器中

          me.$http.uploadFile({file: files[0]}).then(res => {
            insert(res)
          })

        }
        me.editor.customConfig.onchange = function (html) {
          me.$emit('contentChange', html)
        }
        me.editor.create();
      })
    },
    methods: {
      getHtml() {
        let html = this.editor.txt.html();
        if (html !== '<p><br></p>') {
          return html
        }

      }
    },
    watch: {
      data(val) {
        let me = this;
        if (val) {
          me.editor.txt.html(val)
        } else {
          me.editor.txt.clear()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
#editor {
  word-break: break-word;
  text-align: justify;
}
</style>