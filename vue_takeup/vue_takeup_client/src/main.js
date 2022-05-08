import Vue from 'vue'
import App from './App.vue'
//引入vue-router
import router from './route'
//引入store
import store from './store'
//引入快速点击相应
import fastClick from 'fastclick'
//引入element组件库
import { Button, MessageBox, Message } from 'element-ui';
//引入mockjs接口,加载执行
//引入图片懒加载
import VueLazyload from 'vue-lazyload'
import './mock/mockServer'
import 'animate.css'
import error from './assets/error.jpeg'
import loading from './assets/loading.gif'
fastClick.attach(document.body)
Vue.use(Button)
// Vue.use(MessageBox)
// Vue.use(Message)
Vue.config.productionTip = false
//使用组件库
Vue.use(VueLazyload, {
  loading,
})
new Vue({
  render: h => h(App),
  router,//使用vue-router
  store,//使用vuex
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$message = Message
  }
}).$mount('#app')
