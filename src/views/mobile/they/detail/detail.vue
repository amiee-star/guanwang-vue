<template>
  <div class="detail-page-mobile">
    <navHeader title="详情" />
    <div class="bigimg">
      <img @click="toArt" :src="caseInfo.thumb" alt="" class="thumb" />
    </div>
    <div class="content">
      <div class="title">
        <h3>{{ caseInfo.tempName }}</h3>
      </div>
      <div class="likeBox">
        <div class="seebox">
          <svg-icon iconClass="liulan1"></svg-icon>
          {{ caseInfo.viewCount | formatnum }}
        </div>
        <div class="likes">
          <svg-icon iconClass="dianzan1"></svg-icon>
          {{ caseInfo.likeCount }}
        </div>
        <div class="size">
          <svg-icon iconClass="mianji"></svg-icon>
          {{ caseInfo.validSz || 0 }}m²
        </div>
      </div>
      <div class="detailInfo">
        {{ caseInfo.caseDesc }}
      </div>
      <div class="recommendBox">
        <div class="recommendTitle title-box">
          <div class="line"></div>
          相关推荐
        </div>
        <div class="recommendContent">
          <div class="recommendItem" v-for="(item1, idx) in caseInfo.recomList" :key="idx"
            @click="toRecommendHall(item1)">
            <img :src="item1.thumb" alt="" class="imgbox imgshow" v-if="item1.thumb" />
            <div class="imgbox" v-else>
              暂无内容
            </div>
            <p>{{ item1.tempName }}</p>
          </div>
        </div>
      </div>
      <div class="evaluateBox">
        <div class="evaluateTitle title-box">
          <div class="line"></div>
          评价
        </div>
        <div class="evaluateContent">
          <div class="mark">
            <img src="@/assets/images/they/mark.png" alt="" />
          </div>
          <div class="text">
            {{ caseInfo.evaluate }}
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <ul>
      	<!--<li v-for="(item, index) in shareData" :key="item.icon" @click="clickLove(item)" :class="{ isfavorite: caseInfo.isFavorite }">-->
          <!--<svg-icon :iconClass="caseInfo.isFavorite ? 'like02' :item.icon"></svg-icon>-->
          <!--<span>{{item.span}}</span>-->
        <!--</li>-->
      </ul>
      <button @click="toUrl">
        <svg-icon iconClass="jinruzhanting"></svg-icon>
        进入展厅
      </button>
    </div>
  </div>
</template>

<script>
import navHeader from "mobile/components/nav-header.vue";
import logo from "@/components/logo.vue";
import store from "@/store";
import shareTooltip from "@/components/share-tooltip";
import $ from "jquery";
export default {
  name: "they-detail",
  data() {
    return {
      musicUrl: "",
      pictures: [],
      musicVisible: true,
      roomName: "",
      info: {
        _imgUrls: [],
        pictures: [],
        qrcodeUrl: "",
      },
      coverImg: "",
      user: {
        sceneCount: 0,
        guestCount: 0,
      },
      audioPlay: true,
      audio: null,
      shareQcode: false,
      favoriting: false,
      fixedVisible: false,
      caseInfo: {},
      tempid: "",
      shareData: [{
        icon: "like01",
        span: "收藏"
      }],
      isfavorite: null
    };
  },
  computed: {
    userinfo() {
      return store.state.userinfo;
    },
  },
  components: {
    logo,
    navHeader,
    shareTooltip,
  },
  watch: {
    $route(to, from) {
      console.log(to.path, "======1122");
    },
  },

  mounted() {
    const that = this;
    console.log(that.$route.params.tempid)
    that.tempid = that.$route.params.tempid;
    // that.getInfo();
    this.getCaseInfo();
    setTimeout(function() {
      that.fixedVisible = true;
    }, 1000); //3s显示快速布展
  },
  // beforeDestroy() {
  //   $("#app")[0].style.overflowY = "auto";
  //   $("#app")[0].style.height = "auto";
  // },
  methods: {
    toUrl(url) {
      var url = this.$utils.getArtViewUrl({ G_TEMP_ID: this.tempid });
      window.open(url, "_blank");
      // this.$router.push({ name: "detail", params: { tempid: url.tempId } });
    },
    changeAudio() {
      let musicObj = document.getElementById("music");

      if (musicObj.paused) {
        //暂停中
        musicObj.play();
        this.musicVisible = true;
      } else {
        //播放中
        musicObj.pause();
        this.musicVisible = false;
      }
    },
    getInfo() {
      var me = this;
      var param = this.tempid;
      //  if(me.userinfo){
      //      param["token"] = me.userinfo.token;
      //  }else{
      //      me.$utils.addSceneHistory(me.tempid);
      //  }

      me.$http
        .getSceneInfo(param)
        .then((info) => {
          console.log(info);
          me.coverImg = info.thumb;
          console.log(me.coverImg);
          me.roomName = info.name || "";
          me.$utils.formatItem(info, {});
          me.info = info;
          me.pictures = info._imgUrls;
          let url = me.$utils.getArtViewUrl({ G_TEMP_ID: info.tempId });
          console.log(url);
          me.info.qrcodeUrl = me.$http.generateQRCode + encodeURIComponent(url);
          console.log(me.info, "===info");
          // if (info.userId) {
          //   me.getUserInfo(info.userId);
          // }
        })
        .catch(() => {});
    },
    getCaseInfo() {
      var me = this;
      var param = { tempId: this.tempid };
      me.$http.caseInfo(param).then((res) => {
        // caseInfo
        me.$utils.formatItem(res, {});
        me.caseInfo = res;
        me.roomName = me.caseInfo.nickname || "";
        let url = me.$utils.getArtViewUrl({ G_TEMP_ID: me.caseInfo.tempId });
        console.log(url);
        me.caseInfo.qrcodeUrl =
          me.$http.generateQRCode + encodeURIComponent(url);
        console.log(me.caseInfo, "===caseInfo");
      });
    },
    // 获取他人信息的接口直接变更为通过tempId查展厅详情即可
    // getUserInfo(userId) {
    //   console.log(this.info);
    //   var me = this;
    //   me.$http
    //     .getOtherUserInfo({ tempId: me.info.tempId })
    //     .then((userInfo) => {
    //       console.log(userInfo);
    //       me.user = userInfo;
    //     })
    //     .catch(() => {});
    // },
    materialClick(item) {
      //点击了素材，需要查看素材详情
      //this.pictures = [item];
      if (this.hideLogo) {
        //直接跳转网页
        this.$router.push({
          name: "detailMaterial",
          params: { tempid: this.tempid, materialid: item.objId },
        });
      } else {
        this.$emit("toMetail", item);
      }
    },
    toArt() {
      if (this.caseInfo && this.caseInfo.objStatus) {
        if (this.userinfo && this.$utils.getUserToken()) {
          this.$http.addHistory({ tempId: this.tempid });
        }

        var url = this.$utils.getArtViewUrl({ G_TEMP_ID: this.tempid });
        window.open(url, "_blank");
      }
    },
    // 跳转推荐展厅
    async toRecommendHall(i) {
      console.log("跳转展厅拉", i);
      let tempid = i.tempId;
      if (this.userinfo && this.$utils.getUserToken()) {
        this.$http.addHistory({ tempId: tempid });
      }
      // console.log(store.state.token, "token");

      let url = await this.$utils.getArtViewUrl({
        G_TEMP_ID: tempid,
        isBuild: true,
        token: store.state.token.token,
      });
      window.open(url);
    },
    clickLove() {
      var me = this;
      if (me.userinfo) {
        if (!me.favoriting) {
          if (!me.caseInfo.isFavorite) {
            me.$http
              .favorite({
                tempId: me.caseInfo.tempId,
                token: me.userinfo.token,
              })
              .then((res) => {
                me.$set(me.caseInfo, "isFavorite", true);
              })
              .catch(() => {})
              .finally(() => {
                me.favoriting = false;
              });
          } else {
            me.$http
              .unfavorite({
                tempId: me.caseInfo.tempId,
                token: me.userinfo.token,
              })
              .then((res) => {
                me.$set(me.caseInfo, "isFavorite", false);
              })
              .catch(() => {})
              .finally(() => {
                me.favoriting = false;
              });
          }
        }
      } else {
        me.$Ruler.confirm("请先登录哦~").then((res) => {
          if (res == "ok") {
            me.$Ruler.account({
              options: {
                operate: 0,
              },
            });
          }
        });
      }
    },
    paused() {
      var me = this;
      if (me.audio) {
        me.audio.pause();
        me.audioPlay = false;
      }
    },
    musicPlay() {
      var me = this;
      if (me.audio) {
        if (me.audio.paused) {
          me.audio.play();
          me.audioPlay = true;
        } else {
          me.audio.pause();
          me.audioPlay = false;
        }
      }
    },
    quickCreate() {
      const me = this;
      me.$router.push({
        name: "buyTpl",
        query: { parentId: me.info.parentId },
      });
    },
  },
  destroyed() {
    this.paused();
  },
};
</script>
<style lang="scss" scoped src="./detail.scss"></style>
