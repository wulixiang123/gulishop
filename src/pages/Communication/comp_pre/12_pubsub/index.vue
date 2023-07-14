<template>
    <div class="box">
        <h1>pubsub - 父组件</h1>
        <br>
        
        <Child1></Child1>
        <br>

        <Child2></Child2>
    </div>
</template>

<script>
import Child1 from './Child1.vue'
import Child2 from './Child2.vue'
export default {
    name: "pubsub",
    components: { Child1, Child2 }
}
</script>

<style scoped>

</style>