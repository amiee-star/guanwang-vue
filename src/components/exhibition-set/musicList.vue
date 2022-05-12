<template>
  <div class="musicList">
    <el-dialog :visible.async="dialogVisible" width="30%" @close="closeDialog">
      <div slot="title" class="header-title">
        <p>添加展厅背景音乐</p>
      </div>
      <div class="select">
        <el-select v-model="musicTabIndex" placeholder="请选择" @change="changeTab">
          <el-option
            v-for="item in musicTab"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-if="musicTabIndex == 0" v-model="musicTypeId" placeholder="请选择" @change="changeType">
          <el-option
            v-for="item in musicTypeList"
            :key="item.musicTypeId"
            :label="item.name"
            :value="item.musicTypeId">
          </el-option>
        </el-select>
        <el-input class="search" v-model="keyword" size="small" maxLength="20" placeholder="请输入关键词" clearable
                  @clear="changeTab">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="changeTab"></i>
        </el-input>
      </div>
      <div class="table">
        <div class="th">
          <span></span>
          <span>音频名称</span>
          <span>时长</span>
          <span>操作</span>
        </div>
        <div class="body" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <div class="list" :class="chooseItem.musicId == item.musicId ? 'active' : ''" v-for="item in musicList"
               @click="chooseMusic(item)">
            <i class="el-icon-success checkbox"></i>
            <span class="musicName">{{item.name}}</span>
            <span class="time">{{$utils.formatAudioTime(item.time)}}</span>
            <div class="play" v-if="playMusicId !== item.musicId" @click.stop="playMusic(item.musicId, item.musicFile)">
              <i class="el-icon-video-play"></i>
              <span>试听</span>
            </div>
            <div class="play" v-else @click.stop="pauseMusic()">
              <i class="el-icon-video-pause"></i>
              <span>试听</span>
            </div>
          </div>
          <p class="tips" v-if="noMore && musicList.length > 0">已显示全部音乐</p>
          <p class="tips" v-if="musicList.length <= 0">暂无数据</p>
          <audio ref="tryAudio" :src="musicUrl" loop></audio>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import formRules from "@/config/form-rules.js";

  export default {
    name: "vrHost",
    props: {
      visible: {
        type: Boolean
      },
      musicId: {
        type: String
      }
    },

    data() {
      return {
        loading: true,
        arrs: [],
        dialogVisible: false,
        keyword: "",
        pageSize: 20,
        currentPage: 1,
        musicTab: [{
          label: "音乐库",
          value: 0
        }, {
          label: "我的",
          value: 1
        }],
        musicPageList: [],
        musicList: [],
        musicTypeList: [],
        musicTabIndex: 0,
        musicTypeId: "",
        chooseItem: {
          name: "",
          musicId: "",
          musicFile: ""
        },
        tableData: [],
        totalData: [],
        vrTotal: 0,
        dom: '',
        multipleSelection: [],
        musicUrl: "",
        playMusicId: ""
      }
    },
    computed: {
      noMore() {
        return this.musicPageList.length < 20
      },
      disabled() {
        return this.noMore
      }
    },
    watch: {
      visible(val) {
        this.dialogVisible = val;
        this.musicTabIndex = 0;
        this.keyword = "";
        this.musicList = [];
        this.currentPage = 1;
        if (val) {
          this.getMusicTypeList()
          this.getPublicMusic();
        }
      },
      musicId(val) {
        this.chooseItem.musicId = val;
      }
    },

    mounted() {
    },
    methods: {
      load() {
        this.loading = true
        setTimeout(() => {
          this.currentPage += 1;
          if(this.musicTabIndex == 0) {
            this.getPublicMusic();
          }else {
            this.getUserMusic();
          }
          this.loading = false
        }, 200)
      },

      chooseMusic(item) {
        this.chooseItem.name = item.name;
        this.chooseItem.musicId = item.musicId;
        this.chooseItem.musicFile = item.musicFile;
      },

      //关闭弹窗
      saveHandle() {
        this.$emit("closepop", this.chooseItem);
        // this.isAdd = true;
        // this.$store.commit("setStates", {
        //   k: "yuanHostList",
        //   v: this.multipleSelection
        // })
      },
      closeDialog() {
        this.$emit("closepop");
      },

      getMusicTypeList() {
        var $this = this;
        this.$http
            .getMusicType()
            .then(function (res) {
              var arr = res || [];
              arr.unshift({
                name: "全部",
                musicTypeId: "",
              });
              $this.musicTypeList = arr;
            })
            .catch(function (res) {
              console.log(res);
            });
      },

      //获取音乐库音乐列表
      getPublicMusic() {
        var $this = this;
        this.$http
            .publicMusic({
              name: $this.keyword,
              pageNum: $this.currentPage,
              pageSize: $this.pageSize,
              musicTypeId: $this.musicTypeId,
            })
            .then(function (res) {
              $this.musicPageList = res.list || [];
              $this.musicList = $this.musicList.concat($this.musicPageList)
            })
            .catch(function (res) {
              console.log(res);
            });
      },

      getUserMusic() {
        var $this = this;
        this.$http
            .musicUserGet({
              name: $this.keyword,
              pageNum: $this.currentPage,
              pageSize: $this.pageSize,
            })
            .then(function (res) {
              $this.musicPageList = res.list || [];
              $this.musicList = $this.musicList.concat($this.musicPageList)
            })
            .catch(function (res) {
              console.log(res);
            });
      },

      playMusic(musicId, musicFile) {
        this.musicUrl = musicFile;
        this.$nextTick(() => {
          if (this.$refs.tryAudio) {
            this.$refs.tryAudio.play();
          }
        });
        this.playMusicId = musicId;
      },

      pauseMusic() {
        this.$nextTick(() => {
          if (this.$refs.tryAudio) {
            this.$refs.tryAudio.pause();
          }
        });
        this.playMusicId = "";
      },
      changeTab() {
        this.currentPage = 1;
        this.musicList = []
        if (this.musicTabIndex == 0) {
          this.getPublicMusic();
        } else {
          this.getUserMusic();
        }
      },
      changeType() {
        this.currentPage = 1;
        this.musicList = []
        this.getPublicMusic();
      }
    }
  }
</script>

<style lang="scss" src="./musicList.scss"></style>
