<script setup>
import ExpandedOverlay from '@/components/ExpandedOverlay.vue'
import MinimizedOverlay from '@/components/MinimizedOverlay.vue'
import { useConfigStore } from '@/stores/config'
import { delay, motion, useAnimate } from 'motion-v'
import { onUnmounted } from 'vue'

const configStore = useConfigStore()
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

const eloToRank = (elo) => {
  if (elo < 400) return ('Coal 1', 'coal')
  if (elo < 500) return ('Coal 2', 'coal')
  if (elo < 600) return ('Coal 3', 'coal')

  if (elo < 700) return ('Iron 1', 'iron')
  if (elo < 800) return ('Iron 2', 'iron')
  if (elo < 900) return ('Iron 3', 'iron')

  if (elo < 1000) return ('Gold 1', 'gold')
  if (elo < 1100) return ('Gold 2', 'gold')
  if (elo < 1200) return ('Gold 3', 'gold')

  if (elo < 1300) return ('Emerald 1', 'emerald')
  if (elo < 1400) return ('Emerald 2', 'emerald')
  if (elo < 1500) return ('Emerald 3', 'emerald')

  if (elo < 1650) return ('Diamond 1', 'diamond')
  if (elo < 1800) return ('Diamond 2', 'diamond')
  if (elo < 2000) return ('Diamond 3', 'diamond')

  return ('Netherite', 'netherite')
}

onUnmounted(() => {
  clearInterval(toggleIntervalID)
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
        :elo="30"
        :eloChange="+23"
        rankIcon="coal"
      />

      <ExpandedOverlay
        key="expanded-overlay"
        v-else
        :nickname="configStore.nickname"
        :elo="30"
        rank="Coal"
        rankIcon="coal"
        :badge="configStore.badge"
        :accent="configStore.accent"
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
