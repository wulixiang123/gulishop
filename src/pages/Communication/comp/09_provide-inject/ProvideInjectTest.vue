<template>
    <div class="box">
        <div>contnet1:{{ content1 }}</div>
        <div>contnet2.name:{{ content2.name }}</div>
        <button @click="changeContent1">修改content1</button>
        <button @click="changeContent2">修改content2</button>
        <child></child>
    </div>
</template>

<script>
import Child from "./Child";
export default {
    name: "ProvideInjectTest",
    components: {
        Child
    },
    data() {
        return {
            content1: "jack",
            content2: {
                name: "tom",
            },
        };
    },
    provide(){
        return{
            dream1:this.content1,
            dream2:this.content2,
        }
    },
    methods: {
        changeContent1() {
            this.content1 = 'rose'
        },
        changeContent2() {
            // this.content2 = {
            //     name: 'jerry'
            // }

            this.content2.name = 'Tony'
        }
    }
};
</script>

<style lang="less" scoped>
</style>
