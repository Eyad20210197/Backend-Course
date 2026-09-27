import Session from './sessions.model.js';

const create = async (sessionData) => {
  return Session.create(sessionData);
};

const findByTokenHash = async (tokenHash) => {
  return Session.findOne({
    tokenHash,
    revokedAt: null,
    expiresAt: { $gt: new Date() },
  }).select('+tokenHash');
};

const findById = async (sessionId) => {
  return Session.findOne({
    _id: sessionId,
    revokedAt: null,
    expiresAt: { $gt: new Date() },
  });
};

const revokeById = async (sessionId) => {
  return Session.findOneAndUpdate(
    {
      _id: sessionId,
      revokedAt: null,
    },
    {
      revokedAt: new Date(),
    },
    {
      new: true,
    },
  );
};

const revokeAllByUserId = async (userId) => {
  return Session.updateMany(
    {
      userId,
      revokedAt: null,
    },
    {
      revokedAt: new Date(),
    },
  );
};

export {
  create,
  findByTokenHash,
  findById,
  revokeById,
  revokeAllByUserId,
};