import { createRouter, createWebHistory } from 'vue-router'
import WidgetPage from '@/pages/WidgetPage.vue'

const routes = [{ path: '/widget', component: WidgetPage }]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
