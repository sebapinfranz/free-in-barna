INSERT OR IGNORE INTO events (title, summary, description, starts_at, location, status, is_free, requires_appointment)
VALUES
  (
    'Oktoberfest Barcelona',
    'A lively beer garden and street festival in the heart of the city.',
    'Enjoy music, seasonal beers, and a festive atmosphere in Port Vell with a relaxed outdoor evening vibe.',
    '2026-10-30T18:00:00+02:00',
    'Port Vell, Barcelona',
    'Scheduled',
    1,
    0
  ),
  (
    'Museu de la Xocolata Free Entry',
    'A family-friendly museum visit with a creative focus on chocolate history.',
    'Browse the exhibits and experience a well-curated museum collection free of charge during the featured free-day programming.',
    '2026-11-02T10:30:00+01:00',
    'Museu de la Xocolata, Barcelona',
    'Free day',
    1,
    0
  ),
  (
    'Open House Barcelona',
    'A citywide look at architecture, studios, and public spaces open to the public.',
    'Explore restored buildings and cultural spaces across the city while learning about local design and urban heritage.',
    '2026-11-07T09:00:00+01:00',
    'Eixample, Barcelona',
    'Limited spaces',
    1,
    1
  );
