import { analyticsDb } from '../../utils/analytics-db'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const date = query.date as string || new Date().toISOString().split('T')[0]
    
    const stats = analyticsDb.getDailyStats(date)
    
    if (!stats) {
      return {
        success: false,
        message: 'No data found for the specified date'
      }
    }
    
    return {
      success: true,
      data: stats
    }
  } catch (error) {
    console.error('Analytics stats error:', error)
    return {
      success: false,
      error: 'Failed to fetch statistics'
    }
  }
})
