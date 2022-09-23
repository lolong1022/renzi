import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
console.dir(req.keys())

const requireAll = requireContext => requireContext.keys().map(item => { return requireContext(item) })
console.log(requireAll(req))
