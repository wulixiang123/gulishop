<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHide"></Footer>
  </div>
  
</template>

<script>
// 1. 整个项目的Header、Footer一样,直接把Header、Footer抽离成公用组件
//    1.1 把Header、Footer组件拆出来,同时把图片也拿过来
//        css使用less粘贴到组件中,发现less报错,安装less less-loader@7解决
//    1.2 把reset.css放在public中,同时把引入的iconfont.css放在public中,还有字体也需要引入
// 2. 渲染页面Header和Footer没变,中间的内容随着url变化而变化
//    使用路由渲染
//    书写Home、Search、Login、Register组件，注册到路由中让页面中间区域渲染内容
// 3. Header点击跳转页面
// 4. Footer隐藏
// 5. 路由相关内容
// 6. 书写首页代码
//    详情参见 Home 组件
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
export default {
  components: { Footer, Header },
name:'App',
mounted(){
    this.$store.dispatch('getCategoryList')
}
}
</script>

<style>

</style>