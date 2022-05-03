// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import './public-path.js'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 挂载全局
import httpRequest from '@/utils/request'
import { formatDate } from '@/utils'
import Bus from '@/utils/bus';
Vue.prototype.$httpRequest = httpRequest // ajax请求方法
Vue.prototype.$formatDate = formatDate // 日期格式化
Vue.prototype.$bus = Bus // 全局事件管理

// 引入element-UI
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
Vue.use(Element)
// element-UI尺寸设置
Vue.prototype.$ELEMENT = { size: 'mini' }

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })

let instance;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(props) {
  const { container } = props || {};
  // 为了避免根id#app与其他DOM冲突，需要限制查找范围
  instance = new Vue({
    el: container ? container.querySelector('#app') : '#app',
    router,
    store,
    render: (h) => h(App),
  });
  // // 触发头部消息更新
  // const [ emitter ] = useEventBus();
  // emitter.emit('read-msg');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

//--------- 生命周期函数------------//
export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
  return await new Promise(resolve => {
    resolve(true);
  });
}

export function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}

export function unmount() {
  if (instance) {
    instance.$destroy();
    instance.$el.innerHTML = '';
    instance = undefined;
  }
}