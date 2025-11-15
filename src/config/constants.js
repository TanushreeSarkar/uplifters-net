const USER_ROLES = {
  ADMIN: 'admin',
  DONOR: 'donor',
  VOLUNTEER: 'volunteer',
  GUEST: 'guest',
};

const TESTIMONIAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

const MEDIA_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

const CONTACT_STATUS = {
  NEW: 'new',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
};

const NOTIFICATION_AUDIENCE = {
  ALL: 'all',
  DONORS: 'donors',
  VOLUNTEERS: 'volunteers',
};

module.exports = {
  USER_ROLES,
  TESTIMONIAL_STATUS,
  MEDIA_STATUS,
  CONTACT_STATUS,
  NOTIFICATION_AUDIENCE,
};

