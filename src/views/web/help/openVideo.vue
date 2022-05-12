<template>
  <div class="videoBox">
    <video
      width="100%"
      height="100%"
      controls="controls"
      :poster="videoInfo.coverUrl"
      :src="videoInfo.videoUrl">
      <!-- <source :src="videoInfo.videoUrl" />
      你的浏览器不支持HTML5视频。 -->
    </video>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoInfo: {},
      videoId: null,
    };
  },
  methods: {
    // 获取视频
    async getVideo() {
      let params = {
        id: this.videoId,
      };
      let res = await this.$http.videoInfo(params);
      this.videoInfo = res;
    },
  },
  mounted() {
    this.getVideo();
  },
  created() {
    this.videoId = this.$route.query.videoId;
  },
};
</script>
<style lang="scss" scoped>
.videoBox {
  width: 100vw;
  height: 100vh;
}
</style>
