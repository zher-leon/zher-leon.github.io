import { createRouter, createWebHashHistory } from 'vue-router'

const history = createWebHashHistory()
const router = createRouter({
  history,
  routes: [
    {
      name: 'main',
      path: '/',
      component: () => import('@views/Main.vue')
    }
  ]
})

export default router