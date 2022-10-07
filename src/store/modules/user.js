import { loginAPI, getUserInfoAPI, getUserBasicInfoAPI } from '@/api'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    initTime: 0
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    REMOVE_USER_INFO(state) {
      state.userInfo = {}
    },
    REMOVE_TOKEN(state) {
      state.token = null
    },
    GET_INIT_TIME(state, initTime) {
      state.initTime = initTime
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await loginAPI(loginData)
      commit('SET_TOKEN', data)
      commit('GET_INIT_TIME', new Date().getTime())
    },
    async userInfoAction({ commit }) {
      const res = await getUserInfoAPI()
      // console.log(res)
      const res1 = await getUserBasicInfoAPI(res.userId)
      const result = { ...res, ...res1 }
      commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(result))
    },
    logoutAction({ commit }) {
      commit('REMOVE_USER_INFO')
      commit('REMOVE_TOKEN')
    }
  }
}
