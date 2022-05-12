<template>
  <div class="they-detail-page" :class="{ hideLogo: !hideLogo }">
    <div class="min-w">
      <div class="content-w">
        <div class="content">
          <div class="bigimg-w">
            <div class="head" v-if="!hideLogo">
              <div class="logo">
                <logo></logo>
              </div>
            </div>
            <div class="bigimg">
              <!-- v-if="pictures.length == 1" -->
              <img @click="toArt" :src="caseInfo.thumb" alt="" class="thumb" />
              <!-- <div class="swiper-img" v-else-if="pictures.length > 1">
                <el-carousel
                  indicator-position="none"
                  arrow="always"
                  :autoplay="autoplay"
                  ref="swiper"
                >
                  <el-carousel-item
                    v-for="(item, index) in pictures"
                    :key="index"
                    height="100%"
                  >
                    <img :src="item" alt="" />
                  </el-carousel-item>
                </el-carousel>
                <ul
                  class="minis"
                  @mouseenter="autoplay = false"
                  @mouseleave="autoplay = true"
                >
                  <li
                    v-for="(item, index) in pictures"
                    :key="index"
                    @click="$refs.swiper.setActiveItem(index)"
                  >
                    <img :src="item" alt="" />
                  </li>
                </ul>
              </div> -->
              <div class="bottom-btns">
                <ul class="left">
                  <!-- <li @click="backSee" >
                                        <img src="@/assets/images/they/back.png" alt="">
                                        <img src="@/assets/images/they/back-hover.png" class="hover" alt="">
                                        返回
                                    </li> -->
                </ul>
                <ul class="center">
                  <li
                    @click="clickLove"
                    :class="{ isfavorite: caseInfo.isFavorite }"
                  >
                    <img src="@/assets/images/they/love.png" alt="" />
                    <img
                      src="@/assets/images/they/love-hover.png"
                      class="hover"
                      alt=""
                    />
                    <img
                      src="@/assets/images/they/loveed.png"
                      class="loveed"
                      alt=""
                    />
                    收藏
                  </li>

                  <share-tooltip
                    :qrcodeUrl="caseInfo.qrcodeUrl"
                    :name="roomName"
                    :picture="caseInfo.thumb"
                  ></share-tooltip>

                  <li @click="toArt" v-if="caseInfo.objStatus" class="toArt">
                    <img src="@/assets/images/they/in.png" alt="" />
                    <img
                      src="@/assets/images/they/in-hover.png"
                      class="hover"
                      alt=""
                    />
                    进入展厅
                  </li>
                  <li v-else class="disabed">
                    <img src="@/assets/images/they/time.png" alt="" />
                    正在处理
                  </li>
                </ul>
                <ul class="right"></ul>
              </div>
              <!--<div class="quickcreate" @click="quickCreate" v-if="info.parentId && !info.canPutCount ">
                                <img src="@/assets/images/they/quickcreate.png" alt="">
                            </div>-->
            </div>
          </div>
          <div class="left-info">
            <!-- <information
              :tempid="tempid"
              :info="info"
              :user="user"
              @materialClick="materialClick"
            ></information> -->
            <div class="detailTitle">
              {{ caseInfo.tempName }}
            </div>
            <div class="likeBox">
              <div class="seebox">
                <svg-icon iconClass="liulan1"></svg-icon>
                {{ caseInfo.viewCount | formatnum}}
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
                <div
                  class="recommendItem"
                  v-for="(item1, idx) in caseInfo.recomList"
                  :key="idx"
                  @click="toRecommendHall(item1)"
                >
                  <img
                    :src="item1.thumb"
                    alt=""
                    class="imgbox imgshow"
                    v-if="item1.thumb"
                  />
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
                {{ caseInfo.evaluate }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/components/logo.vue";
import information from "./information";
import store from "@/store";
import shareTooltip from "@/components/share-tooltip";
import $ from "jquery";
export default {
  name: "they-detail",
  props: ["hideLogo", "tempid"],
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
    };
  },
  computed: {
    userinfo() {
      return store.state.userinfo;
    },
  },
  components: {
    logo,
    information,
    shareTooltip,
  },
  watch: {
    $route(to, from) {
      console.log(to.path, "======1122");
    },
  },

  mounted() {
    const that = this;
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
          me.info.qrcodeUrl = me.$http.generateQRCode + encodeURIComponent(url);
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
        me.caseInfo.qrcodeUrl =
          me.$http.generateQRCode + encodeURIComponent(url);
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
<style lang="scss" scoped>
.they-detail-page {
  div.custom-dialog__wrapper {
    div.el-dialog {
      margin: 0 !important;
      width: 100%;
      height: 100%;
    }
    div.el-dialog__body {
      height: 100%;
    }
  }
  div.swiper-img {
    position: relative;
    z-index: 1;
    height: 100%;
    div.el-carousel {
      height: 100%;
      div.el-carousel__container {
        height: 100% !important;
      }
    }
    img {
      max-width: 100%;
      max-height: 100%;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
    button.el-carousel__arrow {
      width: 31px;
      height: 51px;
      border-radius: 0;
      &.el-carousel__arrow--right {
        background: url("~@/assets/images/they/next.png") no-repeat center;
        &:hover {
          background-image: url("~@/assets/images/they/next-hover.png");
        }
      }
      &.el-carousel__arrow--left {
        background: url("~@/assets/images/they/prev.png") no-repeat center;
        &:hover {
          background-image: url("~@/assets/images/they/prev-hover.png");
        }
      }
      i {
        display: none;
      }
    }
  }
}
</style>
