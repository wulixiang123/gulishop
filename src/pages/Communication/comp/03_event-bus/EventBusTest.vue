<template>
    <div class="box">
        <Child1></Child1>
        <Child2></Child2>
    </div>
</template>

<script>
// 总线
// 跨组件之间的通信方式
// 步骤:
// 1. 安装总线
//      beforeCreate() {
//          Vue.prototype.$bus = this // 安装总线
//      },
// 2. 接收数组的组件,找到总线,绑定事件,留下回调,接收参数
//      this.$bus.$on('receiveData', this.receiveData)
// 3. 发送数据的组件,找到总线,触发事件,传递参数
//      this.$bus.$emit('receiveData', '我爱你')
// 涉及到的面试题:
//   $on 和 $emit在哪 ( Vue 和 VueComponent 的关系)
//      VueComponent.prototype = Object.create(Vue.prototype)
import Child1 from './Child1.vue'
import Child2 from './Child2.vue'
export default {
    name: "EventBusTest",
    components: { Child1, Child2 }
}
</script>

<style scoped>

</style>