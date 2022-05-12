<template>
  <div class="card-box" :class="{ isDeleted: data.isDeleted }" @mouseleave="mouseleaveIcon()">
    <div class="exhibilion"
         :class="data._thumbnail"
         @click.stop="exhibilionClick">
      <img :src="data.thumb" class="thumbnail"/>
      <img :src="data.uurl" class="icon" v-if="data.icon"/>
      <div v-if="data.styleList && data.styleList[0] && !isHome" class="makeSame" @click.stop="toCreate">制作同款</div>
      <ul v-if="data.styleList && data.styleList[0] && !isHome" class="operationIcon">
        <li v-for="item in operationIcon" :key="item.icon" @mouseenter="mouseenterIcon(item.icon)"
            :class="data.isFavorite && item.icon === 'collection' ? 'active' : ''"
            @click.stop="clickIcon(item.icon)">
          <svg-icon :iconClass="item.icon"></svg-icon>
        </li>
      </ul>


      <div v-if="data.styleList && data.styleList[0] && !isHome"
           :class="data.styleList && data.styleList[0] ? 'showName showCase': 'showName'">

        <p class="tow">{{ data.tempName }}</p>
        <div class="flex">
          <p class="tags">{{data.styleList[0].styleName}}</p>
          <div
              class="pv flex-end"
              v-if="showCount">
            <span class="view browser">
              <svg-icon iconClass="liulan"></svg-icon>{{ data.viewCount | formatnum }}
            </span>
            <span class="view" :class="{ isLove: data.islike }">
              <svg-icon iconClass="dianzan"></svg-icon>
              {{ data.likeCount | formatnum }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex showName" v-else>
        <p :class="showCount ? 'tow' : 'tow noCount'">{{ data.tempName }}</p>
        <div class="pv flex-end" v-if="showCount">
                  <span class="view browser">
                    <svg-icon iconClass="liulan"></svg-icon>{{ data.viewCount | formatnum }}
                  </span>
          <span class="view" :class="{ isLove: data.islike }">
                        <svg-icon iconClass="dianzan"></svg-icon>
                        {{ data.likeCount | formatnum }}
                      </span>
        </div>
      </div>
    </div>
    <template v-if="ismy">
      <ul class="editors">
        <!--                <li @click="sett" v-show="data.publish === $commConst.PUBLISH.publishing">-->
        <!--                    设置-->
        <!--                </li>-->
        <li @click="editor" v-show="data.pcCreate && !isOver">
          编辑
        </li>
        <li @click="countHandle()" v-show="data.statSwitch">
          统计
        </li>
        <li>
          <el-popover
              popper-class="popover_operate"
              placement="top"
              width="140"
              trigger="hover"
              v-if="!isOver">
            <ul>
              <li :class="{ active: moreIndex == index }"
                  v-for="(item, index) in manyOperate"
                  :key="index"
                  @click="manyOprate(item, index)">
                <!--                                展厅到期时间-->
                <!--                                <p v-if="item.value && item.text === 'time'">-->
                <!--                                    {{ item.value | getYear }}到期-->
                <!--                                </p>-->
                <p>{{ item.value }}</p>
              </li>
            </ul>
            <i class="el-icon-more" slot="reference"></i>
          </el-popover>
          <p v-else @click="delet">删除</p>
        </li>
      </ul>
    </template>
    <div class="vaild-date flex" v-if="!isHome">
      <p class="usePwd" v-if="data.usePwd">
        <svg-icon icon-class="password"></svg-icon>
      </p>
      <p v-if="durationEndTs && ismy">{{ durationEndTs | getYear }}到期</p>
      <p v-if="isOver && ismy" class="overTime">已到期</p>
    </div>
    <div class="pubState"
         v-if="ismy && (data.publish != $commConst.PUBLISH.published || data.publishAfterStatus==1 || data.check == $commConst.CHECK.checkfail)">
      <el-tooltip
          popper-class="popper_checkNote"
          v-if="checkfail"
          effect="light"
          :content="data.checkNote"
          placement="bottom-start">
        <el-button><i class="el-icon-warning-outline"></i>审核未通过</el-button>
      </el-tooltip>
      <p v-else>{{ data | objStatus }}</p>
    </div>
    <div class="userInfo flex-start" v-if="data.tags" @click.stop="userClick">
      <!--      <img :src="data.headimgurl ? data.headimgurl : defaultImg" class="min-icon"/>-->
      <span class="user tow">
        {{data.tags}}
      </span>
    </div>
    <div class="objStatus" v-if="!data.objStatus && !isHome">
      <img src="@/assets/images/self/loading.png" alt=""/>正在处理中
    </div>
    <div class="deletcover" v-if="data.isDeleted && !isHome">
      <div class="showinfo">
        <img src="@/assets/images/self/yishixiao.png" alt=""/> 已失效
      </div>
    </div>
    <div
        :class="data.styleList && data.styleList[0] && !isHome ? 'share share-showCase flex-center-center': 'share flex-center-center'"
        v-if="data.check !== $commConst.CHECK.checkfail"
        @click.stop="exhibilionClick">
      <p v-if="(data.publish === $commConst.PUBLISH.notpublish || data.publish === $commConst.PUBLISH.publishing || (data.publish === $commConst.PUBLISH.published && data.publishAfterStatus))"
         class="flex-center-column toView"
         @click.stop="toView(data.tempId)">
        预览
      </p>
      <p v-if="(data.publish === $commConst.PUBLISH.notpublish || data.publishAfterStatus === 1) && data.publish !== $commConst.PUBLISH.publishing && ismy"
         class="flex-center-column publish"
         @click.stop="publishHall(data.tempId)">
        发布
      </p>
      <div
          v-if="data.publish !== $commConst.PUBLISH.publishing && (data.publish !== $commConst.PUBLISH.notpublish && data.publishAfterStatus !== 1)"
          :class="isHome ? 'homeShare' : ''">
        <img :src="$http.generateQRCode +encodeURIComponent($utils.getArtViewUrl({ G_TEMP_ID: data.tempId }))"/>
        <p class="flex-center-column"
           v-if="operate && operate.delete"
           @click.stop="delet">
          <svg-icon icon-class="delete"></svg-icon>
        </p>
      </div>
    </div>
    <setShare :tempid="data.tempId" v-if="isShare && !isHome" @close="isShare = false"/>
    <pay :visible="payVisible" :obj="payObj" @pay="pay" @open="open"></pay>
  </div>
</template>
<script>
  import setShare from "@/views/web/self/main/components/setShare.vue";
  import Crypto from "@/utils/crypto.js";
  import md5 from "js-md5";
  import pay from "@/components/popup/pay";

  export default {
    props: {
      data: {
        type: Object,
        default() {
          return {};
        },
      },
      index: {
        default: 0,
      },
      isToDetail: {
        type: Boolean,
        default: false,
      },
      ismy: {
        type: Boolean,
      },
      operate: {
        type: Object,
      },
      isHome: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        moreIndex: -1,
        isShare: false,
        imgSrc: "",
        isOver: false,
        defaultImg: "//3dshichuang.com/scene-portal/resources/wxapp/images/avatar.png",
        payData: {},
        payObj: {},
        tempId: "",
        payVisible: false,
        vrText: "开通VR带看",
        operationIcon: [{icon: "QRCode"}, {icon: "browse"}, {icon: "collection"}],
        favoriting: false,
      };
    },
    components: {
      setShare,
      pay,
    },
    computed: {
      userinfo() {
        return this.$store.state.userinfo;
      },
      manyOperate() {
        let {publish, check, publishAfterStatus} = this.data;
        let num = this.$commConst.PUBLISH;
        let note = this.$commConst.CHECK;
        let arr = [
          {
            text: "set",
            value: "展厅设置",
          },
          {
            text: "vr",
            value: this.data.varLook === 2 ? "配置VR带看" : "开通VR带看",
          },
          {
            text: "del",
            value: "删除",
          },
        ];
        if (check !== note.checkfail) {
          switch (publish) {
            // case num.notpublish:
            //   arr.splice(1, 0, {
            //     text: "view",
            //     value: "预览",
            //   });
            //   break;
            case num.published:
              if (publishAfterStatus) {
                arr.splice(
                  1,
                  0,
                  // {
                  //   text: "view",
                  //   value: "预览",
                  // },
                  {
                    text: "share",
                    value: "分享设置",
                  }
                );
              } else {
                arr.splice(1, 0, {
                  text: "share",
                  value: "分享设置",
                });
              }

              break;
            case num.publishFailed:
              arr.splice(
                1,
                0,
                {
                  text: "share",
                  value: "分享设置",
                }
              );
              break;
            case num.publishing:
              arr.splice(
                1,
                0,
                // {
                //   text: "view",
                //   value: "预览",
                // },
                {
                  text: "share",
                  value: "分享设置",
                }
              );
              break;
          }
        }
        //展厅到期时间
        // if (this.data.durationEndTs) {
        //   arr.push({
        //     text: "time",
        //     value: this.data.durationEndTs,
        //   });
        // }
        return arr;
      },
      durationEndTs() {
        this.isOver = false;
        if (this.data.durationEndTs) {
          // 个人上传的模板没有期限
          let time = this.data.durationEndTs;
          let now = this.data.systemTime;
          let date = new Date(now);
          date.setDate(date.getDate() + 15);
          let month = date.getTime();
          if (now - time < 0) {
            if (month <= time) {
              return false;
            } else {
              return this.data.durationEndTs;
            }
          } else {
            this.isOver = true;
          }
        }
      },
      checkfail() {
        return this.data.check == this.$commConst.CHECK.checkfail && this.data.publishAfterStatus != 1
      },
      showCount() {
        return this.data.publish !== this.$commConst.PUBLISH.notpublish && this.data.check !== this.$commConst.CHECK.checkfail
      }
    },
    mounted() {
    },
    methods: {
      mouseenterIcon(icon) {
        switch (icon) {
          case 'QRCode':
            $(".card-box").eq(this.index).find(".share.share-showCase").css("display", "flex");
            break;
        }
      },

      mouseleaveIcon() {
        $(".card-box").eq(this.index).find(".share.share-showCase").css("display", "none");
      },

      clickIcon(icon) {
        switch (icon) {
          case 'browse':
            var url = this.$utils.getArtViewUrl({G_TEMP_ID: this.data.tempId});
            window.open(url, "_blank");
            break;
          case 'collection':
            this.clickLove()
            break;
        }
      },

      clickLove() {
        var me = this;
        if (me.userinfo) {
          if (!me.favoriting) {
            if (!me.data.isFavorite) {
              me.$http
                .favorite({
                  tempId: me.data.tempId,
                  token: me.userinfo.token,
                })
                .then((res) => {
                  me.$set(me.data, "isFavorite", true);
                  this.$message.success("收藏成功！")
                })
                .catch(() => {
                })
                .finally(() => {
                  me.favoriting = false;
                });
            } else {
              me.$http
                .unfavorite({
                  tempId: me.data.tempId,
                  token: me.userinfo.token,
                })
                .then((res) => {
                  me.$set(me.data, "isFavorite", false);
                  this.$message.success("取消收藏成功！")
                })
                .catch(() => {
                })
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
      //制作同款
      toCreate() {
        let me = this;
        if (me.userinfo) {
          me.$router.push({name: "buyTpl"});
        } else {
          me.$Ruler.account({
            options: {
              operate: 0,
            },
          });
        }
      },

      exhibilionClick() {
        var me = this;
        if (me.isToDetail) {
          me.$set(me.data, "browserCount", ++me.data.browserCount);
          let body = document.getElementsByTagName("body")[0]
          body.style.overflow = "hidden";
          this.$Ruler.detail({
            options: {
              tempid: me.data.tempId,
            },
          });
        } else if (
          (me.data.publish == me.$commConst.PUBLISH.published &&
            me.data.check != me.$commConst.CHECK.checkfail) ||
          !me.ismy
        ) {
          let tempid = me.data.tempId;
          if (this.userinfo && this.$utils.getUserToken()) {
            this.$http.addHistory({tempId: tempid});
          }
          let url = this.$utils.getArtViewUrl({G_TEMP_ID: tempid});
          window.open(url, "_blank");
        }
      },
      userClick() {
        //点击用户头像，跳转到用户中心
        if (this.data.userId) {
          this.$router.push({
            name: "theySpace",
            params: {
              userId: this.data.userId,
            },
          });
        }
      },
      delet() {
        let me = this;
        me.$Ruler
          .confirm({
            msg: "确认执行删除吗?",
            desc: "删除后将无法恢复，请谨慎操作！",
          })
          .then((res) => {
            if (res == "ok") {
              me.$emit("delete", me.index, me.data.tempId);
            }
          });
      },
      editor() {
        // window.artHost
        let me = this;
        if (me.data.pcCreate) {
          me.toEditor();
        } else {
          me.$message.warning("此展厅由小程序创建，无法在电脑端编辑！");
        }
      },
      sett(val) {
        this.$emit("onset", val);
      },
      async toEditor() {
        let me = this;
        let url = await me.$utils.getArtEditorUrl({
          tempId: me.data.tempId,
          token: me.userinfo.token,
        });
        window.open(url, "_blank");
      },
      manyOprate(item, index) {
        let me = this;
        me.moreIndex = index;
        switch (item.text) {
          case "share":
            me.isShare = true;
            break;
          case "del":
            this.delet();
            break;
          // case "view":
          //   window.open(
          //       this.$utils.getArtPreviewUrl(
          //           {
          //             G_TEMP_ID: this.data.tempId,
          //             ispreview: true,
          //             token: me.userinfo.token,
          //           },
          //           location.origin
          //       ),
          //       "_self"
          //   );
          //   break;
          case "set":
            this.sett();
            break;
          case "vr":
            item.value === '开通VR带看' ? this.openVR() : this.sett("vr");
            break;
        }
      },
      // like(item) {
      //   let me = this;
      //   me.$http.likeCount({obj: item.tempid}).then(res => {
      //       console.log(res);
      //       this.sceneCommit(item.tempid);
      //     me.$set(item, 'islike', true);
      //     me.$set(item, 'likeCount', ++item.likeCount);
      //   })
      //   // this.$emit('like', item)
      // },

      //开通vr带看
      async openVR() {
        let me = this;
        let list = [{
          title: "开通VR带看后可实现异地同屏、双向互动、实时语音、多人交流，增强展厅互动性。",
          text: ""
        }]
        me.payObj = {
          title: "VR带看",
          tips: "VR带看需购买后才可生效。",
          list,
          leftBtn: "体验带看",
          rigthBtn: "立即开通",
          noPrice: true,
          bgColor: "#23b8ff",
        };
        me.payVisible = true;
      },

      async open() {
        let me = this;
        let data = await me.$http.getBuyServe(me.data.tempId);
        // me.payData = data;
        let list = [];
        data.serverList.forEach((item) => {
          switch (item.name) {
            case "VR带看":
              list.push({
                title: "开通服务",
                text: "VR带看",
              }, {
                title: "服务期限",
                text: (me.data.durationEndTs && (me.data.durationEndTs - me.data.systemTime > 0)) ? me.data.durationEndTs : "",
                num: (me.data.durationEndTs && (me.data.durationEndTs - me.data.systemTime > 0)),
              });
              break;
          }
        });
        let onMoney = data.totalPrices > data.balance;
        me.payObj = {
          title: "VR带看",
          tips: "VR带看需购买后才可生效。",
          list,
          rigthBtn: onMoney ? "余额不足，请充值" : "立即支付",
          balance: data.balance,
          totalPrices: data.totalPrices,
          bgColor: onMoney ? "#F69A23" : "#FE5A60",
        };
        me.payVisible = true;
      },

      toView(tempId) {
        let me = this;
        window.open(
          this.$utils.getArtPreviewUrl(
            {
              G_TEMP_ID: tempId,
              ispreview: true,
              token: me.userinfo.token,
            },
            location.origin
          ),
          "_blank"
        );
      },

      publish(tempid) {
        let me = this;
        me.$http.publish(tempid).then(async res => {
          let obj2 = {
            isImg: false,
            title: `正在发布，预计处理${res.publishProcessingTime}分钟。`,
            leftBtn: "知道了",
            tips: "发布中的展厅无法重复发布，预计处理时间不包含排队时间。",
            num: res.publishBalanceCount,
            smallTitle: true
          }
          me.$emit("pulish", tempid);
          await me.$Ruler.save({obj: obj2})

        })

      },

      async publishHall(tempid) {
        let me = this;
        try {
          let result = await me.$http.beforePublish(tempid);
          if (result.errorCode === 4032 || result.errorCode === 4034) {  //展厅正在排队或者有修改状态
            let obj = {
              isImg: false,
              title: `发布中的展厅无法重复发布，预计处理${result.publishProcessingTime}分钟。`,
              leftBtn: "取消",
              rightBtn: "确认发布",
              tips: "展厅即将进入发布队列，预计处理时间不包含排队时间。",
              smallTitle: false
            }
            let res = await me.$Ruler.save({obj: obj})
            if (res === "right") {
              me.publish(tempid);
            }
          }
        } catch (e) {
          if (e.code === 40004) {  //展厅未发布
            let data = (me.payData = await me.$http.getPublishPayInfo(tempid));
            me.tempId = tempid;
            let onMoney = data.payPrice > data.balance;
            let list = [
              {
                title: "展厅面积",
                text: data.validSz + "㎡",
              },
              {
                title: "使用期限",
                text: data.days + "天",
              },
              {
                title: "建展费用",
                text: "￥" + data.totalPrice,
              },
            ];
            me.payObj = {
              title: "发布展厅",
              tips: "发布成功后展厅可对外分享",
              rigthBtn: onMoney ? "余额不足，请充值" : "确认支付",
              image: require("@/assets/images/payPublish.png"),
              list,
              balance: data.balance,
              totalPrices: data.payPrice,
              discountRate: data.discountRate ? data.discountRate * 10 : null,
              bgColor: onMoney ? "#F69A23" : "#FE5A60",
            };
            me.payVisible = true;
          }
        }
      },
      async pay(pass, couponCode) {
        let me = this;
        if (pass) {
          let data = me.payData;
          let onMoney = data.payPrice > data.balance ? true : false;
          if (onMoney) {
            me.$Ruler.payment({balances: data.balance});
          } else {
            try {
              if (couponCode === 'vr') {
                await me.$http.buyServe({
                  tempId: me.data.tempId,
                  payPassword: md5(pass),
                });
              } else {
                await me.$http.savePublishPayInfo({
                  tempId: me.data.tempId,
                  payPassword: md5(pass),
                  couponCode
                });
              }

              me.payVisible = false;
              let obj1 = {
                isImg: true,
                title: "扣费成功！",
                leftBtn: "知道了",
                rightBtn: "",
                tips: "可在个人中心查看展厅发布状态",
                smallTitle: false
              };
              me.$Ruler.save({obj: obj1}).then((res) => {
                me.$emit("pulish", me.data.tempId);
                if (res === "left") {
                  // let viewHref = this.$utils.getArtViewUrl(
                  //         {G_TEMP_ID: tempid, ispreview: true},
                  //         process.env.VUE_APP_HTML
                  // );
                  // window.open(viewHref)
                }
              });
            } catch (e) {
              me.payVisible = false;
            }
          }
        } else {
          me.payVisible = false;
        }
      },
      //展厅统计
      countHandle() {
        let newTempid = escape(Crypto.set(this.data.tempId));
        const {href} = this.$router.resolve({
          path: "/self/statistics",
          query: {
            tempid: newTempid,
          },
        });
        window.open(href, "_blank");
      },
    },
  };
</script>

<style lang="scss" scoped>
  .card-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    &:hover {
      img.thumbnail {
        transform: scale(1.1);
        transition: all 1s;
      }
    }

    div.exhibilion {
      width: 100%;
      height: 100%;
      background: #eeeeee;
      position: relative;
      border-radius: 10px 10px 0 0;
      overflow: hidden;

      img.thumbnail {
        width: 100%;
        height: 190.9px;
        display: block;
        object-fit: cover;
        border-radius: 10px 10px 0 0;
        @media screen and (min-width: 1920px) {
          height: 216px;
        }
      }

      &.thumbnail-w {
        img.thumbnail {
          width: 175px;
          height: auto;
          position: absolute;
          left: 50%;
          top: 95px;
          @media screen and (min-width: 1920px) {
            top: 109px;
          }
          transform: translateX(-50%) translateY(-50%);
        }
      }
    }

    img.icon {
      position: absolute;
      top: 10px;
      left: 10px;
      border-radius: 50%;
    }

    p.showName,
    div.showName {
      text-align: center;
      height: 45px;
      line-height: 45px;
      background: rgba(255, 255, 255, 1);
      font-size: 14px;
      color: #333333;
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      transition: 0.3s;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 12px;
      cursor: default;
      border-radius: 0 0 10px 10px;

      span.user {
        //flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-right: 0.7%;

        &:hover {
          color: #23b8ff;
        }
      }

      > p {
        /*font-weight: bold;*/
        width: 100%;
        text-align: left;
        margin-bottom: 5px;
        font-size: 15px;
        font-family: "Source Han Sans CN";

        &.noCount {
          width: 100%;
        }
      }

      .tags {
        text-align: left;
        color: #999;
        font-size: 13px;
        max-width: 55%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        @media screen and(min-width: 1920px) {
          max-width: 57%;
        }
      }

      > p:hover {
        color: #23b8ff;
        /*font-size: 13px;*/
      }
    }

    .makeSame {
      width: 80px;
      height: 32px;
      line-height: 32px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 3px;
      color: #555555;
      text-align: center;
      font-size: 14px;
      position: absolute;
      bottom: 90px;
      left: 10px;
      cursor: pointer;
      display: none;
      &:hover {
        color: #19A0F1;
      }
    }

    .operationIcon {
      display: none;
      position: absolute;
      top: 10px;
      right: 10px;
      li {
        width: 30px;
        height: 30px;
        line-height: 30px;
        background: rgba(255, 255, 255, 0.9);
        text-align: center;
        color: #707070;
        border-radius: 3px;
        margin-left: 10px;
        &.active,
        &:hover {
          color: #19A0F1;
        }
      }
    }

    p.showCase,
    div.showCase {
      height: 80px;
      line-height: inherit;
      padding: 18px 12px;
      border-radius: 0 0 10px 10px;
    }

    div.showCase p {
      width: 100%;
      line-height: 20px;
    }

    div.pv {
      /*display: flex;*/
      width: 48%;
      color: #9c9d9f;
      @media screen and (min-width: 1920px) {
        width: 42%;
      }

      span.view {
        /*width: 50%;*/
        /*overflow: hidden;*/
        /*white-space: nowrap;*/
        /*text-overflow: ellipsis;*/

        .svg-icon {
          font-size: 18px;
          margin-right: 0px;
          cursor: pointer;
        }
      }

      span.browser {
        margin-right: 6.374%;
        /*svg {*/
        /*    position: relative;*/
        /*    top: 2px;*/
        /*}*/
        .svg-icon {
          margin-right: 2px;
        }
      }

      span.like .svg-icon {
        &:hover {
          color: #ff5a5f;
        }
      }

      .isLove .svg-icon {
        color: #ff5a5f;
      }
    }

    div.hoverName {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      height: 48px;
      line-height: 48px;
      background: #fff;
      padding: 0 12px;
      color: #23b8ff;
      font-size: 14px;
      display: none;
      /*justify-content: space-between;*/
      transition: 0.3s;

      div.username {
        width: 65%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        /*display: flex;*/
        /*align-items: center;*/
        color: #000000;

        span.user {
          /*flex: 1;*/
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding-right: 0.7%;
        }

        svg {
          margin-right: 5px;
        }

        &:last-child {
          & svg:hover {
            color: #ff5a5f;
          }
        }
      }

      img.min-icon {
        width: 14%;
        vertical-align: middle;
        border-radius: 50%;
        margin-right: 8px;
      }

      span {
        vertical-align: middle;
        /*display: inline-block;*/
      }
    }

    div.hoverImg {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 48px;
      width: 100%;
      background: rgba(255, 255, 255, 0.85);

      align-items: center;
      justify-content: center;
      display: none;

      img {
        width: 130px;
        height: 130px;
        border: 8px solid rgba(255, 255, 255, 1);
      }
    }

    ul.editors {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 5;
      display: none;

      li {
        width: 42px;
        height: 30px;
        /*padding: 6px 12px;*/
        background: rgba(255, 255, 255, 0.9);
        border-radius: 3px;
        text-align: center;
        line-height: 30px;
        margin-left: 5px;

        &:hover {
          /*background: rgba(255, 255, 255, 0.6);*/
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

    div.objStatus {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      height: 30px;
      line-height: 30px;
      background: rgba(255, 255, 255, 1);
      border-radius: 15px;
      font-size: 14px;
      color: #666666;
      padding: 0 16px;
      white-space: nowrap;

      img {
        position: relative;
        top: -2px;
        vertical-align: middle;
      }
    }

    .userInfo {
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(251, 176, 59, 0.9);
      border-radius: 3px;
      padding: 5px 7px;
      align-items: center;

      /*img {*/
      /*  width: 26px;*/
      /*  height: 26px;*/
      /*  border-radius: 50%;*/
      /*  margin-right: 5px;*/
      /*}*/

      span {
        display: inline-flex;
        /*max-width: 190px;*/
        /*padding: 7px;*/
        font-size: 12px;
        color: rgba(255, 255, 255, 1);
      }
    }

    div.pubState {
      position: absolute;
      top: 10px;
      left: 10px;
      /*width: 54px;*/
      /*height: 24px;*/
      padding: 2px 5px;
      background: #fbb03b;
      border-radius: 3px;
      color: #fff;
      text-align: center;
      line-height: 24px;

      ::v-deep.el-button {
        width: 98px;
        height: 24px;
        background: rgba(255, 90, 95, 1);
        border-radius: 3px;
        color: #fff;
        padding: 0;
        border: none;

        i {
          margin-right: 5px;
        }
      }
    }

    div.vaild-date {
      /*border-radius: 0px 0px 0px 15px;*/
      position: absolute;
      right: 10px;
      top: 10px;

      p {
        color: #e1ae84;
        background: rgba(51, 51, 51, 0.95);
        padding: 5px 6px;
        margin-left: 5px;
        border-radius: 3px;
      }

      .usePwd {
        background: #ffe5b0;
        color: #8c601c;
      }

      .overTime {
        color: rgba(187, 187, 187, 1);
      }
    }

    &:hover {
      div.hoverName {
        display: flex;
      }

      p.showName {
        display: none;
      }

      ul.editors {
        display: flex;
      }

      div.vaild-date {
        display: none;
      }

      div.hoverImg {
        display: flex;
      }

      .share {
      display: flex;
        &.share-showCase {
          display: none;
        }
      }

      .userInfo {
        display: none;
      }

      .operationIcon {
        display: flex;
      }

      .makeSame {
        display: block;
      }
    }

    div.deletcover {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 48px;
      width: 100%;
      z-index: 4;
      background: rgba(42, 48, 58, 0.5);

      div.showinfo {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        background: #fff;
        padding: 0 16px;
        color: #666666;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;

        img {
          vertical-align: middle;
          position: relative;
          top: -2px;
        }
      }
    }

    &.isDeleted {
      p.showName {
        color: #999999;
      }
    }

    .share {
      width: 100%;
      height: calc(100% - 45px);
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 10px 10px 0 0;
      display: none;

      .toView {
        background-color: rgba(35, 184, 255, 0.2);
        border: 1px solid rgba(35, 184, 255, 1);
      }

      .publish {
        margin-left: 15px;
      }

      > div {
        width: 120px;
        height: 120px;
        padding: 5px;
        background: #fff;
        border-radius: 5px;
        margin-top: 20px;
        &.homeShare {
          margin-top: 0;
        }
        @media screen and (min-width: 1920px) {
          width: 130px;
          height: 130px;
        }

        img {
          width: 100%;
          height: 100%;
        }

        p {
          width: 42px;
          height: 30px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 3px;
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 5;

          .svg-icon {
            color: #fff;
            font-size: 16px;
          }
        }
      }

      > p {
        width: 98px;
        height: 36px;
        background: rgba(35, 184, 255, 1);
        border-radius: 18px;
        color: #fff;

        &:hover,
        &:visited {
          background: #0090ff;
        }

        &.toView {
          &:hover,
          &:visited {
            background: rgba(0, 144, 255, 0.2);
            border-color: rgba(0, 144, 255, 1);
          }
        }
      }
    }

    .share-showCase {
      height: calc(100% - 79px);

      > div {
        margin-top: inherit;
      }
    }
  }
</style>
<style lang="scss">
  .popover_operate {
    padding: 0 !important;
    min-width: 140px !important;
    border: none;
    border-radius: 0;

    ul {
      text-align: center;

      li {
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #e7e7e7;
        cursor: pointer;

        &:last-of-type {
          border-bottom: none;
        }
      }

      .active {
        background: #23b8ff;
        color: #ffffff;
      }
    }
  }

  .popper_checkNote {
    box-shadow: 0px 3px 12px 0px rgba(4, 0, 0, 0.15) !important;
    border-color: #fff !important;

    .popper__arrow {
      border-width: 0 !important;
    }
  }
</style>
