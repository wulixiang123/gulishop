import Mock from 'mockjs'
import bannerList from './bannerList.json'
import floorList from './floorList.json'
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

Mock.mock('/mock/getBannerList',function(){
    return{
        code:200,
        data:bannerList,
        message:'success'
    }
})

Mock.mock('/mock/getFloorList',function(){
    return {
        code:200,
        data:floorList,
        message:'success'
    }
})