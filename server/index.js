import express from 'express';
import cors from 'cors';

import activityRoutes from './routes/activityRoutes.js';
import settingRoutes from './routes/settingRoutes.js';

import logger, {errorLogger, requestLogger } from './middleware/logger.js';
import responseMiddleware from './middleware/responseMiddleware.js';
import errorMiddleware from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

app.use(requestLogger)
app.use(responseMiddleware);

app.use('/api/itinerary', activityRoutes);
app.use('/api/settings', settingRoutes);

app.use(errorLogger);
app.use(errorMiddleware);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
}).on('error', err => {
  if (err.code === 'EADDRINUSE') {
    logger.error(`❌ Port ${PORT} is already in use.`);
    process.exit(1); // Exit so nodemon can restart cleanly
  } else {
    logger.error(err);
  }
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err.message, err.stack);
  process.exit(1); // Exit with a failure code
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); // Exit with a failure code
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed gracefully.');
  });
});