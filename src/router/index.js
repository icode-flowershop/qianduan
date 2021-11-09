import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      component: () => import('../components/common/Home.vue'),
      meta: { title: 'helloFront' },
      children: [
        {
          path: '/helloHome',
          component: () => import('../components/page/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/goodsDesc',
          component: () => import('../components/page/goodsDesc.vue'),
          meta: { title: '商品详情' }
        },
        {
          path: '/carts',
          component: () => import('../components/page/carts.vue'),
          meta: { title: '购物车' }
        },

        {
          path: '/myOrders',
          component: () => import('../components/page/myOrders.vue'),
          meta: { title: '我的订单' }
        },
        {
          path: '/makeSureOrder',
          component: () => import('../components/page/makeSureOrder.vue'),
          meta: { title: '确认订单' }
        },
        {
          path: '/submitOrder',
          component: () => import('../components/page/submitOrder.vue'),
          meta: { title: '提交订单' }
        },
        {
          path: '/userInfo',
          component: () => import('../components/page/userInfo.vue'),
          meta: { title: '个人信息' }
        },
        {
          path: '/addressMag',
          component: () => import('../components/page/addressMag.vue'),
          meta: { title: '地址管理' }
        },
        {
          path: '/404',
          component: () => import( '../components/page/404.vue'),
          meta: { title: '404' }
        },
        {
          path: '/403',
          component: () => import( '../components/page/403.vue'),
          meta: { title: '403' }
        }

      ]
    },
    {
      path: '/login',
      component: () => import( '../components/page/login.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/register',
      component: () => import( '../components/page/register.vue'),
      meta: { title: '注册' }
    },

    {
      path: '*',
      redirect: '/404'
    }
  ]
})
