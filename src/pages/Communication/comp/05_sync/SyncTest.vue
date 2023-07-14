<template>
    <div class="box">
        <h1>.sync</h1>
        <div>msg: {{ msg }}</div>

        <!-- <Child1 :msg="msg" @changeXXX="changeHandler"></Child1> -->
        
        
        <Child1 :qwer="msg" @update:qwer="changeHandler"></Child1>

        <br>

        <Child1 :qwer.sync="msg"></Child1>
        <!-- <Child1 :msg.sync="msg"></Child1> -->

    </div>
</template>

<script>
// .sync 是父子组件间的一种通信方式,父子间的数据同步
// .sync 修饰符必须实现
// :xxx 和 @update:xxx  (注意:这里面的xxx必须一样)
// --------------------
// 那么现在我们父子间的数据同步有两个: v-model 和 .sync
// 问: 什么时候用 v-model ? 什么时候用 .sync ?(一般情况)
// 封装的组件有 input(表单元素)的时候使用 v-model
// 封装的组件不含有 input(表单元素)的时候使用 .sync
// 问: 为什么要用 v-model 和 .sync ? 我不用也能实现父子间的数据同步?
// 在封装公用组件的时候使用 v-model 和 .sync ,当使用这种组件的时候会比较省力
import Child1 from './Child1'
export default {
    name: "SyncTest",
    components: { Child1 },
    data() {
        return {
            msg: '我爱你'
        }
    },
    methods: {
        changeHandler(text) {
            this.msg = text
        }
    }
}
</script>

<style scoped>

</style>