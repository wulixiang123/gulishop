import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/mock'

// Vue.js中的全局注册是指将组件注册到全局，
// 这样在任何新创建的Vue根实例(new Vue)的模板中都可以使用。
// 全局注册通过Vue.component来创建组件
Vue.config.productionTip = false
// 全局注册
import TypeNav from '@/components/TypeNav.vue'
Vue.component( TypeNav.name,TypeNav)

import SwiperList from '@/components/SwiperList.vue'
Vue.component(SwiperList.name,SwiperList)

import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


// 测试二次封装
// import request from './utils/request'
// request.get('/product/getBaseCategoryList').then(res=>{
//   console.log({res});
// }).catch(e=>{
//   console.log({e});
// })

import mockRequest from '@/utils/mockRequest'
mockRequest.get('/getUserinfo').then(res=>{
  console.log(res);
}).catch(e=>{
  console.log(e);
})
// import mockRequest from '@/utils/mockRequest'
mockRequest.get('/getBannerList').then(res=>{
  console.log(res);
}).catch(e=>{
  console.log(e);
})
// import mockRequest from '@/utils/mockRequest'
mockRequest.get('/getFloorList').then(res=>{
  console.log(res);
}).catch(e=>{
  console.log(e);
})