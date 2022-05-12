<template>
    <div class="contact-us">
        <el-dialog
        :visible.sync="visible"
        :modal="false"
        :show-close="false"
        :close-on-click-modal="false"
        @close="closeDialog"
        class="custom-dialog__wrapper"
       >
            <div class="box">
                <img src="@/assets/images/case/contact-bg.png" alt="" class="bg">
                <img src="@/assets/images/close.png" alt="" class="close" @click="closeDialog">
                <div class="content">
                    <div class="title">联系我们</div>
                    <div class="kefu">
                            <span class="desc">客服电话:</span><span class="tel">400-080-9959</span>
                    </div>
                    <div class="form">
                        <el-form
                        ref="msgForm" 
                        label-width="100px"
                        :model="msgForm"
                        :rules="rules"
                        >
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="msgForm.name"  placeholder="请输入真实姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="微信号" prop="weixn">
                                <el-input v-model="msgForm.wxid" placeholder="请输入微信号"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话" prop="phone">
                                <el-input  v-model="msgForm.phone" placeholder="请输入联系电话"></el-input>
                            </el-form-item>
                            <el-form-item label="留言" prop="content">
                                <el-input type="textarea" 
                                v-model="msgForm.content"
                                placeholder="您的留言非常的宝贵，请在此输入您的需求或意见，我们会尽快与您取得联系！" 
                                maxlength="500"
                                onreseize="none"
                                ></el-input>
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" class="confirm" @click="submit">提交</el-button>
                    </div>
                </div>
            </div>
       </el-dialog>
    </div>
</template>

<script>
import formRules from "@/config/form-rules.js";
export default {
    props:["isvisible"],
    data(){
        var me = this;
        return {
            visible:me.isvisible || false,
            msgForm:{},
            rules:{
                phone: [
                    {required: true, message: '请输入正确手机号码', validator: formRules.checkPhone,trigger: 'blur'},
                ],
                 content: [
                    {required: true, message: '留言不能为空', trigger: 'blur'},
                ]
            }
        }
    },
    methods:{
       closeDialog () {
        this.$emit('close');
        this.visible = false;
        this._promise &&  this._promise.resolve("cancel");
      },
      async submit(){
        var me = this;
        //messageboard
        try{
            await me.$refs["msgForm"].validate();
            await me.$http.messageboard(me.msgForm)
            me.$Ruler.success("留言成功");
            me.closeDialog();
        }catch(e){
            console.log(e);
        }
      }
    },
    watch:{
        visible(val){
            if(val){
                this.msgForm = {};
            }
        },
        isvisible(val){
            if(val){
                 this.msgForm = {};
                 this.visible = val;
            }else{
                this.closeDialog();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.contact-us{
    
    .box{
        height: 560px;
        width: 574px;
        background: #fff;
        position: relative;
        ///margin-left:-25%;
        //left:50%;
        //top:50%;
        img.bg{
            height: 100%;
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 0;
        }
        img.close{
            position: absolute;
            z-index: 10;
            right: 25px;
            top: 25px;
            cursor: pointer;
        }
        .content{
            position: relative;
            padding: 0 65px;
            z-index: 1;
            div.title{
                padding-top: 50px;
                font-size:32px;
                color: #666666;
                text-align: center;
            }
            div.kefu{
                text-align: center;
                padding-top: 20px;
                span.desc{
                    color: #999999;
                    font-size:16px;
                    padding-right: 10px;
                }
                span.tel{
                    color: #23B8FF;
                    font-weight: bold;
                    font-size: 28px;
                    position: relative;
                    top: 4px;
                }
            }

            div.form{
                padding-top: 42px;
                
            }
        }
    }
}
</style>
<style lang="scss">
    .contact-us{
        textarea{
            resize: none;
        }
        .confirm{
            width: 100%;
            margin-top: 20px;
        }
    }
</style>

