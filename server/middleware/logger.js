import winston from 'winston';
import expressWinston from 'express-winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});

export const requestLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: true, // log req and res as json
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: true,
  ignoreRoute: function (req, res) { return false; }
});

export const errorLogger = expressWinston.errorLogger({
  winstonInstance: logger,
  meta: true, // log req and res as json
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: true,
  ignoreRoute: function (req, res) { return false; }
});

export default logger;
