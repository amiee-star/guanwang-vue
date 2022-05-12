<template>
    <div class="exhibition-set-w" >
   <el-dialog
      :visible.sync="visible"
      :fullscreen="false"
      :modal="true"
      :show-close="true"
      :close-on-click-modal="false"
      custom-class="exhibition-set"
       :before-close="onbeforeClose"
    >
    <div class="nav" slot="title">
        <span class="active">展厅信息设置</span>
    </div>
    
        <el-form
          :model="materialUp"
          :rules="rules"
          ref="materialUp"
          label-width="100px"
          class="demo-ruleForm">
        <div class="content">
            <el-form-item label="展厅标题：" prop="name">
               <el-input v-model="materialUp.name" placeholder="请输入展厅的名称(大于2个字符)"></el-input>
           </el-form-item>
           <el-form-item label="所属行业：" prop="typeId">
               <el-select v-model="materialUp.typeId" placeholder="请选择所属行业">
                    <el-option
                    v-for="item in industrys"
                    :key="item.typeId"
                    :label="item.name"
                    :value="item.typeId">
                    </el-option>
                </el-select>
           </el-form-item>
            <el-form-item label="上传封面：">
                <div class="thumbnail">
                    <div class="pc upimg">
                        <p class="desc desctop">仅限JPG/PNG格式，2MB以内</p>
                        <div class="fileup">
                            <label>
                                <input type="file" @change="pcthumb" accept="image/jpeg,image/png">
                                <div class="hasimg"  v-if="showImg.pcthumb" >
                                    <img :src="showImg.pcthumb" alt="" class="tar">
                                    <div class="cover">
                                        <span>重新上传</span>
                                        <!-- <img class="del"  src="@/assets/images/self/delPic.png" alt="" @click.prevent="delImg('pcthumb')"> -->
                                    </div>
                                </div>
                                <div v-else class="noimg">
                                    <svg-icon iconClass="upimg"></svg-icon><p>上传图片</p>
                                </div>
                            </label>
                        </div>
                        <p class="desc">建议尺寸1600*1000px</p>
                    </div>
                    <div class="moblie upimg">
                        <p class="desc desctop">手机端：</p>
                        <div class="fileup ">
                            <label>
                                <input type="file" @change="mobilethumb" accept="image/jpeg,image/png">
                               
                               <div class="hasimg"  v-if="showImg.mobileThumb" >
                                    <img :src="showImg.mobileThumb" alt="" class="tar">
                                    <div class="cover">
                                        <span>重新上传</span>
                                        <!-- <img class="del"  src="@/assets/images/self/delPic.png" alt="" @click.prevent="delImg('mobilethumb')"> -->
                                    </div>
                                </div>
                               <div v-else class="noimg">
                                    <svg-icon iconClass="upimg"></svg-icon><p>上传图片</p>
                                </div>
                            </label>
                        </div>
                        <p class="desc">1242*2016px</p>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="展厅描述：" prop="discripe">
               <el-input type="textarea" v-model="materialUp.discripe" placeholder="说点什么呢"></el-input>
           </el-form-item>
           <el-form-item label="访问密码：" prop="password" v-show="materialUp.usePwd">
                <el-input v-model="materialUp.password" placeholder="请输入访问密码"></el-input>
            </el-form-item>
        </div>  
        <div class="content">
            <div class="doubleitem">
                <el-form-item label="联系人：" prop="contactName" >
                <el-input v-model="materialUp.contactName" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="电话：" prop="contactPhone">
                <el-input v-model="materialUp.contactPhone" placeholder="请输入电话"></el-input>
                </el-form-item>
            </div>
            <div class="doubleitem weixins">
                <el-form-item label="微信：" prop="wxQrcode">
                    <label class="weixin">
                        <input type="file" @change="wxQrcode" accept="image/jpeg">
                        <span>上传二维码</span>
                    </label>
                    <p v-show="showImg.wxQrcode">
                        <clipImage ref="clipImage" :max="132"></clipImage>
                    </p>
                    <p class="desc" style="font-size:12px;color:#999999;">支持JPG格式</p>
                </el-form-item>
                <el-form-item label="邮箱：" prop="desc">
                    <el-input v-model="materialUp.contactEmail" placeholder="请输入邮箱号码"></el-input>
                </el-form-item>
            </div>
        </div>
        </el-form>
            <div class="bottom" slot="footer">
            <div class="items">加载时显示：<el-checkbox v-model="materialUp.titleFlag">标题</el-checkbox><el-checkbox v-model="materialUp.descFlag">描述</el-checkbox><el-checkbox v-model="materialUp.usePwd">密码</el-checkbox></div>
            <div class="btns">
                <el-button
                type="primary"
                class="submitBtn"
                @click="confirm"
                :disabled="btnDisabled"
                >确认</el-button>
                <el-button @click="visible = false">取 消</el-button>
            </div>
        </div>
    </el-dialog>
    </div>
</template>
<script>
import formRules from "@/config/form-rules.js";
import clipImage from "@/components/clip-image.vue";
export default {
    name:"exhibition-set",
    data(){
        return {
            visible:false,
            materialUp:{},
            showImg:{
                mobilethumb:"",
                pcthumb:"",
                wxQrcode:""
            },
            rules: {
                name:[
                    { required: true,  validator: formRules.sceneName, trigger: "blur" }
                ],
                typeId:[
                    { required: true, message:"所属行业不能为空", trigger: "blur" }
                ],
                contactEmail:[
                     { required: true,  validator: formRules.checkEmail, trigger: "blur" } 
                ]
            },
            industrys:[],
            btnDisabled:false
        }
    },
    components:{
        clipImage
    },
    async mounted(){
        let res = await this.$http.getSceneType();
        this.industrys = res;
    },
    methods:{
        loadImg(file){
           let url = URL.createObjectURL(file);
           return new Promise((resolve,reject)=>{
                let img = new Image();
                img.src = url;
                img.onload = function(){
                    resolve({img,url});
                }
                img.onerror = reject;
           });
       },
        async pcthumb(e){
            var target = e.target.cloneNode();
            e.target.value = '';
            var file  = target.files[0];
            if(file.type !== "image/jpeg" && file.type !== "image/png"){
                this.$message({
                    message: '请选择 jpg 或 png 的图片',
                    type: 'warning'
                });
                return ;
            }

            if(file.size/1024/1024 > 2){
              this.$message({
                message: '请选择 2MB 以内的图片',
                type: 'warning'
              });
              return ;
            }

            this.materialUp.pcthumb = file;
            this.showImg.pcthumb = URL.createObjectURL(file);
        },
        async mobilethumb(e){
            var target = e.target.cloneNode();
            e.target.value = '';
            var file  = target.files[0];
            if(file.type !== "image/jpeg" && file.type !== "image/png"){
                this.$message({
                    message: '请选择 jpg 或 png 的图片',
                    type: 'warning'
                });
                return ;
            }
            if(file.size/1024/1024 > 2){
              this.$message({
                message: '请选择 2MB 以内的图片',
                type: 'warning'
              });
              return ;
            }
            this.materialUp.mobilethumb = file;
            this.$set(this.showImg,"mobileThumb",URL.createObjectURL(file));
        },
        async wxQrcode(e){
            let file = e.target.files[0];
            e.target.value = "";
            if(file.type !== "image/jpeg"){
                this.$message({
                    message: '请选择 jpg 的图片',
                    type: 'warning'
                });
                return ;
            }

            this.showImg.wxQrcode = file.name;
            this.materialUp.wxQrcode = file;
            this.$refs.clipImage.init(URL.createObjectURL(file),{width:200,height:200});
        },
        async confirm(){
            // 确认
            try{
                if(this.$refs.clipImage.hasClip() && this.materialUp.wxQrcode){
                    // 本身就选择了文件，然后又产生了裁剪
                    let wxQrcode = this.materialUp.wxQrcode;
                    this.materialUp.wxQrcode = this.$refs.clipImage.exportFile(wxQrcode.name,wxQrcode.type);
                 }
                await this.$refs.materialUp.validate();
                this.btnDisabled = true;
                let res = await this.$http.sceneSave(this.materialUp);
                this.$emit('close',this.materialUp.tempid)
                this.$message.success("修改成功");
                this.onbeforeClose();
            }catch(e){
                console.log(e);
            }
            this.btnDisabled = false;
        },
        onbeforeClose(next){
           this.visible = false;
           this.$refs['materialUp'].resetFields();
           if(next){
               next();
           }
        },
        async open(item){
            let info = await this.$http.getHallInfo({tempid:item.tempid});
            let contact = info.contact || {};
            this.visible = true;
            let obj = {
                tempid : item.tempid ,
                name : info.name || "",
                typeId :info.typeId || "",
                discripe:info.description || "",
                contactEmail: contact.contactEmail || "",
                contactPhone:contact.contactPhone || "",
                contactName:contact.contactName || "",
                titleFlag:info.titleFlag || false,
                descFlag:info.descFlag || false,
                usePwd:info.usePwd || false,
                password:""

            }
            for(let i in obj){
              if(obj[i] === "null"){
                obj[i] = "";
              }
            }
            this.materialUp = obj;
            this.showImg = {
                mobileThumb:info.mobileThumb,
                pcthumb:info.thumb,
                wxQrcode:contact.wxQrcode
            }
            if(contact.wxQrcode){
                this.$nextTick(()=>{
                    this.$refs.clipImage.init(contact.wxQrcode,{width:200,height:200});
                })
            }
        },
        delImg(key){
            delete this.materialUp[key];
            this.$delete(this.showImg,key);
        }
    }
}
</script>
<style lang="scss" >
.exhibition-set{
    width: 585px;
    margin-top: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .el-dialog__header{
        padding: 0;
        .nav{
            padding-left: 20px;
            color: #333333;
            font-size: 16px;
            font-weight:bold;
            border-bottom: 1px solid rgba(221,221,221,1);
            line-height: 54px;
        }
    }
    .el-dialog__body{
        padding-bottom: 0;
    }
    .content{
        padding: 0 39px;
        .el-select{
            width: 100%;
        }
        .doubleitem{
            display: flex;
            .el-form-item{
                flex: 1;
            }
            &.weixins{
               .el-form-item{
                   margin-bottom: 0;
                } 
            }
        }
        .weixin{
            border:1px solid #DCDFE6;
            border-radius:3px;
            color: #666666;
            padding: 10px 12px;
            cursor: pointer;
        }
        .thumbnail{
            display: flex;
            justify-content: space-between;
            .upimg{
                &.moblie{
                    flex: 1;
                    margin-left: 50px;
                    .fileup{
                        width:74px;
                    }
                }
                &.pc{
                    .fileup{
                        width: 192px;
                    }
                }
                .fileup{
                    border:1px solid rgba(221,221,221,1);
                    border-radius:3px;
                    height: 120px;
                    text-align: center;
                    label{
                        display: block;
                         height: 100%;
                         width: 100%;
                         cursor: pointer;
                    }
                    
                    .noimg{
                        height: 100%;
                        padding-top: 30px;
                        svg{
                            font-size: 24px;
                        }
                        p{
                            line-height: 16px;
                        }
                        &:hover{
                            color: #19A0F1;
                            p{
                                color: #19A0F1
                            }
                        }
                    }
                    .hasimg{
                        height: 100%;
                        width: 100%;
                        position: relative;
                        img.tar{
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                        }
                        .cover{
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            background:rgba(0,0,0,0.5);
                            align-items: center;
                            justify-content: center;
                            display: none;
                            span{
                                color: #fff;
                            }
                            img.del{
                                position: absolute;
                                right: 10px;
                                top: 10px;
                                width: 18px;
                            }
                        }
                        &:hover{
                            .cover{
                                display: flex;
                            }
                        }
                    }
                }
                p{
                    font-size: 12px;
                    color: #999999;
                }
                p.desc{
                    line-height: 30px;
                    &.desctop{
                        margin-top:5px ;
                    }
                }
            }
        }
    }
    div.line{
        height:1px;
        background:rgba(221,221,221,1);
        margin-bottom: 24px;
    }
    .el-dialog__footer{
        border-top: 1px solid #DDDDDD;
        padding: 24px 29px;
        div.bottom{
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #666666;
            .btns{
            .submitBtn{
                background:rgba(35,181,250,1)!important;
                border:1px solid rgba(35,181,250,1);
                &:hover{
                background:rgba(0,163,255,1)!important;
                border:1px solid rgba(0,163,255,1);
                }
            }
            }
            .el-checkbox__label{
            padding-left: 4px;
            }
        }
    }

}
</style>