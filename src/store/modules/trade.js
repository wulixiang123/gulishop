import { reqAddressList, reqTradeInfo } from "@/api"


const state = {
  tradeInfo: {},
  addressList:[],
  tradeInfo:{}
}

const mutations = {
  SET_TRADEINFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo
  },
  SET_ADDRESSLIST(state,addressList){
    state.addressList = addressList
  }
}

const actions = {
    // 获取交易信息
  async getTradeInfo({ commit }) {
    try {
      let result = await reqTradeInfo()
      if (result && result.code == 200) {
        commit('SET_TRADEINFO', result.data)
      } else {
        console.error(result)
      }
    } catch (error) {
      console.error(error)
    }
  },
//   获取地址列表
  async getAddressList({commit}){
    try {
        let result = await reqAddressList()
        if(result && result.code == 200){
            commit('SET_ADDRESSLIST',result.data)
        }else{
            console.error(result);
        }
    } catch (error) {
        console.error(error);
    }
  }
}

const getters = {
    // 计算商品列表
    detailArrayList(state) {
        return state.tradeInfo.detailArrayList || []
      },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}