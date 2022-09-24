import { loginAPI } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const { data: { data }} = await loginAPI(loginData)
      commit('SET_TOKEN', data)
    }
  }
}
