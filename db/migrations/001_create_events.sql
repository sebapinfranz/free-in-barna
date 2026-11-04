CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  starts_at TEXT NOT NULL,
  ends_at TEXT,
  website_url TEXT,
  location TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Scheduled',
  is_free INTEGER NOT NULL DEFAULT 1,
  requires_appointment INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_events_title_starts_at
ON events (title, starts_at);
