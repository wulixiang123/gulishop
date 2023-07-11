import { reqTradeInfo } from "@/api"


const state = {
  tradeInfo: {}
}

const mutations = {
  SET_TRADEINFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo
  }
}

const actions = {
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
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}