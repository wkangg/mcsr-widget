<script setup>
import ExpandedOverlay from '@/components/ExpandedOverlay.vue'
import MinimizedOverlay from '@/components/MinimizedOverlay.vue'
import { useConfigStore } from '@/stores/config'
import { useStatsStore } from '@/stores/stats'
import { delay, motion, useAnimate } from 'motion-v'
import { onMounted, onUnmounted } from 'vue'

const configStore = useConfigStore()
const statsStore = useStatsStore()
const [scope, animate] = useAnimate()

const toggleOverlay = () => {
  configStore.isExpanded = !configStore.isExpanded

  if (configStore.isExpanded) {
    delay(() => animate(scope.current, variants.extendedExtra), configStore.rate / 2)
  }
}

const toggleIntervalID = setInterval(toggleOverlay, configStore.rate * 1000)

const variants = {
  hidden: {
    scale: 0.5,
    height: 0,
    width: 0,
    padding: '0.5rem 1rem',
  },
  visible: {
    scale: 1,
    height: 48,
    width: 226,
    padding: '0.5rem 1rem',
  },
  extended: {
    scale: 1,
    height: 164,
    width: 290,
    padding: '1rem 1.5rem',
  },
  extendedExtra: {
    scale: 1,
    height: 196,
    width: 290,
    padding: '1rem 1.5rem',
  },
}

onUnmounted(() => {
  clearInterval(toggleIntervalID)
})
onMounted(() => {
  statsStore.startAutoUpdate(configStore.nickname)
})
</script>

<template>
  <div class="container">
    <motion.div
      class="widget"
      ref="scope"
      :variants="variants"
      initial="hidden"
      :animate="configStore.isExpanded ? 'extended' : 'visible'"
    >
      <MinimizedOverlay
        key="minimized-overlay"
        v-if="!configStore.isExpanded"
        :elo="statsStore.elo"
        :eloChange="statsStore.eloChange"
        :rankIcon="statsStore.rankIcon"
      />

      <ExpandedOverlay
        key="expanded-overlay"
        v-else
        :nickname="configStore.nickname"
        :elo="statsStore.elo"
        :rank="statsStore.rank"
        :rankIcon="statsStore.rankIcon"
        :badge="configStore.badge"
        :accent="configStore.accent"
        :eloChange="statsStore.eloChange"
        :wins="statsStore.wins"
        :loses="statsStore.loses"
        :avg="statsStore.avg"
        :winrate="statsStore.winrate"
        :opponentNickname="statsStore.latestMatchNickname"
        :opponentElo="statsStore.latestMatchElo"
        :opponentResult="statsStore.latestMatchResult"
      />
    </motion.div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.widget {
  display: flex;
  overflow: hidden;
  gap: 1rem;
  border-radius: 2rem;
  background: #000;
}
</style>
