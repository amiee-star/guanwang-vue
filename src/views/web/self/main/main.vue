<template>
  <div class="self-main">
    <div class="banner">
      <!-- <img src="@/assets/images/self/my-space.jpg" alt=""> -->
      <div class="bannerShade"></div>
      <scaleImage :bannerTopImg="bannerTopImg"></scaleImage>
    </div>
    <div class="self-base-container">
      <div class="navs">
        <div class="userinfo">
          <div class="avatar">
            <img :src="userinfo.avatar + '?v=' + Math.random()" alt="" />
            <p @click="imagesClip = true">更换头像</p>
          </div>
          <div class="info">
            <div class="content">
              <div class="name">{{ userinfo.nickname }}</div>
              <p>{{ userinfo.signature }}</p>
            </div>
          </div>
        </div>
        <div class="nav">
          <span :class="{ active: tapIndex == 0 }" @click="changeTap(0)"
            >{{ sceneCount }}<i>.</i>动态</span
          >
          <span :class="{ active: tapIndex == 1 }" @click="changeTap(1)"
            >{{ favoriteCount }}<i>.</i>收藏</span
          >
          <span :class="{ active: tapIndex == 2 }" @click="changeTap(2)"
            >{{ browseCount }}<i>.</i>历史</span
          >
          <span class="standard" @click="standardHandle"
            ><i class="el-icon-warning-outline"></i>了解收费标准</span
          >
        </div>
      </div>
      <ul class="list">
        <li @click="tocreate" v-if="tapIndex == 0">
          <div class="box">
            <div class="add">
              <div>
                <img src="@/assets/images/self/add.png" alt="" />
                <p>挑选模板 创建展厅</p>
              </div>
            </div>
          </div>
        </li>
        <li v-for="(recommand, index) in entities[tapIndex]" :key="index">
          <card-box
            :data="recommand"
            :ismy="ismy"
            :operate="operate"
            :index="index"
            ref="cardBox"
            @delete="ondelete"
            @onset="(val)=> {$refs.exhibitionSet.open(recommand,val)}"
            @pulish="pulish"
          ></card-box>
        </li>
      </ul>
      <div class="loading" ref="loading"></div>
    </div>
    <imagesClip
      :isvisible="imagesClip"
      @close="imagesClip = false"
      @changeImg="changeImg"
      :coverUrl="userinfo.avatar"
    ></imagesClip>

    <exhibitionSet ref="exhibitionSet" @close="pulish"></exhibitionSet>
    <standard></standard>
    <fixed-tool></fixed-tool>
  </div>
</template>

<script>
import standard from "@/components/standard.vue";
import cardBox from "@/components/card-box.vue";
import scaleImage from "@/components/scale-image.vue";
import imagesClip from "@/components/image-clip.vue";
import exhibitionSet from "@/components/exhibition-set/exhibition-setInfo.vue";

export default {
  data() {
    return {
      tapIndex: 0,
      bannerTopImg: require("@/assets/images/self/my-space.jpg"),
      entities: {},
      pageSize: 20,
      currentPage: 1,
      hasData: true,
      isLoading: false,
      imagesClip: false,
      isShare: false,
      createAuto: true,
      tempids: [],
      ismy: false,
      sceneCount: 0,
      browseCount: 0,
      favoriteCount: 0,
    };
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    },
    operate() {
      if (this.tapIndex == 0) {
        this.ismy = true;
      } else {
        this.ismy = false;
        return {
          delete: true,
        };
      }
    },
  },
  components: {
    cardBox,
    scaleImage,
    imagesClip,
    exhibitionSet,
    standard,
  },
  mounted() {
    this.getUserInfo();
    this.getList();
    this.getUserCountInfo();
    window.addEventListener("scroll", this.onscorll);
  },
  methods: {
    standardHandle() {
      this.$store.commit("setStates", {
        k: "isShowStandard",
        v: true,
      });
      console.log(this.$store.state.isShowStandard);
    },
    onscorll() {
      var offset = $(this.$refs.loading).offset();
      if (offset && $(window).scrollTop() >= offset.top - $(window).height()) {
        //需要数据
        this.getList();
      }
    },
    changeTap(e) {
      this.tapIndex = e;
      this.currentPage = 1;
      this.hasData = true;
      this.isLoading = false;
      this.entities = {};
      this.$nextTick(() => {
        this.getList();
      });
    },
    tocreate() {
      const me = this;
      me.$router.push({ name: "buyTpl" });
    },
    getUserInfo() {
      var me = this;
      var token = me.userinfo.token;
      me.$store.dispatch("getUserInfo", { token: token });
    },
    getList() {
      var me = this;
      if (!me.hasData || me.isLoading) {
        return;
      }
      var list = [];
      var tapIndex = me.tapIndex;
      if (me.currentPage > 1) {
        list = me.entities[tapIndex];
      }
      me.isLoading = true;
      me.$http
        .getMyscenes({
          pageSize: me.pageSize,
          pageNum: me.currentPage,
          type: tapIndex,
          favoriteType: 1,
        })
        .then((res) => {
          var entities = res.list || [];
          me.$utils.formatList(entities);
          me.tempids = [];
          if (this.tapIndex === 0) {
            entities.forEach((item) => {
              if (item.publish == me.$commConst.PUBLISH.publishing) {
                me.tempids.push(item.tempId);
              }
            });
          }
          if (entities.length < me.pageSize) {
            me.hasData = false;
          }
          me.currentPage = ++me.currentPage;
          list = list.concat(entities);
          me.$set(me.entities, tapIndex, list);
        })
        .catch(() => {})
        .finally(() => {
          me.isLoading = false;
          if (tapIndex == 0) {
            me.timer = setInterval(() => {
              if (me.tempids.length > 0) {
                me.publishState();
              } else {
                clearInterval(me.timer);
              }
            }, 60000);
          }
        });
    },
    changeImg(file, base) {
      var me = this;
      var dt = new FormData();
      dt.append("token", me.userinfo.token);
      dt.append("file", file);
      me.$loading();
      me.$http
        .editHeadimg(dt)
        .then((res) => {
          setTimeout(function() {
            me.$loading().close();
          }, 500);
          me.$store.commit("setUserInfoKeyVal", {
            k: "headimgurl",
            v: res + "?v=" + new Date().getTime(),
          });
          location.reload();
        })
        .catch(() => {});
    },
    async ondelete(index, tempid) {
      var me = this;
      try {
        if (me.tapIndex == 0) {
          //删除自己的
          await me.$http.sceneDelete({ tempId: tempid });
          me.sceneCount -= 1;
          // me.$store.commit("setUserInfoKeyVal", {k: "sceneCount", v: me.userinfo.sceneCount - 1});
        } else if (me.tapIndex == 1) {
          //删除喜欢的
          await me.$http.unfavorite({ tempId: tempid });
          me.favoriteCount -= 1;
          // me.$store.commit("setUserInfoKeyVal", {k: "favoriteCount", v: me.userinfo.favoriteCount - 1});
        } else {
          await me.$http.delHistory({ tempId: tempid });
          //删除历史的 browseCount
          me.browseCount -= 1;
          // me.$store.commit("setUserInfoKeyVal", {k: "browseCount", v: me.userinfo.browseCount - 1});
        }
        // console.log(me.entities)
        // me.entities.splice(index,1);
        me.entities[me.tapIndex].splice(index, 1);
        // me.entities[me.tapIndex] = Object.assign({}, me.entities[me.tapIndex])
        me.$Ruler.success("删除成功");
      } catch (e) {
        console.log(e);
      }
    },
    publishState() {
      let me = this;
      if (!me.userinfo.token) {
        return;
      }
      if (me.tempids.length == 0) {
        return;
      }
      me.$http
        .publishState({
          tempids: me.tempids.toString(),
        })
        .then((res) => {
          // 确保是自己的状态
          let arr = me.entities[0];
          arr.forEach((item) => {
            res.forEach((one) => {
              if (item.tempId === one.tempid) {
                me.$set(item, "publish", one.publish);
                me.$set(item, "publishAfterStatus", 0); // 是否有修改
                if (
                  one.publish === me.$commConst.PUBLISH.published ||
                  one.publish === me.$commConst.PUBLISH.publishing
                ) {
                  me.$set(item, "check", 0);
                }
              }
            });
          });
          me.tempids = [];
          res.forEach((item) => {
            if (item.publish === me.$commConst.PUBLISH.publishing) {
              me.tempids.push(item.tempid);
            }
          });
        });
    },
    pulish(id) {
      console.log(id);
      this.tempids.push(id);
      this.currentPage = 1;
      this.hasData = true;
      this.getList();
      let time = setTimeout(() => {
        this.publishState();
        clearTimeout(time);
      }, 4000);
    },
    async getUserCountInfo() {
      let me = this;
      let res = await this.$http.getUserCountInfo();
      me.sceneCount = res.tempCount;
      me.favoriteCount = res.favoriteCount;
      me.browseCount = res.browseCount;
      // me.$store.commit("setUserInfoKeyVal", {k:"sceneCount",v: res.tempCount})
      // me.$store.commit("setUserInfoKeyVal", {k:"browseCount",v: res.browseCount})
      // me.$store.commit("setUserInfoKeyVal", {k:"favoriteCount",v: res.favoriteCount})
    },
  },

  beforeDestroy() {
    clearInterval(this.timer);
    window.removeEventListener("scroll", this.onscorll);
  },
};
</script>

<style lang="scss" scoped src="./main.scss"></style>
