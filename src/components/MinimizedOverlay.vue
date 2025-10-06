<script setup>
import { eloChangeFormatter } from '@/lib/eloChangeForametter'
import { animate, RowValue, useMotionValue, useTransform } from 'motion-v'
import { watch } from 'vue'

const baseUrl = import.meta.env.BASE_URL

const { elo, eloRank, rankIcon, eloChange, leaderboard } = defineProps({
  elo: Number,
  eloRank: Number,
  rankIcon: String,
  eloChange: Number,
  leaderboard: Boolean,
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

const leaderboardCounter = useMotionValue(eloRank)
const leaderboardRounded = useTransform(() => Math.round(leaderboardCounter.get()))

watch(
  () => eloRank,
  (newRank) => {
    animate(leaderboardCounter, newRank, {
      duration: 0.5,
    })
  },
)
</script>

<template>
  <div class="minimized" :class="{ 'minimized-leaderboard': leaderboard }">
    <div class="miminized-info" :class="{ 'miminized-info-leaderboard': leaderboard }">
      <div class="miminized-info-rank">
        <img
          :src="`${baseUrl}icons/${rankIcon || 'coal'}.png`"
          alt="rank icon"
          class="miminized-info-rank__icon"
        />
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
    <div v-if="leaderboard" class="minimized-divider"></div>
    <div v-if="leaderboard" class="leaderboard-block">
      <span class="leaderboard-block__hashtag">#</span>
      <span class="leaderboard-block__position"><RowValue :value="leaderboardRounded" /></span>
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
.minimized-leaderboard {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 0.25rem;
}
.leaderboard-block {
  display: flex;
  width: 4rem;
  justify-content: center;
  align-items: flex-end;
}
.minimized-divider {
  width: 0.1875rem;
  height: 3rem;
  flex-shrink: 0;
  background: #18181b;
}
.leaderboard-block__hashtag {
  color: #a4a4a9;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.125rem;
  letter-spacing: -0.01488rem;
}
.leaderboard-block__position {
  color: #a4a4a9;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: -0.01488rem;
}
.miminized-info {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  align-items: center;
}
.miminized-info-leaderboard {
  display: flex;
  /* max-width: 11.75rem; */
  justify-content: space-between;
  align-items: center;
}
.miminized-info-rank {
  display: flex;
  align-items: center;
  gap: 0.125rem;
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
