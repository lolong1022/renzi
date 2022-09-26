// 实现对axios的封住
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// 通过axios创建axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      console.log(123, store.getters.token)
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 请求拦截器
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
    Message.error(error.message)
    return Promise.reject(error)
  }
)
export default service
