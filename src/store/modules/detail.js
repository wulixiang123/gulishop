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
const getters = {}

export default {
    namespaced:true,//开启命名空间
    state,mutations,actions,getters
}