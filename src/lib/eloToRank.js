export const eloToRank = (elo) => {
  if (elo < 400) return ['Coal 1', 'coal']
  if (elo < 500) return ['Coal 2', 'coal']
  if (elo < 600) return ['Coal 3', 'coal']

  if (elo < 700) return ['Iron 1', 'iron']
  if (elo < 800) return ['Iron 2', 'iron']
  if (elo < 900) return ['Iron 3', 'iron']

  if (elo < 1000) return ['Gold 1', 'gold']
  if (elo < 1100) return ['Gold 2', 'gold']
  if (elo < 1200) return ['Gold 3', 'gold']

  if (elo < 1300) return ['Emerald 1', 'emerald']
  if (elo < 1400) return ['Emerald 2', 'emerald']
  if (elo < 1500) return ['Emerald 3', 'emerald']

  if (elo < 1650) return ['Diamond 1', 'diamond']
  if (elo < 1800) return ['Diamond 2', 'diamond']
  if (elo < 2000) return ['Diamond 3', 'diamond']

  return ['Netherite', 'netherite']
}
