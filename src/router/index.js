import { createRouter, createWebHistory } from 'vue-router'
import store from '@store/index.js'

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      name: 'Index',
      path: '/',
      redirect: '/main'
    },
    {
      name: 'Main',
      path: '/main',
      component: () => import('@views/Main.vue')
    },
    {
      name: 'Article',
      path: '/article',
      component: () => import('@views/Article.vue')
    },
    {
      name: 'Timeline',
      path: '/timeline',
      component: () => import('@views/Timeline.vue')
    },
    {
      name: 'Works',
      path: '/works',
      component: () => import('@views/Works.vue')
    },
    {
      name: 'About',
      path: '/aboutme',
      component: () => import('@views/About.vue')
    }
  ]
})

router.beforeResolve((to, from, next) => {
  store.state.currentPage = to.name
  next()
})

export default router