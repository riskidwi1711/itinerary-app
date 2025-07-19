import express from 'express';
import cors from 'cors';
import db from './config/db.js'; // Initialize database

import activityRoutes from './routes/activityRoutes.js';
const settingRoutes = require('./routes/settingRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Use modular routes
app.use('/api/itinerary', activityRoutes);
app.use('/api/settings', settingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});