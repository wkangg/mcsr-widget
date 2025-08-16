import SettingsPage from '@/pages/SettingsPage.vue'
import WidgetPage from '@/pages/WidgetPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/widget', component: WidgetPage },
  { path: '/settings', component: SettingsPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
