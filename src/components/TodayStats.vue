<template>
  <div class="today">
    <span class="today__text">Today</span>
    <div class="today-stats">
      <div class="today-stats-values">
        <!-- Wins badge -->
        <div class="today-stats-values-badge">
          <div class="today-stats-values-badge-con">
            <img
              src="/src/assets/icons/wins.svg"
              alt="wins icon"
              class="today-stats-values-badge__icon"
            />
          </div>
          <div class="today-stats-values-badge-info">
            <span class="today__text">Wins</span>
            <span class="today-stats-values-badge__text">0</span>
          </div>
        </div>

        <!-- Loses badge -->
        <div class="today-stats-values-badge">
          <div class="today-stats-values-badge-con">
            <img
              src="/src/assets/icons/loses.svg"
              alt="loses icon"
              class="today-stats-values-badge__icon"
            />
          </div>
          <div class="today-stats-values-badge-info">
            <span class="today__text">Loses</span>
            <span class="today-stats-values-badge__text">0</span>
          </div>
        </div>
      </div>
      <div class="today-stats-values">
        <!-- Elo badge -->
        <div class="today-stats-values-badge">
          <div class="today-stats-values-badge-con">
            <img
              src="/src/assets/icons/elo.svg"
              alt="elo icon"
              class="today-stats-values-badge__icon"
            />
          </div>
          <div class="today-stats-values-badge-info">
            <span class="today__text">Elo</span>
            <span class="today-stats-values-badge__text">0</span>
          </div>
        </div>

        <!-- Avg badge -->
        <div class="today-stats-values-badge">
          <div class="today-stats-values-badge-con">
            <img
              src="/src/assets/icons/avg.svg"
              alt="avg icon"
              class="today-stats-values-badge__icon"
            />
          </div>
          <div class="today-stats-values-badge-info">
            <span class="today__text">Avg</span>
            <span class="today-stats-values-badge__text">0</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.today {
  display: flex;
  width: 13.6rem;
  padding: 0.5rem 0.75rem 0.75rem 0.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  border-radius: 1rem;
  background: #1b1b1b;
}
.today__text {
  color: #a4a4a9;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 0.875rem;
  letter-spacing: -0.01488rem;
}
.today-stats {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
}
.today-stats-values {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  flex: 1 0 0;
}
.today-stats-values-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.today-stats-values-badge-con {
  display: flex;
  width: 2rem;
  padding: 0 0.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
}
.today-stats-values-badge__icon {
  width: 2rem;
  height: 2rem;
}
.today-stats-values-badge-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.125rem;
}
.today-stats-values-badge__text {
  color: #fff;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 590;
  line-height: 0.875rem;
  letter-spacing: -0.015rem;
}
</style>
