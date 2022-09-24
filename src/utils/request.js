// 实现对axios的封住
import axios from 'axios'

// 通过axios创建axios 实例
const service = axios.create({
  url: 'process.env.VUE_APP_BASE_API',
  timeout: 5000
})
export default service
