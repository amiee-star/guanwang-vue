<template>
    <div class="dialog-box">
        <el-dialog
          title="文章详情"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleClose">
          <iframe :src="host + '/articleDetail/index.html?id=' + articleId + '%' + Math.floor(Math.random()*100000)" frameborder="0"></iframe>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'selfArticleDetail',
    props: {
        dialogVisible: Boolean,
        articleId: Number
    },
    data() {
        return {
            host: '',
            randomNum: ''
        };
    },
    mounted() {
        this.articleId;
        this.host = process.env.VUE_APP_pdfHost;
    },
    methods: {
        handleClose() {
            this.$emit('isShowDialog', false);
        }
    }
};
</script>
<style lang="scss" scoped src="./article_detail.scss"></style>
