import Mock from 'mockjs'
import bannerList from './bannerList.json'
import floorList from './floorList.json'
// 造了个假接口, 一个url对应一个回调
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
// 准备bannerList假接口
Mock.mock('/mock/getBannerList',function(){
    return{
        code:200,
        data:bannerList,
        message:'success'
    }
})
// 准备floorList假接口
Mock.mock('/mock/getFloorList',function(){
    return {
        code:200,
        data:floorList,
        message:'success'
    }
})