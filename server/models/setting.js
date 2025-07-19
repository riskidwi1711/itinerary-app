import db from '../config/db.js';

const Setting = {
  get: (key, callback) => {
    db.get("SELECT value FROM settings WHERE key = ?", [key], callback);
  },

  set: (key, value, callback) => {
    db.run(
      `INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`,
      [key, value],
      callback
    );
  },
};

export default Setting;
