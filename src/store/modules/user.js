import { loginAPI } from '@/api/login'
import { getInfo, getUserInfo } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    haraas: 0
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    // 删除用户信息
    DEL_USERINFO(state, userInfo) {
      state.userInfo = {}
    },
    // 删除token
    DLE_TOKEN(state) {
      state.token = null
    },
    SET_HARAAS_TIME(state, getTokentime) {
      state.haraas = getTokentime
    }
  },
  actions: {
    // 拿到token
    async loginAction({ commit }, loginData) {
      const data = await loginAPI(loginData)
      commit('SET_TOKEN', data)
      // 获得token时间
      commit('SET_HARAAS_TIME', +new Date())
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
    },
    // 退出登录清除用户和token
    logout({ commit }) {
      commit('DEL_USERINFO')
      commit('DLE_TOKEN')
    }
  }
}
