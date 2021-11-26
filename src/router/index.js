import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            component: () => import( '../components/login'),
        },
        {
            path: '/',
            component: () => import( '../components/front/layouts/Home.vue'),
            meta: {name: '首页'},
            children: [

              {
                path:'/',
                component: () => import( '../components/front/page/mall/index.vue'),
                meta: {name: '首页'},
                children:[
                  {
                    path:'/leftNav',
                    component: () => import( '../components/front/page/mall/leftNav.vue'),
                    meta: {name: '左侧导航条'}
                  }
                ],
              },
                {
                    path: '/goodsDesc',
                    component: () => import( '../components/front/page/goodsDesc.vue'),
                    meta: {name: '详情'},
                },
                {
                    path: '/carts',
                    component: () => import( '../components/front/page/carts.vue'),
                    meta: {name: '购物车'},
                },
                {
                    path: '/myOrders',
                    component: () => import( '../components/front/page/myOrders.vue'),
                    meta: {name: '订单'},

                },
                {
                    path: '/makeSureOrder',
                    component: () => import( '../components/front/page/makeSureOrder.vue'),
                    meta: {name: '确认订单'},

                },
                {
                    path: '/userInfo',
                    component: () => import( '../components/front/page/userInfo.vue'),
                    meta: {name: '用户信息'},

                },
                {
                  path: '/addressInfo',
                  component: () => import( '../components/front/page/addressInfo.vue'),
                  meta: {name: '地址管理'},

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
