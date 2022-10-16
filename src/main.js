import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import Print from 'vue-print-nb'
Vue.use(Print)
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 引入要注册的全剧组件
import components from '@/components'
// 当图片加载不出来时，调用这个自定义指令
// 注册全局自定义指令
import * as directives from '@/directives'
Object.keys(directives).forEach(ele => {
  Vue.directive(ele, directives[ele])
})
// set ElementUI lang to EN
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(ElementUI)
// 注册·全局组件
Vue.use(components)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
