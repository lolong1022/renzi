// 实现对axios封装
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// 对比时间是否超时
// 拿到每次刷新的时间--->请求拦截器每次都可以拿到
const timeOut = 86400 // 秒
function IsCheckTimeOut() {
  const refreshTime = Date.now() // 每次刷新的时间戳
  const timeDifference = (refreshTime - store.getters.initTime) / 1000 // 时间差
  return timeDifference > timeOut // true超时 /false 未超时
}

// 通过axios创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000
})

// 请求拦截器
// 每次在接口中携带token很麻烦，所以我们可以在axios拦截器中统一注入token
service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    // 如果token存在 注入token
    if (IsCheckTimeOut()) { // 超时
      store.dispatch('user/logoutAction') // 个人信息和token清空
      router.push('/login')
      return Promise.reject(new Error('token 超时，请重新登录'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  // 考虑把那些数据抛出去
  // 接口成功并且业务成功
  // 没有成功Promise.reject抛出错误
  const { message, data, success } = response.data
  if (success) { // 业务逻辑是成功的
    return data
  }
  // 业务逻辑没有成功
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  // console.log(error.response)
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logoutAction') // 个人信息和token清空
    router.push('/login')
    Message.error('token 超时，请重新登录')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})

export default service
