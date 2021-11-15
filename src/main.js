import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import $ from 'jquery'
import webClick from './js/webClick';

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import http from './utils/http.js';
import store from './store/store.js'


Vue.config.productionTip = false
Vue.prototype.axios=http;
/**
 * ElementUI配置并生效，全局使用
 */
Vue.use(ElementUI, {
  size: 'small'
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:h=>h(App),
  beforeCreate() {
		Vue.prototype.$bus = new Vue(); //安装全局事件总线
	},
})
