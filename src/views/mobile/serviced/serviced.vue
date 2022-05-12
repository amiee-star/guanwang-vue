<template>
  <div id="mobileServiced">
    <page-header></page-header>
    <div>
      <img src="../../../assets/images/mobile-serviced/banner.png" alt="" />
    </div>
    <!--    <div class="content gray">-->
    <!--      <div class="main">-->
    <!--        <div-->
    <!--          class="toleft box"-->
    <!--          :class="this.number == 1 ? 'box-active' : ''"-->
    <!--          @click="change(1)"-->
    <!--        >-->
    <!--          试用版-->
    <!--        </div>-->
    <!--        <div-->
    <!--          class="tocenter box "-->
    <!--          :class="this.number == 2 ? 'box-active' : ''"-->
    <!--          @click="change(2)"-->
    <!--        >-->
    <!--          标准版-->
    <!--        </div>-->
    <!--        <div-->
    <!--          class="toright box"-->
    <!--          :class="this.number == 3 ? 'box-active' : ''"-->
    <!--          @click="change(3)"-->
    <!--        >-->
    <!--          专业版-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="content-show">-->
    <!--        <div class="tip-left tip" v-if="this.number == 1">-->
    <!--          <img src="../../../assets/images/serviced/tip2.png" alt="" />-->
    <!--          <div class="tip-title">-->
    <!--            <p>试用版</p>-->
    <!--            <div class="tip-text">-->
    <!--              30天-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <div class="tip-main ">-->
    <!--            <div>-->
    <!--              三方平台用户单点登录-->
    <!--              <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              自助布展工具调用 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              专属模板调用 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div class="cha">-->
    <!--              定制模板上传 <i><svg-icon iconClass="cha"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              用户创建展厅 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              用户素材上传云端存储<i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              展厅发布浏览 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              用户权限控制 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              用户展厅统一管理 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--              <div class="tip-zt">-->
    <!--                <div>通用模板赠送：<span>1</span></div>-->
    <!--                <div>创建展厅数量：<span>1</span></div>-->
    <!--                <div>发布展厅数量：<span>1</span></div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--            <div class="cha">-->
    <!--              展厅去除“3D云展”水印-->
    <!--              <i><svg-icon iconClass="cha"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div class="cha">-->
    <!--              在线客服 <i><svg-icon iconClass="cha"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div class="cha">-->
    <!--              直播服务 <i><svg-icon iconClass="cha"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div class="cha">-->
    <!--              访客信息 <i><svg-icon iconClass="cha"></svg-icon></i>-->
    <!--            </div>-->
    <!--            &lt;!&ndash; <div class="cha">-->
    <!--              同屏互动 <i><svg-icon iconClass="cha"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div class="cha">-->
    <!--              在线表单 <i><svg-icon iconClass="cha"></svg-icon></i>-->
    <!--            </div> &ndash;&gt;-->
    <!--            <div class="cha">-->
    <!--              展厅离线数据包同步 <i><svg-icon iconClass="cha"></svg-icon></i>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <a class="point"><div class="button">免费开通</div></a>-->
    <!--        </div>-->
    <!--        <div class="tip-center tip" v-if="this.number == 2">-->
    <!--          <img src="../../../assets/images/serviced/tip1.png" alt="" />-->
    <!--          <div class="tip-title center-title">-->
    <!--            <p>标准版</p>-->
    <!--            <div class="tip-text">-->
    <!--              365天-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <div class="tip-main">-->
    <!--            <div>-->
    <!--              三方平台用户单点登录-->
    <!--              <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              自助布展工具调用 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              专属模板调用 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              定制模板上传 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              用户创建展厅 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              用户素材上传云端存储<i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              展厅发布浏览 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              用户权限控制 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              用户展厅统一管理 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--              <div class="tip-zt">-->
    <!--                <div>通用模板赠送：<span>3</span></div>-->
    <!--                <div>创建展厅数量：<span>不限</span></div>-->
    <!--                <div>发布展厅数量：<span>30</span></div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--            <div class="right">-->
    <!--              展厅去除“3D云展”水印 <span class="price">免费</span>-->
    <!--              -->
    <!--            </div>-->
    <!--            <div class="right">-->
    <!--              在线客服 <span class="price">599元/展厅</span>-->
    <!--            </div>-->
    <!--            <div class="right">-->
    <!--              直播服务 <span class="price">599元/展厅</span>-->
    <!--            </div>-->
    <!--            <div class="right">-->
    <!--              访客信息 <span class="price">599元/展厅</span>-->
    <!--            </div>-->
    <!--            &lt;!&ndash; <div>-->
    <!--              同屏互动 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              在线表单 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div> &ndash;&gt;-->
    <!--            <div class="right">-->
    <!--              展厅离线数据包同步 <span class="price">5000~10000元/展厅</span>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <a-->
    <!--            class="point"-->
    <!--            target="_blank"-->
    <!--            href="https://www5.53kf.com/m.php?kf_sign=TU0MjMTYxNU5ODEwMjU2NzI0NjQ5MDE2NzIxNzYzOTY%3D&cid=72176396&style=7&keyword=http%3A%2F%2F192.168.20.143%3A8080%2Fself%2Fmain&referer=http%3A%2F%2F192.168.20.143%3A8080%2FmobileServiced&guest_id=11575516458008&tpl=crystal_blue&uid=bda926edafa6a8b29e3cb173069e915a&u_stat_id=&talktitle=3D%E5%B1%95%E5%8F%B0_%E4%BA%A7%E5%93%81_3D%E5%B1%95%E4%BC%9A%E7%B3%BB%E7%BB%9F&tfrom=50&device=&zdkf_type=1&kf=jiangl%40jimuyida.com&kflist=off"-->
    <!--            ><div class="button">-->
    <!--              订购咨询客服-->
    <!--            </div></a-->
    <!--          >-->
    <!--        </div>-->
    <!--        <div class="tip-center tip" v-if="this.number == 3">-->
    <!--          <img src="../../../assets/images/serviced/tip3.png" alt="" />-->
    <!--          <div class="tip-title center-title tip-title3">-->
    <!--            <p>专业版</p>-->
    <!--            <div class="tip-text">-->
    <!--              365天-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <div class="tip-main ">-->
    <!--            <div>-->
    <!--              三方平台用户单点登录-->
    <!--              <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              自助布展工具调用 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              专属模板调用 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              定制模板上传 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              用户创建展厅 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              用户素材上传云端存储<i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              展厅发布浏览 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              用户权限控制 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              用户展厅统一管理 <i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--              <div class="tip-zt">-->
    <!--                <div>通用模板赠送：<span>10</span></div>-->
    <!--                <div>创建展厅数量：<span>不限</span></div>-->
    <!--                <div>发布展厅数量：<span>100</span></div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--            <div class="right">-->
    <!--              展厅去除“3D云展”水印 <span class="price">免费</span>-->
    <!--            </div>-->
    <!--            <div class="right">-->
    <!--              在线客服 <span class="span">8折</span-->
    <!--              ><span class="price">599元/展厅</span>-->
    <!--            </div>-->
    <!--            <div class="right">-->
    <!--              直播服务 <span class="span">8折</span-->
    <!--              ><span class="price">599元/展厅</span>-->
    <!--            </div>-->
    <!--            <div class="right">-->
    <!--              访客信息 <span class="span">8折</span-->
    <!--              ><span class="price">599元/展厅</span>-->
    <!--            </div>-->
    <!--            &lt;!&ndash; <div>-->
    <!--              同屏互动 <span class="span">8折</span-->
    <!--              ><i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              在线表单 <span class="span">8折</span-->
    <!--              ><i><svg-icon iconClass="check"></svg-icon></i>-->
    <!--            </div> &ndash;&gt;-->
    <!--            <div class="right">-->
    <!--              展厅离线数据包同步 <span class="span">8折</span-->
    <!--              ><span class="price">5000~10000元/展厅</span>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <a-->
    <!--            class="point"-->
    <!--            target="_blank"-->
    <!--            href="https://www5.53kf.com/m.php?kf_sign=TU0MjMTYxNU5ODEwMjU2NzI0NjQ5MDE2NzIxNzYzOTY%3D&cid=72176396&style=7&keyword=http%3A%2F%2F192.168.20.143%3A8080%2Fself%2Fmain&referer=http%3A%2F%2F192.168.20.143%3A8080%2FmobileServiced&guest_id=11575516458008&tpl=crystal_blue&uid=bda926edafa6a8b29e3cb173069e915a&u_stat_id=&talktitle=3D%E5%B1%95%E5%8F%B0_%E4%BA%A7%E5%93%81_3D%E5%B1%95%E4%BC%9A%E7%B3%BB%E7%BB%9F&tfrom=50&device=&zdkf_type=1&kf=jiangl%40jimuyida.com&kflist=off"-->
    <!--            ><div class="button">-->
    <!--              订购咨询客服-->
    <!--            </div></a-->
    <!--          >-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="page">-->
    <!--        <div-->
    <!--          class="toleft1 paging"-->
    <!--          :class="this.number == 1 ? 'page-active' : ''"-->
    <!--          @click="change(1)"-->
    <!--        ></div>-->
    <!--        <div-->
    <!--          class="tocenter1 paging "-->
    <!--          :class="this.number == 2 ? 'page-active' : ''"-->
    <!--          @click="change(2)"-->
    <!--        ></div>-->
    <!--        <div-->
    <!--          class="toright1 paging"-->
    <!--          :class="this.number == 3 ? 'page-active' : ''"-->
    <!--          @click="change(3)"-->
    <!--        ></div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="content">
      <div class="title">
        核心服务框架
      </div>
      <div class="content-img">
        <img src="../../../assets/images/mobile-serviced/img1.png" alt="" />
        <div class="img">
          <img src="../../../assets/images/mobile-serviced/arrow.png" alt="" />
        </div>
        <img src="../../../assets/images/mobile-serviced/img2.png" alt="" />
      </div>
    </div>
    <div class="contents">
      <div class="title">
        核心服务说明
      </div>
    </div>
    <div class="main-center">
      <div class="title">展商自主布展</div>
      <div class="introduce">
        提供布展studio的全功能版本，调用布展接口直接内嵌至参展商个人中心，使用展会专属模板快速创建展台，无痕对接
      </div>
      <div class="module2">
        <div class="tip-list">
          <div class="list-title ">
            支持图片、文字、视频、模型等素材布展
          </div>
        </div>
        <div class="tip-list ">
          <div class="list-title ">
            自行设置展台游览路径、解说词、背景音
          </div>
        </div>
        <div class="tip-list ">
          <div class="list-title ">
            支持多次编辑，实时预览，多次发布
          </div>
        </div>
      </div>
      <div class="module-img2">
        <img src="../../../assets/images/mobile-serviced/images1.png" alt="" />
      </div>
    </div>
    <div class="main-center gray">
      <div class="title">布展素材管理</div>
      <div class="introduce">
        提供参展商独立素材管理中心，自主上传素材，SAAS云端存储，布展studio同步使用
      </div>
      <div class="module2">
        <div class="tip-list">
          <div class="list-title ">
            自动化素材审查机制，保证素材合法合规
          </div>
        </div>
        <div class="tip-list ">
          <div class="list-title ">
            多样化素材上传，图片、模型、音频、富文本编辑等在线管理预览
          </div>
        </div>
        <div class="tip-list ">
          <div class="list-title ">
            提供720模型、360环拍素材增值处理服务
          </div>
        </div>
      </div>
      <div class="module-img2">
        <img src="../../../assets/images/mobile-serviced/images2.png" alt="" />
      </div>
    </div>
    <div class="main-center">
      <div class="title">展台模板管理</div>
      <div class="introduce">
        3D云展为每个开发者提供私有专属展台模板，参展商可使用展台模板快速创建自有展台
      </div>
      <div class="module2">
        <div class="tip-list">
          <div class="list-title ">
            海量个性模板选择，快速承办3D展会
          </div>
        </div>
        <div class="tip-list ">
          <div class="list-title ">
            支持模板个性定制，私有模板专属专用
          </div>
        </div>
        <div class="tip-list ">
          <div class="list-title ">
            一次对接，模板重复使用
          </div>
        </div>
      </div>
      <div class="module-img2">
        <img src="../../../assets/images/mobile-serviced/images3.png" alt="" />
      </div>
    </div>
    <div class="main-center gray">
      <div class="title">展商展台管理</div>
      <div class="introduce">
        提供所有展商账号名下展厅列表查看接口，可统一查看管理
      </div>
      <div class="module2">
        <div class="tip-list">
          <div class="list-title ">
            展商展台制作进度查看，实时监控展会布展进度
          </div>
        </div>
        <div class="tip-list ">
          <div class="list-title ">
            展商展台效果统一预览，自主配置推荐展商
          </div>
        </div>
        <div class="tip-list ">
          <div class="list-title ">
            展商展台强制下架及删除，自行审核控制
          </div>
        </div>
      </div>
      <div class="module-img2">
        <img src="../../../assets/images/mobile-serviced/images4.png" alt="" />
      </div>
    </div>
    <div class="main-center">
      <div class="title">展台数据私有化</div>
      <div class="introduce">
        3D云展提供独立数据打包及同步服务，将展商最终展台数据整体同步至展会私有云，与展会系统无缝融合
      </div>
      <div class="module2">
        <div class="tip-list">
          <div class="list-title ">
            展台场景数据、展品详情数据整体离线打包
          </div>
        </div>
        <div class="tip-list ">
          <div class="list-title ">
            数据同步即自动部署，直接私有云访问
          </div>
        </div>
        <div class="tip-list ">
          <div class="list-title ">
            展台数据与3D云展系统清晰切割
          </div>
        </div>
      </div>
      <div class="module-img2">
        <img src="../../../assets/images/mobile-serviced/images5.png" alt="" />
      </div>
    </div>
    <div class="main-center gray">
      <div class="title">参展商权限管理</div>
      <div class="introduce">
        可独立控制展台及展商功能权限，实现资源合理分配
      </div>
      <div class="module2">
        <div class="tip-list">
          <div class="list-title ">
            展商创建展台数量控制
          </div>
        </div>
        <div class="tip-list ">
          <div class="list-title ">
            展台增值服务插件选购
          </div>
        </div>
        <div class="tip-list ">
          <div class="list-title ">
            展商私有模板配置
          </div>
        </div>
      </div>
      <div class="module-img2">
        <img src="../../../assets/images/mobile-serviced/images6.png" alt="" />
      </div>
    </div>
    <touch></touch>
    <div class="foot-center">
      <div class="foot-titles">联系我们</div>
      <div class="foot-box">
        <p class="p">电话</p>
        <p class="p-content">400-080-9959</p>
        <a href="tel:400-080-9959"><i></i></a>
      </div>
      <div class="foot-box">
        <p class="p">邮箱</p>
        <p class="p-content">service@jimuyida.com</p>
      </div>
      <div class="foot-box foot-bottom">
        <p class="p">地址</p>
        <p class="p-content">深圳市南山区深南大道9996号松日鼎盛大厦21D</p>
      </div>
    </div>
<!--    <page-footer></page-footer>-->
  </div>
</template>
<script>
import pageHeader from "mobile/components/page-header/page-header.vue";
import pageFooter from "mobile/components/page-footer/page-footer.vue";
import touch from "mobile/components/touch.vue";
import Touch from "../components/touch.vue";
export default {
  name: "mobileServiced",
  components: {
    pageFooter,
    pageHeader,
    touch,
  },
  data() {
    return {
      number: 2,
    };
  },
  methods: {
    change(a) {
      this.number = a;
    },
  },
  mounted() {
    this.number = 2;
  },
};
</script>
<style lang="scss" scoped src="./mobileServiced.scss"></style>
