<template>
  <div id="app" style="background: #DCDFE6">
    <router-view/>
  </div>
</template>

<script>
import Home from "./components/back/Home";
export default {
  name: 'App',
  components: {Home}
}
</script>

<style>
  @import "./assets/css/main.css";
  /*@import "./assets/css/color-dark.css";     !*深色主题*!*/
  @import "./assets/css/theme-green/color-green.css";   /*浅绿色主题*/
</style>
