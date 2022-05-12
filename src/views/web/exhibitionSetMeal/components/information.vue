<template>
  <ul class="Information">
    <li class="li">
      <div class="title">APPID：</div>
      <div>{{ appId }}</div>
    </li>
    <li class="li">
      <div class="title">KEY：</div>
      <div>{{ appSecret }}</div>
    </li>
    <li class="li">
      <div class="title">开发者注册时间：</div>
      <div>{{ createTs }}</div>
    </li>
    <!-- <li class="li">
      <div class="title">当前服务周期：</div>
      <div>2020.12.30 至 2021.12.30</div>
    </li> -->
    <li class="li">
      <div class="title">帐号状态：</div>
      <div>
        <span class="zc" v-if="active">正常</span>
        <!-- <span class="dq">到期</span> -->
        <span class="jy" v-if="!active">禁用</span>
      </div>
    </li>
    <li class="li">
      <div class="title">布展工具logo：</div>
      <label class="upfile" v-if="!logo">
        <input type="file" accept="image/png" @change="getFile" />
        <img class="uploade" src="@/assets/images/setmeal/up.png" alt="" />
        <div>上传图片</div>
      </label>
      <label class="upfile upfile1" v-if="logo">
        <img :src="logo" alt="" class="thumb" />
        <div class="loade">
          <input type="file" accept="image/png" @change="getFile" />
          <img class="uploade" src="@/assets/images/setmeal/up1.png" alt="" />
          <div>上传图片</div>
        </div>
      </label>
    </li>
    <div class="warning">
      请上传30x30 png格式透明图片，小于1MB，上传后可替换布展工具左上角3D云展logo
    </div>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      appId: "",
      appSecret: "",
      createTs: "",
      active: "",
      logo: "",
    };
  },
  created() {
    this.getDeveloperInfo();
  },
  methods: {
    async getDeveloperInfo() {
      let data = await this.$http.getDeveloperInfo();
      this.id = data.id;
      this.appId = data.appId;
      this.appSecret = data.appSecret;
      this.createTs = this.formatDateMin(data.createTs);
      this.active = data.active;
      this.logo = data.logo;
      console.log(data, 60);
    },
    getFile(event) {
      console.log(event, 42);
      var target = event.target.cloneNode();
      event.target.value = "";
      var file = target.files[0];
      console.log(file.width, 63);
      if (file.type !== "image/png") {
        this.$message({
          message: "请选择 png 的图片",
          type: "warning",
        });
        return;
      }
      if (file.size / 1024 / 1024 > 1) {
        this.$message({
          message: "请选择 1MB 以内的图片",
          type: "warning",
        });
        return;
      }
      var img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width != 30 && img.height != 30) {
          this.$message({
            message: "请上传30x30 png格式透明图片",
            type: "warning",
          });
          return;
        }
        let obj = {
          id: this.id,
          file: file,
        };
        this.$http.uplogo(obj).then((res) => {
          this.logo = res.filePreviewUrl;
        });
      };
    },

    formatDateMin(secs) {
      var t = new Date(secs);
      var year = t.getFullYear();
      var month = t.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      var date = t.getDate();
      if (date < 10) {
        date = "0" + date;
      }
      var hour = t.getHours();
      if (hour < 10) {
        hour = "0" + hour;
      }
      var minute = t.getMinutes();
      // if (minute < 10) { minute = '0' + minute }
      // var second = t.getSeconds()
      // if (second < 10) { second = '0' + second }
      // return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
      return year + "." + month + "." + date;
    },
  },
};
</script>

<style lang="scss" scoped src="./information.scss"></style>
