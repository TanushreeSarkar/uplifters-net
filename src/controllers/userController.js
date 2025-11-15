const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const sendResponse = require('../utils/response');
const ApiError = require('../utils/ApiError');

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -refreshTokens');
  return sendResponse(res, 200, 'Profile fetched', user);
});

const updateMe = asyncHandler(async (req, res) => {
  const updatableFields = [
    'firstName',
    'lastName',
    'bio',
    'phone',
    'address',
    'preferences',
    'avatarUrl',
  ];
  const updates = {};
  updatableFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
  }).select('-password -refreshTokens');

  return sendResponse(res, 200, 'Profile updated', user);
});

const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password -refreshTokens');
  return sendResponse(res, 200, 'Users fetched', users);
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');

  user.role = role;
  await user.save();

  return sendResponse(res, 200, 'User role updated', {
    id: user._id,
    role: user.role,
  });
});

module.exports = {
  getMe,
  updateMe,
  listUsers,
  updateUserRole,
};

