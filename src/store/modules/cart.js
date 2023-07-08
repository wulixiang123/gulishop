import { reqAddCart, reqCartList } from "@/api"


const state = {
  cartList: []
}

const mutations = {
  SET_CARTLIST(state, cartList) {
    state.cartList = cartList
  }
}

const actions = {
  // 购物车列表
  async getCartList({ commit }) {
    try {
      let result = await reqCartList()
      if (result && result.code == 200) {
        console.log('接口返回的数据', result)
        // 这里等我们能看到返回的数据在写commit,不确定返回的内容是啥
        // 直接忙写,容易写错
        // commit('SET_CARTLIST', result.data)
      } else {
        console.error(error)
      }
    } catch (error) {
      console.error(error)
    }
  },
  // 添加购物车
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

