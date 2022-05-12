import Vue from 'vue'
import SvgIcon from './svg'// svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)


//<svg-icon iconClass="joiner"></svg-icon>