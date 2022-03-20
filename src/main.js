import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import "@/assets/css/global.css"
// 引入iconfont
import "@/assets/css/iconfont.css"
// 引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入axios
import request from "@/utils/ajax.js";


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.http = request;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
