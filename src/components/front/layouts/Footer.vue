<template>
  <center>
    <div style="position: fixed;right: 6%;bottom: 16%;">
      <el-tooltip class="item" effect="dark" content="返回顶层" placement="left-start">
        <el-button size="medium" @click="goTop()" icon="el-icon-arrow-up" circle></el-button>
      </el-tooltip>
      <br><br>
        <el-tooltip class="item" effect="dark" content="购物车" placement="left-start">
          <el-button size="medium"  @click="turnToCart" icon="el-icon-shopping-cart-2" circle></el-button>
        </el-tooltip>
    </div>
    <div class="footer" style="margin-top: 90px;margin-bottom: 0px">


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
      turnToCart() {
        this.$router.push('/carts');
      },

    }
  }
</script>
<style scoped>
  .footer {
    width: 100%;
    height: 160px;
  }
</style>
