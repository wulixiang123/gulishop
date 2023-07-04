import { reqCategoryList,reqBannerList  } from "@/api"

const state = {
    categoryList:[],
    bannerList:[]// 存轮播的数据
}
const mutations = {
    SET_CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    SET_BANNERLIST(state,bannerList){
        state.bannerList = bannerList
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
    },
    async getBannerList({commit}){
        try{
            let res = await reqBannerList()
            commit('SET_BANNERLIST',res.data)
        }catch(e){
            console.error(e);
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