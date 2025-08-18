<script setup>
import { eloChangeFormatter } from '@/lib/eloChangeForametter'

const { elo, rankIcon, eloChange } = defineProps({
  elo: Number,
  rankIcon: String,
  eloChange: Number,
})

const isPositive = eloChange > 0
const isNegative = eloChange < 0
</script>

<template>
  <div class="minimized">
    <div class="miminized-info">
      <div class="miminized-info-rank">
        <img :src="`/icons/${rankIcon}.png`" alt="rank icon" class="miminized-info-rank__icon" />
        <span class="miminized-info-rank__text">{{ elo }} elo</span>
      </div>
      <span
        class="miminized-info__text"
        :class="{
          'miminized-info__text--positive': isPositive,
          'miminized-info__text--negative': isNegative,
        }"
        >{{ eloChangeFormatter(eloChange) }}</span
      >
    </div>
  </div>
</template>

<style scoped>
.minimized {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
}
.miminized-info {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  align-items: center;
}
.miminized-info-rank {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.miminized-info-rank__icon {
  width: 2rem;
  height: 2rem;
  image-rendering: pixelated;
}
.miminized-info-rank__text {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: -0.01488rem;
}
.miminized-info__text {
  color: #a4a4a9;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.5rem;
  letter-spacing: -0.01488rem;
}

.miminized-info__text--positive {
  color: #37c058;
}
.miminized-info__text--negative {
  color: #fa3532;
}
</style>
