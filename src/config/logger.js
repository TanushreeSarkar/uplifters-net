const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp, stack }) => {
          if (stack) {
            return `${timestamp} [${level}]: ${message}\n${stack}`;
          }
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
  ],
});

module.exports = logger;

