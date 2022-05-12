<!-- 素材管理 -->
<!--<script src="../../../../../../../zjjsmuseum/sceneFront/js/app.ee2a52a6.js"></script>-->
<template>
    <div class="self-material">
<!--        <page-header :gradual="false"></page-header>-->
        <div class="slef-main self-base-container">
            <div class="flex title">
                <p>素材管理</p>
                <!-- <div>
                      <p class="flex"><span>存储空间：{{Math.ceil(userInfo.useSpace/1024/1024)}}MB/{{userInfo.totalSpace/1024/1024}}MB</span><span class="how" @click="howtoAdd=true">如何扩容？</span></p>
                      <p class="back">
                          <span class="color" :style="percentColor"></span>
                      </p>
                  </div> -->
                <!--<mCapacity></mCapacity>-->
            </div>

            <div class="nav flex">
                <div class="choose flex">
                  <span v-for="(item, index) in materiaList"
                        :key="index"
                        :class="{ active: tapIndex == item.tabNav }"
                        @click="changeTap(item.tabNav)">{{ item.text }}</span>
                </div>
                <ul class="flex">
                    <template class="flex" v-if="isManyDel">
                        <li @click="allCheck">
                            <span class="check-box cursor"
                                  :class="checkList.length === 0 ? '' : isIndeterminate? 'is-checked': 'is-indeterminate'"></span>
                            全选
                        </li>
                        <li class="delBtn cursor" @click="allDel">
                            <svg-icon icon-class="delete"></svg-icon>
                            批量删除
                        </li>
                    </template>
                    <template class="flex">
                        <li
                                v-if="tapIndex != tabNav.model"
                                class="manyOperate upload-btn "
                                @click="showMany"
                        >
                            {{ isManyDel ? "取消" : "批量删除" }}
                        </li>
                        <li class="upload-btn" @click="uploadMaterial">
                            {{ tapIndex == tabNav.article ? "添加文章" : "上传素材" }}
                        </li>
                    </template>
                </ul>
            </div>
            <div v-if="materialList.length">
                <!--                <p class="tip-text-model" v-if="tapIndex == tabNav.model">-->
                <!--                    <i class="el-icon-warning-outline"></i>-->
                <!--                    此处模型为www.51jianmo.com本账号下的同步数据,360环拍模型仅可在热点详情中使用,无法拖入场景-->
                <!--                </p>-->
                <div v-if="tapIndex == tabNav.music">
                    <el-table
                            ref="multipleTable"
                            :data="materialList"
                            style="width: 100%"
                            :cell-class-name="singleClass"
                            @select="selection">
                        <el-table-column type="selection"></el-table-column>
                        <!--                        <el-table-column prop="musicType" label="类型" width="180">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="name" label="音频名称"></el-table-column>
                        <!--                        <el-table-column prop="singer" label="歌手名" width="150">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="_time" label="时长">
                        </el-table-column>
                        <el-table-column label="操作" width="260">
                            <template slot-scope="scope">
                                <div class="musicOperate">
                  <span :class="{ playing: playMusicId == scope.row.musicId }">
                    <span class="play" @click="musicPlay(scope.row)"
                    ><svg-icon iconClass="play"></svg-icon>试听</span
                    >
                    <span class="pause" @click="musicPause(scope.row)"
                    ><svg-icon iconClass="pause"></svg-icon>停止</span
                    > </span
                  >| <span @click="musicEdit(scope.row)">编辑</span>|
                                    <span @click="musicDelete(scope.row)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-else-if="tapIndex == tabNav.pdf || tapIndex == tabNav.article">
                    <el-table
                            ref="multipleTable"
                            :data="materialList"
                            style="width: 100%"
                            :cell-class-name="singleClass"
                            @select="selection"
                            @cell-click="toDetail"
                    >
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column width="100px" label="类型">
                            <template slot-scope="scope">
                                <span>{{ tapIndex == tabNav.pdf ? "PDF" : "文章" }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                :prop="tapIndex == tabNav.pdf ? 'name' : 'title'"
                                label="名称"
                        >
                        </el-table-column>
                        <el-table-column width="300px" label="操作">
                            <template slot-scope="scope">
                                <div class="musicOperate">
                  <span
                          :id="'copy' + scope.$index"
                          @click="copy(scope.row, scope.$index)">复制链接</span>|<span v-if="tapIndex == tabNav.article"
                                                                                   @click.stop="articleEdit(scope.row)">编辑&nbsp;&nbsp;&nbsp;&nbsp;|</span>
                                    <span @click.stop="musicDelete(scope.row)">删除</span>
                                    <p v-if="isCopy == scope.$index" class="copyed flex-center">
                                        <i class="el-icon-circle-check"></i>链接已复制
                                    </p>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <ul class="slef-content flex-wrap-start" v-else-if="tapIndex == tabNav.model">
                    <li
                            v-for="(item, index) in materialList"
                            :key="index"
                            class="model-box">
                        <div
                                class="img-wrap flex-center-column"
                                :class="{ active: item._active }">
                            <img :src="item.thumbnail?item.thumbnail:defaultImg" :class="item.thumbnail?'':'defaultImg'" alt=""/>
                            <div class="icon-play">
                                <p class="preview" v-if="item.process!=0 && item.process!=2" @click="play(item)">预览</p>
                                <p class="making" v-if="item.process == 0"><img src="@/assets/images/self/loading.png"
                                                                                alt="">模型处理中...</p>
                            </div>
                            <ul class="icon-list" v-if="item.process!=0">
                                <li v-if="item.showType!=3 && item.process!=2" @click="setEffect(item)">
                                    <span>效果配置</span>
                                </li>
                                <li @click="delet(item)">
                                    <span>删除</span>
                                    <!--<img src="@/assets/images/self/delet.png" alt="">-->
                                </li>
                                <li v-if="item.process!=2" @click="editor(item)">
                                    <span>编辑</span>
                                    <!--<img src="@/assets/images/self/bianji.png" alt="">-->
                                </li>
                            </ul>
                            <ul class="icon-error" v-if="item.process==2">
                                <li>
                                    <el-popover
                                            placement="bottom-start"
                                            title=""
                                            width="300"
                                            trigger="hover"
                                            :content="'模型编码：'+item.code">
                                        <div slot="reference"><i class="el-icon-warning-outline"></i>处理失败</div>
                                    </el-popover>

                                </li>
                            </ul>
                        </div>
                        <!--            <div-->
                        <!--              v-else-->
                        <!--              class="img-wrap flex-center-column defaul-box "-->
                        <!--              :class="{ active: item._active }"-->
                        <!--            >-->
                        <!--              <img :src="defaultImg" alt="" class="default-img" />-->

                        <!--              <div class="operate-box">-->
                        <!--                <div class="preview-btn" @click="play(item)">-->
                        <!--                  预览-->
                        <!--                </div>-->
                        <!--                <div class="edit-btn" @click="editor(item)">编辑</div>-->
                        <!--              </div>-->
                        <!--            </div>-->
                        <div class="name-wrap flex">
                            <p class="tow name">{{ item.name }}</p>
                        </div>
                    </li>
                </ul>
                <ul class="slef-content flex-wrap-start" v-else>
                    <li
                            v-for="(item, index) in materialList"
                            :key="index"
                            @click="chooseMaterial(item)">
                        <div
                                class="img-wrap flex-center-column"
                                :class="{ active: item._active }">
                            <img :src="item._picPathCompre" alt=""/>
                            <template v-if="!isManyDel">
                                <div class="icon-play" v-if="item.showPlay" @click="play(item)">
                                    <img
                                            v-if="item.fileType === tabNav.video"
                                            src="@/assets/images/self/play.png"
                                            alt=""
                                    />
                                    <p v-else class="preview">预览</p>
                                </div>
                                <ul class="icon-list">
                                    <li :id="'copy' + index" @click="copy(item, index)">
                                        <span>复制链接</span>
                                    </li>
                                    <li @click="delet(item)">
                                        <span>删除</span>
                                        <!--<img src="@/assets/images/self/delet.png" alt="">-->
                                    </li>
                                    <li @click="editor(item)">
                                        <span>编辑</span>
                                        <!--<img src="@/assets/images/self/bianji.png" alt="">-->
                                    </li>
                                </ul>
                            </template>
                            <template v-else>
                                <span class="checked cursor" :class="item.checked ? 'is-checked' : ''"></span>
                            </template>
                            <p v-if="isCopy == index" class="copyed flex-center">
                                <i class="el-icon-circle-check"></i>链接已复制
                            </p>
                        </div>
                        <div class="name-wrap flex">
                            <p class="tow name">{{ item.name }}</p>
                            <!--                            <p class="count flex-center">-->
                            <!--                                <svg-icon icon-class="liulan"></svg-icon>-->
                            <!--                                <span>{{ item.vcount }}</span>-->
                            <!--                            </p>-->
                        </div>
                    </li>
                </ul>
            </div>

            <div class="no-data" v-else>
                <img src="@/assets/images/self/no-data.png" alt=""/>
                <p>抱歉，没有相关信息！</p>
            </div>
            <div class="commonPagina paging" v-if="count > pageSize">
                <el-pagination
                        :current-page="currentPage"
                        @current-change="handleCurrentChange"
                        layout="total, prev, pager, next"
                        :page-size="pageSize"
                        :total="count"
                ></el-pagination>
            </div>
        </div>
        <uploadPic :isUploadPic="isupload[tabNav.pic]" @closeDialog="closeDialog"/>
        <uploadGif :isUploadGif="isupload[tabNav.gif]" @closeDialog="closeDialog"/>
        <uploadVideo
                :isUploadVideo="isupload[tabNav.video]"
                @closeDialog="closeDialog"
        />
        <uploadModel
                :isUploadModel="isupload[tabNav.model]"
                @closeDialog="closeDialog"
        />
        <uploadMusic
                :isUploadModel="isupload[tabNav.music]"
                @closeDialog="closeDialog"
        />
        <uploadPdf :isUploadPdf="isupload[tabNav.pdf]" @closeDialog="closeDialog"/>
        <EditMaterial
                :isShowEdit="isupload[tabNav.edit]"
                :edit="edit"
                @closeDialog="closeDialog"
        />
        <EditMusic
                :isUploadModel="isupload[tabNav.editMusic]"
                :edit="edit"
                @closeDialog="closeDialog"
        />
        <uploadArticle
                :isUploadArticle="isupload[tabNav.article]"
                :id="edit.id"
                @closeDialog="closeDialog"
        />
        <playShow :playClass="playClass" :isPlay="isPlay" @closeDialog="isPlay = false" :url="url"/>
        <articleDetail
                :dialogVisible="articleDetailVisible"
                @isShowDialog="getDialogState"
                :articleId="articleId"
        ></articleDetail>
    </div>
</template>
<script>
  import uploadPic from "@/components/materialManage/uploadMaterial/uploadPic.vue";
  import uploadVideo from "@/components/materialManage/uploadMaterial/uploadVideo.vue";
  import uploadGif from "@/components/materialManage/uploadMaterial/uploadGif.vue";
  import uploadModel from "@/components/materialManage/uploadMaterial/uploadModel.vue";
  import uploadMusic from "@/components/materialManage/uploadMaterial/uploadMusic.vue";
  import uploadPdf from "@/components/materialManage/uploadMaterial/uploadPdf.vue";
  import EditMaterial from "@/components/materialManage/editMaterial/editMaterial.vue";
  import EditMusic from "@/components/materialManage/editMaterial/editMusic.vue";
  import uploadArticle from "@/components/materialManage/uploadMaterial/uploadArticle";
  import mCapacity from "@/components/materialManage/capacity";
  import articleDetail from "../article_detail/article_detail.vue";
  import playShow from "@/components/materialManage/play-material.vue";
  import Clipboard from "clipboard";
  import utils from "../../../../utils/utils";

  export default {
    data() {
      const fileType = this.$commConst.FILETYPE;
      const tabNav = {
        ...fileType,
        edit: "edit",
        music: "music",
        editMusic: "editMusic",
        article: "article",
      };
      let tapIndex = this.$route.query.nav || tabNav.pic;
      return {
        tapIndex: tapIndex,
        tabNav,
        isupload: {},
        currentPage: 1,
        pageSize: 20,
        count: 0,
        materialList: [],
        fileHost: process.env.VUE_APP_pdfHost,
        nowTime: Date.now(),
        isPlay: false,
        edit: {},
        playObj: {},
        playMusicId: "",
        audio: new Audio(),
        defaultImg: require("@/assets/images/self/logo-hui.png"),
        materiaList: [
          {
            text: "图片",
            tabNav: tabNav.pic,
          },
          {
            text: "动图",
            tabNav: tabNav.gif,
          },
          {
            text: "视频",
            tabNav: tabNav.video,
          },
          {
            text: "模型",
            tabNav: tabNav.model,
          },
          {
            text: "音乐",
            tabNav: tabNav.music,
          },
          {
            text: "文件",
            tabNav: tabNav.pdf,
          },
          {
            text: "文章",
            tabNav: tabNav.article,
          },
        ],
        isCopy: -1,
        url: "",
        articleDetailVisible: false,
        articleId: 0,
        isManyDel: false,
        isIndeterminate: false,
        isAll: false,
        checkList: [],
        playClass: "picIframe"
      };
    },
    components: {
      uploadPic,
      uploadVideo,
      uploadGif,
      uploadModel,
      EditMaterial,
      uploadMusic,
      playShow,
      EditMusic,
      uploadPdf,
      uploadArticle,
      mCapacity,
      articleDetail,
    },
    computed: {
      userInfo() {
        return this.$store.state.userinfo;
      },
    },
    mounted() {
      this.getAllMaterial();
      this.getUserInfo();
    },
    methods: {
      selection(val, row) {
        let me = this;
        me.chooseMaterial(row);
      },
      resetData() {
        let me = this;
        me.checkList = [];
        me.isAll = false;
        me.isManyDel = false;
        me.materialList.forEach((item) => {
          item.checked = false;
        });
        let {multipleTable} = me.$refs;
        if (multipleTable) {
          multipleTable.clearSelection();
        }
      },
      showMany() {
        let me = this;
        me.isManyDel = !me.isManyDel;
        if (!me.isManyDel) {
          me.resetData();
        }
      },
      async allDel() {
        let me = this;
        if (me.checkList.length === 0) {
          me.$message.warning("请先选择素材");
          return;
        }
        let ids = me.checkList.join(",");
        let res = await me.$Ruler.confirm({
          msg: "确认删除素材吗？",
          desc: "素材删除后将无法恢复哦！请谨慎操作~",
        });
        if (res === "ok") {
          if (me.tapIndex === me.tabNav.music) {
            try {
              await me.$http.deleteMusics({musicIds: ids});
            } catch (e) {
            }
            me.getAllMaterial();
          } else if (me.tapIndex === me.tabNav.article) {
            try {
              await me.$http.delArticles({newsIds: ids});
            } catch (e) {
            }
            me.getAllMaterial();
          } else {
            await me.$http.deletePictures({
              picIds: JSON.stringify(me.checkList),
            });
            me.getAllMaterial();
          }
          me.resetData();
        }
      },
      allCheck() {
        let me = this;
        me.isAll = !me.isAll;
        me.checkList = [];
        me.materialList.forEach((item) => {
          let id = item.picId || item.musicId || item.id;
          if (me.isAll) {
            item["checked"] = true;
            me.isIndeterminate = true;
            me.checkList.push(id);
            let {multipleTable} = me.$refs;
            if (multipleTable) {
              multipleTable.toggleAllSelection();
            }
          } else {
            item["checked"] = false;
            let {multipleTable} = me.$refs;
            if (multipleTable) {
              multipleTable.clearSelection();
            }
          }
        });
      },
      chooseMaterial(item) {
        let me = this;
        if (me.isManyDel) {
          item.checked = !item.checked;
          let id = item.picId || item.musicId || item.id;
          if (item.checked) {
            me.checkList.push(id);
          } else {
            let index = me.checkList.indexOf(id);
            me.checkList.splice(index, 1);
          }
          let len = me.checkList.length,
            len2 = me.materialList.length;
          me.isIndeterminate = len === len2;
        }
      },
      getDialogState(val) {
        this.articleDetailVisible = val;
      },

      play(item) {
        let me = this;
        this.isPlay = true;
        if (item.fileType === me.tabNav.v3d) {
          this.url = `https://obs.3dyunzhan.com/v3d/${item.picId}/${item.picId}.html`;
        } else if (me.tapIndex == me.tabNav.model) {
          this.playClass = "modelIframe"
          this.url = `${process.env.VUE_APP_APIURL}model/?code=${item.code}&desc=0&icon=1&type=1&quick=0&opacity=0&full=0`;
        } else {
          this.playClass = "picIframe"
          this.url = `${process.env.VUE_APP_ViewURL}imageView/index.html?picid=${item.picId}`;
        }
      },
      changeTap(index) {
        if (this.tapIndex == index) {
          return;
        }
        this.resetData();
        this.tapIndex = index;
        this.currentPage = 1;
        this.materialList = [];
        this.count = 0;
        this.getAllMaterial();
        this.$router.replace({name: "selfMaterial", query: {nav: index}});
      },
      uploadMaterial() {
        // if (this.tapIndex !== this.tabNav.article) {
        //   let total = this.userInfo.totalSpace/1024/1024;
        //   let use = this.userInfo.useSpace/1024/1024;
        //   if (Math.ceil(use) === total) {
        //     this.$message({
        //       type: 'warning',
        //       message: '请先扩容'
        //     })
        //     return
        //   }
        // }
        // if (Number(this.tapIndex) === Number(this.tabNav.model)) {
        //   this.$store.commit("setStates", {k: "uploadVisible", v: true})
        //   // window.open(process.env.VUE_APP_APIURL);
        // }
        this.$set(this.isupload, this.tapIndex, true);
      },
      closeDialog(val) {
        if (val) {
          this.getAllMaterial();
        }

        this.isupload = {};
        this.edit = {};
      },
      musicPlay(e) {
        this.audio.src = e.musicFile;
        this.audio.play();
        this.playMusicId = e.musicId;
      },
      musicPause(e) {
        this.audio.pause();
        this.playMusicId = "";
      },
      musicEdit(e) {
        this.$set(this.isupload, this.tabNav.editMusic, true);
        this.edit = e;
      },
      async musicDelete(e) {
        let res = await this.$Ruler.confirm({
          msg: "确认删除素材吗?",
          desc: "素材删除后将无法恢复哦！请谨慎操作~",
        });
        if (res == "ok") {
          if (this.tapIndex === this.tabNav.music) {
            await this.$http.musicDelete({musicId: e.musicId});
          } else if (this.tapIndex === this.tabNav.article) {
            await this.$http.delArticle({id: e.id});
          } else {
            await this.$http.delMyMaterial({picId: e.picId});
          }

          this.getAllMaterial();
        }
      },
      async getMusic() {
        const me = this;
        let res = await this.$http.musicUserGet({
          pageSize: me.pageSize,
          pageNum: this.currentPage,
        });
        me.count = res.count;
        let entities = res.list || [];
        for (let i = 0; i < entities.length; i++) {
          let item = entities[i];
          item._time = this.$utils.formatAudioTime(item.time);
          item.singer = item.singer || "匿名";
          item["checked"] = false;
        }
        me.materialList = entities;
      },
      async getArticle() {
        let me = this;
        let res = await me.$http.mediaList({
          type: me.$commConst.MEDIATYPE.article,
          pageSize: me.pageSize,
          pageNum: me.currentPage,
          token: me.userInfo.token,
        });
        me.count = res.count;
        me.materialList = res.list;
      },
      async getModel() {
        let me = this;
        let phone = window.localStorage.getItem("phone");
        let res = await me.$http.modalList({
          pageNum: me.currentPage,
          pageSize: me.pageSize,
        });
        me.materialList = res.list;
        me.count = res.count;
      },
      async getAllMaterial() {
        try {
          let me = this;
          let tabNav = this.tabNav;
          me.materialList = [];
          if (me.tapIndex == tabNav.music) {
            await me.getMusic();
            return;
          }
          if (me.tapIndex == tabNav.article) {
            await me.getArticle();
            return;
          }
          if (me.tapIndex == tabNav.model) {
            await me.getModel();
            let token = await me.$http.modesToken()
            me.$store.commit("setStates", {k: "modelsToKen", v: token})
            return;
          }

          let obj = {
            fileType: this.tapIndex,
            pageSize: me.pageSize,
            pageNum: this.currentPage,
          };
          let res = await me.$http.getMyMaterial(obj);
          if (obj.fileType != me.tapIndex) {
            this.materialList = [];
            return;
          }

          me.nowTime = Date.now();
          let compre =
            "?height=0&width=512&x-image-process=image/resize,w_512&t=" +
            me.nowTime;
          let arr = res.list || [];
          let fileHost = me.fileHost;
          arr.forEach((item, index) => {
            if (item.picPath && item.picPath.indexOf("http:") >= 0) {
              item.picPath = item.picPath.replace("http:", "");
            }
            item._picPath = fileHost + item.picPath;
            if (item.videoThumb) {
              item._picPathCompre = fileHost + item.videoThumb + compre;
            } else if (item.glbThumb) {
              item._picPathCompre = fileHost + item.glbThumb + compre;
            } else {
              item._picPathCompre = item._picPath + compre;
            }
            item._active =
              item.picPath.substring(item._picPath.length - 3) == "png";
            if (item.fileType !== tabNav.model && item.fileType !== tabNav.v3d) {
              item.showPlay = true;
            } else {
              item.showPlay = false;
            }
            item["checked"] = false;
          });
          me.count = res.count;
          me.materialList = arr;
        } catch (e) {
          console.log("catch" + e);
        }
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.checkList = [];
        this.isAll = false;
        this.getAllMaterial();
      },
      delet(item) {
        //  删除素材
        let me = this;
        if (item.process == 2) {
          me.deleteMaterial(item);
        } else {
          me.$Ruler
            .confirm({
              msg: "确认删除素材吗?",
              desc: me.tapIndex == me.tabNav.model ? "模型删除后将导致在已关联的展厅中无法正常展示，请谨慎操作" : "素材删除后将无法恢复哦！请谨慎操作~",
            })
            .then((res) => {
              if (res == "ok") {
                me.deleteMaterial(item);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }


      },
      editor(item) {
        // if (item.modelTypeCode) {
        //   let code = item.code;
        //   this.$http.modalInfo(code).then((res) => {
        //     this.$set(item, "tags", res.tags);
        //     this.$set(item, "definition", res.definition);
        //     this.edit = item;
        //   });
        // }
        this.edit = item;
        this.$set(this.isupload, this.tabNav.edit, true);
        // if (item.picId) {
        //   let param = {
        //     picId: item.picId,
        //   };
        //   this.$http.getPicTags(param).then((res) => {
        //
        //     if (res.tags && res.tags.length > 0) {
        //       res.tags = res.tags.map((i) => {
        //         return i.name;
        //       });
        //       // res.tags = tagsArr;
        //     }
        //     // item.tags=res.tags
        //     this.$set(item, "tags", res.tags);
        //     this.edit = item;
        //     this.$set(this.isupload, this.tabNav.edit, true);
        //   });
        // }
        // console.log(this.edit, "编辑了这个---");
      },
      async deleteMaterial(item) {
        try {
          let me = this;

          if (me.tapIndex == me.tabNav.model) {
            await me.$http.delModels(item.code)
          } else {
            let obj = {
              picId: item.picId,
            };
            await me.$http.delMyMaterial(obj);
          }

          me.$Ruler.success("删除成功");
          me.getAllMaterial();
          me.commonRestData();
        } catch (e) {
          console.log("catch" + e);
        }
      },
      commonRestData() {
        try {
          window.opener && window.opener._materialRefresh(true);
        } catch (e) {
          console.warn(e);
        }
      },
      copy(item, index) {
        let me = this;
        let pdfHost = process.env.VUE_APP_pdfHost;
        let clipboard = new Clipboard(`#copy${index}`, {
          text: () => {
            if (item.fileType == me.tabNav.pdf) {
              return `${pdfHost}/pdf/web/viewer.html?file=${item.picPath}`;
            }
            if (item.picPath) {
              if (item.showPlay) {
                if (item.fileType === me.tabNav.v3d) {
                  return `https://obs.3dyunzhan.com/v3d/${item.picId}/${item.picId}.html`;
                }
                return `${pdfHost}/imageView/index.html?picid=${item.picId}`;
              }
              return item.picPath;
            } else {
              return `${pdfHost}/articleDetail/index.html?id=${
                item.id
              }%${Math.floor(Math.random() * 100000)}`;
            }
          },
        });
        clipboard.on("success", (e) => {
          // me.$message({
          //   type: 'success',
          //   message: '复制成功'
          // })
          me.isCopy = index;
          setTimeout(() => {
            me.isCopy = -1;
          }, 2000);
          clipboard.destroy();
        });
        clipboard.on("error", (e) => {
          // 不支持复制
          console.log("该浏览器不支持自动复制");
          // 释放内存
          clipboard.destroy();
        });
      },
      articleEdit(item) {
        let me = this;
        me.uploadMaterial();
        this.edit = item;
      },
      toDetail(item, column) {
        if (column.label == "名称") {
          if (item.picPath) {
            let pdfHost = process.env.VUE_APP_pdfHost;
            window.open(`${pdfHost}/pdf/web/viewer.html?file=${this.$utils.joinHttp(item.picPath)}`);
          } else {
            this.articleDetailVisible = true;
            this.articleId = item.id;
          }
        }
      },
      singleClass(row) {
        if (row.columnIndex == 2 && this.tapIndex !== this.tabNav.music) {
          return 'singleClass';
        } else if (row.columnIndex == 0) {
          if (!this.isManyDel) {
            return "selection";
          } else {
            return ""
          }

        }
      },
      getUserInfo() {
        var me = this;
        var token = me.userInfo.token;
        me.$store.dispatch("getUserInfo", {token: token});
      },

      setEffect(item) {
        this.isPlay = true;
        let token = this.$store.state.modelsToKen
        this.playClass = "editorIframe"
        this.url = `${!item.modelVersion || item.modelVersion.includes("b2") ? process.env.VUE_APP_NEWEDITOR : process.env.VUE_APP_EDITOR}?c=${item.code}&t=${token}&i=1`
      }
    },
    beforeRouteLeave(to, from, next) {
      if (!this.audio.paused) {
        this.audio.pause();
      }
      next();
    },
  };
</script>
<style src="./material.scss" lang="scss" scoped></style>
<style lang="scss">
    .el-table__header-wrapper {
        .el-checkbox__inner {
            display: none;
        }
    }
</style>
