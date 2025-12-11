// Update the import path to the correct location of analytics-db
import { analyticsDb } from '../../utils/analytics-db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Get client IP
    const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
    
    // Get device type from user agent
    const userAgent = getHeader(event, 'user-agent') || ''
    const device = detectDevice(userAgent)
    
    // Get referer
    const referer = getHeader(event, 'referer') || getHeader(event, 'referrer')
    
    // Get current date (YYYY-MM-DD)
    const date = new Date().toISOString().split('T')[0]
    
    // Record the visit
    analyticsDb.recordVisit({
      date,
      ip,
      device,
      referer
    })
    
    // Update daily statistics
    analyticsDb.updateDailyStats(date)
    
    return {
      success: true,
      message: 'Visit recorded'
    }
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return {
      success: false,
      error: 'Failed to record visit'
    }
  }
})

function detectDevice(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  
  // Check for tablet
  if (/(ipad|tablet|playbook|silk)|(android(?!.*mobile))/i.test(ua)) {
    return 'tablet'
  }
  
  // Check for mobile
  if (/mobile|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    return 'mobile'
  }
  
  // Default to desktop
  return 'desktop'
}
