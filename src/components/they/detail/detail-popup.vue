<template>
    <div class="they-detail">
        <el-dialog
                :visible.sync="visible"
                :modal="false"
                :show-close="false"
                :close-on-click-modal="false"
                @close="closeDialog()"
                class="custom-dialog__wrapper"
        >

            <div class="box">
                <i class="close" @click="closeDialog()"><img src="@/assets/images/case/close.png" alt=""></i>
                <detail v-bind="options" v-on="on" v-on:toMetail="toMetail"
                        v-if="visible && !options.materialid"></detail>
                <detail-material v-bind="options" v-on="on" v-on:toDetail="toDetail" v-on:toMetail="toMetail"
                                 v-if="visible && options.materialid"></detail-material>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import detail from "./detail";
  import detailMaterial from "./detail-material";
  import router from "@/router";
  import $ from "jquery";

  export default {
    name: "they-detail",
    props: {
      isvisible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        visible: this.isvisible || false,
        on: {},
        options: {},
        routeChange: false
      }
    },
    components: {
      detail,
      detailMaterial
    },
    methods: {
      closeDialog(routeChange) {
        let body = document.getElementsByTagName("body")[0];
        body.style.overflow = "unset";
        this.routeChange = routeChange;
        this.$emit('close', routeChange);
        this.visible = false;
        this._promise && this._promise.resolve("cancel");
      },
      popstate() {
        this.closeDialog(true);
      },
      toMetail(e) {
        //从展厅到素材详情
        var materialid = e.objId;
        window.history.replaceState({}, null, `/detail/${this.options.tempid}/${materialid}`)
        this.$set(this.options, "materialid", materialid);
      },
      toDetail() {
        //从素材详情到展厅
        window.history.replaceState({}, null, `/detail/${this.options.tempid}`);
        this.$set(this.options, "materialid", "");
      }
    },
    mounted() {
      //点击了页面的返回键
      window.addEventListener("popstate", this.popstate.bind(this), false);
    },
    watch: {
      visible(val) {
        if (val) {
          this.routeChange = false;
          if (this.options.tempid) {
            window.history.pushState({}, null, `/detail/${this.options.tempid}`);
          }
        } else {
          if (this.options.tempid && !this.routeChange) {
            window.history.back(); //触发 popstate
          }
        }
      },
      isvisible(val) {
        if (val) {
          this.visible = val;
        } else {
          this.closeDialog();
        }
      },
      $route: {
        handler() {
          //直接点击顶部的 首页 按钮
          this.closeDialog(true);
        },
        deep: true
      }

    },
  }
</script>

<style lang="scss" scoped>
    .they-detail {
        .box {
            height: 100%;
        }
    }

</style>
<style lang="scss">
    .they-detail {
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

        i.close {
            position: absolute;
            right: 20px;
            top: 18px;
            z-index: 200;
            cursor: pointer;
            transition: all .5s;

            img {
                width: 18px;

            }

            &:hover {
                transform: rotate(90deg);
            }
        }
    }
</style>

