import { analyticsDb } from '../../utils/analytics-db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Get client IP
    const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
    
    // Get device type from user agent
    const userAgent = getHeader(event, 'user-agent') || ''
    const device = detectDevice(userAgent)
    
    // Get current date (YYYY-MM-DD)
    const date = new Date().toISOString().split('T')[0]
    
    // Record the click
    analyticsDb.recordClick({
      date,
      ip,
      element: body.element || 'unknown',
      page: body.page || 'unknown',
      device
    })
    
    return {
      success: true,
      message: 'Click recorded'
    }
  } catch (error) {
    console.error('Click tracking error:', error)
    return {
      success: false,
      error: 'Failed to record click'
    }
  }
})

function detectDevice(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  
  if (/(ipad|tablet|playbook|silk)|(android(?!.*mobile))/i.test(ua)) {
    return 'tablet'
  }
  
  if (/mobile|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    return 'mobile'
  }
  
  return 'desktop'
}
