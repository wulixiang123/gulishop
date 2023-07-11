// 1. 下载安装
//    npm i vue-router@3
// 2. 引入使用
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes' // 抽离routes
import store from '@/store'
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

const router = new VueRouter({
  routes,
  // 滚动行为 - 控制页面滚动到什么位置
  scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  }
})


// 全局前置守卫
// to 是一个对象,是路由,去哪个路由的路由
// from 是一个独享,是路由,从哪个路由来的路由
// next 是个函数
//      next() 直接调用 是放行的意思
//      可以传参 - 可以传字符串,也可以传对象
//          next('/login')
//          next({
//            path: '/login'
//          })
//      当传参的时候 next('/login') 不管你原来去哪,现在执行 next('/login'),都去login
router.beforeEach(async function (to, from, next) {

  let token = store.state.user.token
  if (token) { // 有token,代表登录了

    // 判断有没有个人信息,有就放行,没有的话获取个人信息
    let username = store.state.user.userInfo.name
    if (username) {// 有个人信息放行
      next()
    } else { // 没有个人信息,获取

      try {
        // 等待获取个人信息
        await store.dispatch('user/getUserInfo')
        // 获取成功之后进行放行
        next()
      } catch (error) {
        next() // 先放行,先不做处理
      }
    }

  } else { // 没有token,代表没有登录

    next()
    
    // 这里没有token不能直接去login,会死循环,目前先放行,后续在加条件
    // next('/login')

  }
  // next('/login') 不能直接跳转到login,因为url变化,只要路由变化就会重新走守卫,造成死循环
})

// 全局解析守卫
// router.beforeResolve(function(to, from, next) {
//   console.log('全局解析守卫')
//   next()
// })

// 全局后置钩子
// router.afterEach((to, from) => {
//   console.log('全局后置钩子')
// })


// 3. 创建并暴露
export default router
// 4. 在创建vm实例的时候,进行关联(main.js)