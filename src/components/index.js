import * as filters from '@/filters'
// 1.引入组件
// 2. 组件生成数组，可以注册多个全局组件
// 3. 包漏出install这个函数
// 4.全剧注册vue.use()

// import pageTools from './pageTools/index.vue'
// const components = [pageTools]

// require.context 获取全部模块
// 参数 路径  是否查看子文件 正则匹配
// componentsURL(item)  调用拿到模块
const componentsURL = require.context('./', true, /\.vue$/)
const components = componentsURL.keys().map(item => {
  return componentsURL(item)
})
// console.log(componentsURL(componentsURL.keys()[0]))
export default {
  install(Vue) {
    components.forEach(ele => {
      Vue.component(ele.default.name, ele.default)
    })
    // 全局注册
    Object.keys(filters).forEach(ele => {
    //   console.log(ele, filters[ele])

      Vue.filter(ele, filters[ele])
    }
    )
  }
}

