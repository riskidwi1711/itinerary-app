import express from 'express';
import cors from 'cors';

import activityRoutes from './routes/activityRoutes.js';
import settingRoutes from './routes/settingRoutes.js';

import logger, {errorLogger } from './middleware/logger.js';
import responseMiddleware from './middleware/responseMiddleware.js';
import errorMiddleware from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.use(responseMiddleware);

app.use('/api/itinerary', activityRoutes);
app.use('/api/settings', settingRoutes);

app.use(errorLogger);
app.use(errorMiddleware);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err.message, err.stack);
  process.exit(1); // Exit with a failure code
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); // Exit with a failure code
});