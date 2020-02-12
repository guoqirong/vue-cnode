// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 挂载全局
import request from '@/utils/request'
import { formatDate } from '@/utils'
Vue.prototype.$request = request // ajax请求方法
Vue.prototype.$formatDate = formatDate // 日期格式化

// 引入element-UI
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
Vue.use(Element)
// element-UI尺寸设置
Vue.prototype.$ELEMENT = { size: 'mini' }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
