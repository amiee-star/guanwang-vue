<template>
  <div class="left-informat">
    <ul class="nav">
      <li :class="{ active: index == 0 }" @click="scrollTo(0)">信息</li>
      <li :class="{ active: index == 1 }" @click="scrollTo(1)">展品</li>
      <li :class="{ active: index == 2 }" @click="scrollTo(2)">评价</li>
    </ul>
    <div class="information">
      <vue-scroll
        ref="informat"
        @vuescroll="onscroll"
        @reachBottom="reachBottom"
      >
        <div class="userinfo borderbottom">
          <div class="user">
            <div class="avatar" @click="toSpace">
              <img :src="info.headimgurl" alt />
            </div>
            <div class="desc">
              <div class="title" @click="toSpace">{{ info.nickname }}</div>
              <div class="dongtai">
                <!-- {{ user.sceneCount }} 动态 {{ user.viewCount }} 访客 -->
                {{ info.countTempSize }} 动态 {{ info.viewCount }} 访客
              </div>
            </div>
          </div>
          <div class="to-space">
            <!-- !! -->
            <!-- :disabled="!info.userId" -->
            <el-button type="primary" class="confirm" @click="toSpace"
              >TA的空间</el-button
            >
          </div>
        </div>

        <div class="zhanting borderbottom" ref="zhanting">
          <div class="block">
            <div class="name">{{ info.tempName }}</div>
            <div class="count" v-if="!materialid">
              <dl>面积：{{ info.validSz | format45 }}㎡</dl>
              <dl>
                <span>
                  <img src="@/assets/images/they/eye.png" alt />
                  {{ info.viewCount | formatnum }} </span
                >|
                <span>
                  <img src="@/assets/images/they/heart.png" alt />
                  {{ info.favoriteCount | formatnum }} </span
                >|
                <span>
                  <img src="@/assets/images/they/dianzan.png" alt />
                  {{ info.likeCount | formatnum }}
                </span>
              </dl>
            </div>
            <div class="desc">
              <pre>{{ info.description }}</pre>
            </div>
          </div>
        </div>

        <div class="article" v-if="a_articleTitle">
          <h4>{{ a_articleTitle }}</h4>
          <div class="articleCon" v-html="a_articleContent"></div>
        </div>

        <div class="about borderbottom" ref="about">
          <div class="block">
            <div class="title">相关推荐</div>
            <div class="water-w">
              <div class="water">
                <vueWaterEasy
                  :imgsArr="info.pictures"
                  srcKey="url"
                  :showNum="showNum"
                >
                  <template v-slot="{ item }">
                    <!--  @click="$emit('materialClick', item)" -->
                    <div class="card">
                      <img
                        :src="item.url"
                        alt
                        class="thumb"
                        v-if="item.type == 1"
                      />
                      <!--<img src="@/assets/images/they/3d.png" alt="" class="d3">
                      <p>鼠标悬停名称出鼠标悬停名称出</p>-->
                    </div>
                  </template>
                </vueWaterEasy>
                <div
                  class="gradient"
                  v-if="info.pictures.length > showNum"
                ></div>
              </div>
              <div
                class="allOpen"
                v-if="info.pictures.length > showNum"
                @click="showNum = Infinity"
              >
                加载更多
              </div>
            </div>
          </div>
        </div>
        <div class="comments" ref="comments">
          <div class="block">
            <div class="title">评论（{{ valineCount }}）</div>
            <div class="notlogin" v-show="!userinfo">
              发表评论前请先
              <span @click="toLogin">登录</span>
            </div>
            <div class="logined" id="commentList">
              <vue-comment
                v-if="config.path"
                :person="person"
                :config="config"
                :showLoadMore="false"
                :showCount="false"
                :showEditor="!!userinfo"
                @atReply="atReply"
                @countChange="countChange"
                @clickAvatar="clickAvatar"
                @clickName="clickName"
                @clickAt="clickAt"
                ref="comment"
              ></vue-comment>
            </div>
          </div>
        </div>
      </vue-scroll>
    </div>
    <div
      class="moveBox"
      v-show="info.parentId && !info.canPutCount && fixedVisible"
    >
      <div @click="toBuy" :class="[fixedVisible ? 'showBox' : 'fixedBox']">
        <img class="normal" src="@/assets/images/they/quickcreate.png" />
        <img class="hover" src="@/assets/images/they/quickcreate-h.png" />
      </div>
    </div>
  </div>
</template>

<script>
import textEllipsis from "@/components/text-ellipsis.vue";
import store from "@/store";
import vueComment from "@/components/vue-comment/comment.vue";
import vueWaterEasy from "@/components/vue-water-easy.vue";
export default {
  props: {
    info: {
      type: Object,
      default: {},
    },
    user: {
      type: Object,
      default: {},
    },
    tempid: {
      type: String,
    },
    materialid: {
      type: String,
    },
    articleContent: { type: String },
    articleTitle: { type: String },
  },
  name: "information",
  watch: {
    materialid(val) {
      if (val) {
        this.$set(this.config, "path", val);
      }
    },
  },
  data() {
    return {
      fixedVisible: false,
      index: 0,
      showNum: 6, //瀑布流个数
      isScroll: false,
      dom: [],
      valine: null,
      valineCount: 0,
      config: {
        path: this.materialid || this.tempid, //标识 id,针对哪个的评论标识
        defAvatar:
          "//3dshichuang.com/scene-portal/resources/wxapp/images/avatar.png", //有些评论没有头像的，给个默认头像
        defNick: "游客", //有些评论如果没有名字，就使用默认的
        appId: "4cG6KBG54iv4KdOhfOwagBBu-gzGzoHsz",
        appKey: "kSAwH65w4qmnpQgOBa4qvwBA",
      },
    };
  },
  computed: {
    a_articleTitle() {
      return this.articleTitle;
    },
    a_articleContent() {
      return this.articleContent;
    },
    userinfo() {
      return store.state.userinfo;
    },
    person() {
      if (store.state.userinfo) {
        return {
          nick: store.state.userinfo.username,
          attach: {
            userId: store.state.userinfo.userId,
          },
          ua: "art-office",
          avatar: store.state.userinfo.headimgurl,
        };
      } else {
        return {
          nick: "游客",
          attach: {},
          ua: "art-office",
          avatar: "",
        };
      }
    },
  },
  components: {
    textEllipsis,
    vueComment,
    vueWaterEasy,
  },
  mounted() {
    console.log(this.info);
    console.log(this.config);
    var me = this;
    this.dom = [me.$refs.zhanting, me.$refs.about, me.$refs.comments];
    setTimeout(function() {
      me.fixedVisible = true;
    }, 1000); //3s显示快速布展
  },
  methods: {
    toBuy() {
      this.$router.push({
        name: "buyTpl",
        query: { parentId: this.info.parentId },
      });
    },
    atReply() {
      // informat
      var me = this;
      var dom = this.dom[2];
      me.$refs.informat.scrollTo(dom.offsetTop - 100);
    },
    countChange(e) {
      this.valineCount = e;
      if (this.tempid) {
        if (this.materialid) {
          this.$http
            .updateObjComment({
              count: e,
              objId: this.materialid,
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          this.$http
            .updateCommentCount({
              tempid: this.tempid,
              count: e,
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    },
    clickAvatar(e) {
      console.log(e);
    },
    clickName(e) {
      console.log(e);
      var attach = e["attach"] || {};
      var userId = attach.userId;
      if (userId) {
        this.$router.push({ name: "theySpace", params: { userId } });
      }
    },
    clickAt(e) {
      console.log(e);
      var atattach = e["atattach"] || {};
      var userId = atattach.userId;
      if (userId) {
        this.$router.push({ name: "theySpace", params: { userId } });
      }
    },
    reachBottom() {
      //注意：如果开启了 showLoadMore ，也就是加载更多的按钮，就不要滚动到底部，自动加载
      this.$refs.comment && this.$refs.comment.query();
    },
    toLogin() {
      var me = this;
      me.$Ruler.account({
        options: {
          operate: 0,
        },
      });
    },
    onscroll(scrollTop) {
      var me = this;
      if (me.isScroll) {
        return;
      }
      var scrtp = scrollTop + 60;
      if (scrtp < me.$refs.zhanting.offsetTop) {
        //一
        me.setIndex(0);
      } else if (scrtp < me.$refs.about.offsetTop) {
        // 二
        me.setIndex(1);
      } else {
        //三
        me.setIndex(2);
      }
    },
    setIndex(index) {
      var me = this;
      if (me.index != index) {
        var dom = me.dom[index];
        $(dom).addClass("light");
        me.timer = setTimeout(() => {
          $(dom).removeClass("light");
          me.isScroll = false;
        }, 1000);
        me.index = index;
      }
    },
    scrollTo(index) {
      if (this.index != index) {
        var dom = this.dom[index];
        var me = this;
        me.isScroll = true;
        me.$refs.informat.scrollTo(dom.offsetTop - 100);
        me.setIndex(index);
      }
    },
    toSpace() {
      // if (this.info.userId) {
      this.$root.closeDialog && this.$root.closeDialog(true);
      this.$router.push({
        name: "theySpace",
        params: { userId: this.info.userId, tempId: this.info.tempId },
      });
      // }
    },
  },
  destroyed() {
    $(this.$refs.informat).off("scroll", this.onscroll.bind(this));
  },
};
</script>
<style lang="scss" scoped>
.left-informat {
  height: 100%;
  position: relative;
  /*transform: translate3d(0,0,0);*/
  div.moveBox {
    position: absolute;
    top: 45vh;
    z-index: 9;
    left: 0;
    animation: fadeInRight 1s forwards;
    /*transform: translate3d(0,0,0);*/
    div.showBox {
      width: 40px;
      height: 92px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.35);
      border-radius: 20px;
      animation: scaleDraw 3s ease-in-out infinite;
      /*transform: translate3d(0,0,0);*/
      img {
        width: 26px;
      }
      img.normal {
        display: block;
      }
      img.hover {
        display: none;
      }
      &:hover {
        img.normal {
          display: none;
        }
        img.hover {
          display: block;
        }
      }
    }
    div.fixedBox {
      /*transform: translate3d(0,0,0);*/
      width: 40px;
      height: 92px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.35);
      border-radius: 20px;
      img.normal {
        display: block;
      }
      img.hover {
        display: none;
      }
      &:hover {
        img {
          display: none;
        }
        img.hover {
          display: block;
        }
      }
    }
  }
  ul.nav {
    /*transform: translate3d(0,0,0);*/
    height: 56px;
    line-height: 53px;
    font-size: 18px;
    border-bottom: 1px solid #e7e7e7;
    background: #fff;

    li {
      /*transform: translate3d(0,0,0);*/
      border-right: 1px solid #e7e7e7;
      //border-top: 2px solid transparent;
      //border-bottom: 1px solid transparent;
      width: 76px;
      text-align: center;
      color: #999999;
      font-size: 18px;
      float: left;
      cursor: pointer;
      &.active {
        /*transform: translate3d(0,0,0);*/
        display: flex;
        flex-direction: column;
        color: #333;
        border-bottom: unset;
        border-top: unset;
        &:after {
          content: "";
          height: 3px;
          background: #333;
          width: 76px;
          /*transform: translate3d(0,0,0);*/
        }
      }
    }
  }
  .information {
    height: calc(100% - 56px);
    /*transform: translate3d(0,0,0);*/
    position: relative;
    z-index: 10;
    background: #fff;
    .light {
      background: #eee;
    }
    .block {
      padding: 20px;
    }
    .borderbottom {
      border-bottom: 1px solid #e7e7e7;
    }
    .userinfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;

      div.user {
        display: flex;
        div.avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          overflow: hidden;
          /*transform: translate3d(0,0,0);*/
          cursor: pointer;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        div.desc {
          padding-left: 12px;
          padding-top: 6px;

          div.title {
            color: #333333;
            font-size: 16px;
            cursor: pointer;
            padding-bottom: 2px;
            /*transform: translate3d(0,0,0);*/
          }
          div.dongtai {
            /*transform: translate3d(0,0,0);*/
            color: #999999;
            font-size: 14px;
          }
        }
      }

      div.to-space {
        button {
          width: 92px;
          height: 36px;
          line-height: 0;
          border-radius: 3px;
          padding: 0;
          /*transform: translate3d(0,0,0);*/
          &:hover {
            background: #00a3ff;
          }
        }
      }
    }

    div.zhanting {
      div.name {
        color: #333333;
        font-size: 24px;
        padding-bottom: 16px;
        /*transform: translate3d(0,0,0);*/
      }
      pre {
        white-space: pre-wrap;
      }
      div.count {
        color: #e7e7e7;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        dl {
          font-size: 14px;
          /*transform: translate3d(0,0,0);*/
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          span {
            color: #999;
            display: inline-block;
            vertical-align: middle;
            padding: 0 15px;
            img {
              vertical-align: middle;
              margin-right: 4px;
              margin-top: -3px;
            }
            &:first-child {
              padding-left: 0;
            }
          }
        }
      }
      div.desc {
        //padding-top: 26px;
        color: #616161;
        line-height: 26px;
        font-size: 14px;
      }
    }
    div.title {
      color: #333333;
      font-size: 16px;
      padding-bottom: 14px;
      /*transform: translate3d(0,0,0);*/
    }
    div.article {
      margin: 22px 20px 0 20px;
      padding-bottom: 18px;
      border-bottom: 1px solid #e7e7e7;
      > h4 {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .articleCon {
        margin-top: 12px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(97, 97, 97, 1);
        line-height: 26px;
        ::v-deep img {
          max-width: 377px;
          margin: 13px 0 7px 0;
        }
      }
    }
    div.about {
      div.card {
        position: relative;
        background: #eee;
        cursor: pointer;
        img.thumb {
          display: block;
          width: 100%;
        }
        img.d3 {
          position: absolute;
          top: 10px;
          left: 10px;
        }
        p {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          padding: 0 8px;
          line-height: 24px;
          background: rgba(0, 0, 0, 0.5);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #fff;
        }
      }
      div.water-w {
        div.water {
          position: relative;
          div.gradient {
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 1;
            width: 100%;
            height: 25%;
            background: linear-gradient(
              0deg,
              rgba(255, 255, 255, 1) 0%,
              rgba(255, 255, 255, 0) 100%
            );
          }
        }

        div.allOpen {
          width: 100px;
          height: 32px;
          text-align: center;
          line-height: 30px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(221, 221, 221, 1);
          border-radius: 30px;
          margin: 0 auto;
          font-size: 14px;
          color: #333333;
          cursor: pointer;
        }
      }
    }

    div.comments {
      /*transform: translate3d(0,0,0);*/
      div.notlogin {
        height: 52px;
        line-height: 52px;
        text-align: center;
        background: rgba(246, 246, 246, 1);
        border: 1px solid rgba(231, 231, 231, 1);
        border-radius: 3px;
        font-size: 14px;
        /*transform: translate3d(0,0,0);*/
        color: #333333;
        span {
          color: #23b8ff;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.left-informat {
  #commentList {
    div.vcount {
      display: none !important;
    }
  }
}

@keyframes scaleDraw {
  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
  0% {
    transform: scale(1);
    /*开始为原始大小*/
  }
  25% {
    transform: scale(1.05);
    /*放大1.1倍*/
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.05);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translateX(300px);
    transform: translateX(300px);
  }
  to {
    opacity: 1;
    -webkit-transform: translateX(-56px);
    transform: translateX(-56px);
  }
}
</style>
