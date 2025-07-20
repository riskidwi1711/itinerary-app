import db from '../config/db.js';

export const logout = (req, res) => {
  const sessionId = req.headers.authorization.split(' ')[1]; // Get sessionId from auth header

  db.run("DELETE FROM sessions WHERE id = ?", [sessionId], function (err) {
    if (err) {
      console.error('Database error during session deletion:', err.message);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    if (this.changes > 0) {
      return res.json({ success: true, message: 'Session invalidated' });
    } else {
      return res.status(404).json({ success: false, message: 'Session not found' });
    }
  });
};
