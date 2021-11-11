<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="../../assets/img/manager.jpg" alt="" />
          <span>BELOVING电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
          <el-aside :width="isCollapse ? '61px' : '200px'">
            <div class="toggle-button" @click="toggleCollpase">|||</div>
            <el-menu
              background-color="#333744"
              text-color="#fff"
              active-text-color="#409EFF"
              :unique-opened="true"
              :collapse="isCollapse"
              :collapse-transition="false"
              :router="true"
              :default-active="activePath"
            >
              <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                <!-- 一级菜单的模板区域 -->
                <template slot="title">
                  <!-- 图标 -->
                  <i :class="iconsObj[item.id]"></i>
                  <!-- 文本 -->
                  <span>{{ item.authName }}</span>
                </template>
                <!-- 二级菜单 -->
                <el-menu-item :index="'/' + sunItem.path" v-for="sunItem in item.children" :key="sunItem.id" @click="saveActivePath('/' + sunItem.path)">
                  <template slot="title">
                    <!-- 二级菜单的模板区域 -->
                    <i class="el-icon-menu"></i>
                    <!-- 图标 -->
                    <span>{{ sunItem.authName }}</span>
                    <!-- 文本 -->
                  </template>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
      <el-main style="flex-grow:1;">
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      iconsObj: {
        // 一级菜单的icon图标
        147: 'el-icon-magic-stick',
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false, // 是否折叠属性
      activePath: '',
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList() {
      this.menuList = [
        {
          authName: '欢迎光临',
          id: 147,
          order: 1,
          path: 'backWelcome',
          children: [
            {
              authName: 'Welcome',
              id: 124,
              order: 1,
              path: 'backWelcome',
              children: []
            }
          ]
        },
        {
          authName: '用户管理',
          id: 125,
          order: 1,
          path: 'backWelcome',
          children: [
            {
              authName: "用户列表",
              id: 110,
              order: null,
              path: 'backWelcome',
              children: []
            }]
        },
        {
          authName: '权限管理',
          id: 103,
          order: 2,
          path: 'backWelcome',
          children: [
            {
              authName: '权限列表',
              id: 112,
              order: null,
              path: 'backWelcome',
              children: []
            }]
        },
        {
          authName: '商品管理',
          id: 101,
          order: 3,
          path: 'backWelcome',
          children: [
            {
              authName: '商品列表',
              id: 104,
              order: 1,
              path: 'backGoods',
              children: []
            },
            {
              authName: '分类参数',
              id: 115,
              order: 2,
              path: 'backWelcome',
              children: []
            },
            {
              authName: '商品分类',
              id: 121,
              order: 3,
              path: 'backWelcome',
              children: []
            }
          ]
        },
        {
          authName: '订单管理',
          id: 102,
          order: 4,
          path: 'backWelcome',
          children: [
            {
              authName: '订单列表',
              id: 107,
              order: null,
              path: 'backWelcome',
              children: []
            }
          ]
        },
        {
          authName: '数据统计',
          id: 145,
          order: 5,
          path: 'backWelcome',
          children: [
            {
              authName: '订单列表',
              id: 146,
              order: null,
              path: 'backWelcome',
              children: []
            }
          ]
        }
        ]
    },
    toggleCollpase() {
      this.isCollapse = !this.isCollapse
    },
    saveActivePath(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
      console.log('荆棘' + this.$route.path)
    }
  }
}
</script>

<style scoped>
.hwelcome {
  color: #fff;
  font-size: 15px;
  height: 25px;
  text-align: center;
  background: green;
}
.hwelcome span {
  margin-left: 10px;
}
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  background-color: #45b97c;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header div img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.el-header div {
  display: flex;
  align-items: center
}
.el-header div img span {
  margin-left: 15px;
}
.el-aside {
  background-color: #333744;
}
.el-menu {
  border-right: none;
}
.el-aside  el-main {
  background-color: #eaedf1;
}
.iconfont {
  padding-right: 10px;
}
.toggle-button {
  background: #65c294;
  font-size: 10px;
  text-align: center;
  line-height: 24px;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}
el-menu {

}
</style>
