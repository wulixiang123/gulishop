import { reqCategoryList } from "@/api"

const state = {
    categoryList:[]
}
const mutations = {
    SET_CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    }
}
const actions = {
    async getCategoryList({commit}){
        try{
            let res = await reqCategoryList()
            commit('SET_CATEGORYLIST',res.data)
        }catch(err){
            console.log(err);
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}