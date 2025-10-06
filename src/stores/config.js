import { preloadImage } from '@/lib/preloadImage'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useConfigStore = defineStore('config', () => {
  const route = useRoute()

  const nickname = route.query.nickname
  preloadImage(`https://mineskin.eu/helm/${nickname}/100.png`)
  preloadImage(`${import.meta.env.BASE_URL}icons/ranked.png`)

  const badge = Number(route.query.badge)
  const rate = Number(route.query.rate)
  const accent = '#' + route.query.accent
  const state = Number(route.query.state)
  const leaderboard = route.query.leaderboard === 'true'

  console.log('Leaderboard:', leaderboard)

  const isExpanded = ref(false)
  const isExtra = ref(false)
  const isLatest = ref(false)

  return {
    nickname,
    badge,
    rate,
    accent,
    state,
    leaderboard,
    isExpanded,
    isExtra,
    isLatest,
  }
})
