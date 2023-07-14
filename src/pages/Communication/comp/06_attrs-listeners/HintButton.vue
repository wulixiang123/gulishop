<template>
    <el-popover
        placement="top"
        trigger="hover"
        :content="content"
    >
        <!-- <el-button slot="reference" v-bind="$attrs" @click="btnHandler">{{ content }}</el-button> -->
        <el-button slot="reference" v-bind="$attrs" v-on="$listeners">{{ content }}</el-button>
    </el-popover>
</template>

<script>
export default {
    name: "HintButton",
    // props: ['type', 'content', 'size', 'round'],
    props: ['content'],
    mounted() {
        console.log(this.$attrs)
        console.log(this.$listeners)
    },
    methods: {
        btnHandler() {
            console.log('触发了按钮的btn')
        }
    }
};
</script>

<style scoped>
</style>