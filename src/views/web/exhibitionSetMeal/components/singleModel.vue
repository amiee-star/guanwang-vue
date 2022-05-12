<template>
  <div class="box flex-center-column">
    <div class="img">
      <div class="fb btn" v-if="data.publish == 1">发布中</div>
      <div class="xg btn" v-if="data.publish == 2 && data.publishAfterStatus == 1">有修改</div>
      <div class="wf btn" v-if="data.publish == 0">未发布</div>
      <img
        :class="data.thumb ? '' : 'defaultImg'"
        :src="
          data.thumb ? data.thumb : require('@/assets/images/self/logo-hui.png')
        "
      />
      <div
        class="editors hoverImg">
        <ul class="editors flex" v-if="data.publish == 1 || data.publish == 2">
          <li
            v-for="(item, index) in edit"
            :key="index"
            @click="lookOrEdit(item.text)">
            {{ item.text }}
          </li>
        </ul>
        <div class="code" @click="toUrl(data.tempId)" v-if="data.publish == 2 && data.publishAfterStatus !== 1">
          <img :src="imgSrc" alt="" />
        </div>
        <div v-if="data.publish == 0 || data.publish == 2 && data.publishAfterStatus == 1" class="fabu" @click="fabu(data.tempId)">发布</div>
      </div>
    </div>
    <div class="name">
      <p class="tow">{{ data.tempName }}</p>
      <p class="mianji">{{ data.validSz }}m²</p>
    </div>
<!--    <exhibitionSet ref="exhibitionSet"></exhibitionSet>-->
    <Dialog
      :dialogVisible="islook"
      :data="data"
      @closeDialog="closeDialog"
    ></Dialog>
  </div>
</template>

<script>
import Dialog from "./dialog";

export default {
  name: "singleModel",
  props: ["data", "token"],
  data() {
    return {
      imgSrc: "",
      islook: false,
      edit: [
        {
          text: "配置",
          popover: false,
        },
        {
          text: "删除",
          popover: false,
        },
        {
          text: "编辑",
          popover: false,
        },
      ],
      name: this.data.name,
      isRename: false,
      baseUrl: process.env.VUE_APP_artHost + "/scene-portal/",
    };
  },
  components: {
    Dialog,
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    },
  },
  mounted() {
    this.getShareImg();
  },
  methods: {
    closeDialog(e) {
      this.islook = false;
      if (e) {
        this.$emit("getList");
      }
    },
    toUrl(tempid) {
      // this.$http.addHistory({ tempId: this.tempid });
      var url = this.$utils.getArtViewUrl({ G_TEMP_ID: tempid });
      window.open(url, "_blank");
    },

    getShareImg() {
      let me = this;
      let url = this.$utils.getArtViewUrl(
        { G_TEMP_ID: me.data.tempId },
        location.origin
      );
      me.imgSrc = me.$http.generateQRCode + encodeURIComponent(url);
    },
    del() {},
    fabu(id) {
      this.$http.Kfpublish(id).then((res) => {
        this.$Ruler.success({
          msg: "发布成功",
          desc: "预计处理时间1.5分钟，进入“模板管理”刷新页面查看发布状态",
        });
        this.$emit("getList");
      });
    },
    lookOrEdit(text) {
      console.log(text, 1078);
      if (text == "配置") {
        // console.log(11111);
        // this.$refs.exhibitionSet.open(this.data);
        this.islook = true;
        // this.$Ruler.confirm({
        //   msg: "",
        //   desc: "删除展厅模板后，不可恢复，同时将不会在模板获取API接口中显示",
        // });
      } else if (text == "删除") {
        let me = this;
        if (me.data.templateCount > 0) {
          me.$Ruler.warn({
            msg: "删除失败",
            desc: "此模板已经关联展厅，不可删除",
          });
        } else {
          me.$Ruler
            .confirm({
              msg: "",
              desc:
                "删除展厅模板后，不可恢复，同时将不会在模板获取API接口中显示",
            })
            .then((res) => {
              console.log(me.data, 129);
              // return;
              if (res === "ok") {
                me.$http
                  .sceneDelete({
                    tempId: me.data.tempId,
                  })
                  .then((ress) => {
                    me.$Ruler.success("删除成功");
                    me.$emit("getList");
                  });
              }
            });
        }
      } else if (text == "编辑") {
        // window.artHost
        let me = this;
        if (me.data.pcCreate) {
          let me = this;

          me.$utils
            .getArtEditorUrl({
              tempId: me.data.tempId,
              token: me.userinfo.token,
            })
            .then((url) => {
              window.open(url + "&setMeal=1", "_blank");
            });
        } else {
          me.$message.warning("此展厅由小程序创建，无法在电脑端编辑！");
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
.box {
  position: relative;
  border-bottom: 1px solid #fff;
  background: #eee;
  .img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 169px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and(min-width: 1920px) {
      height: 200px;
    }
    .btn {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 53px;
      height: 24px;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular;
      color: #ffffff;
      border-radius: 3px;
      text-align: center;
      line-height: 24px;
    }
    .fb {
      background: #19a0f1;
    }
    .xg {
      background: #fbb03b;
    }
    .wf {
      background: #fe5a60;
    }
    .editors {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 5;
      display: none;
      li {
        width: 42px;
        height: 30px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 3px;
        text-align: center;
        line-height: 30px;
        margin-left: 5px;
        cursor: pointer;
        &:hover {
          color: #23b8ff;
        }
        i {
          width: 100%;
          height: 100%;
        }
        img {
          vertical-align: middle;
          max-width: 18px;
        }
      }
    }
    .hoverImg {
      background: rgba(0, 0, 0, 0.7);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      .code {
        cursor: pointer;
        width: 110px;
        height: 110px;
        background: #fff;
        border-radius: 5px;
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          max-width: 100px;
          max-height: 100px;
        }
      }
      .fabu {
        width: 98px;
        height: 36px;
        background: #23b8ff;
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        color: #ffffff;
        border-radius: 100px;
        text-align: center;
        line-height: 36px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
    }
    &:hover {
      .editors {
        display: flex;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      &.defaultImg {
        width: 175px;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .name {
    width: 100%;
    height: 45px;
    line-height: 45px;
    position: absolute;
    bottom: 0;
    background: #fff;
    padding: 0 12px;
    color: #333333;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .mianji {
      font-size: 14px;
      font-family: SourceHanSansCN-Regular;
      line-height: 25px;
      color: #999999;
    }
  }
}
</style>
