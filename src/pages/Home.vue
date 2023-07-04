<template>
  <div class="home">
    <type-nav></type-nav>
    <list-container></list-container>
    <recommend></recommend>
    <Rank></Rank>
    <like></like>
    <!-- <floor></floor> -->
    <floor
    v-for="floor in floorList"
    :key="floor.id"
    :floor="floor"
    ></floor>
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
//    2.3 测试接口发现是跨域的,通过配置代理解决跨域问题
//    2.4 接下来该真的发请求拿数据
//        封装请求函数 ------  在api文件中把所有的请求都放在该文件中,方便统一管理
//    2.5 三连环 - 我们把数据放到vuex中
//        使用vuex步骤
//          1. 安装
//            npm i vuex@3
//          2. 引入使用
//          3. 创建并暴露
//          4. 在main.js中进行关联
//    2.6 在Home组件的mounted中,dispath调用actions函数,发请求,走三连环,把数据放到store中华
//    2.7 在TypeNav当中进行展示
// 3. 交互
//    3.1 处理TypeNav组件交互,详情参见 TypeNav 组件
// -------------------
// 首页只有两个部分去做,其他都是假的,ListContainer和Floor两个
// 但是这两个内容没有接口,后端没有提供,我们需要自己模拟,等后端有接口的时候,直接拿过来用
// 使用mockjs去模拟接口
// 一. 先做ListContainer
//    1. 模拟接口
//      在 src/mock/index.js 中写一个接口,放上我们准备的假数据
//    2. 封装api函数
//    3. 三连环
//    4. 在页面mounted的时候调用actions
//    5. 拿state中的数据在页面上进行展示
import ListContainer from './ListContainer.vue'
import TypeNav from '../components/TypeNav.vue'
import Recommend from './Recommend.vue'
import Rank from './Rank.vue'
import Like from './Like.vue'
import Floor from './Floor.vue'
import Brand from './Brand.vue'
import {mapState} from 'vuex'
export default {
  components: { TypeNav, ListContainer,Recommend,Rank, Like, Floor, Brand, },
name:'Home',
computed:{
  ...mapState({
    floorList:state=>state.home.floorList
  })
},
mounted(){
    this.$store.dispatch('getFloorList')
}
}
</script>

<style>

</style>