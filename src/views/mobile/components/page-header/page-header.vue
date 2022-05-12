<template>
  <div class="page-header-w">
    <div class="page-header m-page-header">
      <div class="nav">
        <i @click="$router.push({ name: 'index' })">
          <!-- <img src="@/assets/logo-w.png" alt /> -->
          <svg-icon icon-class="logo-white-new"></svg-icon>
        </i>

        <div class="navRight">
          <!-- <svg-icon
            iconClass="search"
            @click="$router.push({ name: 'search' })"
          ></svg-icon> -->
          <span @click="drawer = true">
            <img src="@/assets/images/zhankai.png" alt />
          </span>
        </div>
      </div>
      <el-drawer
        class="m-header-drawer"
        :with-header="false"
        :visible.sync="drawer"
        :show-close="false"
        :append-to-body="true"
        direction="rtl"
        size="80%"
      >
        <div class="drawer">
          <ul>
            <li @click="goDetail('index')">
              <div class="left">
                <svg-icon iconClass="index"></svg-icon>
                <span>首页</span>
              </div>
              <div class="arrow">
                <svg-icon iconClass="rightarrow"></svg-icon>
              </div>
            </li>
            <li @click="goDetail('canpin')">
              <div class="left">
                <svg-icon iconClass="index"></svg-icon>
                <span>产品</span>
              </div>
              <div class="arrow">
                <svg-icon
                  iconClass="rightarrow"
                  :class="{ active: isCanpin }"
                ></svg-icon>
              </div>
            </li>
            <ul v-if="isCanpin">
              <li @click="toUrl('/show')">
                <span style="marginLeft:40px">3D展厅</span>
                <div class="arrow">
                  <svg-icon iconClass="rightarrow"></svg-icon>
                </div>
              </li>
              <li @click="toUrl('/serviced')">
                <span style="marginLeft:40px">3D展会系统</span>
                <div class="arrow">
                  <svg-icon iconClass="rightarrow"></svg-icon>
                </div>
              </li>
            </ul>
            <li @click="goDetail('case')">
              <div class="left">
                <svg-icon iconClass="case"></svg-icon>
                <span>精品案例</span>
              </div>
              <div class="arrow">
                <svg-icon iconClass="rightarrow"></svg-icon>
              </div>
            </li>
            <!-- <li @click="$router.push({name:'create'})">
              <div class="left" >
                <svg-icon iconClass="create"></svg-icon>
                <span>创建3D展厅</span>
              </div>
              <div class="arrow">
                <svg-icon iconClass="rightarrow"></svg-icon>
              </div>
            </li> -->
            <li @click="goDetail('scheme')">
              <div class="left">
                <svg-icon iconClass="methods"></svg-icon>
                <span>解决方案</span>
              </div>
              <div class="arrow">
                <svg-icon
                  iconClass="rightarrow"
                  :class="{ active: isFangan }"
                ></svg-icon>
              </div>
            </li>
            <ul v-if="isFangan">
              <li @click="toUrl('/solution/marketing')">
                <span style="marginLeft:40px">企业营销</span>
                <div class="arrow">
                  <svg-icon iconClass="rightarrow"></svg-icon>
                </div>
              </li>
              <li @click="toUrl('/solution/mall')">
                <span style="marginLeft:40px">3D商城</span>
                <div class="arrow">
                  <svg-icon iconClass="rightarrow"></svg-icon>
                </div>
              </li>
<!--              <li @click="toUrl('/solution/government')">-->
<!--                <span style="marginLeft:40px">党政军史</span>-->
<!--                <div class="arrow">-->
<!--                  <svg-icon iconClass="rightarrow"></svg-icon>-->
<!--                </div>-->
<!--              </li>-->
              <li @click="toUrl('/solution/exposition')">
                <span style="marginLeft:40px">数字文博</span>
                <div class="arrow">
                  <svg-icon iconClass="rightarrow"></svg-icon>
                </div>
              </li>
              <li @click="toUrl('/solution/exhibition')">
                <span style="marginLeft:40px">云上展会</span>
                <div class="arrow">
                  <svg-icon iconClass="rightarrow"></svg-icon>
                </div>
              </li>
            </ul>
            <li @click="goDetail('aboutUs')">
              <div class="left">
                <svg-icon iconClass="about"></svg-icon>
                <span>关于我们</span>
              </div>
              <div class="arrow">
                <svg-icon iconClass="rightarrow"></svg-icon>
              </div>
            </li>
            <li>
              <div class="left">
                <svg-icon iconClass="cellphone"></svg-icon>
                <span>客服咨询电话</span>
              </div>
              <div class="cell">
                <a href="tel:400-080-9959"></a>400-080-9959
              </div>
            </li>
          </ul>
          <!-- <ul>
            <li>
              <div class="left">
                <svg-icon iconClass="cellphone"></svg-icon>
                <span>客服咨询电话</span>
              </div>
              <div class="cell"><a href="tel:400-080-9959"></a>400-080-9959</div>
            </li>
          </ul> -->
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
export default {
  name: "page-header",
  components: {},
  data() {
    return {
      drawer: false,
      isCanpin: false,
      isFangan: false,
    };
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        this.drawer = false;
      },
    },
  },
  methods: {
    goDetail(val) {
      if (this.$route.name === val) {
        location.reload();
      } else if (val == "canpin") {
        this.isCanpin = !this.isCanpin;
        this.isFangan = false;
      } else if (val == "scheme") {
        this.isFangan = !this.isFangan;
        this.isCanpin = false;
      } else {
        this.$router.push({ name: val }).catch((error) => error);
      }
    },
    toUrl(url) {
      // this.$router.push({ path: url });
      location.href = url;
    },
  },
};
</script>
<style lang="scss" scoped src="./page-header.scss"></style>
<style lang="scss">
.m-header-drawer {
  div.drawer {
    ul {
      margin-bottom: 0.24rem;
      & + ul {
        border-top: 1px solid #e7e7e7;
      }
      li {
        height: 0.8rem;
        line-height: 0.8rem;
        border-bottom: 1px solid #e7e7e7;
        justify-content: space-between;
        display: flex;
        padding: 0 0.36rem;
        cursor: pointer;
        svg {
          font-size: 0.36rem;
        }
        .active {
          transform: rotate(90deg);
        }
        span {
          padding-left: 0.2rem;
          font-size: 0.26rem;
          color: #171717;
        }
        div.left {
          font-size: 0;
          svg {
            position: relative;
            top: 0.02rem;
          }
        }
        div.cell {
          color: #171717;
          font-size: 0.3rem;
          font-weight: 400;
          font-family: "DIN-Medium";
          position: relative;
          a {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
