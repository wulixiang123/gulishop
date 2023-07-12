import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/mock'

import * as api from '@/api'
Vue.prototype.$api = api

// element 完整引入
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
// 按需引入
// 按需引入的组件分为两种情况
import 'element-ui/lib/theme-chalk/index.css';
import { Button, MessageBox, Message } from 'element-ui';
// 大多数组件通过 Vue.component 或 Vue.use 可以使用
Vue.component(Button.name, Button); // --> Vue.use(Button)
// 只有少部分组件需要挂载Vue的原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

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
  beforeCreate(){
    Vue.prototype.$bus = this//安装总线
  },
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

// import mockRequest from '@/utils/mockRequest'
// mockRequest.get('/getUserinfo').then(res=>{
//   console.log(res);
// }).catch(e=>{
//   console.log(e);
// })
// // import mockRequest from '@/utils/mockRequest'
// mockRequest.get('/getBannerList').then(res=>{
//   console.log(res);
// }).catch(e=>{
//   console.log(e);
// })
// // import mockRequest from '@/utils/mockRequest'
// mockRequest.get('/getFloorList').then(res=>{
//   console.log(res);
// }).catch(e=>{
//   console.log(e);
// })