<template>
    <div class="box">
    </div>
</template>

<script>
import Child from "./Child";
export default {
    name: "ProvideInjectTest",
    components: {
        Child,
    },
    data() {
        return {
            content1: "jack",
            content2: {
                name: "tom",
            },
        };
    },
};
</script>

<style lang="less" scoped>
</style>
