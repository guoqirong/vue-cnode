import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: () => import('@/components/HelloWorld.vue')
    // }
    {
      path: '/',
      name: 'index',
      component: () => import('@/view/index/index.vue')
    }
  ],
  beforeRouteEnter (to, from, next) {
    console.log(to, from, next)
  }
})
