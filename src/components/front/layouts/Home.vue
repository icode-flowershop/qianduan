<template>
    <div class="wrapper">
        <v-head></v-head>
            <div class="content">

<el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:1%">
  <el-breadcrumb-item  to='/'>首页</el-breadcrumb-item>
  <el-breadcrumb-item v-if="this.$route.meta.name">{{this.$route.meta.name}}</el-breadcrumb-item>
</el-breadcrumb>
                <router-view>
                </router-view>


            </div>
             <v-footer></v-footer>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vFooter from './Footer.vue';

export default {
    components: {
        vHead,
        vFooter,
    }
};
</script>
<style>

</style>
