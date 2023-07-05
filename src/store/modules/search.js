import { reqSearchPage } from "@/api"


const state = {
  searchData: {}
}

const mutations = {
  SET_SEARCHDATA(state, searchData) {
    state.searchData = searchData
  }
}

const actions = {
  async getSearchData({ commit }, params) {
    try {
      let result = await reqSearchPage(params)
      commit('SET_SEARCHDATA', result.data)
    } catch (error) {
      console.error(error)
    }
  }
}

const getters = {
  attrsList(state) {
    return state.searchData.attrsList || []
  },
  goodsList(state) {
    return state.searchData.goodsList || []
  },
  tmList(state) {
    return state.searchData.trademarkList || []
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions,
  getters,
}