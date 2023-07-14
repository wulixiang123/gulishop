<template>
    <div class="box">
        <h1>组件间通信: $attrs与$listeners</h1>
        <h2>需求: 自定义带Hover提示的按钮</h2>

        <br>

        <HintButton type="primary" content="添加" class="abc" style="color: red;" name='asdf' id="zxc"></HintButton>


        <HintButton
            type="success"
            content="删除"
            size="mini"
            round
            @click="clickHandler"
            @abc="abcHandler"
        ></HintButton>
    </div>
</template>

<script>
// $attrs
// 获取到绑定在组件上的所有属性(包括属性值),除了props接收过的属性 和 class 和 style
// 可以使用 v-bind="$attrs" 将所有接收到的属性直接绑定在元素上,这样就不需要一个一个接收的绑定了
// $listeners
// 接收所有绑定在组件上的事件--只执行click事件,其它事件不执行
// 可以用于直接给子组件中某个元素绑定事件,绑定的事件是写在组件标签上的事件
import HintButton from './HintButton.vue'
export default {
    name: "AttrsListenersTest",
    components: { HintButton },
    methods: {
        clickHandler() {
            console.log('触发了组件的click')
        },
        abcHandler() {
            console.log('触发了组件的abc')
        },
    }
}
</script>

<style scoped>

</style>