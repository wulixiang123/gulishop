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

// 删除商品
export const reqDeleteCart = (skuId) => {
    return request.delete(`/cart/deleteCart/${skuId}`)
}

// 购物车全选、非全选
export const reqBatchCheckCart = (isChecked,skuIdList) => {
    return request.post(`/cart/batchCheckCart/${isChecked}`,skuIdList)
}

// 删除选中商品
export const reqBatchDeleteCart = (skuIdList) => {
    return request.post(`/cart/batchDeleteCart`,skuIdList)
}

// 获取验证码
export const reqCode = (phone) => {
    return request.get(`/user/passport/sendCode/${phone}`)
}

// 注册
export const reqRegister = (data) => {
    return request.post(`/user/passport/register`,data)// data -> code、password、phone
}

// 登录
export const reqLogin = (data) => {
    return request.post(`/user/passport/login`,data)// data -> phone、password
}

// 获取个人信息
export const reqUserInfo = () => {
  return request.get(`/user/passport/auth/getUserInfo`)
}

// 获取交易信息
export const reqTradeInfo = () => {
  return request.get(`/order/auth/trade`)
}

// 获取地址列表
export const reqAddressList = () => {
  // return request.get(`/user/userAddress/auth/findUserAddressList`) // 真实的
  return mockRequest.get(`/user/userAddress/auth/findUserAddressList`) // mock数据
}

// 获取
export const reqLogout = () => {
  return request.get(`/user/passport/logout`)
}

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => {
  return request.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data)
}

// 获取支付信息
export const reqPayInfo = (orderId) => {
return request.get(`/payment/weixin/createNative/${orderId}`)
}

// 查询订单支付状态
export const reqPayStatus = (orderId) => {
  return request.get(`/payment/weixin/queryPayStatus/${orderId}`)
}