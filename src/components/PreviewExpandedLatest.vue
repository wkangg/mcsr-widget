<script setup>
import LatestMatch from './LatestMatch.vue'
import WinrateBadge from './WinrateBadge.vue'

const {
  nickname,
  elo,
  rank,
  rankIcon,
  badge,
  accent,
  winrate,
  opponentNickname,
  opponentElo,
  opponentResult,
} = defineProps({
  nickname: String,
  elo: Number,
  rank: String,
  rankIcon: String,
  badge: Number,
  accent: String,
  winrate: Number,
  opponentNickname: String,
  opponentElo: Number,
  opponentResult: Number,
})
</script>

<template>
  <div class="expanded">
    <div class="expanded-info">
      <div class="expanded-info-stats">
        <span class="expanded-info-stats__text">{{ elo }} elo</span>
        <div class="expanded-info-stats-rank">
          <span class="expanded-info-stats-rank__text">{{ rank }}</span>
          <img
            :src="`/src/assets/icons/${rankIcon}.png`"
            alt="rank icon"
            class="expanded-info-stats-rank__icon"
          />
        </div>
      </div>

      <img
        v-if="badge === 1"
        src="/src/assets/icons/ranked.png"
        alt="ranked icon"
        class="expanded-info__icon"
      />
      <WinrateBadge v-if="badge === 2" :percentage="winrate" :accent="accent" />
      <img
        v-if="badge === 3"
        :src="`https://mineskin.eu/helm/${nickname}/100.png`"
        alt="player head"
        class="expanded-info__head"
      />
    </div>

    <LatestMatch :elo="opponentElo" :nickname="opponentNickname" :result="opponentResult" />
  </div>
</template>

<style scoped>
.expanded {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.expanded-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
}
.expanded-info-stats {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.25rem;
}
.expanded-info-stats__text {
  color: #a4a4a9;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: -0.01488rem;
}
.expanded-info-stats-rank {
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
}
.expanded-info-stats-rank__text {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: -0.01488rem;
}
.expanded-info-stats-rank__icon {
  width: 1.5rem;
  height: 1.5rem;
}
.expanded-info__icon {
  width: 2rem;
  height: 2rem;
}
.expanded-info__head {
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
}
</style>
