<template>
    <div class="box">
        <h2>自定义事件</h2>
        <button @click="clickHandler" @qwer="qwerHandler">按钮</button>
        
        <hr>

        <Event1 @click="clickHandler" @qwer="qwerHandler"></Event1>


        <hr>


        <Event1 @click.native="clickHandler" @qwer="qwerHandler"></Event1>


        <hr>

        <button @click="clickHandler" @qwer="qwerHandler">不传参</button>
        <button @click="clickHandler('我爱你')" @qwer="qwerHandler">传一个参</button>
        <button @click="clickHandler($event, '我爱你')" @qwer="qwerHandler">传参数和事件对象</button>


        <br>

        <Event1 @qwer="qwerHandler"></Event1>
        <Event1 @qwer="qwerHandler('我爱你')"></Event1>
        <Event1 @qwer="qwerHandler($event, '我爱你')"></Event1>


    </div>
</template>

<script>
// 事件
// 原生标签
//      原生事件
//          事件类型: click、mouseenter、mouseLeave...  一定是有限个数的
//          触发机制: 浏览器触发
//      自定义事件 - 自己定义的事件叫自定义事件
//          没有意义
//      关于参数:
//          @click="clickHandler"  在不传参的情况下,默认参数是 事件对象
//          @click="clickHandler('我爱你')"  传一个参数,默认在回调内接收到的参数就是这里传递的'我爱你'
//          @click="clickHandler($event, '我爱你')"  传到回调中参数一是事件对象,参数二是我们自己传的
//          注意: 当回调加了小括号后,底层将会给我们的回调包裹一层
//              fns = ƒ ($event){ return  clickHandler($event, '我爱你') }
//              回调加小括号和不加小括号的区别?
//              加小括号的底层会包裹一层
// 组件
//      原生事件
//          事件类型: click、mouseenter、mouseLeave...
//          触发机制: vue会把绑定在组件标签上的原生事件理解成自定义事件
//                    所以需要在子组件中手动触发 $emit() 触发
//          如果想让组件上的click事件(长得像原生事件的事件类型)变成原生事件?
//          使用.native 修饰符即可,事件将会绑定在子组件的根标签上
//      自定义事件
//          事件类型: 随便写(不要有特殊字符),不限个数
//          触发机制: 自己在子组件中使用 $emit() 触发自定义事件
//      关于参数:
//          @qwer="qwerHandler"  回调中的参数是自己在子组件中使用 $emit('事件类型', 参数) 自己传递的参数
//          @qwer="qwerHandler('我爱你')"  回调中的参数 e1 就是'我爱你'
//                                          $emit('事件类型', 参数) 自己传递的参数 的参数丢失了
//          @qwer="qwerHandler($event, '我爱你')"  回调中e1是 $emit('事件类型', 参数) 自己传递的参数
//                                                  '我爱你'是回调中的e2参数
//      关于参数只需要记一句话: $event在原生事件中是事件对象,在自定义事件中是 $emit() 传的参数
import Event1 from './Event1.vue'
export default {
    name: "EventTest",
    components: { Event1 },
    methods: {
        clickHandler() {
            console.log('触发了click事件')
        },
        qwerHandler(e1, e2) {
            console.log(e1, e2)
        }
    }
}
</script>

<style scoped>

</style>