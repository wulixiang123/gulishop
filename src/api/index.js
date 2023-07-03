import request from "@/utils/request";

// 获取首页三级分类
export const reqCategoryList = () => {
    return request.get(`/product/getBaseCategoryList`)
}