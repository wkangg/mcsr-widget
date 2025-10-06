import SettingsPage from '@/pages/SettingsPage.vue'
import WidgetPage from '@/pages/WidgetPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/mcsr-widget/widget', component: WidgetPage },
  { path: '/mcsr-widget/', component: SettingsPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
