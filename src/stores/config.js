import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useConfigStore = defineStore('config', () => {
  const route = useRoute()

  const nickname = route.query.nickname
  const badge = Number(route.query.badge)
  const rate = Number(route.query.rate)
  const accent = '#' + route.query.accent

  const isExpanded = ref(false)
  const isLatest = ref(false)

  return {
    nickname,
    badge,
    rate,
    accent,
    isExpanded,
    isLatest,
  }
})
