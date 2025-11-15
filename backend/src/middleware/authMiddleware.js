const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('./asyncHandler');
const User = require('../models/User');

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.cookies?.token;
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (typeof authHeader === 'string') {
    token = authHeader;
  }

  if (!token) {
    throw new ApiError(401, 'Authentication required');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.sub);

    if (!user) {
      throw new ApiError(401, 'Invalid authentication');
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired token');
  }
});

module.exports = authMiddleware;

