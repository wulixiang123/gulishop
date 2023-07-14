<template>
    <div class="box">
        <div>msg:{{ msg }}</div>
        <div>username:{{ userInfo.username }}</div>
        <div>age:{{ userInfo.age }}</div>
        <child
        v-bind:msg="msg"
        :userInfo="userInfo"
        :changeMsg2="changeMsg2"
        ></child>
    </div>
</template>

<script>
import Child from './Child.vue'
export default {
  components: { Child },
    name: "PropsTest",
    data(){
        return{
            msg:'哦吼',
            userInfo:{
                username:'悟空',
                age:18
            }
        }
    },
    methods:{
        changeMsg2(){
            this.msg+='~~~~~~~'
        }
    }
}
</script>

<style scoped>

</style>