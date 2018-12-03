import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Index from '../views/index/Index.vue'
const About = () => import('../views/index/About.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {path: '/about', name: 'about', component: About},
      {path: '/', name: 'index', component: Index},
      {path: '*', redirect: '/'}
    ]
  })
}
