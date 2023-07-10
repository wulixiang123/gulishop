// 将所有的接口函数都放在该文件下,方便进行统一管理
import request from "@/utils/request";
import mockRequest from "@/utils/mockRequest";

// 获取首页三级分类
export const reqCategoryList = () => {
  return request.get(`/product/getBaseCategoryList`)
}

// 获取banner数据
export const reqBannerList = () => {
  return mockRequest.get('/getBannerList')
}

// 获取floor数据
export const reqFloorList = () => {
  return mockRequest.get('/getFloorList')
}

// 获取search数据
export const reqSearchPage = (data = {}) => {
  return request.post('/list', data)
}

// 获取商品详情
export const reqGoodsDetail = (skuId) => { // skuId -->  goodsId
  return request.get(`/item/${ skuId }`)
}

// 添加商品到购物车         goodsId  goodsNum
export const reqAddCart = (skuId, skuNum) => {
  return request.post(`/cart/addToCart/${ skuId }/${ skuNum }`)
}

// 获取商品列表
export const reqCartList = () => {
  return request.get(`/cart/cartList`)
}

// 修改商品选中状态
export const reqCheckedCart = (skuId, isChecked) => {
  return request.get(`/cart/checkCart/${skuId}/${isChecked}`)
}
