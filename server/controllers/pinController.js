import bcrypt from 'bcrypt';
import db from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import logger from '../middleware/logger.js';

export const verifyPin = (req, res) => {
  const { pin } = req.body;

  if (!pin) {
    return res.status(400).json({ success: false, message: 'PIN is required' });
  }

  logger.info('Received PIN:', pin);

  db.all("SELECT id, name, hashed_pin FROM actors", async (err, rows) => {
    if (err) {
      logger.error('Database error during PIN verification:', err.message);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (!rows || rows.length === 0) {
      logger.info('No actors found in database.');
      return res.status(404).json({ success: false, message: 'No actors found' });
    }

    let verifiedActor = null;
    for (const actor of rows) {
      logger.info(`Checking actor: ${actor.name}, Stored Hashed PIN: ${actor.hashed_pin}`);
      try {
        const match = await bcrypt.compare(pin, actor.hashed_pin);
        logger.info(`Comparison result for ${actor.name}: ${match}`);
        if (match) {
          verifiedActor = actor;
          break; // Found a match, no need to check further
        }
      } catch (bcryptErr) {
        logger.error('Bcrypt error during PIN comparison for actor', actor.id, ':', bcryptErr.message);
        // Continue to next actor if there's a bcrypt error for one
      }
    }

    if (verifiedActor) {
      logger.info('PIN verified for actor:', verifiedActor.name);
      const sessionId = uuidv4();
      const expiresAt = Date.now() + (60 * 60 * 1000); // Session expires in 1 hour

      db.run("INSERT INTO sessions (id, actor_id, created_at, expires_at) VALUES (?, ?, ?, ?)",
        [sessionId, verifiedActor.id, Date.now(), expiresAt],
        (insertErr) => {
          if (insertErr) {
            logger.error('Error creating session:', insertErr.message);
            return res.status(500).json({ success: false, message: 'Internal server error' });
          }
          return res.json({ success: true, sessionId, actorName: verifiedActor.name });
        }
      );
    } else {
      logger.info('No matching PIN found for any actor.');
      return res.status(401).json({ success: false, message: 'Invalid PIN' });
    }
  });
};
