// 实现对axios的封住
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// token存在时间   会过期
const TIMEOUT = 3600 * 1000
// 通过axios创建axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 封装一个判断token值是否过期的函数
function getOutTimeToken() {
  const newTime = +new Date()
  const outTime = newTime - store.getters.haraas
  return outTime > TIMEOUT
}
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 每次发请求判断token时间是否过期
      if (getOutTimeToken()) {
        // 调用清除数据函数 logout
        store.dispatch('user/logout')
        // 跳转login页面
        router.push('/login')
        // 抛出错误
        return Promise.reject(new Error('token过期'))
      }
      // 请求头  添加 Authorization
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  // 请求返回成功
  (response) => {
    // 吧data, success, message 从axios返回数据中结构出来
    const { data, success, message } = response.data
    // 判断业务逻辑返回的是否成功
    // 没成功就抛出错
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 请求失败
  (error) => {
    console.log(error.response)
    if (error.response?.status === 401) {
      // 调用清除数据函数 logout
      store.dispatch('user/logout')
      // 跳转login页面
      router.push('/login')
      Message.error('token 过期')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)
export default service
