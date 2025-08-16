import { eloToRank } from '@/lib/eloToRank'
import { getUserInfo } from '@/lib/getUserInfo'
import { getUserMatches } from '@/lib/getUserMatches'
import { msToHMS } from '@/lib/msToHMS'
import { preloadImage } from '@/lib/preloadImage'
import { defineStore } from 'pinia'

export const useStatsStore = defineStore('stats', {
  state: () => ({
    uuid: '',
    elo: 0,
    eloChange: 0,
    rank: '',
    rankIcon: '',
    latestMatchNickname: '',
    latestMatchElo: 0,
    latestMatchResult: 0,
    wins: 0,
    loses: 0,
    winrate: 0,
    avg: '',
    _intervalId: null,
  }),
  actions: {
    async userInfoUpdater(nickname) {
      const userInfo = await getUserInfo(nickname)

      this.elo = userInfo.elo
      this.uuid = userInfo.uuid

      this.rank = eloToRank(this.elo)[0]
      this.rankIcon = eloToRank(this.elo)[1]
    },

    async userMatchesUpdater(nickname) {
      const userMatches = await getUserMatches(nickname)

      let tempWins = 0
      let tempLoses = 0
      let tempEloChange = 0
      const winTimings = []

      for (const match of userMatches) {
        const matchDate = new Date(match.date * 1000)
        const currentDate = new Date()

        if (
          matchDate.getDate() === currentDate.getDate() &&
          matchDate.getMonth() === currentDate.getMonth() &&
          matchDate.getFullYear() === currentDate.getFullYear()
        ) {
          if (match.result.uuid === this.uuid) {
            tempWins += 1
            winTimings.push(match.result.time)

            if (match.changes[0].uuid === this.uuid) {
              tempEloChange += match.changes[0].change
            } else {
              tempEloChange += match.changes[1].change
            }
          } else {
            tempLoses += 1

            if (match.changes[0].uuid === this.uuid) {
              tempEloChange += match.changes[0].change
            } else {
              tempEloChange += match.changes[1].change
            }
          }
        }
      }

      const latestMatch = userMatches[0]
      let latestMatchNickname = ''
      let latestMatchElo = 0
      let latestMatchResult = 0

      if (latestMatch.players[0].uuid !== this.uuid) {
        latestMatchNickname = latestMatch.players[0].nickname
        latestMatchElo = latestMatch.players[0].eloRate
      } else {
        latestMatchNickname = latestMatch.players[1].nickname
        latestMatchElo = latestMatch.players[1].eloRate
      }

      if (latestMatch.changes[0].uuid === this.uuid) {
        latestMatchResult = latestMatch.changes[0].change
      } else {
        latestMatchResult = latestMatch.changes[1].change
      }

      preloadImage(`https://mineskin.eu/helm/${latestMatchNickname}/100.png`)

      this.wins = tempWins
      this.loses = tempLoses
      this.eloChange = tempEloChange
      this.winrate = Math.round((tempWins / (tempWins + tempLoses)) * 100) || 0
      this.avg = msToHMS(winTimings.reduce((a, b) => a + b, 0) / (winTimings.length || 1))
      this.latestMatchNickname = latestMatchNickname
      this.latestMatchElo = latestMatchElo
      this.latestMatchResult = latestMatchResult
    },

    startAutoUpdate(nickname) {
      if (this._intervalId) return

      this.userInfoUpdater(nickname)
      this.userMatchesUpdater(nickname)

      this._intervalId = setInterval(() => {
        this.userInfoUpdater(nickname)
        this.userMatchesUpdater(nickname)
      }, 10000)
    },
  },
})
