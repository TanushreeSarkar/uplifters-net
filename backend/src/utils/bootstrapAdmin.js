const User = require('../models/User');
const { USER_ROLES } = require('../config/constants');
const logger = require('../config/logger');

const bootstrapAdmin = async () => {
  const email = process.env.ADMIN_DEFAULT_EMAIL;
  const password = process.env.ADMIN_DEFAULT_PASSWORD;
  if (!email || !password) return;

  const existing = await User.findOne({ email });
  if (existing) return;

  await User.create({
    firstName: 'System',
    lastName: 'Admin',
    email,
    password,
    role: USER_ROLES.ADMIN,
  });

  logger.info('Default admin user created');
};

module.exports = bootstrapAdmin;

