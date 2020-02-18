import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/index',
      component: () => import('@/view/index/index.vue'),
      children: [
        {
          path: '/index',
          name: 'index-topic',
          component: () => import('@/view/topic/index-topic.vue')
        },
        {
          path: '/index-detail',
          name: 'index-detail',
          component: () => import('@/view/detail/index-detail.vue')
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/view/login/index.vue')
        }
      ]
    }
  ],
  beforeRouteEnter (to, from, next) {
    console.log(to, from, next)
  }
})
