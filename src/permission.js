import router from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']
// 路由守卫 ---> 一级守卫
router.beforeEach(async(to, from, next) => {
  // console.log(to)
  // console.log(from)
  // next()
  //   1、判断token是否存在
  //   1.1存在 处于登录状态，判断是否去往登录页，想去登录页， 就去首页（留在这），否则，放行
  //   1.2不存在 不处于登录状态，判断是否去往的页面是否处于白名单内，处于则放行，否则，去登录页登录
  if (store.getters.token) {
    if (!store.state.user.userInfo.userId) {
      await store.dispatch('user/userInfoAction')
    }
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
