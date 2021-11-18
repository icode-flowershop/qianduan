import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: () => import( '../components/login'),
        },
        {
            path: '/mallHome',
            component: () => import( '../components/front/layouts/Home.vue'),
            children: [
              {
                path:'/',
                component: () => import( '../components/front/page/index.vue'),
              },
                {
                    path: '/goodsDesc',
                    component: () => import( '../components/front/page/goodsDesc.vue'),
                },
                {
                    path: '/carts',
                    component: () => import( '../components/front/page/carts.vue'),
                },
                {
                    path: '/myOrders',
                    component: () => import( '../components/front/page/myOrders.vue'),
                },
                {
                    path: '/makeSureOrder',
                    component: () => import( '../components/front/page/makeSureOrder.vue'),
                },
                {
                    path: '/submitOrder',
                    component: () => import('../components/front/page/submitOrder.vue'),
                },
                {
                    path: '/userInfo',
                    component: () => import( '../components/front/page/userInfo.vue'),
                },

            ],
        },
      {
      path: '/backHome',
      component: () => import('../components/back/Home'),
      meta: { title: '后台首页' },
      redirect: '/backWelcome',
      children: [
          {
              path: '/backWelcome',
              component: () => import('../components/back/welcome/Welcome'),
              meta: { title: '欢迎光临' },
          },
          {
              path: '/backGoods',
              component: () => import('../components/back/goods/goodsList'),
              meta: { title: '商品列表' },
          },
          {
              path: '/backInformation',
              component: () => import('../components/back/goods/goodsInformation'),
              meta: { title: '商品详情' },
          },
      ],
  },],
  /* 用来解决跳转路由后滚动条没有在最顶端*/
     scrollBehavior(to, from, saveTop){
          if (saveTop) {
              return saveTop;
          } else {
              return {x: 0, y: 0}
          }
      }
})
