const jwt = require('jsonwebtoken');

const generateAccessToken = (user) =>
  jwt.sign(
    {
      sub: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

const generateRefreshToken = (user) =>
  jwt.sign(
    {
      sub: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  );

const verifyRefreshToken = (token) => jwt.verify(token, process.env.JWT_REFRESH_SECRET);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};

