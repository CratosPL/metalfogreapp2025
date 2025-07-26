import { useEffect } from 'react'

export const useStats = (stats: any, setDisplayStats: any) => {
  useEffect(() => {
    const targets = { 
      bands: stats.bands, 
      demos: stats.demos, 
      users: stats.users, 
      earnings: stats.earnings 
    }
    const duration = 2000
    const steps = 60
    let step = 0

    const interval = setInterval(() => {
      step++
      const progress = step / steps
      setDisplayStats({
        bands: Math.floor(targets.bands * progress),
        demos: Math.floor(targets.demos * progress),
        users: Math.floor(targets.users * progress),
        earnings: Math.floor(targets.earnings * progress * 10) / 10,
      })
      if (step >= steps) clearInterval(interval)
    }, duration / steps)

    return () => clearInterval(interval)
  }, [stats, setDisplayStats])
}
