WITH ranked AS (
  SELECT id,
         ROW_NUMBER() OVER (
           PARTITION BY title, starts_at
           ORDER BY id
         ) AS row_num
  FROM events
)
DELETE FROM events
WHERE id IN (
  SELECT id FROM ranked WHERE row_num > 1
);
