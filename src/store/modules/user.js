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
  token: localStorage.getItem('TOKEN'),
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
        return 'ok'
      }
      return Promise.reject(result.message || '获取用户信息失败')
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
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

        // 登录状态保持,当刷新页面的时候,需要展示当前用户是登录的
        // 会走路由守卫,在路由守卫中拿个人信息
        //    路由守卫中拿个人信息的条件是 token存在,个人信息不存在
        //    但是现在刷新页面,token在store中丢失了
        //    我们只要保证token不丢失(store中有token),那么就会走获取个人信息的代码
        // 解决方式:
        // 第一次获取token的时候,直接把token存到localStorage中
        // 当刷新页面的时候,从localStorage中拿到token,放到store
        localStorage.setItem('TOKEN', result.data.token)
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

