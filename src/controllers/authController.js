const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const ApiError = require('../utils/ApiError');
const sendResponse = require('../utils/response');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../services/tokenService');
const { sendEmail } = require('../services/emailService');
const { USER_ROLES } = require('../config/constants');

const buildUserPayload = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
  avatarUrl: user.avatarUrl,
  bio: user.bio,
  preferences: user.preferences,
});

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, 'Email already registered');
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role: role && Object.values(USER_ROLES).includes(role) ? role : USER_ROLES.DONOR,
  });

  sendEmail({
    to: user.email,
    subject: 'Welcome to Uplifters-Net',
    html: `<p>Hi ${user.firstName}, welcome to the Uplifters-Net community!</p>`,
  });

  return sendResponse(res, 201, 'Registration successful', { user: buildUserPayload(user) });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid credentials');
  }

  user.lastLoginAt = new Date();
  const refreshToken = generateRefreshToken(user);
  const refreshHash = await bcrypt.hash(refreshToken, 10);
  user.refreshTokens.push(refreshHash);
  await user.save();

  const accessToken = generateAccessToken(user);

  return sendResponse(res, 200, 'Login successful', {
    user: buildUserPayload(user),
    tokens: {
      accessToken,
      refreshToken,
    },
  });
});

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new ApiError(400, 'Refresh token required');
  }

  const payload = verifyRefreshToken(refreshToken);
  const user = await User.findById(payload.sub);

  if (!user) throw new ApiError(400, 'Invalid token');

  const remainingTokens = [];
  for (const stored of user.refreshTokens) {
    const isMatch = await bcrypt.compare(refreshToken, stored);
    if (!isMatch) {
      remainingTokens.push(stored);
    }
  }
  user.refreshTokens = remainingTokens;

  await user.save();
  return sendResponse(res, 200, 'Logged out');
});

const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new ApiError(400, 'Refresh token required');
  }

  const payload = verifyRefreshToken(refreshToken);
  const user = await User.findById(payload.sub);
  if (!user) throw new ApiError(401, 'Invalid token');

  let tokenMatch = false;
  for (const stored of user.refreshTokens) {
    if (await bcrypt.compare(refreshToken, stored)) {
      tokenMatch = true;
      break;
    }
  }

  if (!tokenMatch) {
    throw new ApiError(401, 'Refresh token revoked');
  }

  const accessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);
  const refreshHash = await bcrypt.hash(newRefreshToken, 10);
  user.refreshTokens.push(refreshHash);
  await user.save();

  return sendResponse(res, 200, 'Token refreshed', {
    tokens: {
      accessToken,
      refreshToken: newRefreshToken,
    },
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return sendResponse(res, 200, 'If that email exists, instructions have been sent');
  }

  const token = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
  user.passwordResetExpires = Date.now() + 60 * 60 * 1000;
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await sendEmail({
    to: user.email,
    subject: 'Password Reset',
    html: `<p>Reset your password by clicking <a href="${resetUrl}">here</a>. This link expires in 1 hour.</p>`,
  });

  return sendResponse(res, 200, 'Password reset instructions sent');
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, 'Token invalid or expired');
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return sendResponse(res, 200, 'Password updated');
});

module.exports = {
  register,
  login,
  logout,
  refresh,
  forgotPassword,
  resetPassword,
};

