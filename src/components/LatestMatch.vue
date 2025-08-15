<script setup>
import { eloChangeFormatter } from '@/lib/eloChangeForametter'

const { elo, nickname, result } = defineProps({
  elo: Number,
  nickname: String,
  result: Number,
})
</script>

<template>
  <div class="latest">
    <span class="latest__text">Latest</span>
    <div class="latest-match">
      <div class="latest-match-opponent">
        <img
          :src="`https://mineskin.eu/helm/${nickname}/100.png`"
          alt=""
          class="latest-match-opponent__icon"
        />
        <div class="latest-match-opponent-info">
          <span class="latest__text">{{ elo }} elo</span>
          <span class="latest-match-opponent-info__nickname">{{ nickname }}</span>
        </div>
      </div>
      <span class="latest-match-opponent__result">{{ eloChangeFormatter(result) }}</span>
    </div>
  </div>
</template>

<style scoped>
.latest {
  display: flex;
  align-self: stretch;
  padding: 0.5rem 0.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  border-radius: 1rem;
  background: #1b1b1b;
}
.latest__text {
  color: #a4a4a9;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 0.875rem;
  letter-spacing: -0.01488rem;
}
.latest-match {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}
.latest-match-opponent {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}
.latest-match-opponent__icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
}
.latest-match-opponent-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4005rem;
}
.latest-match-opponent-info__nickname {
  color: #fff;
  text-align: center;
  font-size: 1rem;
  font-weight: 510;
  line-height: 0.65538rem;
  letter-spacing: -0.01488rem;
}
.latest-match-opponent__result {
  color: #a4a4a9;
  font-size: 1rem;
  font-style: normal;
  font-weight: 590;
  line-height: 0.65538rem;
  letter-spacing: -0.01488rem;
}
</style>
