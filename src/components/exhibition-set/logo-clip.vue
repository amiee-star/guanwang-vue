<template>
    <div class="image-clip">
        <el-dialog
        :visible.sync="visible"
        :modal="false"
        :close-on-click-modal="false"
        @close="closeDialog"
        class="custom-dialog__wrapper">
            <div class="box">
                <div class="title">修改LOGO</div>
                <div class="img-preview-box ">
                    <div class="preview-content fl">
                        <div class="preview-desc" ref="cropperBox">
                            <img :src="coverUrlCurrent ? coverUrlCurrent: require('@/assets/images/portrait2.png')" ref="cropperImg"
                                class="preview-img-big" >
                        </div>
<!--                        <p class="upload-tips"> 注：支持JPG、PNG格式，图片大小小于2M</p>-->
                    </div>
                    <div class="preview-small fl">
                        <div class="preview-img" ></div>
                        <p class="author-img-txt"> LOGO预览 </p>
<!--                        <button type="primary" class="upload-img" @click ="onUploadUserImg">上传头像</button>-->
<!--                        <input type="file" v-show="false" ref="upload"-->
<!--                                accept="image/jpg,image/png,image/jpeg"-->
<!--                        @change="updataImg">-->
                    </div>
                </div>
                <div class="btns">
                    <el-button type="primary" class="confirm" @click="saveUploadImg"> 保 存 </el-button>
                    <el-button @click="closeDialog">取 消</el-button>
                </div>
            </div>
       </el-dialog>
    </div>
</template>

<script>
import '@/utils/cropper.min.js'
export default {
    props:{
       isvisible:{
           type:Boolean,
           default:false
       },
       coverUrl: {}
   },
    data(){
        return {
            visible:this.isvisible || false,
            coverUrlCurrent: '',
            file:'',
        }
    },
    updated(){
      
    },
    mounted(){

    },
    methods:{
        init(){
            var { cropperImg } = this.$refs;
            $(cropperImg).cropper({
                aspectRatio: '1',
                autoCropArea:0.5,
                preview: '.preview-img',
                responsive:true,
                dragMode : "move"
            });
      },
        closeDialog () {
           
            this.$emit('close');
            this.visible = false;

            this.coverUrlCurrent = '';
            var { cropperImg } = this.$refs;
            $(cropperImg).cropper('destroy');

            this._promise &&  this._promise.resolve("cancel");
        },
        //处理图片
        convertBase64UrlToBlob(urlData){
            var bytes= window.atob(urlData.split(',')[1]);
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
            }
            return new Blob( [ab] , {type : 'image/png'});
        },
        //保存
      saveUploadImg(){
        var that = this;
        var { cropperImg } = that.$refs;
        var canvasData = $(cropperImg).cropper('getCroppedCanvas',{width: that.width,height: that.height},true );
        var dataBase64 = canvasData.toDataURL(); //转成base64
        let fileResource = this.convertBase64UrlToBlob(dataBase64)
        let file = new File([fileResource], "base64Image.png", {
          type: "image/png"
        });

        this.$emit('changeImg',file,dataBase64)
        this.closeDialog();
      },
      //上传图片
      updataImg(file){
          this.file = file;
          this.coverUrlCurrent = this.getObjectURL(file);
          var { cropperImg } = this.$refs;
          $(cropperImg).one('built.cropper').cropper('reset').cropper('replace', this.coverUrlCurrent);
      },
      //获取图片的url
      getObjectURL(file) {
        var url = null ;

        if (window.createObjectURL!=undefined) {
              url = window.createObjectURL(file) ;
          } else if (window.URL!=undefined) {
              url = window.URL.createObjectURL(file) ;
          } else if (window.webkitURL!=undefined) {
              url = window.webkitURL.createObjectURL(file) ;
          }
          return url ;
      },
      onUploadUserImg(){
        var { upload } = this.$refs;
        $(upload).val('');
        upload.click();
      }
    },
    watch:{
        isvisible(val){
            this.coverUrlCurrent = this.coverUrl;
            if(val){
                 this.visible = val;
                 this.$nextTick(()=>{
                   this.init();
                   this.updataImg(this.coverUrl)

                  })
            }else{
                this.closeDialog();
            }
        },
        $route:{
            handler(){
                this.closeDialog();
            },  
            deep:true
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/cropper.css";
.image-clip{
  .custom-dialog__wrapper{
    overflow: hidden;
  }
    div.box{
        width: 500px;
        background: #fff;
        border-radius: 4px;
    }
    div.title{
        padding: 20px 20px 10px;
        color: #333;
        font-size: 18px;
        text-align: center;
    }
    div.img-preview-box{
        overflow: hidden;
        padding: 25px 25px 30px;
        .preview-small{
            text-align: center;
            float: left;

        }
        div.preview-content{
            float: left;
        }
       
    }
    
    div.btns{
            padding: 24px 0;
            border-top: 1px solid #eee;
            text-align: center;
    }
   
  .msg-code{
    width: 216px !important;
  }
  .get-msg-code{
    display: inline-block;
    width: 110px;
    height: 39px;
    background-color: #f1feff;
    border-radius: 3px;
    border: solid 1px #00b0b7;
    font-size: 14px;
    color: #00b0b7;
    text-align: center;
    cursor: pointer;
    margin-left: 9px;
  }
  .get-msg-code:hover{
    background-color: #00B0B7;
    border-color: #00B0B7;
    color:#fff;
  }
  .get-msg-code:active{
    background-color: #00B0B7;
    border-color: #00B0B7;
    color:#fff;
  }
  .get-msg-code.is-disabled{
    background-color: #e8eaed;
    border-color: #e8eaed;
    color: #fff;
  }
  .get-msg-code.is-disabled:hover{
    background-color: #e8eaed;
    border-color: #e8eaed;
  }
  .get-msg-code.is-disabled:active{
    background-color: #e8eaed;
    border-color: #e8eaed;
  }
  .upload-inp{
    display: none;
  }
  .preview-content{
    margin-right: 20px;
  }
  .preview-desc{
    width: 300px;
    height: 300px;
    border: 1px solid #eaeaea;
    text-align: center;
    overflow: hidden;
  }
  .upload-tips{
    font-size: 14px;
    color: #999999;
    padding-top: 18px;
  }
  .preview-img{
    display: inline-block;
    width: 120px;
    height: 120px;
    /*-webkit-border-radius: 50%;*/
    /*-moz-border-radius: 50%;*/
    /*border-radius: 50%;*/
    margin-bottom: 20px;
    border: 1px solid #eee;
    overflow: hidden;
    img{
      width: 100% !important;
      height: 100% !important;
       transform: unset;
    }
  }
  .author-img-txt{
    text-align: center;
    font-size: 14px;
    color: #666666;
    margin-bottom: 101px;
  }
  .upload-img{
    width: 90px;
    height: 36px;
    line-height: 2px;
    padding: 10px 17px;
    background-color: #ffb200;
    border-radius: 3px;
    border-color: #ffb200;
    color: #fefefe;
    font-size: 14px;
  }
  .upload-img:focus,
  .upload-img:hover{
    background-color: #ff9600;
  }
  .upload-img:active{
    background-color: #ffb200;
  }
 
  .preview-img-big{
    width: 100%;
    height: 100%;
  }
}
</style>
