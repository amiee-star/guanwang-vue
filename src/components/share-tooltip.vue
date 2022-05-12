<template>
    <div class="shareToolTip">
        <el-tooltip class="item" effect="light" content="" popper-class="shareBox" placement="top">
            <div slot="content" class="shareTip">
                <div class="qcode-img">
                    <p>二维码分享:</p>
                    <img :src="qrcodeUrl" alt="" v-if="qrcodeUrl"  crossorigin="anonymous" >
                    <p>链接分享:</p>
                    <ul>
                        <li @click="shareLink('weibo')"><img src="@/assets/images/they/weibo.png" /></li>
                        <li @click="shareLink('qq')"><img src="@/assets/images/they/QQ.png" /></li>
                        <li @click="shareLink('qqkongjian')"><img src="@/assets/images/they/QQkongjian.png" /></li> 
                    </ul>
                </div>
            </div>
            <li class="share" @mouseenter="shareQcode=true" >
                <img src="@/assets/images/they/share-btn.png" alt="">
                <img src="@/assets/images/they/share-btn-hover.png" class="hover" alt="">
                    分享
            </li>
        </el-tooltip>
        
    </div>
</template>
<script>
var shareObj = require("@/config/share");
export default {
    props:{
        qrcodeUrl:{
            type:String
        },
        picture:{
            type:String
        },
        name:{
            type:String
        }

    },
    data(){
        return{
            shareQcode:false,
        }
    },
    mounted(){

    },
    methods:{
        shareLink:function(str){
            const that = this;
            let url = window.location.href;
            switch(str){
                case 'weibo' :
                    shareObj.default.sinaWeiBo(url,that.name,that.picture);  //url, title, pic
                break;
                case 'qq' :
                    shareObj.default.shareQQ(url,that.name,that.picture);  //url, title, pic, summary
                break;
                case 'qqkongjian' :
                    shareObj.default.shareToQzone(url,that.name,that.picture);  //url, desc, pic
                break;
            }
        }
    }
    
}
</script>
<style lang="scss">
    .el-tooltip__popper[x-placement^=top] .popper__arrow{
        border-top-color: transparent!important;
    }

    .el-tooltip__popper.is-light{
        border:unset!important;
        box-shadow: 0px 0px 10px #333;
        
    }
    .shareBox{
        width:186px;height: 273px;
        padding:0 16px;
        .shareTip{
            padding-top:11px;
            p{
                text-align:left;
                font-size:14px;
                color:#333;
                margin-bottom:9px;
            }
            .qcode-img{
                >img{
                    width:154px;
                    height:154px;
                    margin-bottom:9px;
                }
                ul{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    li{
                        width:32px;
                        height: 32px;
                        border-radius: 16px;
                        border:1px solid #E7E7E7;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-right:16px;
                        cursor: pointer;
                        
                    }
                }
            }
        }
    }
    .shareToolTip{
        margin: 0 6px;
        li {
            padding: 10px 20px;
            background: #fff;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.35);
            border-radius: 3px;
            background: rgba(255, 255, 255, 0.95);
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #222;
            position: relative;
            cursor: pointer;
            &.share {

                img {
                    display: inline-block;
                }
                img.hover {
                    display: none;
                }
            }
            &:hover{
                color: #23B8FF;
                img.hover {
                    display: inline-block;
                }
                img {
                    display: none;
                }
            }
        }
        
    }
    
</style>