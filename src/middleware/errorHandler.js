const logger = require('../config/logger');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: err.message || 'Something went wrong',
  };

  if (process.env.NODE_ENV !== 'production' && err.details) {
    response.details = err.details;
  }

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    response.stack = err.stack;
  }

  logger.error(err);

  res.status(statusCode).json(response);
};

module.exports = errorHandler;

