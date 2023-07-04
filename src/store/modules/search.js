import {reqSearchPage} from '@/api'
const state = {
    searchDate:{}
}

const mutations = {
    SET_SEARCHDATA(state,searchData){
        state.searchData = searchData
    }
}

const actions = {
    async getSearchData({commit},params){
        try{
            let result = await reqSearchPage(params)
            commit('SET_SEARCHDATA',result.data)
        }catch(e){
            console.error(e);
        }
    }
}
const getters = {}

export default {
    namespaced: true, // 开启命名空间
    state,
    mutations,
    actions,
    getters,
  }