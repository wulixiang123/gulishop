import { reqGoodsDetail } from "@/api"

const state = {
    goodsInfo:{}
}
const mutations = {
    SET_GOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    }
}
const actions = {
    async getGoodsInfo({commit},goodsId){
        try {
            let result = await reqGoodsDetail(goodsId)
            if(result && result.code == 200){
                commit('SET_GOODSINFO',result.data)
            }else{
                console.error(result);
            }
        } catch (error) {
            console.error(error);
        }
    }
}
const getters = {
    categoryView(state){
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo || { }
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    },
    skuImageList(state){
        return state.goodsInfo.skuInfo?.skuImageList || []
        // state.goodsInfo.skuInfo?.skuImageList
        // 等价于
        // state.goodsInfo.skuInfo && state.goodsInfo.skuInfo.skuImageList
    }
}

export default {
    namespaced:true,//开启命名空间
    state,mutations,actions,getters
}