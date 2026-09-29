import crypto from 'crypto';

import * as sessionsRepository from './sessions.repository.js';

const SESSION_DURATION = 1000 * 60 * 30 ; // expires in 30 minutes

const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const hashToken = (token) => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
};

const createSession = async (userId) => {
  const token = generateToken();
  const tokenHash = hashToken(token);

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION,
  );

  const session = await sessionsRepository.create({
    userId,
    tokenHash,
    expiresAt,
  });

  return {
    session,
    token,
  };
};

const getSessionByToken = async (token) => {
  const tokenHash = hashToken(token);

  return sessionsRepository.findByTokenHash(tokenHash);
};

const revokeSession = async (sessionId) => {
  return sessionsRepository.revokeById(sessionId);
};

const revokeAllUserSessions = async (userId) => {
  return sessionsRepository.revokeAllByUserId(userId);
};

export {
  createSession,
  getSessionByToken,
  revokeSession,
  revokeAllUserSessions,
};