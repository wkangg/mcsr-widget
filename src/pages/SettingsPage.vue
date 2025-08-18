<script setup>
import CopyIcon from '@/assets/icons/copy.svg'
import MinimizedOverlay from '@/components/MinimizedOverlay.vue'
import PreviewExpandedLatest from '@/components/PreviewExpandedLatest.vue'
import PreviewExpandedToday from '@/components/PreviewExpandedToday.vue'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const nickname = ref(localStorage.getItem('nickname') || '')

const badges = [
  { id: 1, label: 'Ranked Icon', icon: 'ranked' },
  { id: 2, label: 'Winrate Badge', icon: 'winrate' },
  { id: 3, label: 'Player Head', icon: 'head' },
]
const selectedBadge = ref(Number(localStorage.getItem('selectedBadge')) || 1)

const accents = [
  { id: 'white', hex: 'FFFFFF' },
  { id: 'grey', hex: 'A4A4A9' },
  { id: 'yellow', hex: 'FDC633' },
  { id: 'red', hex: 'FA3532' },
  { id: 'green', hex: '37C058' },
  { id: 'blue', hex: '37A3DE' },
  { id: 'purple', hex: '504BCA' },
  { id: 'pink', hex: 'FF63BA' },
]
const selectedAccent = ref(localStorage.getItem('selectedAccent') || 'FFFFFF')

const rates = [
  { id: 1, value: 30 },
  { id: 2, value: 60 },
  { id: 3, value: 90 },
]
const selectedRate = ref(Number(localStorage.getItem('selectedRate')) || 30)

const copyWidgetUrl = () => {
  if (!nickname.value) {
    toast.error('Enter your Minecraft nickname')
    return
  }

  localStorage.setItem('nickname', nickname.value)
  localStorage.setItem('selectedBadge', selectedBadge.value)
  localStorage.setItem('selectedAccent', selectedAccent.value)
  localStorage.setItem('selectedRate', selectedRate.value)

  const widgetUrl = `${import.meta.env.VITE_HOST}/widget?nickname=${nickname.value}&badge=${selectedBadge.value}&rate=${selectedRate.value}&accent=${selectedAccent.value}`
  navigator.clipboard.writeText(widgetUrl)

  toast.success(
    'Link copied to clipboard! Set your browser source width to 290px and height to 196px.',
  )
}

const exampleData = {
  nickname: nickname.value || 'Player',
  elo: 9999,
  rank: 'Netherite',
  rankIcon: 'netherite',
  badge: selectedBadge.value,
  accent: '#' + selectedAccent.value,
  winrate: 75,
  wins: 1,
  loses: 0,
  avg: '11:11',
  eloChange: +22,
  opponentNickname: 'Opponent',
  opponentElo: 1234,
  opponentResult: +22,
}
</script>

<template>
  <div class="settings">
    <div class="settings-parametrs">
      <!-- Minecraft nickname -->
      <div class="settings-parametrs-section">
        <span class="settings-parametrs-section__text">Minecraft nickname</span>
        <input
          type="text"
          v-model="nickname"
          placeholder="Enter your Minecraft nickname"
          class="settings-parametrs-section-input"
        />
      </div>

      <!-- Corner badge -->
      <div class="settings-parametrs-section">
        <span class="settings-parametrs-section__text">Corner badge</span>
        <div class="settings-parametrs-section-variants">
          <div
            v-for="badge in badges"
            :key="badge.id"
            class="variants-item"
            :class="{ active: selectedBadge === badge.id }"
            @click="selectedBadge = badge.id"
          >
            <img :src="`/icons/${badge.icon}.png`" alt="variant icon" class="variants-item__icon" />
            <span class="variants-item__label">{{ badge.label }}</span>
          </div>
        </div>
      </div>

      <!-- Accent color -->
      <div class="settings-parametrs-section">
        <span class="settings-parametrs-section__text">Accent color</span>
        <div class="settings-paramets-accents">
          <div
            v-for="accent in accents"
            :key="accent.hex"
            class="accent-item"
            :class="{ active: selectedAccent === accent.hex }"
            :style="{ backgroundColor: `#${accent.hex}` }"
            @click="selectedAccent = accent.hex"
          ></div>
        </div>
      </div>

      <!-- Expansion rate -->
      <div class="settings-parametrs-section">
        <span class="settings-parametrs-section__text">Expansion rate</span>
        <div class="settings-parametrs-rates">
          <div
            v-for="rate in rates"
            :key="rate.value"
            class="rate-item rate-item__text"
            @click="selectedRate = rate.value"
            :class="{ active: selectedRate === rate.value }"
          >
            {{ rate.value }} sec
          </div>
        </div>
      </div>

      <!-- Widget link -->
      <div class="settings-save">
        <div class="settings-save-button" @click="copyWidgetUrl">
          <CopyIcon class="settings-save-button_icon" />
          <span class="settings-save-button__text">Copy Widget URL</span>
        </div>
      </div>
    </div>

    <div class="settings-preview">
      <span class="settings-parametrs-section__text">Preview</span>

      <div class="preview">
        <div class="preview-widgets">
          <!-- Minimized example -->
          <div class="preview-widgets-minimized">
            <MinimizedOverlay
              :elo="exampleData.elo"
              :rankIcon="exampleData.rankIcon"
              :eloChange="exampleData.eloChange"
            />
          </div>

          <!-- Expanded latest match example -->
          <div class="preview-widgets-expanded">
            <PreviewExpandedLatest
              :nickname="exampleData.nickname"
              :elo="exampleData.elo"
              :rank="exampleData.rank"
              :rankIcon="exampleData.rankIcon"
              :badge="selectedBadge"
              :accent="`#${selectedAccent}`"
              :eloChange="exampleData.eloChange"
              :wins="exampleData.wins"
              :loses="exampleData.loses"
              :avg="exampleData.avg"
              :winrate="exampleData.winrate"
              :opponentNickname="exampleData.opponentNickname"
              :opponentElo="exampleData.opponentElo"
              :opponentResult="exampleData.opponentResult"
            />
          </div>

          <!-- Expanded today stats example -->
          <div class="preview-widgets-expanded-extra">
            <PreviewExpandedToday
              :nickname="exampleData.nickname"
              :elo="exampleData.elo"
              :rank="exampleData.rank"
              :rankIcon="exampleData.rankIcon"
              :winrate="exampleData.winrate"
              :badge="selectedBadge"
              :accent="`#${selectedAccent}`"
              :eloChange="exampleData.eloChange"
              :wins="exampleData.wins"
              :loses="exampleData.loses"
              :avg="exampleData.avg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings {
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
  background: black;
}
.settings-parametrs {
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
}
.settings-parametrs-section {
  display: flex;
  min-width: 21.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
}
.settings-parametrs-section__text {
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.75rem;
  letter-spacing: -0.00625rem;
}
.settings-parametrs-section-input {
  display: flex;
  height: 3rem;
  padding: 0 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 0.25rem;
  border: 1.5px solid #353535;
  background: black;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.75rem;
  letter-spacing: -0.00563rem;
}
.settings-parametrs-section-input:focus {
  outline: none;
  border-color: #fff;
}
.settings-parametrs-section-variants {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
}
.variants-item {
  display: flex;
  height: 8rem;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  border-radius: 0.25rem;
  background: #1b1b1b;
  cursor: pointer;
}
.variants-item.active {
  box-shadow: inset 0 0 0 2px white;
}
.variants-item__icon {
  width: 4rem;
  height: 4rem;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 0.25rem;
}
.variants-item__label {
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}
.settings-paramets-accents {
  display: grid;
  width: 19rem;
  height: 9rem;
  row-gap: 1rem;
  column-gap: 16px;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.accent-item {
  width: 4rem;
  height: 4rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
.accent-item.active {
  box-shadow: inset 0 0 0 2px white;
}
.settings-parametrs-rates {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
}
.rate-item {
  display: flex;
  height: 4rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  border-radius: 0.25rem;
  background: #1b1b1b;
  cursor: pointer;
}
.rate-item.active {
  box-shadow: inset 0 0 0 2px white;
}
.rate-item__text {
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.75rem;
  letter-spacing: -0.00625rem;
}
.settings-save {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
}
.settings-save-button {
  display: flex;
  width: 100%;
  height: 3rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.25rem;
  background: #37c058;
  cursor: pointer;
}
.settings-save-button:hover {
  background: #3aab55;
}
.settings-save-button__text {
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.75rem;
  letter-spacing: -0.00625rem;
}
.settings-save-button_icon {
  width: 1.5rem;
  height: 1.5rem;
}
.settings-preview {
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 0.5rem;
  background:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(/src/assets/icons/back.jpg) 50% / cover no-repeat;
}
.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
}
.preview-widgets {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.preview-widgets-minimized {
  display: flex;
  overflow: hidden;
  gap: 1rem;
  border-radius: 2rem;
  background: #000;
  height: 48px;
  width: 236px;
  padding: 0.5rem 1rem;
}
.preview-widgets-expanded {
  display: flex;
  overflow: hidden;
  gap: 1rem;
  border-radius: 2rem;
  background: #000;
  height: 164px;
  width: 290px;
  padding: 1rem 1.5rem;
}
.preview-widgets-expanded-extra {
  display: flex;
  overflow: hidden;
  gap: 1rem;
  border-radius: 2rem;
  background: #000;
  height: 196px;
  width: 290px;
  padding: 1rem 1.5rem;
}
</style>
