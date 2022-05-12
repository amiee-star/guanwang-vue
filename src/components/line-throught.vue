<template>
  <div class="line-throught">
    <div class="line"></div>
    <span class="text"><slot></slot></span>
  </div>
</template>

<script>
  export default {}
</script>
<style lang="scss" scoped>
  div.line-throught {
    position: relative;
    text-align: center;
    margin-top: 22px;
    margin-bottom: 40px;
    div.line {
      position: absolute;
      width: 80%;
      left: 0;
      top: 50%;
      transform: translateX(12%) translateY(-50%);
      height: 1px;
      background: #707070;
    }
    span.text {
      display: inline-block;
      background: #fff;
      position: relative;
      z-index: 1;
      color: #707070;
      font-size: 14px;
      padding: 0 5px;
    }
  }
</style>

