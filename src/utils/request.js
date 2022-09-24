// 实现对axios的封住
import axios from 'axios'

// 通过axios创建axios 实例
const service = axios.create({
  url: '/dev',
  timeout: 5000
})
export default service
