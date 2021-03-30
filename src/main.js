import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()  
//使用图片懒加载的插件
Vue.use(VueLazyload)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
