import { loginAPI } from '@/api/login'
import { getInfo, getUserInfo } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    DEL_USERINFO(state, userInfo) {
      state.userInfo = {}
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await loginAPI(loginData)
      commit('SET_TOKEN', data)
    },
    async getUserInfo({ commit }) {
      console.log(getInfo)
      // 请求
      const data = await getInfo()
      const data1 = await getUserInfo(data.userId)
      const userInfo = { ...data, ...data1 }
      commit('SET_USERINFO', userInfo)
      // return data
      return JSON.parse(JSON.stringify(userInfo))
    }
  }
}
