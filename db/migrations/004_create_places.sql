CREATE TABLE IF NOT EXISTS places (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  free_days TEXT NOT NULL,
  is_free INTEGER NOT NULL DEFAULT 1,
  requires_appointment INTEGER NOT NULL DEFAULT 0,
  more_info_url TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_places_name_location
ON places (name, location);
