import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // Ліниве завантаження (Async Component) - компонент завантажується лише при переході на цей маршрут
      component: () => import('@/views/HomeView.vue')
    }
  ]
})

export default router
