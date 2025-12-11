# Site Analytics

This directory contains the SQLite database for site analytics.

## Database: analytics.db

The database tracks visitor information with two main tables:

### site_visits
Records individual visits with:
- `date` - Visit date (YYYY-MM-DD)
- `ip` - Visitor IP address
- `device` - Device type (mobile, desktop, tablet)
- `referer` - Referring URL (optional)
- `created_at` - Timestamp of visit

### daily_visit_stats
Aggregated daily statistics with:
- `date` - Date (YYYY-MM-DD)
- `total_visits` - Total number of visits
- `unique_visits` - Number of unique IP addresses
- `mobile` - Number of mobile visits
- `desktop` - Number of desktop visits
- `tablet` - Number of tablet visits
- `updated_at` - Last update timestamp

## API Endpoints

### Track a visit
```
POST /api/analytics/track
```

### Get statistics
```
GET /api/analytics/stats?date=YYYY-MM-DD
```

## Usage

The tracking is automatically initialized in `app.vue` and records a visit on each page load.
