<script setup></script>

<template>
  <div class="minimized">
    <div class="miminized-info">
      <div class="miminized-info-rank">
        <img
          src="/src/assets/icons/diamond.png"
          alt="rank icon"
          class="miminized-info-rank__icon"
        />
        <span class="miminized-info-rank__text">Emerald 1</span>
      </div>
      <span class="miminized-info__text">+0</span>
    </div>
  </div>
</template>

<style scoped>
.minimized {
  display: inline-flex;
  padding: 0.5rem 2rem 0.5rem 1rem;
  align-items: center;
  gap: 1rem;
  border-radius: 2rem;
  background: #000;
}
.miminized-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  font-weight: 510;
  line-height: 1.5rem;
  letter-spacing: -0.01488rem;
}
.miminized-info__text {
  color: #a4a4a9;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 590;
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
