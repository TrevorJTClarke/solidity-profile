import Vue from 'vue'
import Router from 'vue-router'
import HelloCard from '@/components/HelloCard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloCard
    },
    {
      path: '/:address',
      name: 'user',
      component: HelloCard
    }
  ]
})
