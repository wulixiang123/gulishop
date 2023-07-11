import { reqCode, reqLogin, reqRegister, reqUserInfo } from '@/api'
import { getUserTempId } from '@/utils/user'

// 我们把唯一标识放到store中,为什么放到store中?
// 原因1:
// store是内存级的,localStorage是硬盘级的
// store取数据比localStorage快
// 原因2:
// 方便统一管理用户相关的数据

const state = {
  userTempId: getUserTempId(),
  token: '',
  userInfo: {}, // 存个人信息
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USERINFO(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  // 获取个人信息
  async getUserInfo({ commit }) {
    try {
      let result = await reqUserInfo()
      if (result && result.code == 200) {
        commit('SET_USERINFO', result.data)
      }
    } catch (error) {
      console.error(error)
    }
  },
  // 登录 - 获取token
  // 注意:仅仅用来获取token,只要有token就代表登录成功了,此时是没有个人信息的,个人信息需要拿着token重新发请求获取
  // 注意: token是需要存起来的,后续我们任何请求的时候都需要携带
  async login ({ commit }, data) {
    try {
      let result = await reqLogin(data)
      if (result && result.code == 200) {
        commit('SET_TOKEN', result.data.token)
      }
    } catch (error) {
      console.error(error)      
    }
  },
  // 注册
  async register(miniStore, data) {
    try {
      let result = await reqRegister(data)
      if (result && result.code == 200) {
        return 'ok'
      }
      return Promise.reject(result.message || '注册失败')
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // 获取code
  async getCode({ commit }, phone) {
    try {
      let result = await reqCode(phone)
      if (result && result.code == 200) {
        return result.data
      }
      return Promise.reject(result.message || '获取code失败')
    } catch (error) {
      return Promise.reject(error)
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

