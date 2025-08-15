export function msToHMS(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  } else if (isNaN(hours) && isNaN(minutes) && isNaN(seconds)) {
    return `00:00`
  } else {
    return `${minutes}:${String(seconds).padStart(2, '0')}`
  }
}
