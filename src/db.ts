import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

export type EventRecord = {
  id: number;
  title: string;
  summary: string;
  description: string;
  starts_at: string;
  location: string;
  status: string;
  is_free: number;
  requires_appointment: number;
};

const APP_ROOT = path.resolve(__dirname, "..");
const DATABASE_PATH = path.join(APP_ROOT, "data", "free-in-barna.db");
const MIGRATIONS_DIR = path.join(APP_ROOT, "db", "migrations");

let database: Database.Database | null = null;

function ensureDatabaseDirectory() {
  fs.mkdirSync(path.dirname(DATABASE_PATH), { recursive: true });
}

function runMigrations(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const migrationName = file;
    const alreadyApplied = db
      .prepare("SELECT 1 FROM schema_migrations WHERE name = ?")
      .get(migrationName);

    if (alreadyApplied) {
      continue;
    }

    const migrationSql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), "utf8");

    db.transaction(() => {
      db.exec(migrationSql);
      db.prepare("INSERT INTO schema_migrations (name) VALUES (?)").run(migrationName);
    })();
  }
}

export function initializeDatabase() {
  ensureDatabaseDirectory();

  if (!database) {
    database = new Database(DATABASE_PATH);
    database.pragma("journal_mode = WAL");
    database.pragma("foreign_keys = ON");
    runMigrations(database);
    const integrityCheck = database.prepare("PRAGMA integrity_check").get() as { integrity_check: string };

    if (integrityCheck.integrity_check !== "ok") {
      throw new Error(`Database integrity check failed: ${integrityCheck.integrity_check}`);
    }
  }

  return database;
}

export function getDatabase() {
  return initializeDatabase();
}

export function getAllEvents(): EventRecord[] {
  return getDatabase()
    .prepare(
      `
      SELECT id, title, summary, description, starts_at, location, status, is_free, requires_appointment
      FROM events
      ORDER BY starts_at ASC, id ASC
      `,
    )
    .all() as EventRecord[];
}

export function getEventById(id: number): EventRecord | undefined {
  const event = getDatabase()
    .prepare(
      `
      SELECT id, title, summary, description, starts_at, location, status, is_free, requires_appointment
      FROM events
      WHERE id = ?
      `,
    )
    .get(id) as EventRecord | undefined;

  return event;
}
