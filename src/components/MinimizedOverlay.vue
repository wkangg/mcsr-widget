<script setup>
import { eloChangeFormatter } from '@/lib/eloChangeForametter'
import { animate, RowValue, useMotionValue, useTransform } from 'motion-v'
import { watch } from 'vue'

const { elo, rankIcon, eloChange } = defineProps({
  elo: Number,
  rankIcon: String,
  eloChange: Number,
})

const changeCounter = useMotionValue(Math.abs(eloChange))
const changeRounded = useTransform(() => Math.round(changeCounter.get()))

watch(
  () => eloChange,
  (newEloChange) => {
    animate(changeCounter, Math.abs(newEloChange), {
      duration: 0.5,
    })
  },
)

const eloCounter = useMotionValue(elo)
const eloRounded = useTransform(() => Math.round(eloCounter.get()))

watch(
  () => elo,
  (newElo) => {
    animate(eloCounter, newElo, {
      duration: 0.5,
    })
  },
)
</script>

<template>
  <div class="minimized">
    <div class="miminized-info">
      <div class="miminized-info-rank">
        <img :src="`/icons/${rankIcon}.png`" alt="rank icon" class="miminized-info-rank__icon" />
        <span class="miminized-info-rank__text"><RowValue :value="eloRounded" /> elo</span>
      </div>
      <span
        class="miminized-info__text"
        :class="{
          'miminized-info__text--positive': eloChange > 0,
          'miminized-info__text--negative': eloChange < 0,
        }"
        >{{ eloChangeFormatter(eloChange) }}<RowValue :value="changeRounded"
      /></span>
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
