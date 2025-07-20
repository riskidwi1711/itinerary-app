import sqlite3 from 'sqlite3';
import logger from '../middleware/logger.js';
import bcrypt from 'bcrypt';

const DB_PATH = './travel.db';
const SALT_ROUNDS = 10; // For bcrypt hashing

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

    // Create sessions table
    db.run(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        actor_id TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        expires_at INTEGER NOT NULL,
        FOREIGN KEY (actor_id) REFERENCES actors(id)
      )
    `, (err) => {
      if (err) {
        logger.error('Error creating sessions table:', err.message);
      } else {
        logger.info('Sessions table created or already exists.');
      }
    });

    // Create actors table
    db.run(`
      CREATE TABLE IF NOT EXISTS actors (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE,
        hashed_pin TEXT
      )
    `, (err) => {
      if (err) {
        logger.error('Error creating actors table:', err.message);
      } else {
        logger.info('Actors table created or already exists.');
        // Seed actors data if table is empty
        db.get("SELECT COUNT(*) AS count FROM actors", async (err, row) => {
          if (err) {
            logger.error('Error checking actors table count:', err.message);
            return;
          }
          if (row.count === 0) {
            logger.info('Seeding actors data...');
            try {
              const riskiHashedPin = await bcrypt.hash('090502', SALT_ROUNDS);
              const auliaHashedPin = await bcrypt.hash('010502', SALT_ROUNDS);

              db.run("INSERT INTO actors (id, name, hashed_pin) VALUES (?, ?, ?)", ['riski-id', 'riski', riskiHashedPin], (err) => {
                if (err) logger.error('Error inserting riski actor:', err.message);
                else logger.info('Riski actor seeded.');
              });
              db.run("INSERT INTO actors (id, name, hashed_pin) VALUES (?, ?, ?)", ['aulia-id', 'aulia', auliaHashedPin], (err) => {
                if (err) logger.error('Error inserting aulia actor:', err.message);
                else logger.info('Aulia actor seeded.');
              });
            } catch (hashErr) {
              logger.error('Error hashing PIN:', hashErr.message);
            }
          } else {
            logger.info('Actors table already contains data, skipping seeding.');
          }
        });
      }
    });
  }
});

export default db;
