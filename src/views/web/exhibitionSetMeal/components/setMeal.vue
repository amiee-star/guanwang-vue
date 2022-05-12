<template>
  <div class="setMeal">
    <div class="meal">
      <div class="title">
        <div class="name">套餐订购详情：</div>
        <div class="right">
          <div class="icon" v-if="expireFlag">已到期</div>
          <div>服务周期：{{ expireStr }}</div>
        </div>
      </div>
      <ul class="ul">
        <li class="li">{{ name }}</li>
        <li class="details">
          <img src="@/assets/images/setmeal/img1.png" alt="" />
          <div class="des">发布展厅限额(个)</div>
          <div class="num">{{ publishScenes }}</div>
        </li>
        <li class="details">
          <img src="@/assets/images/setmeal/img2.png" alt="" />
          <div class="des">增购展厅数量(个)</div>
          <div class="num">{{ publishScenesExtra }}</div>
        </li>
      </ul>
    </div>

    <div class="meal two">
      <div class="title">
        <div class="name">增值服务订购详情：</div>
        <div class="right">
          <div class="icon" v-if="expireFlag">已到期</div>
          <div>服务周期：{{ expireStr }}</div>
        </div>
      </div>
      <ul class="ul">
        <li class="details one">
          <img src="@/assets/images/setmeal/img3.png" alt="" />
          <div class="des">在线客服(个)</div>
          <div class="num" v-if="onlineServices">{{ onlineServices }}</div>
          <div class="nodes" v-else>未订购</div>
        </li>
        <!-- <li class="details">
          <img src="@/assets/images/setmeal/img4.png" alt="" />
          <div class="des">用户统计(个)</div>
          <div class="num">180</div>
        </li> -->
        <li class="details">
          <img src="@/assets/images/setmeal/img11.png" alt="" />
          <div class="des">访客信息(个)</div>
          <div class="num" v-if="visitorInfos">{{ visitorInfos }}</div>
          <div class="nodes" v-else>未订购</div>
        </li>
        <!-- <li class="details">
          <img src="@/assets/images/setmeal/img5.png" alt="" />
          <div class="des">展厅同步(个)</div>
          <div class="num" v-if="sceneSyncs != 0">{{ sceneSyncs }}</div>
          <div class="nodes" v-else>未订购</div>
        </li> -->
        <li class="details">
          <img src="@/assets/images/setmeal/img6.png" alt="" />
          <div class="des">直播(个)</div>
          <div class="num" v-if="lives">{{ lives }}</div>
          <div class="nodes" v-else>未订购</div>
        </li>
        <li class="details">
          <img src="@/assets/images/setmeal/img13.png" alt="" />
          <div class="des">VR带看(个)</div>
          <div class="num" v-if="vrLooks">{{ vrLooks }}</div>
          <div class="nodes" v-else>未订购</div>
        </li>
      </ul>
    </div>

    <div class="meal two">
      <div class="title">
        <div class="name">本周期资源使用总览：</div>
        <div class="right">
          <div class="icon" v-if="expireFlag">已到期</div>
          <div>服务周期：{{ expireStr2 }}</div>
        </div>
      </div>
      <ul class="ul noml">
        <li class="details">
          <img src="@/assets/images/setmeal/img7.png" alt="" />
          <div class="des">展厅总数(个)</div>
          <div class="num">{{ totalScenes1 }}</div>
        </li>
        <li class="details hov">
          <img src="@/assets/images/setmeal/img8.png" alt="" />
          <div class="des">已发布展厅总数(个)</div>
          <div class="num">{{ publishScenesUses2 + delScenes2 }}/{{ publishSceness }}</div>
          <div class="nums" v-if="delScenes2">（-{{ delScenes2 }}）</div>
          <div class="tooltip">
            <div class="up"></div>
            <div class="tooltipContent">
              现存已发布展厅：{{ publishScenesUses2 }}个<br />
              删除已发布展厅：{{ delScenes2 }}个
            </div>
          </div>
        </li>
        <li class="details">
          <img src="@/assets/images/setmeal/img9.png" alt="" />
          <div class="des">同步用户总数(个)</div>
          <div class="num">{{ importUsers2 }}</div>
        </li>
        <li class="details">
          <img src="@/assets/images/setmeal/img10.png" alt="" />
          <div class="des">在线客服(个)</div>
          <div class="num">{{ onlineServicesUses2 }}/{{ onlineServices }}</div>
        </li>
        <li class="details">
          <img src="@/assets/images/setmeal/img11.png" alt="" />
          <div class="des">访客信息(个)</div>
          <div class="num">{{ visitorInfosUses2 }}/{{ visitorInfos }}</div>
        </li>
        <li class="details">
          <img src="@/assets/images/setmeal/img6.png" alt="" />
          <div class="des">直播(个)</div>
          <div class="num">{{ livesUses1 }}/{{ lives1 }}</div>
        </li>
        <li class="details">
          <img src="@/assets/images/setmeal/img13.png" alt="" />
          <div class="des">VR带看(个)</div>
          <div class="num">{{ vrLooksUses2 ? vrLooksUses2 : 0 }}/{{ vrLooks2 ? vrLooks2 : 0 }}</div>
        </li>
      </ul>
    </div>

    <div class="meal two">
      <div class="title">
        <div class="name">累计资源使用总览：</div>
        <div class="right">
          <!-- <div class="icon">已到期</div> -->
          <div>服务周期：{{ expireStr1 }}</div>
        </div>
      </div>
      <ul class="ul noml">
        <li class="details">
          <img src="@/assets/images/setmeal/img7.png" alt="" />
          <div class="des">展厅总数(个)</div>
          <div class="num">{{ totalScenes2 }}</div>
        </li>
        <li class="details hov">
          <img src="@/assets/images/setmeal/img8.png" alt="" />
          <div class="des">已发布展厅总数(个)</div>
          <div class="num">{{ publishScenesUses1 }}</div>
          <div class="nums" v-if="delScenes1">（-{{ delScenes1 }}）</div>
          <div class="tooltip">
            <div class="up"></div>
            <div class="tooltipContent">
              现存已发布展厅：{{ publishScenesUses1 - delScenes1 }}个<br />
              删除已发布展厅：{{ delScenes1 }}个
            </div>
          </div>
        </li>
        <li class="details">
          <img src="@/assets/images/setmeal/img9.png" alt="" />
          <div class="des">同步用户总数(个)</div>
          <div class="num">{{ importUsers1 }}</div>
        </li>
        <li class="details">
          <img src="@/assets/images/setmeal/img10.png" alt="" />
          <div class="des">在线客服(个)</div>
          <div class="num">{{ onlineServicesUses1 }}</div>
        </li>
        <li class="details">
          <img src="@/assets/images/setmeal/img11.png" alt="" />
          <div class="des">访客信息(个)</div>
          <div class="num">{{ visitorInfosUses1 }}</div>
        </li>
        <li class="details">
          <img src="@/assets/images/setmeal/img6.png" alt="" />
          <div class="des">直播(个)</div>
          <div class="num">{{ livesUses2 }}</div>
        </li>
        <li class="details">
          <img src="@/assets/images/setmeal/img13.png" alt="" />
          <div class="des">VR带看(个)</div>
          <div class="num">{{ vrLooksUsestotal ? vrLooksUsestotal : 0 }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      publishScenes: "",
      publishSceness: "",
      publishScenesExtra: "",
      onlineServices: "",
      sceneSyncs: "",
      lives: "",
      lives1: "",
      livesUses2: "",
      livesUses1: "",
      totalScenes2: "",
      totalScenes1: "",
      importUsers1: "",
      importUsers2: "",
      publishScenesUses1: "",
      publishScenesUses2: "",
      onlineServicesUses1: "",
      onlineServicesUses2: "",
      visitorInfos: "",
      visitorInfosUses1: "",
      visitorInfosUses2: "",
      delScenes1: "",
      delScenes2: "",
      sceneSyncsUses: "",
      expireStr: "",
      expireStr1: "",
      expireStr2: "",
      expireFlag: "",
      vrLooks: 0,
      vrLooks2: 0,
      vrLooksUses2: 0,
      vrLooksUsestotal: 0
    };
  },
  created() {
    this.getDeveloperPackages();
  },
  methods: {
    async getDeveloperPackages() {
      let res = await this.$http.getDeveloperPackages();
      this.name = res.name;
      this.publishScenes = res.publishScenes;
      this.publishScenesExtra = res.publishScenesExtra;
      this.onlineServices = res.onlineServices;
      this.sceneSyncs = res.sceneSyncs;
      this.lives = res.lives;
      this.vrLooks = res.vrLooks;
      this.vrLooks2 = res.packagesUseOverview.vrLooks;
      this.vrLooksUses2 = res.packagesUseOverview.vrLooksUses;
      this.vrLooksUsestotal = res.accountOverview.vrLooksUses;
      this.totalScenes2 = res.accountOverview.totalScenes;
      this.totalScenes1 = res.packagesUseOverview.totalScenes;
      this.importUsers1 = res.accountOverview.importUsers;
      this.importUsers2 = res.packagesUseOverview.importUsers;
      this.publishSceness = res.packagesUseOverview.publishScenes;
      this.publishScenesUses1 = res.accountOverview.publishScenesUses;
      this.publishScenesUses2 = res.packagesUseOverview.noDelScenes;
      this.visitorInfos = res.visitorInfos;
      this.livesUses1 = res.packagesUseOverview.livesUses;
      this.lives1 = res.packagesUseOverview.lives;
      this.livesUses2 = res.accountOverview.livesUses;
      this.onlineServicesUses1 = res.accountOverview.onlineServicesUses;
      this.onlineServicesUses2 = res.packagesUseOverview.onlineServicesUses;
      this.visitorInfosUses1 = res.accountOverview.visitorInfosUses;
      this.visitorInfosUses2 = res.packagesUseOverview.visitorInfosUses;
      this.delScenes1 = res.accountOverview.delScenes;
      this.delScenes2 = res.packagesUseOverview.delScenes;
      this.sceneSyncsUses = res.sceneSyncsUses;
      this.expireStr = res.expireStr;
      this.expireStr1 = res.accountOverview.expireStr;
      this.expireStr2 = res.packagesUseOverview.expireStr;
      this.expireFlag = res.expireFlag;
    },
  },
};
</script>

<style lang="scss" scoped src="./setMeal.scss"></style>
