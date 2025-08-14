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

const intervalID = setInterval(toggleOverlay, configStore.rate * 1000)

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
    height: 200,
    width: 290,
    padding: '1rem 1.5rem',
  },
}

onUnmounted(() => {
  clearInterval(intervalID)
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
        :nickname="configStore.nickname"
        :rank="configStore.rank"
        :icon="configStore.icon"
      />

      <ExpandedOverlay
        key="expanded-overlay"
        v-else
        :nickname="configStore.nickname"
        :elo="30"
        rank="Coal"
        rankIcon="coal"
        :rate="configStore.rate"
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
  margin-top: 16px;
}
.widget {
  display: flex;
  overflow: hidden;
  gap: 1rem;
  border-radius: 2rem;
  background: #000;
}
</style>
