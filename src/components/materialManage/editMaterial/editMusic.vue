<template>
    <div class="uploadMusic">
        <el-dialog
        :visible.sync="isUploadModel"
        :fullscreen="false"
        :modal="true"
        custom-class="comEdit "
        :show-close="true"
        :before-close="onbeforeClose"
        :close-on-click-modal="false"
       >
        <div class="nav">
          <span class="active">修改音乐</span>
        </div>
        <div class="content">
             <el-form
                :model="materialUp"
                :rules="rules"
                ref="materialUp"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="素材名称：" prop="name">
                  <el-input v-model="materialUp.name" placeholder="请输入素材名称(1-15个字符)"></el-input>
               </el-form-item> 
<!--                <el-form-item label="歌手名：" prop="singer">-->
<!--                    <el-input v-model="materialUp.singer" ></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="音频分类" prop="musicTypeId">-->
<!--                    <el-select v-model="materialUp.musicTypeId" placeholder="请选择">-->
<!--                        <el-option-->
<!--                        v-for="item in musicTypes"-->
<!--                        :key="item.musicTypeId"-->
<!--                        :label="item.name"-->
<!--                        :value="item.musicTypeId">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
            </el-form>
        </div>
        <div class="dialog-footer flex">
            <p>
            </p>
            <p>
                <el-button :disabled="isCanUploadMaterial" type="primary" @click="uploadMaterial">确认修改
                </el-button>
                <el-button @click="onbeforeClose()">取 消</el-button>
            </p>
        </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"uploadMusic",
    props:['isUploadModel','edit'],
    data(){
        return {
            materialUp: {
                name: "",
                musicTypeId:"",
                singer:"",
                musicId:""
           },
           rules: {
                name: [{ required: true, message: "素材名称", trigger: "blur" },{min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}],
                musicTypeId:[
                    { required: true, message: "请选择音乐类型", trigger: "blur" }
                ]
            },
            accept:["audio/mp3","audio/mpeg"],
            isCanUploadMaterial:false,
            musicTypes:[]
        }
    },
    watch:{
       edit(val){
           if(val){
               this.materialUp= {
                    name: val.name || "",
                    musicTypeId:val.musicTypeId || "",
                    singer:val.singer || "",
                    musicId:val.musicId || ""
                }

           }
       }
    },
    mounted(){
        this.getMusicType();
    },
    methods:{
      onbeforeClose(val){
        this.$emit("closeDialog",typeof val == "boolean" ? true : false)
      },
      async getMusicType(){
          this.musicTypes = await this.$http.getMusicType();
      },
      async uploadMaterial(){
        let me = this;
         try{
          await this.$refs['materialUp'].validate();
          me.isCanUploadMaterial = true;
          let obj = {...this.materialUp}
           await me.$http.musicEdit(obj)
          me.$refs['materialUp'].resetFields(); // 重置
          me.materialUp.musicId = "";
          me.onbeforeClose(true);
          me.$Ruler.success("修改成功");
        }catch(e){
            console.log("catch" , e)
        }
        me.isCanUploadMaterial = false;
      }
    }
    
}
</script>
<style lang="scss" src="./editCom.scss"></style>
