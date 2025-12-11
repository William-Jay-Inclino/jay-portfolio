import Database from 'better-sqlite3'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'

const DB_DIR = join(process.cwd(), 'site-analytics')
const DB_PATH = join(DB_DIR, 'analytics.db')

// Ensure the directory exists
if (!existsSync(DB_DIR)) {
  mkdirSync(DB_DIR, { recursive: true })
}

// Initialize database
const db = new Database(DB_PATH)

// Enable WAL mode for better concurrent access
db.pragma('journal_mode = WAL')

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS site_visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    ip TEXT NOT NULL,
    device TEXT NOT NULL,
    referer TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS daily_visit_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT UNIQUE NOT NULL,
    total_visits INTEGER DEFAULT 0,
    unique_visits INTEGER DEFAULT 0,
    mobile INTEGER DEFAULT 0,
    desktop INTEGER DEFAULT 0,
    tablet INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_site_visits_date ON site_visits(date);
  CREATE INDEX IF NOT EXISTS idx_site_visits_ip ON site_visits(ip);
  CREATE INDEX IF NOT EXISTS idx_daily_stats_date ON daily_visit_stats(date);
`)

export interface SiteVisit {
  date: string
  ip: string
  device: string
  referer?: string
}

export interface DailyVisitStats {
  date: string
  total_visits: number
  unique_visits: number
  mobile: number
  desktop: number
  tablet: number
}

export const analyticsDb = {
  // Record a site visit
  recordVisit: (visit: SiteVisit) => {
    const insertVisit = db.prepare(`
      INSERT INTO site_visits (date, ip, device, referer)
      VALUES (?, ?, ?, ?)
    `)
    insertVisit.run(visit.date, visit.ip, visit.device, visit.referer || null)
  },

  // Update daily statistics
  updateDailyStats: (date: string) => {
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_visits,
        COUNT(DISTINCT ip) as unique_visits,
        SUM(CASE WHEN device = 'mobile' THEN 1 ELSE 0 END) as mobile,
        SUM(CASE WHEN device = 'desktop' THEN 1 ELSE 0 END) as desktop,
        SUM(CASE WHEN device = 'tablet' THEN 1 ELSE 0 END) as tablet
      FROM site_visits
      WHERE date = ?
    `).get(date) as DailyVisitStats

    const upsert = db.prepare(`
      INSERT INTO daily_visit_stats (date, total_visits, unique_visits, mobile, desktop, tablet, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(date) DO UPDATE SET
        total_visits = excluded.total_visits,
        unique_visits = excluded.unique_visits,
        mobile = excluded.mobile,
        desktop = excluded.desktop,
        tablet = excluded.tablet,
        updated_at = CURRENT_TIMESTAMP
    `)
    
    upsert.run(
      date,
      stats.total_visits,
      stats.unique_visits,
      stats.mobile,
      stats.desktop,
      stats.tablet
    )
  },

  // Get daily stats for a specific date
  getDailyStats: (date: string): DailyVisitStats | undefined => {
    return db.prepare(`
      SELECT date, total_visits, unique_visits, mobile, desktop, tablet
      FROM daily_visit_stats
      WHERE date = ?
    `).get(date) as DailyVisitStats | undefined
  },

  // Get daily stats for a date range
  getDailyStatsRange: (startDate: string, endDate: string): DailyVisitStats[] => {
    return db.prepare(`
      SELECT date, total_visits, unique_visits, mobile, desktop, tablet
      FROM daily_visit_stats
      WHERE date BETWEEN ? AND ?
      ORDER BY date DESC
    `).all(startDate, endDate) as DailyVisitStats[]
  },

  // Get all visits for a specific date
  getVisitsByDate: (date: string) => {
    return db.prepare(`
      SELECT date, ip, device, referer, created_at
      FROM site_visits
      WHERE date = ?
      ORDER BY created_at DESC
    `).all(date)
  },

  // Get all visits for a date range
  getVisitsRange: (startDate: string, endDate: string) => {
    return db.prepare(`
      SELECT date, ip, device, referer
      FROM site_visits
      WHERE date BETWEEN ? AND ?
      ORDER BY date DESC, id DESC
    `).all(startDate, endDate)
  },

  // Close database connection
  close: () => {
    db.close()
  }
}

// Graceful shutdown
process.on('exit', () => analyticsDb.close())
process.on('SIGINT', () => {
  analyticsDb.close()
  process.exit(0)
})
