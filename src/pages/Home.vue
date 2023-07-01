<template>
  <div class="home">
    <type-nav></type-nav>
    <list-container></list-container>
    <recommend></recommend>
    <Rank></Rank>
    <like></like>
    <floor></floor>
    <floor></floor>
    <brand></brand>
  </div>
</template>

<script>
// 书写页面的步骤
// 1. 静态搭建
//    拆分组件:定义、注册、使用
//    注意: 
//      这里的TypeNav是一个公用组件,所以放在 src/components 文件夹下,在main.js中进行全局注册,将来在Search组件中要用
//      所有组件在拆分的时候要把html、css、images都拆分出来
//      首页的组件中 icons.png 是精灵图,放 assets 中
// 2. 初始化数据展示
//    2.1 这一小节不写代码
//        说在实际开发中,你搭建完成静态页面,等待接口,后端给过来接口之后,先测一测,接口通了再写代码
//    2.2 发请求,拿数据
//        此时是需要axios, 安装 使用
//        在项目中我们使用axios一般会进行二次封装,为什么要进行二次封装?
//        可以对所有的请求进行统一的处理(可以配置拦截器)
// 3. 交互
import ListContainer from './ListContainer.vue'
import TypeNav from '../components/TypeNav.vue'
import Recommend from './Recommend.vue'
import Rank from './Rank.vue'
import Like from './Like.vue'
import Floor from './Floor.vue'
import Brand from './Brand.vue'
export default {
  components: { TypeNav, ListContainer,Recommend,Rank, Like, Floor, Brand, },
name:'Home'
}
</script>

<style>

</style>