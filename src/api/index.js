// 将所有的接口函数都放在该文件下,方便进行统一管理
import request from "@/utils/request";
import mockRequest from '@/utils/mockRequest'

// 获取首页三级分类
export const reqCategoryList = () => {
    return request.get(`/product/getBaseCategoryList`)
}
// 获取banner数据
export const reqBannerList = () => {
    return mockRequest.get('/getBannerList')
}

export const reqFloorList = () => {
    return mockRequest.get('getFloorList')
}