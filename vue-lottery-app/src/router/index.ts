import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
        {
      path: '/users',
      name: 'users',
      meta: { requiresAuth: true },
      component: () => import('@/views/UsersView.vue'),
      children: [
        {
          path: 'create',
          name: 'user-create',
          component: () => import('@/views/UserFormView.vue')
        },
        {
          path: ':id/edit',
          name: 'user-edit',
          component: () => import('@/views/UserFormView.vue')
        }
      ]
    },
    {
      path: '/users/:id',
      name: 'user-details',
      component: () => import('@/views/UserDetailsView.vue'),
      props: true
    },
        {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  
  if (to.name === 'login' && authStore.isAuthenticated) {
    return { name: 'users' }
  }
})

export default router