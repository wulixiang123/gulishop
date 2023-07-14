<template>
    <div class="box">
        <div>msg:{{ msg }}</div>
        <button @click="changeMsg1">修改msg-失败</button>
        <button @click="changeMsg2">修改msg</button>
        <button @click="changeUserInfoHandler">修改userInfo内容</button>
        <div>username:{{ userInfo.username }}</div>
        <div>age:{{ userInfo.age }}</div>
    </div>
</template>

<script>
export default {
    name: "Child",
    // props:['msg']//数组写法

    // props:{//对象写法
    //     msg:String
    // }

    props:{//配置对象写法
        msg:{
            type:String,
            required:true,//必填
            default:'默认值'// 必填和默认值是互斥的
        },
        userInfo:{
            type:Object,
            // required: true,
            // 注意: 对象,数组,函数的默认值需要是函数返回值的形式,为什么?
            // 和data是函数返回值形式一个道理,防止多个组件用一套数据
            default(){
                return{
                    username:'默认值',
                    age:10
                }
            }
        },
        changeMsg2:{
            type:Function,
            required:true
        }
    },
    methods:{
        changeMsg1(){
            this.msg = '八戒'
        },
        changeUserInfoHandler(){
            // 不能直接修改传过来对象的地址
            // this.userInfo = {
            //     username: '沈腾',
            //     age: 40
            // }

            this.userInfo.username = '沙僧'
            this.userInfo.age = 15
        }
    }
}
</script>

<style scoped>

</style>