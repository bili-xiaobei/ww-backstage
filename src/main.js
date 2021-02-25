// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

Vue.prototype.$axios = axios;
// axios.defaults.baseURL = '/api';

Vue.config.productionTip = false
// 配置 ElementUI 组件库
Vue.use(ElementUI);
// 全局 CSS 样式
import './assets/css/global.css';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
