import { analyticsDb } from '../../utils/analytics-db'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const startDate = query.startDate as string
    const endDate = query.endDate as string
    
    if (!startDate || !endDate) {
      return {
        success: false,
        message: 'Start date and end date are required'
      }
    }
    
    const stats = analyticsDb.getDailyStatsRange(startDate, endDate)
    
    return {
      success: true,
      data: stats
    }
  } catch (error) {
    console.error('Analytics stats range error:', error)
    return {
      success: false,
      error: 'Failed to fetch statistics'
    }
  }
})
