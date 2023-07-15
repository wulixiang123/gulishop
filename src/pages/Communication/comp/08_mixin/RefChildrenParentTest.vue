<template>
    <div class="box">
        <h1>组件间通信8: mixin</h1>

        <p>BABA有存款: {{ money }}</p>
        <button @click="borrowMoneyFromXM">找儿子借钱100</button><br />
        <button @click="borrowMoneyFromXH">找女儿借钱150</button><br />
        <button @click="borrowMoneyFromChild">找所有孩子借钱200</button><br />

        <br />
        <Son ref="son" />

        <br />
        <Daughter ref="daughter" />
    </div>
</template>

<script>
import Son from "./Son";
import Daughter from "./Daughter";
export default {
    name: "ChildrenParentTest",
    data() {
        return {
            money: 1000,
        };
    },
    components: {
        Son,
        Daughter,
    },
    methods:{
        borrowMoneyFromXM(){
            this.$refs.son.money -= 100
            this.money += 100
        },
        borrowMoneyFromXH(){
            this.$refs.daughter.money -= 150
            this.money += 150
        },
        borrowMoneyFromChild(){
            this.$children.forEach(child=>{
                child.money -= 100
            })
            this.money += 200
        }
    }
};
</script>

<style>
</style>
