const ApiError = require('../utils/ApiError');

const roleMiddleware =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, 'You do not have permission to perform this action');
    }
    next();
  };

module.exports = roleMiddleware;

