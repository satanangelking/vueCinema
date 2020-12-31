import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false

Vue.use(MintUI);
Vue.use(ElementUI)

new Vue({
  router,//es6中对象简写，Key与值同名时候
  store,//引入store成功，然后前往app监听
  render: h => h(App)
}).$mount('#app')
