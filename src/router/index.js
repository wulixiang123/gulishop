// 1. 下载安装
//    npm i vue-router@3
// 2. 引入使用
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 解决编程式导航 $router.push() 重复跳转的问题
const orginPush = VueRouter.prototype.push // 存一下原来push地址
VueRouter.prototype.push = function (location) {
  orginPush.call(this, location).catch(() => {})
}
const orginReplace = VueRouter.prototype.replace // 存一下原来push地址
VueRouter.prototype.replace = function (location) {
  orginReplace.call(this, location).catch(() => {})
}

import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Search from '@/pages/Search.vue'

export default new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home
        },
        {
            path:'/login',
            component:Login,
            meta:{
                isHide:true// 这个数据用来控制Login组件的显示和隐藏,为true的时候代表隐藏
            }
        },
        {
            path:'/register',
            component:Register,
            meta:{
                isHide:true// 这个数据用来控制Footer组件的显示和隐藏,为true的时候代表隐藏
            }
        },
        {
            name:'Search',
            path:'/search/:keyword?',// 加问号的目的是能够匹配到路由,参数该丢还是会丢失
            component:Search
        },
        {
            path:'/',
            redirect:'/home'
        }
    ]
})