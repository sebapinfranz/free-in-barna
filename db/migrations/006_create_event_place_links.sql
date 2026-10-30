CREATE TABLE IF NOT EXISTS event_place_links (
  event_id INTEGER NOT NULL,
  place_id INTEGER NOT NULL,
  PRIMARY KEY (event_id, place_id),
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
);
