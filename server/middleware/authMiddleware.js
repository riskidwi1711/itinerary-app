import db from '../config/db.js';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('AuthMiddleware: Received Authorization header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('AuthMiddleware: No Bearer token found.');
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const sessionId = authHeader.split(' ')[1];
  console.log('AuthMiddleware: Extracted sessionId:', sessionId);

  db.get("SELECT * FROM sessions WHERE id = ?", [sessionId], (err, row) => {
    if (err) {
      console.error('AuthMiddleware: Database error during session validation:', err.message);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!row) {
      console.log('AuthMiddleware: Session not found in DB for sessionId:', sessionId);
      return res.status(401).json({ message: 'Invalid or expired session' });
    }

    const currentTime = Date.now();
    console.log('AuthMiddleware: Session found. expires_at:', row.expires_at, 'Current time:', currentTime);

    if (row.expires_at < currentTime) {
      console.log('AuthMiddleware: Session expired for sessionId:', sessionId);
      // Optionally, delete expired session from DB here
      db.run("DELETE FROM sessions WHERE id = ?", [sessionId], (deleteErr) => {
        if (deleteErr) console.error('AuthMiddleware: Error deleting expired session:', deleteErr.message);
      });
      return res.status(401).json({ message: 'Invalid or expired session' });
    }

    console.log('AuthMiddleware: Session valid for sessionId:', sessionId);
    req.actorId = row.actor_id;
    next();
  });
};

export default authMiddleware;
