import { eloToRank } from '@/lib/eloToRank'
import { getUserInfo } from '@/lib/getUserInfo'
import { getUserMatches } from '@/lib/getUserMatches'
import { msToHMS } from '@/lib/msToHMS'
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
      this.wins = 0
      this.losses = 0
      this.eloChange = 0

      const userMatches = await getUserMatches(nickname)
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
            this.wins += 1
            winTimings.push(match.result.time)

            if (match.changes[0].uuid === this.uuid) {
              this.eloChange += match.changes[0].change
            } else this.eloChange += match.changes[1].change
          } else {
            this.losses += 1

            if (match.changes[0].uuid === this.uuid) {
              this.eloChange += match.changes[1].change
            } else this.eloChange += match.changes[0].change
          }
        }
      }

      this.winrate = Math.round((this.wins / (this.wins + this.losses)) * 100) || 0
      this.avg = msToHMS(winTimings.reduce((a, b) => a + b, 0) / winTimings.length)

      const latestMatch = userMatches[0]

      if (latestMatch.players[0].uuid !== this.uuid) {
        this.latestMatchNickname = latestMatch.players[0].nickname
        this.latestMatchElo = latestMatch.players[0].eloRate
      } else {
        this.latestMatchNickname = latestMatch.players[1].nickname
        this.latestMatchElo = latestMatch.players[1].eloRate
      }

      if (latestMatch.changes[0].uuid === this.uuid) {
        this.latestMatchResult = latestMatch.changes[0].change
      } else {
        this.latestMatchResult = latestMatch.changes[1].change
      }
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
