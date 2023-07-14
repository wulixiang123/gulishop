<template>
    <div class="box">
        <h2>Child1 - 接收数据</h2>
        <div>text: {{ text }}</div>
    </div>
</template>

<script>
export default {
    name: "Child1",
    data() {
        return {
            text: ''
        }
    },
    mounted() {
        this.$bus.$on('receiveData', this.receiveData)
    },
    methods: {
        receiveData(arg) {
            console.log(arg)
            this.text = arg
        }
    }
}
</script>

<style scoped>

</style>