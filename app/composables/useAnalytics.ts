export const useAnalytics = () => {
  const trackPageVisit = async () => {
    try {
      await $fetch('/api/analytics/track', {
        method: 'POST',
        body: {}
      })
    } catch (error) {
      console.error('Failed to track visit:', error)
    }
  }

  const getStats = async (date?: string) => {
    try {
      const response = await $fetch('/api/analytics/stats', {
        method: 'GET',
        query: date ? { date } : {}
      })
      return response
    } catch (error) {
      console.error('Failed to fetch stats:', error)
      return null
    }
  }

  return {
    trackPageVisit,
    getStats
  }
}
