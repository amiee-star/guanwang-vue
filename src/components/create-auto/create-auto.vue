<template>
  <div class="create-auto">
    <el-dialog
      :visible.sync="visible"
      :modal="false"
      :close-on-click-modal="false"
      :before-close="beforeClose"
      @close="closeDialog"
      class="custom-dialog__wrapper"
    >
      <div class="finished" v-if="finished">
          <div class="icon"><img src="@/assets/images/create/finished.png" alt=""></div>
          <p class="text">恭喜！成功创建3D数字展厅</p>
          <div class="btns">
             <el-button type="primary" class="confirm" @click="seeInfo(finished)">查看刚创建的3D展厅</el-button><el-button plain class="plain" @click="toEditor">进入展厅编辑（专家模式）</el-button>
          </div>
          <lineThrought>或</lineThrought>
          <p class="agin" @click="createAgin">再创建一个新的3D展厅</p>
      </div>
      <div class="box onscroll"  v-else>
        <div class="step-wrap" >
          <div class="step-one" v-if="step==1">
            <div class="h1">
              <img src="@/assets/images/create/step1.png" alt />
            </div>
            <screenFilter @change="selctChange"  :showType="false" ref="screenFilter"></screenFilter>
            <ul class="list">
              <li
              v-for="(item,index) in entities" :key="index"
              :class="{'thumbnail-w':item._thumbnail,'active':item.tempid==form.tempid}"
              @click="selectTemp(item)"
              >
                <img :src="item.thumbnail"  alt class="thumbnail" />
                <div class="guankan" @click.stop="guankan(item)"><img src="@/assets/images/create/sanjiao.png" alt="">预览模板</div>
                <p class="name">{{item.tags || ''}}</p>
                <span class="select"><img src="@/assets/images/create/right.png" alt=""></span>
              </li>
            </ul>
            <div class="commonPagina" v-if="total>pageSize">
              <span class="total">共{{total}}个项目</span>
              <el-pagination
                layout="prev, pager, next"
                :total="total"
                :pager-count="5"
                :page-size="pageSize"
                :current-page.sync="currentPage"
                @current-change="getList"
              ></el-pagination>
            </div>
            <div class="bottom">
              <div class="notlike">
                没有找到喜欢的模板？可以拨打
                <span>400-080-9959</span> 客服电话定制空间模板
              </div>
              <el-button type="primary" class="confirm" :disabled="!form.tempid" @click="++step">确认创建</el-button>
            </div>
          </div>

          <div class="steptwo" v-if="step==2">
            <div class="h1">
              <img src="@/assets/images/create/step2.png" alt />
            </div>
            <div class="info">
              <el-form label-width="100px" :model="form" :rules="rules" class="demo-form-inline">
                <el-form-item label="展厅名称：" prop="name" class="sname">
                  <input type="text" placeholder="展厅名称" maxlength="24" v-model="form.name" />
                </el-form-item>
                <el-form-item label="展厅描述：" class="sdesc">
                  <textarea placeholder="说点什么让用户了解展厅（500个字）" maxlength="500" v-model="form.description" class="onscroll"></textarea>
                </el-form-item>
              </el-form>
            </div>
            <div class="bottom">
              <span v-if="parentId"></span>
              <el-button plain @click="--step" v-else>返回</el-button>
              <el-button type="primary" class="confirm" @click="++step" :disabled="!form.name">确认，下一步：选择图片，布置空间</el-button>
            </div>
          </div>

          <div class="stepThree" v-if="step==3">
            <div class="sortmaterial" v-show="material==1">
              <div class="h1">
                <img src="@/assets/images/create/step3.png" alt />
              </div>
              <div class="num">
                可选择图片：
                <span>{{form.canPutCount}}</span>个
              </div>
              <div class="drags onscroll">
                <draggable
                  v-model="form.path"
                  class="step-wrap"
                  draggable=".item"
                  :group="{ name: 'people', pull: 'clone', put: false ,animation:150}"
                  tag="ul"
                  ref="draggable"
                >
                    <li class="item" v-for="(item,index) in form.path" :key="index">
                      <span class="index">{{index+1}}</span>
                      <div class="operate">
                        <span @click="materialDel(item)">
                          <img src="@/assets/images/create/del.png" alt />
                        </span>
                        <span @click="materialClip(item,index)">
                          <img src="@/assets/images/create/clip.png" alt />
                        </span>
                      </div>
                      <div class="img-wrap">
                        <img :src=" item._base || item.picPath" alt draggable="false" crossOrigin="Anonymous" />
                      </div>
                      <frameWin :scale="scales[index]"></frameWin>
                    </li>
                    <li class="add" @click="material=2">
                        <img src="@/assets/images/create/add.png" alt />
                        <p>选择图片素材</p>
                    </li>
                </draggable>

              </div>
               <div class="bottom hasline">
                  <div class="line"></div>
                  <el-button plain @click="--step">返回</el-button>
                  <el-button type="primary" class="confirm" @click="++step" :disabled="!form.path || form.path.length == 0">确定，下一步：选择音乐</el-button>
                </div>
            </div>
            <div class="drag-tip" v-if="dragTip">
              <div class="drag-box">
                  <img src="@/assets/images/create/tip.png" alt />
                  <p>拖动素材的顺序，可改变素材在展厅里的位置</p>
                  <el-button type="primary" class="confirm" @click="closeDragTip" >知道了</el-button>
              </div>
            </div>
            <div class="select-material" v-show="material==2">
              <div class="h1">我的素材</div>
              <div class="num">
                图片：<span>{{form.canPutCount}}</span>个
              </div>
              <div class="drags onscroll" v-infinite-scroll="getMaterial">
                <ul class="step-wrap">
                  <li
                  v-for="(item,index) in materials"
                  :key="index"
                  @click="selectMaterial(item)"
                  >
                      <div class="img-wrap">
                      <img
                        :src="item.picPath"
                        crossOrigin="Anonymous"
                        alt
                      />
                      </div>
                      <span class="select" :class="{selected:cachePtah[item.picId]}"><img src="@/assets/images/create/right.png" alt=""></span>
                  </li>
                </ul>
              </div>
              <div class="bottom ">
                <div class="line"></div>
                <div class="tip"><img src="@/assets/images/create/warn.png" alt=""> 提示：此展厅模板最多支持{{form.canPutCount}}个图片</div>
                <el-button type="primary" class="confirm" @click="material=1" :disabled="!form.path || form.path.length == 0"> 确认选择</el-button>
              </div>
            </div>
          </div>

          <div class="stepfour" v-if="step==4">
              <div class="h1">
                <img src="@/assets/images/create/step4.png" alt />
              </div>
              <div class="num">音乐库</div>
              <div class="classify">
                  <span class="label">分类：</span>
                  <ul>
                    <li
                    :class="{active:form.musicTypeId==item.musicTypeId}"
                    v-for="(item,index) in musicTypes"
                    :key="index"
                    @click="changeMusicType(item.musicTypeId)"
                    >{{item.name}}</li>
                  </ul>
              </div>
              <div class="drags onscroll" v-infinite-scroll="getMusics">
                <ul>
                  <li
                  v-for="(item,index) in musicList"
                  :key="index"
                  :class="{active:form.musicId==item.musicId}"
                  @click="musicClick(item)"

                  >
                    <div class="music">
                        <span class="icon"></span><span>{{item.name}}</span>
                    </div>
                    <span class="select"><img src="@/assets/images/create/right.png" alt=""></span>
                  </li>
                </ul>
              </div>
              <div class="bottom hasline">
                <div class="line"></div>
                <el-button plain @click="--step">返回</el-button>
                <el-button type="primary" class="confirm" @click="createScene" :disabled="submiting">确认选择</el-button>
              </div>
          </div>

          <div class="cropimg">
            <cropImage :isvisible.sync="showCrop" ref="cropImage"></cropImage>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import store from "@/store";
import screenFilter from "@/components/screen-tags-filter.vue";
import router from "@/router";
import lineThrought from "@/components/line-throught.vue";
import draggable from 'vuedraggable';
import Ruler from "@/config/plugin/index";
import frameWin from "./frame-win.vue";
import cropImage from "./crop-image";
export default {

  name: "create-auto",
  props: ["isvisible"],
  data() {
    let audio = new Audio();
    audio.loop = true;
    return {
      showCrop:false, // 展示切图
      visible: this.isvisible || false,
      sceneType: [],
      total: 0,
      pageSize: 8,
      currentPage: 1,
      entities: [],
      search: {},
      rules: {
        name: [{ required: true, trigger: "blur" }]
      },
      materialPage:1,
      materials:[], // 素材列表
      musicTypes:[], // 音乐类型列表
      musicList:[], // 音乐列表
      musicPage:1,
      step: 1,
      finished:null,
      material:1, // 1 拖拽排序，2 选择素材
      dragTip:false, // 拖拽的提示
      form: {
        name:"",
        description:"",
        musicTypeId:"",
        musicId:"",
        tempid:"",
        canPutCount:0,
        path:[]
      },
      scales:[],
      cachePtah:{},
      audio:audio,
      submiting:false,
      parentId:""
    };
  },
  components: {
    screenFilter,
    lineThrought,
    draggable,
    frameWin,
    cropImage
  },

  mounted() {
    this.getList(1);
    // this.getMaterial();
    this.getMusicType();
    // this.getMusics();
    let dragtip = window.localStorage.getItem("dragtip");
    if(!dragtip){
      this.dragTip = true;
    }

  },
  methods: {
    beforeClose(next){
      if(this.finished){
        next();
        return ;
      }
      Ruler.confirm("确认取消快速布展").then((res)=>{
        if(res == "ok"){
          next();
        }
      });
    },
    createAgin(){
      // reset
      this.reset();
      this.getList(1);
      this.getMaterial();
      this.getMusics();
    },
    reset(){
      this.form =  {
        name:"",
        description:"",
        musicTypeId:"",
        musicId:"",
        tempid:"",
        canPutCount:0,
        path:[]
      };
      this.cachePtah = {};
      this.material = 1;

      this.currentPage = 1;
      this.entities = [];
      this.scales = [];
      this.search = {};
      this.condition = {};

      this.musicPage = 1;

      this.step = 1;
      this.finished = null;
      this.submiting = false;
      this.audio.pause();
      this.audio.src = null;
      this.parentId = "";
      this.canPutCount = 0;
    },
    closeDragTip(){
        this.dragTip = false;
      window.localStorage.setItem("dragtip",1);
    },
    closeDialog() {
      this.$emit("close");
      this.visible = false;
      this._promise && this._promise.resolve("cancel");
    },
    selctChange(search) {
      this.search = search;
      this.currentPage = 1;
      this.getList(1);
    },
    getList(currentPage) {
      var me = this;
      me.currentPage = currentPage;
      let params = {
        pageSize: me.pageSize,
        currentPage: currentPage,
        placeholder:1,
        ...me.search
      };
      me.$http
        .getTemplate(params)
        .then(res => {
          if (me.currentPage == currentPage) {
            //没有被改变了,避免数据错乱
            var entities = res.entities || [];
            me.$utils.formatList(entities);
            me.entities = entities;
            me.total = res.count || 0;
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    guankan(item) {
      this.seeInfo(item.tempid);
    },
    selectTemp(item){
      this.$set(this.form,"tempid",item.tempid);
      this.$set(this.form,"canPutCount",item.canPutCount);
      this.scales = item.scales || [];
    },
    async getMaterial(){
      let list = [];
      let obj = {
        fileType: 1,
        pageSize:32,
        currentPage:this.materialPage
      };
      let res = await this.$http.getMyMaterial(obj);
      let entities = res.entities || [];
      if(obj.currentPage == 1){
         this.materials = [];
      }
      if(obj.currentPage != res.currentPage){
        return ;
      }
      this.materialPage++;
      if(entities.length == 0){
        return ;
      }
      this.materials = this.materials.concat(entities);
    },
    selectMaterial(item){
      try{
        item = JSON.parse(JSON.stringify(item));
      }catch(e){
        console.error(e);
      }
      if(this.cachePtah[item.picId]){
         this.materialDel(item);
      }else{
          if(!this.form.path){
            this.form.path = [];
          }
          if(this.form.path.length >= this.form.canPutCount){
            //this.$message.warning(`最多只能选择${this.form.canPutCount}张素材`)
            Ruler.warn(`最多只能选择${this.form.canPutCount}张素材`);
            return ;
          }
          this.$set(this.cachePtah,item.picId,true);
          this.form.path.push(item);
      }
    },
    materialDel(item){
      this.$delete(this.cachePtah,item.picId);
      this.form.path = this.form.path.filter((a)=>{
        return a.picId !== item.picId;
      });

    },
    async materialClip(item,index){
      this.showCrop = true;
      let res = await this.$refs.cropImage.init(item.picPath,this.scales[index]);
      let fileHost = process.env.VUE_APP_fileHost;
      let arr = item.picPath.split("/");
      let params = res.params;
      let base = `${fileHost}/image?pic=${arr.pop()}&cx=${params.x}&cy=${params.y}&cw=${params.w}&ch=${params.h}`;
      this.$set(item,"_base",base);
      this.$set(item,"_params",params);
    },
    async getMusicType(){
      let res = await this.$http.getMusicType();
      res.unshift({
        musicTypeId:"",
        name:"全部"
      });
      this.musicTypes = res;
    },
    changeMusicType(musicTypeId){
      this.form.musicTypeId = musicTypeId;
      this.musicPage = 1;
      this.getMusics();
    },
    async getMusics(){
      let obj = {
        musicTypeId:this.form.musicTypeId || "",
        pageSize: 20 ,
        currentPage:this.musicPage
      };
      let list = [];
      let res = await this.$http.getMusicList(obj);
      if(obj.currentPage !== res.currentPage){
        return;
      }
      this.musicPage++;
      if(obj.currentPage != 1){
        list = this.musicList
      }
      list = list.concat(res.entities);
      this.musicList = list;
    },
    musicClick(item){
      if(item.musicId !== this.form.musicId){
        // 切换了音乐
        this.audio.src = item.url;
        this.audio.play();
      }else{
        // 暂停和播放
        if(this.audio.paused){
            this.audio.play();
        }else{
          this.audio.pause();
        }
      }
      this.$set(this.form,"musicId",item.musicId);

    },
    async createScene(){
        let form = JSON.parse(JSON.stringify(this.form));
        let path = form.path || [];
        let picListStr = [];
        for(let i = 0; i < path.length; i++){
          let item = path[i];
          picListStr.push({
            id:item.picId,
            ...item._params
          });
        }
        form.picListStr = JSON.stringify(picListStr);
        delete form.path;
        // finished
        this.submiting = true;
        try{
          this.finished = await this.$http.autoCreate(form);
          this.success && this.success(this.finished);
        }catch(e){
          console.log(e);
        }
        this.submiting = false
    },
    getParentIdInfo(){
        this.$nextTick( async()=>{
          if(this.parentId && this.canPutCount){
            // getTemplateOne
            let res = await this.$http.getTemplateOne({
              parentId : this.parentId
            });
            this.selectTemp(res);
            this.step = 2;
          }
        })
    },
   async toEditor(){
      let me = this;
      let url = await me.$utils.getArtEditorUrl({tempid:me.finished});
      window.open(url,"_blank")
      this.closeDialog()
    },
    seeInfo(tempid){
      var url = this.$utils.getArtViewUrl({G_TEMP_ID: tempid})
      window.open(url, "_blank");
      this.closeDialog()
    }
  },
  destroyed(){
    this.audio && this.audio.pause();
  },
  watch: {
    isvisible(val) {
      if (val) {
        this.visible = val;
      } else {
        this.closeDialog();
      }
    },
    visible(val) {
      if (val) {
        this.selctChange({});
        this.getMaterial();
        this.getMusics();
        this.getParentIdInfo();
      } else {
        this.$refs.screenFilter && this.$refs.screenFilter.clear();
        this.reset();
      }
    },
    step(val){
        if(val != 4){
           this.audio.pause();
        }
    }
  }
};
</script>
<style lang="scss" scoped src="./create-auto.scss"></style>
<style lang="scss">
.create-auto{
  .sdesc{
      .el-form-item__content{
          flex: 1;
          margin-left: 0 !important;
      }
  }
  }
</style>
