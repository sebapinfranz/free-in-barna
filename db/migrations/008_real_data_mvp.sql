DELETE FROM event_place_links;
DELETE FROM places;
DELETE FROM events;

INSERT INTO events (id, title, summary, description, starts_at, ends_at, website_url, location, status, is_free, requires_appointment)
VALUES
  (
    1,
    'Festival Dau',
    'A cultural festival with a program of films, talks, and creative gatherings across Barcelona.',
    'Festival Dau brings together creative communities, independent culture, and neighborhood programming in a lively, accessible November festival format that suits local discovery and weekend exploration.',
    '2026-11-12T10:00:00+01:00',
    '2026-11-15T20:00:00+01:00',
    'https://festivaldau.cat/es/',
    'Fabra i Coats, Barcelona',
    'Festival',
    1,
    0
  ),
  (
    2,
    'Festival 42',
    'The Barcelona Festival of Fantastic Genres brings literature and genre culture to the city in a compact, high-energy programme.',
    'Festival 42 is a citywide celebration of speculative fiction, fantasy, and imaginative culture, with talks, literary events, and public programming designed for curious readers and film lovers.',
    '2026-11-04T18:00:00+01:00',
    '2026-11-08T22:00:00+01:00',
    'https://www.barcelona.cat/festival42/es',
    'Biblioteca Ignasi Iglésias - Can Fabra, Barcelona',
    'Festival',
    1,
    0
  );

INSERT INTO places (id, name, summary, description, location, free_days, is_free, requires_appointment, more_info_url)
VALUES
  (
    1,
    'MACBA – Museu d’Art Contemporani de Barcelona',
    'A leading contemporary art museum with exhibitions, talks, and public programmes in the heart of Barcelona.',
    'MACBA is one of the city’s key cultural institutions, offering contemporary art exhibitions, guided visits, and public programming that makes free cultural discovery easy and engaging for visitors and locals alike.',
    'Plaça dels Àngels, 1, 08001 Barcelona',
    'MACBA Evenings; First Sunday of every month; under-16s; people with the Barcelona public transport pink card in free mode; people with disabilities; large or one-parent families; 12 February – Santa Eulàlia; 16 May – Night of the Museums; 18 May – International Museums’ Day; 30 May – Saturday Món Llibre; 31 May – Sunday Món Llibre; 24 September – La Mercè.',
    1,
    0,
    'https://www.macba.cat/en'
  ),
  (
    2,
    'CaixaForum Barcelona',
    'A cultural and architectural venue with exhibitions, talks, and free public programming in the city center.',
    'CaixaForum Barcelona combines contemporary cultural programming with a striking modernist setting, presenting exhibitions, public talks, and accessible events that suit a wide range of interests and schedules.',
    'Avinguda de Francesc Ferrer i Guàrdia, 6-8, 08038 Barcelona',
    'Free for CaixaBank clients; European Youth Card holders; under-16s; 15 February – Santa Eulàlia; 16 May, 19:00–01:00 – Night of the Museums; 18 May – International Museum Day; 24 September – La Mercè.',
    1,
    1,
    'https://caixaforum.org/'
  ),
  (
    3,
    'MUHBA - Museu d’Història de Barcelona',
    'A historic museum exploring Barcelona’s urban, social, and cultural evolution through public exhibitions and guided experiences.',
    'MUHBA is a city museum with a strong public mission, offering accessible historical interpretation through exhibitions, neighborhood stories, and spaces that bring Barcelona’s past to life for visitors and residents.',
    'Plaça del Rei, 5, 08002 Barcelona',
    'Free access: first Sunday of the month; Sundays from 3 pm; free admission for under-16s, Friends of the Museum, free pink card holders, GAUDIR+BCN card holders, ICOM and AMC members, accredited teachers, people with a metropolitan pass accompanying a person with a disability, accredited journalists, accredited tour guides, and BCN Card holders.',
    1,
    0,
    'https://www.barcelona.cat/museuhistoria/en'
  );

INSERT INTO event_place_links (event_id, place_id)
VALUES
  (1, 1),
  (2, 2);
