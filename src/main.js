import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
// 全局注册
import TypeNav from '@/components/TypeNav.vue'
Vue.component( TypeNav.name,TypeNav)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


// 测试二次封装
import request from './utils/request'
request.get('/product/getBaseCategoryList').then(res=>{
  console.log({res});
}).catch(e=>{
  console.log({e});
})