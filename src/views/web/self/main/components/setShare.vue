<template>
    <div class="setShare flex-center-column">
        <div class="box">
            <ul v-show="setShare" class="flex">
                <li>
                    <div class="flex">
                        <p class="title">海报</p>
                        <p class="flex">
                            <span class="flex-center-column" @click.stop="changeDrawn(-1)"><i class="el-icon-arrow-left"></i></span>
                            <span class="flex-center-column" @click.stop="changeDrawn(1)"><i class="el-icon-arrow-right"></i></span>
                        </p>
                    </div>
                    <div class="card" @click="downLoad()">
                        <canvasCard ref="canvasCard"></canvasCard>
                        <div class="downCard flex-center-column">
                            <div class="flex-center-column" v-if="!shareInfo.billPath">
                                <i class="el-icon-loading"></i>
                            </div>
                            <div v-else class="code">
                                <img :src="shareInfo.billPath">
                            </div>
                            <p>扫码下载到手机</p>
                            <el-button @click.stop="downLoad()">下载到电脑</el-button>
                        </div>
                    </div>
                </li>
                <li>
                    <p class="title">分享设置</p>
                    <div class="shareMsg flex">
                        <div class="flex-center-column img" @click.stop="setShare=false">
                            <img :src="shareInfo.img">
                            <p>更换封面</p>
                        </div>
                        <div class="text">
                            <el-input
                                    type="text"
                                    maxlength="48"
                                    v-model="shareInfo.title"
                                    show-word-limit @change="drawn">
                            </el-input>
                            <el-input
                                    type="textarea"
                                    resize="none"
                                    maxlength="60"
                                    v-model="shareInfo.desc"
                                    rows="2"
                                    show-word-limit @change="drawn">
                            </el-input>
                        </div>
                    </div>
                    <ul class="linkShare flex">
                        <li>
                            <p class="smallTitle">扫码分享：</p>
                            <div>
                                <img :src="shareInfo.code">
                            </div>
                            <p>微信扫一扫分享</p>
                        </li>
                        <li>
                            <p class="smallTitle">链接分享：</p>
                            <p class="platform flex-start">
                                <span class="flex-center-column" @click.stop="toShare(item)" v-for="(item, index) in shareIcon" :key="index">
                                   <svg-icon :icon-class="item.icon"></svg-icon>
                                </span>
                            </p>
                            <p>
                                <el-input
                                        type="text"
                                        v-model="shareInfo.shareLink"
                                        show-word-limit>
                                </el-input>
                                <span v-if="isCopy" class="copyed flex-center"><i class="el-icon-circle-check"></i>链接已复制</span>
                                <el-button id="shareLink" @click="copy">复制</el-button>
                            </p>
                        </li>
                    </ul>
                    <div class="down">
                        <el-button @click="closeShare">取消</el-button>
                        <el-button type="primary" @click="saveShare">保存</el-button>
<!--                        <p class="smallTitle">海报：</p>-->
<!--                        <el-popover-->
<!--                                popper-class="popper_share"-->
<!--                                placement="top"-->
<!--                                width="186"-->
<!--                                @hide="shareInfo.billPath=''"-->
<!--                                trigger="click">-->
<!--                            <div class="bill">-->
<!--                                <div class="flex-center-column" v-if="!shareInfo.billPath">-->
<!--                                    <i class="el-icon-loading"></i>-->
<!--                                </div>-->
<!--                                <img v-else :src="shareInfo.billPath">-->
<!--                                <p>扫一扫，海报下载到手机</p>-->
<!--                            </div>-->
<!--                            <el-button slot="reference" @click.stop="downBill">下载到手机</el-button>-->
<!--                        </el-popover>-->
<!--                        <el-button @click.stop="downLoad()">下载到电脑</el-button>-->
                    </div>
                    <div class="warning">
                        如发现内容不符合<span>「审核规范」</span>，将关闭展厅的访问权限！
                    </div>
                </li>
            </ul>
            <div v-show="!setShare" class="imgs">
                <p>
                    <span :class="{active: tabIndex==index}" v-for="(item,index) in tab" :key="index" @click.stop="tabs(index)">{{item}}</span>
                </p>
                <ul v-if="tabIndex==0" class="flex-start-top default">
                    <li v-if="shareInfo.mobileThumbnail" class="flex-start">
                        <span>手机端：</span>
                        <img :class="{checked: materialIndex ==0}" :src="shareInfo.mobileThumbnail" @click.stop="checkImg(0,shareInfo.mobileThumbnail)"/>
                    </li>
                    <li class="flex-start-top">
                        <span>电脑端：</span>
                        <img :class="{checked: materialIndex ==1}" :src="shareInfo.thumbnail" @click.stop="checkImg(1,shareInfo.thumbnail)"/>
                    </li>
                </ul>
                <div v-if="tabIndex==1">
                    <ul class="flex-wrap-start tags" :style="{height: isMore?'auto':'55px'}">
                        <li>标签：</li>
                        <li class="flex-wrap-start">
                            <span class="tag" :class="{active: tagIndex==index}" v-for="(item, index) in picTags" :key="index" @click="changeTag(index,item)">{{item.name}}</span>
                        </li>
                        <li @click="moreTag">
                            <i :style="isMore?'transform: rotateZ(-180deg);':''" class="el-icon-arrow-down"></i>
                        </li>
                    </ul>
                    <ul class="flex-wrap-start materialList">
                        <li class="flex-center-column" :class="{active: materialIndex==index}" v-for="(item,index) in materialList" :key="index" @click.stop="checkImg(index,item.picPath)">
                            <img :src="item.picPath ? fileHost + item.picPath : require('@/assets/images/self/logo-hui.png')" :class="item.picPath ? '' : 'defaultImg'"/>
                        </li>
                    </ul>
                    <el-pagination
                            v-if="total>24"
                            @current-change="handleCurrentChange"
                            :current-page.sync="pageNum"
                            :page-size="24"
                            :background="true"
                            layout="total, prev, pager, next"
                            :total="total">
                    </el-pagination>
                </div>
            </div>
            <p class="popClose" @click.stop="closeShare">
                <i class="el-icon-close"></i>
            </p>
        </div>
        <imgCut v-if="isCut" :imgPath="imgPath" @close="closeImg"/>
    </div>
</template>

<script>
  import imgCut from "./imgCut";
  import share from "@/config/share";
  import canvasCard from "@/components/canvas-card/canvas-card";
  import Clipboard from 'clipboard';
  export default {
    name: "setShare",
    props: ['tempid'],
    data() {
      return{
        hallData: {},
        isCut: false,
        setShare: true,
        tab: ['展厅封面', '我的素材'],
        tabIndex: 0,
        tagIndex: 0,
        materialIndex: 0,
        materialList: [],
        imgPath: require('@/assets/images/case/beer.jpg'),
        shareIcon: [{icon:'lang',type:"sinaWeiBo"}, {icon:'qq',type:"shareQQ"}, {icon:'space',type:"shareToQzone"}],
        picTags: [],
        tagId: '',
        pageNum: 1,
        total: 0,
        isCopy: false,
        isMore: false,
        shareInfo: {},
          fileHost: process.env.VUE_APP_pdfHost,
      }
    },
    components: {
      imgCut,
      canvasCard
    },
    computed: {
      userinfo() {
        return this.$store.state.userinfo
      }
    },
    methods: {
      closeImg(data) {
        let me = this;
        me.isCut = false;
        if (typeof data == "string") {
          let fileResource = me.convertBase64UrlToBlob(data)
          let file = new File([fileResource], "base64Image.png", {
            type: "image/png"
          });
          let form = new FormData();
          form.append('file ', file)
          this.$http.uploadFile(form).then(res => {
            me.shareInfo.img = res;
            me.drawn()
          })
          me.setShare = true;
        }

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
      checkImg(index,path) {
        let me = this;
        me.materialIndex = index;
        me.imgPath = path;
        me.isCut = true;
      },
      tabs(index) {
        this.tabIndex = index;
      },
      getMyMaterial(page) {
        let me = this;
        me.$http.getMyMaterial({
          token: me.userinfo.token,
          pageNum: page,
          pageSize: 24,
          fileType: 1,
          tagId: me.tagId
        }).then(res => {
          me.materialList = res.list;
          me.total = res.count
        })
      },
      closeShare() {
        if (!this.setShare) {
          this.setShare = true; // 素材页面回到分享设置
        } else {
          this.$emit('close') // 分享设置关闭弹窗
        }

      },
      changeTag(index,item) {
        this.tagIndex = index;
        this.tagId = item.tagId;
        this.pageNum = 1;
        this.getMyMaterial(1)
      },
      handleCurrentChange(page) {
        this.page = page;
        this.getMyMaterial(page)
      },
      toShare(item) {
        let link = this.shareInfo.shareLink,
          desc = this.shareInfo.desc,
          img = this.shareInfo.img
        share[item.type] && share[item.type](link, desc, img);
      },
      drawn() {
        let info = {...this.hallData};
        let shareInfo = this.shareInfo;
        info.name = shareInfo.title;
        info.description = shareInfo.desc;
        info.qrcodeUrl = this.$http.getQRcodeFile + info.tempId;
        info.thumbnail = shareInfo.img
        info.qrcodeUrl = shareInfo.code
        if (info._thumbnail) {
          info.thumbnail = "https://oss.3dshichuang.com/pictures/c4d262f6-5259-7952-cfb8-6f93abc23896.png";
        }
        this.$refs.canvasCard.setData(info);
      },
      async changeDrawn(dir){
        await this.$refs.canvasCard.change(dir);
        if (this.shareInfo.billPath) {
          this.shareInfo.billPath = "";
          let time = setTimeout(() => {
            this.downBill();
            clearTimeout(time)
          }, 2000)

        }

      },
      downLoad(){
          let a = document.createElement("a");
          a.setAttribute("download","3dshichuang.png");
          a.href = this.$refs.canvasCard.exportBase();
          a.click();
      },
      saveShare() {
        let me = this;
        // me.drawn();
        if (me.shareInfo.title == "" || me.shareInfo.desc == "") {
          me.$message({
            type: 'warning',
            message: '标题或者介绍不能为空'
          })
          return
        }
        me.$http.setShare({
          tempid:  me.tempid,
          image: me.shareInfo.img,
          title: me.shareInfo.title,
          desc: me.shareInfo.desc,
        }).then(res => {
          me.closeShare();
        })
      },
      downBill() {
        let me = this;
        let file = me.$refs.canvasCard.exportFile();
        me.$http.uploadQRCode({file}).then(res => {
          me.shareInfo.billPath = 'data:image/png;base64,' + btoa(
            new Uint8Array(res)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
        })
      },
      copy() {
        this.isCopy = true;
        let clipboard = new Clipboard('#shareLink', {
          text: () => {
            return this.shareInfo.shareLink
          }
        })
        clipboard.on('success', e => {
          let time = setTimeout(() => {
            this.isCopy = false;
            clearTimeout(time)
          },2000)

          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },
      moreTag() {
        this.isMore = !this.isMore;
      }
    },
    created() {
      let me = this;
      me.getMyMaterial();
      me.$http.getPictureTags().then(res => {
        me.picTags = res;
        me.picTags.unshift({
          name: '全部',
          tagId: ''
        })
      })
      me.$http.getSceneInfo(me.tempid).then(res => {
        let url = me.$utils.getArtViewUrl({G_TEMP_ID: me.tempid},location.origin)
        me.hallData = res;
        me.shareInfo = {
          title: me.hallData.sceneShare && me.hallData.sceneShare.title || me.hallData.name || '',
          desc: me.hallData.sceneShare && me.hallData.sceneShare.desc || me.hallData.description || '',
          img: me.hallData.sceneShare && me.hallData.sceneShare.image || me.hallData.thumbnail,
          code: me.$http.generateQRCode + encodeURIComponent(url),
          shareLink: url,
          mobileThumbnail: me.hallData.mobileThumbnail,
          thumbnail: me.hallData.thumb,
          billPath: ''
        }
        me.drawn();
        let time = setTimeout(() => {
          me.downBill();
          clearTimeout(time)
        }, 4000)
      })
    },
    mounted(){
        // this.drawn();
    }
  }
</script>

<style scoped lang="scss">
    .setShare{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0,0,0,0.7);
        z-index: 9999;
        .box{
            width:1000px;
            min-height:634px;
            max-height: 80%;
            background:rgba(255,255,255,1);
            border-radius:5px;
            padding: 40px;
            position: relative;

            >ul{
                .title{
                    font-size:22px;
                    color:rgba(51,51,51,1);
                }
                .smallTitle{
                    color: #333333;
                    margin-bottom: 15px;
                }
                .platform{
                    margin-bottom: 25px;
                    span{
                        width:32px;
                        height:32px;
                        background:rgba(255,255,255,1);
                        border:1px solid rgba(231,231,231,1);
                        border-radius: 50%;
                        /*color: #56b6e7;*/
                        margin-right: 10px;
                        cursor: pointer;
                        .svg-icon{
                            font-size: 20px;
                        }
                        &:hover{
                            border-color: #12B7F5;
                        }
                        &:first-of-type:hover{
                            border-color: #FA3F3F;
                        }
                        &:last-of-type:hover{
                            border-color: #FDBE3D;
                        }
                    }
                }
                >li:first-of-type{
                    width: 350px;
                    height: 100%;
                    border-right: 1px solid #E7E7E7;
                    padding-right: 30px;
                    div{
                        span{
                            width: 26px;
                            height: 26px;
                            background:rgba(231,231,231,1);
                            border-radius:50%;
                            cursor: pointer;
                            &:hover{
                                background: #19A0F1;
                                color: #fff;
                            }
                            &:first-of-type{
                                margin-right: 12px;
                            }
                        }
                    }
                    .card{
                        width:100%;
                        height:515px;
                        border: 1px solid #f0f0f0;
                        margin-top: 20px;
                        cursor: pointer;
                        position: relative;
                        &:hover{
                            .downCard{
                                display: flex;
                            }
                        }
                        .downCard{
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            background:rgba(0,0,0,0.8);
                            display: none;
                            >p{
                                color:rgba(255,255,255,1);
                                margin-top: 18px;
                                margin-bottom: 47px;
                            }
                            button{
                                background: none;
                                font-size:14px;
                                color:rgba(255,255,255,1);
                            }
                            .code{
                                width:180px;
                                height:180px;
                                background:rgba(255,255,255,1);
                                padding: 10px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            i{
                                font-size: 20px;
                                color: #fff;
                            }
                        }
                    }
                }
                >li:nth-of-type(2){
                    width: calc(100% - 350px);
                    padding-left: 30px;
                    .shareMsg{
                        margin-top: 20px;
                        .img{
                            width:120px;
                            height:120px;
                            position: relative;
                            /*overflow: hidden;*/
                            margin-right: 15px;
                            cursor: pointer;
                            img{
                                width: 100%;
                                height: 100%;
                                object-fit: contain;
                            }
                            p{
                                width: 100%;
                                height:29px;
                                line-height: 29px;
                                text-align: center;
                                background:rgba(0,0,0,0.5);
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                color: #FFFFFF;
                                &:hover{
                                    color:rgba(9,201,255,1);
                                }
                            }
                        }
                        .text{
                            width: 403px;
                            &::v-deep{
                                .el-input{
                                    height: 36px;
                                }
                                .el-textarea{
                                    height: 68px;
                                    margin-top: 16px;
                                }
                                .el-input__inner,.el-textarea__inner{
                                    color: #333333;
                                    font-family: Arial;
                                    height: 100%;
                                }
                                .el-input.is-active .el-input__inner, .el-input__inner:focus,.el-textarea__inner:focus{
                                    border-color: #19A0F1;
                                }
                            }
                        }
                    }
                    .linkShare{
                        margin-top: 29px;
                        li:first-of-type{
                            >div{
                                width:140px;
                                height:140px;
                                padding: 10px;
                                background:rgba(255,255,255,1);
                                border:1px solid rgba(231,231,231,1);
                                img{
                                    width: 100%;
                                    height: 100%;
                                }

                            }
                            p:last-of-type{
                                color: #999999;
                                margin-top: 5px;
                                text-align: center;
                            }
                        }
                        li:last-of-type{
                            width: 370px;
                            margin-left: 30px;

                            button{
                                background: none;
                                color: #666666;
                                border-color: #DDDDDD;
                                &:hover{
                                    border-color: #19A0F1;
                                    color: #19A0F1;
                                }
                            }

                            &::v-deep .el-input{
                                width:293px;
                                margin-right: 5px;
                                .el-input__inner{
                                    background:#F6F6F6;
                                    border-radius:3px;
                                    border-color: rgba(231,231,231,1);
                                }

                            }
                            p{
                                position: relative;
                            }
                            .copyed{
                                width:116px;
                                height:30px;
                                background:rgba(0,0,0,0.7);
                                color: #fff;
                                border-radius:3px;
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                transform: translate(-50%,-50%);
                                align-items: center;
                                i{
                                    margin-right: 5px;
                                }
                            }
                        }
                    }
                    .down{
                        button{
                            width:120px;
                            height:42px;
                            border-radius:3px;
                        }
                        margin-top: 50px;
                        /*::v-deep.el-button--primary{*/
                        /*    background: #19A0F1;*/
                        /*    border-color: #19A0F1;*/
                        /*}*/
                        /*button{*/
                        /*    color: #fff;*/
                        /*    font-size:16px;*/
                        /*    width:120px;*/
                        /*    height:42px;*/
                        /*    background:rgba(255,90,95,1);*/
                        /*    border-radius:3px;*/
                        /*    border: none;*/
                        /*    &:hover{*/
                        /*        background: #F03A40;*/
                        /*    }*/
                        /*}*/
                        /*>button{*/
                        /*    background:rgba(48,49,51,1);*/
                        /*    margin-left: 15px;*/
                        /*    &:hover{*/
                        /*        background: #000;*/
                        /*    }*/
                        /*}*/
                    }
                    .warning{
                        width:539px;
                        height:44px;
                        line-height:44px;
                        text-align: center;
                        background:rgba(255,250,239,1);
                        border-radius:0px 0px 5px 5px;
                        margin: 36px auto 0;
                        color: #FF6700;
                        span{
                            color: #BB5001;
                        }
                    }
                }
                >li{
                    cursor: default;
                }
            }
            .imgs{
                >p{
                    font-size: 22px;
                    color:#999999;
                    border-bottom: 1px solid #EEEEEE;
                    padding-bottom: 20px;
                    /*margin-bottom: 30px;*/
                    span{
                        cursor:pointer;
                        &:first-of-type{
                            margin-right: 18px;
                            &::after{
                                content: '|';
                                margin-left: 18px;
                                color:#DDDDDD;
                            }
                        }
                    }
                }
                .active{
                    color: #333333;
                }
                .default{
                    margin-top: 25px;
                    >li{
                        cursor: pointer;
                        width: 50%;
                        height: 90%;
                        &:first-of-type{
                            margin-right: 40px;
                        }
                        >span{
                            min-width: 70px;
                        }
                        img{
                            vertical-align: text-top;
                            border:2px solid transparent;
                            max-width: 70%;
                            object-fit: contain;
                            max-height: 100%;
                            &:hover{
                                border-color:rgba(9,201,255,1);
                            }
                        }
                        .checked{
                            border-color:rgba(9,201,255,1);
                        }
                    }
                }
                .tags{
                    border-bottom: 1px solid #EEEEEE;
                    height: 55px;

                    overflow: hidden;
                    li{
                        margin-top: 15px;
                        &:first-of-type,&:last-of-type{
                            padding: 5px 8px;
                            color: #999;
                            i{
                                transition: 0.3s linear;
                            }
                        }
                        &:nth-of-type(2){
                            width: 90%;

                        }


                    }
                    .tag{
                        margin-left: 22px;
                        color: #333;
                        padding: 5px 8px;
                        margin-bottom: 5px;
                        &:hover{
                            background: #EEEEEE;
                            color: #333;
                        }
                    }
                    .active{
                        background: #222;
                        color: #fff;
                    }
                }
                .materialList{
                    margin-top: 20px;
                    max-height: 420px;
                    overflow-y: auto;
                    >li{
                        width:137px;
                        height:137px;
                        margin-right: 15px;
                        margin-bottom: 15px;
                        cursor: pointer;
                        border: 2px solid #eee;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &:hover{
                            border-color:rgba(9,201,255,1);
                        }
                        &:nth-of-type(6n) {
                            margin: 0;
                        }
                        img{
                            max-width: 100%;
                            max-height: 100%;
                        }
                        .defaultImg {
                            width: 100px;
                        }
                    }
                    .active{
                        border-color:rgba(9,201,255,1);
                    }
                }
                ::v-deep{
                    .el-pagination{
                        margin-top: 40px;
                        button,.number{
                            background: #fff!important;
                            border:1px solid rgba(238,238,238,1);
                            color: #999999;
                        }
                        .active{
                            background: #23B8FF!important;
                            color: #fff;
                        }
                    }
                }
            }
            .popClose{
                position: absolute;
                right: -13px;
                top: -13px;
            }


        }

    }
</style>
<style lang="scss">
    .popper_share{
        padding: 0;
        z-index: 2020!important;
        .bill{
            padding: 11px;
            >div{
                width:164px;
                height:164px;
                i{
                    font-size: 20px;
                }
            }
            img{
                max-width: 100%;
            }
            p{
                margin: 7px 0;
                color:rgba(51,51,51,1);
            }
        }
    }
</style>
