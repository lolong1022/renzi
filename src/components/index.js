// 1.引入组件
// 2. 组件生成数组，可以注册多个全局组件
// 3. 包漏出install这个函数
// 4.全剧注册vue.use()

import pageTools from './pageTools/index.vue'
const components = [pageTools]

export default {
  install(Vue) {
    components.forEach(ele => {
      console.log(ele)
      Vue.component(ele.name, ele)
    })
  }
}

