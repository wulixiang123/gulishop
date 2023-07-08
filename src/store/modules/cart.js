import { reqAddCart } from "@/api"


const state = {}

const mutations = {}

const actions = {
  async addCart({ commit }, { skuId, skuNum }) {
    
    try {
      let result = await reqAddCart(skuId, skuNum)
      if (result && result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject('添加购物车失败')
      }
    } catch (error) {
      return Promise.reject(error)
    }
    // 问: 什么情况下return失败的promise?
    // 当外部调用当前函数的时候,想要得到当前函数失败状态的时候
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

