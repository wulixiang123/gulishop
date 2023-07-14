<template>
    <div class="box">
        <h2>Child1组件</h2>
        <div>qwer: {{ qwer }}</div>
        <button @click="xxxHandler">修改 qwer 数据</button>
    </div>
</template>

<script>
export default {
    name: "Child1",
    props: ["qwer"],
    methods: {
        xxxHandler() {
            let text = this.qwer + '燕子'
            // this.$emit('changeXXX',  text)
            this.$emit('update:qwer',  text)
        }
    }
}
</script>

<style scoped>

</style>