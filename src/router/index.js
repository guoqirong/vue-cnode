import Vue from 'vue'
import Router from 'vue-router'

export let prefix = '';
if (window.__POWERED_BY_QIANKUN__) {
  prefix = '/vue2-cnode' // /vue3-cnode为主应用的activeRule
}

export default new Router({
  base: window.__POWERED_BY_QIANKUN__ ? "/vue2-cnode" : process.env.BASE_URL,
  // mode: 'history',
  routes: [
    {
      path: prefix + '/',
      name: 'index',
      // redirect:  prefix + '/',
      component: () => import('@/view/index/index.vue'),
      children: [
        {
          path: prefix + '/',
          name: 'index-topic',
          component: () => import('@/view/topic/index-topic.vue')
        },
        {
          path: prefix + '/index-detail',
          name: 'index-detail',
          component: () => import('@/view/detail/index-detail.vue')
        },
        {
          path: prefix + '/login',
          name: 'login',
          component: () => import('@/view/login/index.vue')
        },
        {
          path: prefix + '/message',
          name: 'message',
          component: () => import('@/view/message/index.vue')
        },
        {
          path: prefix + '/collect',
          name: 'collect',
          component: () => import('@/view/collect/index.vue')
        }
      ]
    }
  ],
  beforeRouteEnter (to, from, next) {
    console.log(to, from, next)
  }
})

Vue.use(Router)