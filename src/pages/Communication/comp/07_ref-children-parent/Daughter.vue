<template>
    <div class="box">
        <h3>女儿小红: 有存款: {{ money }}</h3>
        <button @click="giveMoney">给BABA钱: 100</button>
    </div>
</template>

<script>

export default {
    name: 'Daughter',
    data() {
        return {
            money: 20000
        }
    },
    methods:{
        giveMoney(){
            this.money -= 100

            this.$parent.money += 100
        }
    }
}
</script>
