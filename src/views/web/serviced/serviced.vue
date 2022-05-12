<template>
  <div class="serviced">
<!--    <page-header></page-header>-->
    <div class="main">
      <div class="main-content1">
        <div class="content1-text">
          <img src="../../../assets/images/serviced/banner1-text.png" alt="" />
        </div>
      </div>
      <div class="main-content2">
        <div class="layout">
          <div class="title">
            核心服务框架
          </div>
          <img src="../../../assets/images/serviced/banner2.png" alt="" />
        </div>
      </div>
      <div class="main-content2 grey">
        <div class="layout">
          <div class="title">
            服务对接流程
          </div>
          <div class="content2-main">
            <div class="svgs">
              <div class="svgs-main" v-for="(item, i) in listObj">
                <div class="svgs-content">
                  <svg-icon :iconClass="item.id" class="svg"></svg-icon>
                  <span>{{ item.name }}</span>
                </div>
                <svg-icon
                  :iconClass="item.number"
                  :class="item.count"
                  class="svg0"
                ></svg-icon>
              </div>
            </div>
            <div class="content2-arrow">
              <div class="arrow" v-for="(item, i) in arrow">
                <img :src="item.img" alt="" />
                <div class="content2-text">
                  <span>{{ item.text }}</span>
                  <span>{{ item.text2 }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="button">
            <div class="await" v-if="showed">
              <div class="close" @click="open(false)">X</div>
              <div class="img">
                <img src="../../../assets/images/serviced/jqqd.png" alt="" />
              </div>
              <div class="title">敬请期待</div>
            </div>
            <a @click="open(false, 1)">
              <button>立即申请</button>
            </a>
            <div class="btn" @click="toApi">
              3D云展API
            </div>
          </div>
        </div>
      </div>
      <div class="main-content3">
        <div class="title">
          核心服务说明
        </div>
        <div class="layout layouts">
          <div class="body-content">
            <div class="title-top">展商自主布展</div>
            <div class="title-content">
              提供布展工具的全功能版本，调用布展接口直接内嵌至参展商个人中心，使用展会专属模板快速创建展台，无痕对接
            </div>
            <div class="tip-list">
              <div class="list-title ">
                支持图片、文字、视频、模型等素材布展
              </div>
            </div>
            <div class="tip-list">
              <div class="list-title ">
                自行设置展台游览路径、解说词、背景音
              </div>
            </div>
            <div class="tip-list">
              <div class="list-title ">支持多次编辑、实时预览、多次发布</div>
            </div>
          </div>
          <div class="body-img">
            <img src="../../../assets/images/serviced/content3-1.png" alt="" />
          </div>
        </div>
      </div>
      <div class="main-content3 grey">
        <div class="layout layouts">
          <div class="body-img">
            <img src="../../../assets/images/serviced/content3-2.png" alt="" />
          </div>
          <div class="body-content">
            <div class="title-top">布展素材管理</div>
            <div class="title-content">
              提供参展商独立素材管理中心，自主上传素材，SAAS云端存储，布展工具同步使用
            </div>
            <div class="tip-list">
              <div class="list-title ">
                自动化素材审查机制，保证素材合法合规
              </div>
            </div>
            <div class="tip-list">
              <div class="list-title ">
                多样化素材上传，图片、模型、音频、富文本编辑等在线管理预览
              </div>
            </div>
            <div class="tip-list">
              <div class="list-title ">
                提供720模型、360环拍素材增值处理服务
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-content3">
        <div class="layout layouts">
          <div class="body-content">
            <div class="title-top">展台模板管理</div>
            <div class="title-content">
              3D云展为每个开发者提供私有专属展台模板，参展商可使用展台模板快速创建自有展台
            </div>
            <div class="tip-list">
              <div class="list-title ">
                海量个性模板选择，快速承办3D展会
              </div>
            </div>
            <div class="tip-list">
              <div class="list-title ">
                支持模板个性定制，私有模板专属专用
              </div>
            </div>
            <div class="tip-list">
              <div class="list-title ">
                一次对接，模板重复使用
              </div>
            </div>
          </div>
          <div class="body-img">
            <img src="../../../assets/images/serviced/content3-3.png" alt="" />
          </div>
        </div>
      </div>
      <div class="main-content3 grey">
        <div class="layout layouts">
          <div class="body-img">
            <img src="../../../assets/images/serviced/content3-4.png" alt="" />
          </div>
          <div class="body-content">
            <div class="title-top">展商展台管理</div>
            <div class="title-content">
              提供所有展商账号名下展厅列表查看接口，可统一查看管理
            </div>
            <div class="tip-list">
              <div class="list-title ">
                展商展台制作进度查看，实时监控展会布展进度
              </div>
            </div>
            <div class="tip-list">
              <div class="list-title ">
                展商展台效果统一预览，自主配置推荐展商
              </div>
            </div>
            <div class="tip-list">
              <div class="list-title ">
                展商展台强制下架及删除，自行审核控制
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-content3">
        <div class="layout layouts">
          <div class="body-content">
            <div class="title-top">展台数据私有化</div>
            <div class="title-content">
              3D云展提供独立数据打包及同步服务，将展商最终展台数据整体同步至展会私有云，与展会系统无缝融合
            </div>
            <div class="tip-list">
              <div class="list-title ">
                展台场景数据、展品详情数据整体离线打包
              </div>
            </div>
            <div class="tip-list">
              <div class="list-title ">
                数据同步即自动部署，直接私有云访问
              </div>
            </div>
            <div class="tip-list">
              <div class="list-title ">
                展台数据与3D云展系统清晰切割
              </div>
            </div>
          </div>
          <div class="body-img">
            <img src="../../../assets/images/serviced/content3-5.png" alt="" />
          </div>
        </div>
      </div>
      <div class="main-content3 grey">
        <div class="layout layouts">
          <div class="body-img">
            <img src="../../../assets/images/serviced/content3-6.png" alt="" />
          </div>
          <div class="body-content">
            <div class="title-top">参展商权限管理</div>
            <div class="title-content">
              可独立控制展台及展商功能权限，实现资源合理分配
            </div>
            <div class="tip-list">
              <div class="list-title ">
                展商创建展台数量控制
              </div>
            </div>
            <div class="tip-list">
              <div class="list-title ">
                展台增值服务插件选购
              </div>
            </div>
            <div class="tip-list">
              <div class="list-title ">
                展商私有模板配置
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <customized @success="successHandle"></customized>
    <fixed-tool></fixed-tool>
    <success
      :isvisible="isSuccess"
      msg="提交成功"
      tips="专属顾问会尽快与您联系"
      @close="isSuccess = false"
    ></success>
  </div>
</template>
<script>
import PageFooter from "@/components/page-footer/page-footer.vue";
import PageHeader from "@/components/page-header/page-header.vue";
import countNumberVue from "../../mobile/components/count-number.vue";
import imgCutVue from "../self/main/components/imgCut.vue";
import CardBox from "../../../components/card-box.vue";
import formRules from "@/config/form-rules.js";
import success from "@/components/popup/success.vue";
import customized from "@/components/customized.vue";

// import "../../../assets/iconfont/iconfont.js";
export default {
  name: "show",
  components: {
    PageFooter,
    PageHeader,
    CardBox,
    success,
    customized,
  },
  data() {
    return {
      showed: false,
      isSuccess: false,
      customFrom: {
        enterpriseName: "",
        realName: "",
        telephone: "",
        requirementDesc: "",
      },
      listObj: [
        {
          id: "content2-1",
          name: "权限申请",
          number: "content2-arrow",
          count: "svg-1",
        },
        {
          id: "content2-2",
          name: "获取展台模板",
          number: "content2-arrow",
          count: "svg-2",
        },
        {
          id: "content2-3",
          name: "同步参展商帐号",
          number: "content2-arrow",
          count: "svg-3",
        },
        {
          id: "content2-6",
          name: "参展商创建展台",
          number: "content2-arrow",
          count: "svg-4",
        },
        {
          id: "content2-4",
          name: "生成在线展台",
          number: "content2-arrow",
          count: "svg-5",
        },
        {
          id: "content2-5",
          name: "同步离线展厅包至展会平台",
          number: null,
          count: "svg-6",
        },
      ],
      arrow: [
        {
          img: require("../../../assets/images/serviced/arrow.png"),
          text: "获取开发者",
          text2: "帐号",
        },
        {
          img: require("../../../assets/images/serviced/arrow.png"),
          text: "专属模板获取",
        },
        {
          img: require("../../../assets/images/serviced/arrow.png"),
          text: "单点登录",
        },
        {
          img: require("../../../assets/images/serviced/arrow.png"),
          text: "展台创建",
          text2: "布展工具调用",
        },
        {
          img: require("../../../assets/images/serviced/arrow.png"),
          text: "展台发布",
        },
        {
          img: require("../../../assets/images/serviced/arrow.png"),
          text: "展台数据打包",
          text2: "数据同步",
        },
      ],
      rules: {
        telephone: [
          {
            required: true,
            validator: formRules.checkPhone,
            trigger: "change",
          },
        ],
        requirementDesc: [
          {
            required: true,
            trigger: "blur",
            message: "需求说明不能为空",
            maxlength: 200,
          },
        ],
      },
    };
  },
  methods: {
    successHandle(val) {
      if (val) {
        this.isSuccess = true;
      }
    },
    toApi() {
      window.open(
        "https://obs.3dyunzhan.com/api-docs/references.html#_%E5%BC%80%E5%8F%91%E8%80%85%E4%BF%A1%E6%81%AF%E7%9B%B8%E5%85%B3%E6%8E%A5%E5%8F%A3"
      );
    },
    open(a, b) {
      this.showed = a;
      if (b == 1) {
        this.$http.developer().then(() => {
          this.$message({
            message: "申请开发者成功！",
            type: "success",
          });
          let e = 1;
          if (e == 1) {
            location.reload();
          }
        });
      }
    },
    //联系客服
    onOnlineService() {
      this.$utils.showKf();
    },
    boxenter(a) {
      let left = document.getElementsByClassName("tip-left");
      let center = document.getElementsByClassName("tip-center");
      let right = document.getElementsByClassName("tip-right");
      if (a == 1) {
        left[0].classList.remove("tip-hover");
        center[0].classList.add("tip-hover");
        right[0].classList.add("tip-hover");
      }
      if (a == 2) {
        left[0].classList.add("tip-hover");
        center[0].classList.remove("tip-hover");
        right[0].classList.add("tip-hover");
      }
      if (a == 3) {
        left[0].classList.add("tip-hover");
        center[0].classList.add("tip-hover");
        right[0].classList.remove("tip-hover");
      }
      if (a == 0) {
        left[0].classList.add("tip-hover");
        center[0].classList.remove("tip-hover");
        right[0].classList.add("tip-hover");
      }
    },
    checkBox() {
      let div = document.getElementsByClassName("layouts");
      for (let i = 0; i < div.length; i++) {
        const element = div[i].getBoundingClientRect().top;
        if (element - document.body.offsetHeight < 0) {
          div[i].children[0].classList.add("transformRight");
          div[i].children[1].classList.add("transformLeft");
        }
      }
    },
    tijiao() {
      if (item == "") {
        this.$message({
          message: "标签要有内容哦",
          type: "warning",
        });
        return;
      }
    },
  },
  mounted() {
    let that = this;
    window.addEventListener("scroll", () => that.checkBox());
  },
};
</script>

<style lang="scss" scoped src="./serviced.scss"></style>
