<template>
    <div class="pay-footer" v-if="showInfo">
         <div class="base-container">
                <div>
                    <div class="thumbnail"><span>已选</span><img :src="info.thumbnail" alt=""></div>
                    <div class="item date">
                        <p class="label">使用期限：</p>
                        <div>
                            <span>{{info._duration}}可创建1个3D数字展厅场景</span>
                        </div>
                        
                    </div>
                    <div class="item code" v-if="info.price > 0">
                        <p class="label">优惠码：</p>
                        <div class="inp" :class="{codeState:codeState !=1}">
                            <el-input :class="txtType" size="mini" v-model="code" :maxlength="6" @change="codeDiscount=0"></el-input>
                            <el-button type="primary" size="mini" :disabled="code.length != 6" @click="useCode" >使用</el-button>
                            <div class="res" v-if="codeState !=1 ">
                                <span class="error" v-if="codeState == 2">抱歉，此优惠码无效！</span>
                                <span class="success" v-if="codeState == 3">验证成功！享受{{(codeDiscount*10).toFixed(1)}}折优惠</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <div class="item discount" v-if="info.discount < 1 && info.price">
                        <p class="label">优惠：</p>
                        <span>{{info._discount}}折优惠</span>
                    </div>
                     <div class="item price">
                        <p class="label">金额：</p>
                        <span class="now">&yen;{{info._price}}</span><span class="normal" v-if="info.price && info.price != info._price">&yen;{{info.price}}</span>
                    </div>
                    <div class="btn" @click="pay">购买</div>
                </div>
            </div>
    </div>
</template>
<script>
export default {
    name:"pay-footer",
    props:{
        selected:{
            type:Object,
            default(){
                return {
                }
            }
        }
    },
   
    watch:{
        selected(){
            this.code = "";
            this.codeDiscount = 0;
            this.codeState = 1;
        },
        code(){
            if(this.code.length==0 || this.code.length<6){
                this.txtType=''
            }
        },
        codeState(){
            if(this.codeState==2){
                this.txtType = 'errorTxt'
            }else if(this.codeState ==3){
                this.txtType="succeTxt"
            }
        }
    },
    computed:{
        info(){
            let obj = {...this.selected};
            if(this.codeDiscount){
                obj.discount  =  obj.discount*this.codeDiscount;
                if(obj.discount < 0){
                    obj.discount = 0;
                    obj._price =  0
                }else{
                    obj._price = (obj.price * obj.discount).toFixed(2);
                }
                obj._discount = (obj.discount * 10).toFixed(1);
                
            }
            return obj;
        },
        showInfo(){
            for(let i in this.selected){
                return true;
            }
            return false;
        }
    },
    data(){
        return {
            txtType:"succeTxt",
            code:"",
            price:this.$commConst.PRICE,
            codeDiscount:0, // 折扣码
            codeState:1 , // 1 未验证， 2 错误， 3 正确
        }
    },
    methods:{
        async pay(){
            if(this.$store.state.userinfo && this.$utils.getUserToken()){
                this.alertPay();
            }else{
                this.$Ruler.account({
                    options: {
                        operate: 0
                    }
                }).then((res)=>{
                   if(res == "ok"){
                       this.alertPay();
                   }
               });
            }
           
        },
        alertPay(){
            this.$Ruler.payment({
                platform:this.$commConst.PAYPLATFORM.zhifubao,
                params:{
                    promotionCode:this.code,
                    tempid : this.info.tempid,
                    price: this.info._price
                }
            });
        },
        async useCode(){
            let me = this;
            try{
                let res = await this.$http.payCheckCode({promotionCode : this.code});
                if(res){
                    me.codeState  = 3;
                    me.codeDiscount = res;
                }else{
                    me.codeState  = 2;
                }
            }catch(e){
                if(e && e.step == 1){
                    me.codeState  = 2;
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped src="./pay-footer.scss"></style>