import Mock from 'mockjs'
Mock.mock('/mock/getUserinfo',function(){
    return {
        code:200,
        data:{
            username:'aa',
            age:18
        },
        message:'success'
    }
})