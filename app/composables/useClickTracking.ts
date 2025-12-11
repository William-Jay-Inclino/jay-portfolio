export const useClickTracking = () => {
  const route = useRoute()

  const trackClick = async (element: string) => {
    try {
      await $fetch('/api/analytics/track-click', {
        method: 'POST',
        body: {
          element,
          page: route.path
        }
      })
    } catch (error) {
      console.error('Failed to track click:', error)
    }
  }

  return {
    trackClick
  }
}
