import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/db.js'; // Initialize database

import activityRoutes from './routes/activityRoutes.js';
import settingRoutes from './routes/settingRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Use modular routes
app.use('/api/itinerary', activityRoutes);
app.use('/api/settings', settingRoutes);

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '..", 'dist')));

// All other GET requests will be handled by React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..", 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});