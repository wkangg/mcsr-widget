export const eloChangeFormatter = (eloChange) => {
  if (eloChange > 0) {
    return `+${eloChange}`
  } else if (eloChange < 0) {
    return eloChange.toString()
  }
  return '+0'
}
