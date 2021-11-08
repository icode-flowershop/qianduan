<template>
  <center>
    <div style="position: absolute;right: 7%;bottom: 10%;">
      <el-tooltip class="item" effect="dark" content="返回顶层" placement="left-start">
        <el-button size="medium" @click="goTop()" icon="el-icon-arrow-up" circle></el-button>
      </el-tooltip>
      <br><br>
      <el-tooltip class="item" effect="dark" content="刷新" placement="left-start">
        <el-button size="medium" @click="goTop()" icon="el-icon-refresh-right" circle></el-button>
      </el-tooltip>
      <br><br>
      <a href="https://jq.qq.com/?_wv=1027&k=2giDHjln">
        <el-tooltip class="item" effect="dark" content="问题反馈QQ群" placement="left-start">
          <el-button size="medium"  @click="gokefu()" icon="el-icon-position" circle></el-button>
        </el-tooltip>
      </a>
    </div>
    <div class="footer" style="margin-top: 90px;margin-bottom: 0px">
        <hr />


    </div>
  </center>
</template>
<script>
  export default {
    data() {
      return {
        collapse: false,
        fullscreen: false,
        name: 'admin',
        message: 2
      }
    },
    methods:{
      //前往页面头部
      goTop() {
        location.reload();
      },
      //前往客服
      // gokefu() {
      //   location.reload();//刷新页面
      // },
    }
  }
</script>
<style scoped>
  .footer {
    width: 100%;
    height: 160px;
  }
</style>
