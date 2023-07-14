<template>
    <div class="box">
        <h2>Child2 - 发送数据</h2>
        <button @click="btnHandler">点击发送数据</button>
    </div>
</template>

<script>
export default {
    name: "Child2",
    methods: {
        btnHandler() {
            this.$bus.$emit('receiveData', '我爱你')
        }
    }
}
</script>

<style scoped>

</style>