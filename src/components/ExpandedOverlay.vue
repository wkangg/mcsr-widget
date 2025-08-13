<script setup>
import TodayStats from './TodayStats.vue'
</script>

<template>
  <div class="expanded">
    <div class="expanded-info">
      <div class="expanded-info-stats">
        <span class="expanded-info-stats__text">1207 elo</span>
        <div class="expanded-info-stats-rank">
          <span class="expanded-info-stats-rank__text">Emerald 1</span>
          <img
            src="/src/assets/icons/emerald.png"
            alt="rank icon"
            class="expanded-info-stats-rank__icon"
          />
        </div>
      </div>

      <img src="/src/assets/icons/ranked.png" alt="ranked icon" class="expanded-info__icon" />
    </div>

    <TodayStats />
  </div>
</template>

<style scoped>
.expanded {
  display: flex;
  width: 15.1rem;
  padding: 1rem 1.5rem 0.75rem 1.5rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 2rem;
  background: #000;
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
  font-weight: 510;
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
</style>
