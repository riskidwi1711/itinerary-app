import logger from './logger.js';

const errorMiddleware = (err, req, res, next) => {
  logger.error(err.message, err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Only send stack in development
  });
};

export default errorMiddleware;
