import sqlite3 from 'sqlite3';
import logger from '../middleware/logger.js';

const DB_PATH = './travel.db';

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    logger.error('Error connecting to database:', err.message);
  } else {
    logger.info('Connected to the SQLite database.');
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
        logger.error('Error creating activities table:', err.message);
      } else {
        logger.info('Activities table created or already exists.');
      }
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
      )
    `, (err) => {
      if (err) {
        logger.error('Error creating settings table:', err.message);
      } else {
        logger.info('Settings table created or already exists.');
      }
    });
  }
});

export default db;
