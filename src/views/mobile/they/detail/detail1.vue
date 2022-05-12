<template>
  <div class="m-detail">
    <navHeader :title="info.name || '详情'" />
    <div class="banner">
      <div class="bannerimg" v-if="info._imgUrls && info._imgUrls.length > 0">
        <img
          :src="info._imgUrls[0]"
          alt
          class="fill"
          v-if="info._imgUrls.length == 1"
        />
        <el-carousel arrow="never" indicator-position="none" v-else>
          <el-carousel-item v-for="(item, index) in info._imgUrls" :key="index">
            <img :src="item" alt class="fill" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="into" v-if="info.objStatus">
        <img src="@/assets/mimg/detail/sanjiao.png" alt />
        <span @click="toArt">进入3D空间</span>
      </div>
      <div class="into" v-else>
        <img src="@/assets/mimg/detail/time.png" alt />
        <span>正在处理中</span>
      </div>
      <div
        class="backindex"
        @click="$router.push({ name: 'index' })"
        v-if="showBack"
      >
        返回首页
      </div>
    </div>

    <div class="page-content m-container">
      <div class="title">{{ info.name }}</div>
      <div class="user-info">
        <div class="avatar">
          <img :src="info.headimgurl" alt />
        </div>
        <div class="content">
          <div class="name">{{ info.username }}</div>
          <div class="time">
            <div class>{{ info._date }}</div>
            <div class="browserCount">
              <img src="@/assets/mimg/detail/eye.png" alt />{{
                info.browserCount
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="text" v-if="info.description">{{ info.description }}</div>
      <div class="water-w" v-if="info.pictures">
        <div class="water">
          <waterEasy
            :maxCols="2"
            :imgsArr="info.pictures"
            :showNum="showNum"
            srcKey="url"
          >
            <template v-slot="{ item }">
              <div class="card" @click="toMaterial(item)">
                <img :src="item.url" alt="" class="thumb" />
              </div>
            </template>
          </waterEasy>
          <div class="gradient" v-if="info.pictures.length > showNum"></div>
        </div>
        <div
          class="allOpen"
          v-if="info.pictures.length > showNum"
          @click="showNum = Infinity"
        >
          展开全部
        </div>
      </div>
    </div>

    <div class="comment-love-w">
      <div class="comment-love" v-if="favoriteUserList.length > 0">
        <div class="icon">
          <img src="@/assets/mimg/detail/love.png" alt="" />
        </div>
        <ul>
          <li v-for="(item, index) in favoriteUserList" :key="index">
            <img :src="item.headimgurl" alt />
          </li>
          <li
            class="more"
            @click="loveShow = info.favoriteUserList.length"
            v-show="loveShow < info.favoriteUserList.length"
          >
            <span></span><span></span><span></span>
          </li>
        </ul>
      </div>
      <Mcomment v-if="config.path" :config="config" ref="comment" />
    </div>
    <countNumber :info="info"></countNumber>
  </div>
</template>
<script>
import navHeader from "mobile/components/nav-header.vue";
import waterEasy from "@/components/vue-water-easy.vue";
import Mcomment from "mobile/components/m-comment.vue";
import countNumber from "mobile/components/count-number.vue";
export default {
  name: "m-detail",
  data() {
    let tempid = this.$route.params.tempid;
    return {
      loveShow: 15, //显示的头像个数
      showNum: 4, //瀑布流个数
      tempid: tempid,
      showBack: window.history.length <= 1,
      info: {
        favoriteUserList: [],
      },
      config: {
        path: tempid, //标识 id,针对哪个的评论标识
        defAvatar:
          "//3dshichuang.com/scene-portal/resources/wxapp/images/avatar.png", //有些评论没有头像的，给个默认头像
        defNick: "游客", //有些评论如果没有名字，就使用默认的
        appId: "4cG6KBG54iv4KdOhfOwagBBu-gzGzoHsz",
        appKey: "kSAwH65w4qmnpQgOBa4qvwBA",
      },
    };
  },
  components: {
    navHeader,
    waterEasy,
    Mcomment,
    countNumber,
  },
  computed: {
    favoriteUserList() {
      return this.info.favoriteUserList.slice(0, this.loveShow);
    },
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      var me = this;
      var param = { tempid: this.tempid };
      if (me.userinfo) {
        param["token"] = me.userinfo.token;
      } else {
        me.$utils.addSceneHistory(me.tempid);
      }

      me.$http
        .getSceneInfo(this.tempid)
        .then((info) => {
          console.log(info);
          me.$utils.formatItem(info, { width: 512 });
          me.info = info;
          me.pictures = info._imgUrls;
          if (info.musicUrl) {
            me.audio = new Audio(info.musicUrl);
          }
          if (info.userId) {
            me.getUserInfo(info.userId, info.tempId);
          }
        })
        .catch(() => {});
    },
    getUserInfo(userId, tempId) {
      var me = this;
      console.log({ info });
      me.$http
        .getOtherUserInfo({ userId, tempId })
        .then((userInfo) => {
          me.user = userInfo;
        })
        .catch(() => {});
    },
    toArt() {
      if (this.info && this.info.objStatus) {
        let url = this.$utils.getArtViewUrl({ G_TEMP_ID: this.tempid });
        window.location.href = url;
      }
    },
    toMaterial(item) {
      this.$router.push({
        name: "detailMaterial",
        params: {
          tempid: this.tempid,
          materialid: item.objId,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped src="./detail.scss"></style>
<style lang="scss">
.m-detail {
  div.bannerimg {
    .el-carousel {
      height: 100%;
      div.el-carousel__container {
        height: 100%;
        div.el-carousel__item {
          height: 100%;
        }
      }
    }
  }
}
</style>
