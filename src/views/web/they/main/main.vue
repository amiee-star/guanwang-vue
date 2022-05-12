<template>
  <div class="they-main">
    <div class="banner">
      <!-- <img src="@/assets/images/self/my-space.jpg" alt=""> -->
      <scaleImage :bannerTopImg="bannerTopImg"></scaleImage>
    </div>
    <div class="base-container">
      <div class="navs">
        <div class="userinfo">
          <div class="avatar">
            <img :src="user.headimgurl" alt="" v-if="user.headimgurl" />
          </div>
          <div class="info">
            <div class="content">
              <div class="name">{{ user.nickname }}</div>
              <p>{{ user.sign }}</p>
            </div>
          </div>
        </div>
        <div class="nav">
          <span :class="{ active: tapIndex == 0 }" @click="changeTap(0)"
            >{{ sceneCount }}<i>.</i>动态</span
          >
          <span :class="{ active: tapIndex == 1 }" @click="changeTap(1)"
            >{{ favoriteCount }}<i>.</i>喜欢</span
          >
        </div>
      </div>
      <ul class="list">
        <li v-for="(recommand, index) in entities[tapIndex]" :key="index">
          <card-box :data="recommand"></card-box>
        </li>
      </ul>
      <div class="loading" ref="loading"></div>
    </div>
  </div>
</template>

<script>
import cardBox from "@/components/card-box.vue";
import scaleImage from "@/components/scale-image.vue";
export default {
  data() {
    console.log(this.$route.params);
    return {
      tapIndex: 0,
      bannerTopImg: require("@/assets/images/self/my-space.jpg"),
      userId: this.$route.params.userId,
      tempId: this.$route.params.tempId,
      entities: {},
      pageSize: 20,
      currentPage: 1,
      hasData: true,
      isLoading: false,
      user: {},
      sceneCount: "",
      favoriteCount: "",
    };
  },
  components: {
    cardBox,
    scaleImage,
  },
  created() {

  },
  mounted() {
    this.getUserInfo();
    this.getList();
    this.getOtherUserCount();
    window.addEventListener("scroll", this.onscorll);
  },
  methods: {
    onscorll() {
      //console.log($(window).scrollTop(),$(this.$refs.loading).offset().top - $(window).height());
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
    // 获取他人信息接口变更为通过tempId查展厅详情即可
   async getUserInfo() {
      var me = this;
      // me.$http
      //   .getOtherUserInfo({ tempId: me.tempId })
      //   .then((res) => {
      //     console;
      //     me.user = me.$utils.formatUser(res);
      //   })
      //   .catch(() => {});

      try {
        let info = await me.$http.getSceneInfo(me.tempId)
        me.user = me.$utils.formatUser(info);
        if (
                this.$store.state.userinfo &&
                this.$store.state.userinfo.token &&
                window.localStorage.getItem("userId") == info.userId
        ) {
          this.$router.push({
            name: "selfMain",
          });
        }
      } catch (e) {
        console.log(e);
      }

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
        .getOherscenes({
          tempId: me.tempId,
          pageSize: me.pageSize,
          pageNum: me.currentPage,
          type: me.tapIndex,
        })
        .then((res) => {
          console.log(res);
          var entities = res.list || [];
          me.$utils.formatList(entities);
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
        });
    },
    getOtherUserCount() {
      let me = this;
      me.$http
        .getOtherUserCount({ tempId: me.tempId })
        .then((info) => {
          me.sceneCount = info.tempCount;
          me.favoriteCount = info.favoriteCount;
        })
        .catch(() => {});
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.onscorll);
  },
};
</script>

<style lang="scss" scoped src="./main.scss"></style>
