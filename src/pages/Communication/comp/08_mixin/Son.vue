<template>
    <div class="box">
        <h3>儿子小明: 有存款: {{ money }}</h3>
        <button @click="giveMoney(50)">给BABA钱: 50</button>
    </div>
</template>

<script>
import mixin from './mixin'
export default {
    name: 'Son',
    mixins:[mixin],
    data() {
        return {
            money: 30000
        }
    },
    // methods:{
    //     giveMoney(){
    //         this.money -= 50
    //         this.$parent.money += 50
    //     }
    // }
}
</script>
