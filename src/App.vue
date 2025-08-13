<script setup>
import ExpandedOverlay from './components/ExpandedOverlay.vue'
import LatestMatch from './components/LatestMatch.vue'
import MinimizedOverlay from './components/MinimizedOverlay.vue'
import TodayStats from './components/TodayStats.vue'
</script>

<template>
  <div class="preview">
    <MinimizedOverlay />
    <LatestMatch />
    <TodayStats />
    <ExpandedOverlay />
  </div>
</template>

<style scoped>
  .preview {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
