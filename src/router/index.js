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
//          next(false) 不做任何操作,还呆在当前路由
//      当传参的时候 next('/login') 不管你原来去哪,现在执行 next('/login'),都去login
router.beforeEach(async function (to, from, next) {
// debugger
  let token = store.state.user.token
  if (token) { // 有token,代表登录了

    // 判断有没有个人信息,有就放行,没有的话获取个人信息
    let username = store.state.user.userInfo.name
    if (username) {// 有个人信息放行
      next()
    } else { // 没有个人信息就需要重新获取个人信息

      try {
        // 等待获取个人信息
        await store.dispatch('user/getUserInfo')
        // 正常await没有报错,证明接口调用成功
        next()// 去首页,放行(刚刚就是想去首页)
      } catch (error) {
        // 请求失败,证明当前获取个人信息没有获取到
        // 什么情况下会走进catch?
        // 1. 网断了
        // 2. token错误 -- 模拟token失效
        // next('/login') 不能直接去/login,为啥? 会死循环?

        // token错误的(失效的)获取个人信息失败,走catch
        // 走catch又去走路由守卫
        // 进入路由守卫后,拿token,拿的是错误的token
        // 判断有没有个人信息,没有个人信息,获取个人信息
        // 拿着token错误的(失效的)发请求获取个人信息

        // token错误的(失效的)获取个人信息失败,走catch
        // 走catch又去走路由守卫
        // 进入路由守卫后,拿token,拿的是错误的token
        // 判断有没有个人信息,没有个人信息,获取个人信息
        // 拿着token错误的(失效的)发请求获取个人信息
        // ...

        // 解决:
        // 直接把token清除掉,当下一次进入路由守卫的时候,先判断有没有token,没有,直接放行
        store.dispatch('user/clearToken')
        next('/login') // 先放行,先不做处理
      }
    }
  } else { // 没有token,代表没有登录
    // next('/login')  不能直接跳转/login,会死循环
    next()// 目前先直接放行,等后续再改这块
    
    // 需求1: 交易、支付、支付成功、个人中心必须登录才能访问,不能直接放行
    // 创建一个黑名单,在黑名单数组中的页面必须登录
    // 需求2: 跳转的页面在黑名单当中,此时跳转登录页,当登录成功之后,去到刚刚想去而没有去到的页面
    // 例如:  /trade -> /login 当登录之后,还跳转到 /trade

    let blackList = ['/trade','/pay','/paysuccess','/center']
    if(blackList.some(item=>to.path.includes(item))){
      alert('请先登录')
      next(`/login?redirect=${to.path}`)
    }else{
      next()
    }

  }
  // next('/login') 不能直接跳转到login,因为url变化,只要路由变化就会重新走守卫,造成死循环
})

// 死循环代码 - 为什么?
// 路由发生变化
// from -> /
// to -> /login
// router.beforeEach(async function (to, from, next) {
//   next('/login')
// })


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