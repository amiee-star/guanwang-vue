<template>
    <div class="payment">
        <el-dialog :visible.sync="visible"
                :modal="true"
                :close-on-click-modal="false"
                :customClass="`payment-wrap  ${steps[step]}`"
                @close="closeDialog"
                @open="onOpen(true)"
                >
            <template v-if="step==steps.scan">
                 <div class="title">扫码快捷支付</div>
                <div class="content">
                    <div class="code-w">
                        <ul class="nav">
                            <li :class="{active:platform==pays.zhifubao}" @click="changeType(pays.zhifubao)"><svg-icon iconClass="pay-zfb"></svg-icon></li>
                            <li :class="{active:platform==pays.weixin}" @click="changeType(pays.weixin)"><svg-icon iconClass="pay-wx"></svg-icon></li>
                        </ul>
                        <div class="qr">
                            <div class="price" v-if="params.price">&yen; {{params.price}}</div>
                            <div class="qr-img" >
                                <img :src="info.code_url" alt="" v-if="info.code_url">
                                <div class="overdate" v-show="isOverDate">二维码已过期<span @click="onOpen()">刷新</span></div>
                            </div>
                            <div class="protocol">
                                <a href="/protocol/pay" target="__blank">购买协议</a>
                            </div>
                        </div>
                    </div>
                    <ul class="effical">
                        <li>
                            <img src="@/assets/images/self/duigou.png" alt="">3D数字展厅1年使用权限
                        </li>
                        <li>
                            <img src="@/assets/images/self/duigou.png" alt="">支持GIF、视频素材布置展厅
                        </li>
                        <li>
                            <img src="@/assets/images/self/duigou.png" alt="">支持展厅背景音乐自定义
                        </li>
                        <li>
                            <img src="@/assets/images/self/duigou.png" alt="">支持素材添加解说配音
                        </li>
                        <li>
                            <img src="@/assets/images/self/duigou.png" alt="">支持展厅整体色调模板选择
                        </li>
                        <li>
                            <img src="@/assets/images/self/duigou.png" alt="">支持单素材添加画框
                        </li>
                        <li>
                            <img src="@/assets/images/self/duigou.png" alt="">支持展厅封面自定义
                        </li>
                        <li>
                            <img src="@/assets/images/self/duigou.png" alt="">支持多设备访问、分享
                        </li>
                    </ul>                
                </div>
                
            </template>
            <template v-if="step==steps.wating">
                 <div class="title">扫码快捷支付</div>
                <div class="loading">
                    <p class="ant-custom-rotate"><svg-icon iconClass="loading"></svg-icon></p>
                </div>
                <div class="desc">请稍等，正在处理中...</div>
                <div class="hint">如长时间没有反应，请刷新您的个人空间</div>
            </template>
            <template v-if="step==steps.success">
                <div class="title">
                    <svg-icon iconClass="success"></svg-icon><template v-if="info.outTradeNo">{{platform == pays.weixin ? "微信":"支付宝"}}</template>支付成功！
                </div>
                <div class="desc">感谢您选择3d云展数字展厅服务</div>
                <div class="btns">
                    <el-button size="small" @click="payOther()">选购其它模板</el-button><el-button size="small" type="primary" class="confirm" @click="toEditor()">进入展厅编辑</el-button>
                </div>
            </template>
            <template v-if="step==steps.fail">
                <div class="title">
                    <svg-icon iconClass="fail"></svg-icon>支付失败！
                </div>
                <div class="desc">请重新尝试支付</div>
                <div class="btns">
                    <el-button size="small" type="primary" class="confirm">继续支付</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import router from "@/router";
import store from "@/store";
export default {
    name:"payment",
    data(){
        return {
             visible: false,
             pays:this.$commConst.PAYPLATFORM,
             platform:this.$commConst.PAYPLATFORM.zhifubao,
             step:"",
             steps:{
                 scan:"scan",
                 wating:"wating",
                 success:"success",
                 fail:"fail"
             },
             params:{},
             info:{},
             payState:"",
             PAYSTATE:this.$commConst.PAYSTATE,
             isOverDate:false,
             createTs:0
        }
    },
    computed:{
        userinfo(){
            return store.state.userinfo
        }
    },
    methods:{
        closeDialog () {
            this.$emit('close',"cancel");
            this.visible = false;
            this._promise &&  this._promise.resolve("cancel");
            this.info = {};
            this.step = "";
            this.isOverDate = false;
        },
         async onOpen(init){
            this.info = {};
            this.isOverDate = false;
            let res;
            try{
                res = await this.$http.payQrCode({
                 platform :this.platform,
                    ...this.params
                });
            }catch(e){
                // 如果报错，则不要出现
                if(init){
                    this.closeDialog();
                }
                return ;
            }
            
             if(res.outTradeNo && res.code_url){
                this.step = this.steps.scan;
                this.info = res;
                this.createTs = Date.now();
                this.query(res.outTradeNo);
             }else{
                 this.step = this.steps.success;
                 this.info = {
                     tempid:res
                 }
             }
            // outTradeNo code_url
            
        },
        changeType(typ){
            if(this.platform == typ){
                return ;
            }
            this.platform = typ;
            this.onOpen();
        },
        async query(outTradeNo){
            // 查询支付结果, 可以通过改变 this.info.outTradeNo 来结束之前的递归任务
            if(this.visible && this.info.outTradeNo === outTradeNo){
                // 3600000
                if(this.createTs + 3600000 < Date.now()){
                    // 超过了一个小时
                    this.isOverDate = true;
                    return ; 
                }
                let res = await this.$http.payQuery({
                    outTradeNo : outTradeNo ,
                    platform : this.platform
                });
                let PAYSTATE = this.PAYSTATE;
                if(res.status === PAYSTATE.notpay || res.status === PAYSTATE.waiting){
                    if(res.status === PAYSTATE.waiting){
                        this.step = this.steps.wating;
                    }
                    setTimeout(() => {
                        this.query(outTradeNo);
                    }, 2000);
                }else if(res.status === PAYSTATE.success){
                    this.step = this.steps.success;
                    this.info.tempid = res.tempid;
                }else{
                     this.step = this.steps.fail;
                }
            }
        },
        payOther(){
            if(this.$route.name === "buyTpl"){
                this.closeDialog();
            }else{
                this.$router.push({name:"buyTpl"})
            }
        },
        async toEditor(){
            let me = this;
            let url = await me.$utils.getArtEditorUrl({tempid:me.info.tempid});
            window.open(url,"_blank")
        }

    }
}
</script>
<style lang="scss" scoped  src="./payment.scss"></style>