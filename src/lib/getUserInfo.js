import axios from 'axios'

export async function getUserInfo(nickname) {
  const { data, status } = await axios.get(
    `https://api.mcsrranked.com/users/${encodeURIComponent(nickname)}`,
  )
  if (status === 200 && data.status === 'success') {
    return { elo: data.data.eloRate, uuid: data.data.uuid }
  }
}
