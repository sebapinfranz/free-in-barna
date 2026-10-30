const fs = require('node:fs');
const path = require('node:path');

const forceFlag = process.argv.includes('--force');
const nodeEnv = process.env.NODE_ENV || 'development';
const allowedEnvironments = new Set(['development', 'test']);

if (!forceFlag) {
  console.error('Database reset requires --force to prevent accidental data loss.');
  process.exit(1);
}

if (!allowedEnvironments.has(nodeEnv)) {
  console.error(`Database reset is disabled in NODE_ENV=${nodeEnv}. Use development or test.`);
  process.exit(1);
}

const appRoot = path.resolve(__dirname, '..');
const dbDir = path.join(appRoot, 'data');
const dbPath = path.join(dbDir, 'free-in-barna.db');

fs.mkdirSync(dbDir, { recursive: true });

let removedCount = 0;
for (const file of fs.readdirSync(dbDir)) {
  if (file.startsWith('free-in-barna.db')) {
    fs.unlinkSync(path.join(dbDir, file));
    removedCount += 1;
  }
}

console.log(`Database reset: removed ${removedCount} SQLite file(s) from ${path.relative(appRoot, dbPath)}`);
