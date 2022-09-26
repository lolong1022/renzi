import router from '@/router'
import store from '@/store'
// 白名单
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  // 1,判断token是否存在
  // 1.1存在处于登录状态
  // 是否去往登录页处于则去首页否则放行
  // 1.2不存在不处于登录状态
  // 是否处于白名单处于则放行否则登录页
  console.log(to)
  console.log(from)

  if (store.getters.token) { // 已登陆的状态
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
