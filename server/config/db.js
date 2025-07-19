import sqlite3 from 'sqlite3';

const DB_PATH = './server/travel.db';

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`
      CREATE TABLE IF NOT EXISTS activities (
        id TEXT PRIMARY KEY,
        date TEXT,
        waktuMulai TEXT,
        waktuSelesai TEXT,
        durasi REAL,
        kegiatan TEXT,
        country TEXT,
        currency TEXT,
        biaya REAL,
        catatan TEXT,
        statusPembayaran INTEGER,
        actor TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creating activities table:', err.message);
      } else {
        console.log('Activities table created or already exists.');
      }
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creating settings table:', err.message);
      } else {
        console.log('Settings table created or already exists.');
      }
    });
  }
});

export default db;
