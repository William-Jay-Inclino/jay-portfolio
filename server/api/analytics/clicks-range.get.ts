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
    
    const clicks = analyticsDb.getClicksRange(startDate, endDate)
    
    return {
      success: true,
      data: clicks
    }
  } catch (error) {
    console.error('Analytics clicks range error:', error)
    return {
      success: false,
      error: 'Failed to fetch clicks'
    }
  }
})
