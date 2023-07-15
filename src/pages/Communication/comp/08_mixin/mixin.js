export default{
    methods:{
        giveMoney(num){
            this.money -= num
            this.$parent.money += num
        }
    }
}