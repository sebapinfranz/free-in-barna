INSERT OR IGNORE INTO places (name, summary, description, location, free_days, is_free, requires_appointment, more_info_url)
VALUES
  (
    'CaixaForum Barcelona',
    'A contemporary cultural center with rotating exhibitions and architecture-focused programming.',
    'CaixaForum Barcelona offers free cultural programming in an iconic modernist building with well-curated exhibitions, public workshops, and thoughtful spaces for slow browsing.',
    'Barcelona',
    'Most weekdays and selected weekends',
    1,
    0,
    'https://caixaforum.org/'
  ),
  (
    'Pedralbes Monastery',
    'A historic monastery and cultural venue with gardens, exhibitions, and heritage rooms.',
    'Pedralbes Monastery is a landmark cultural space with a calm setting, heritage architecture, and accessible public programming that makes it easy to plan a quiet cultural outing.',
    'Barcelona',
    'Free entry on selected cultural days',
    1,
    0,
    'https://www.monestirpedralbes.cat/'
  ),
  (
    'Barcelona Museum of Contemporary Art',
    'A major contemporary art destination with exhibitions and public programming for curious visitors.',
    'The Museum of Contemporary Art is an important cultural stop for visitors seeking modern artistic work, accessible exhibitions, and a well-organized public experience in the city.',
    'Barcelona',
    'Free on selected cultural days',
    1,
    1,
    'https://www.macba.cat/'
  );
