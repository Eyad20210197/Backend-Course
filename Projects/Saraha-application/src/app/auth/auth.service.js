import bcrypt from 'bcrypt';

import * as usersService from '../users/users.service.js';
import * as usersRepository from '../users/users.repository.js';
import * as sessionsService from '../sessions/sessions.service.js';
import * as otpsService from '../otps/otps.service.js';
import sendEmail from '../../common/utils/mail.js';


const SALT_ROUNDS = 12;

const register = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await usersService.createUser({
    name,
    email,
    password: hashedPassword,
    provider: 'local',
  });

  user.password = undefined;

  const { code } = await otpsService.createOtp(
    user.email,
    'emailVerification',
  );

  await sendEmail({
    to: user.email,
    subject: 'Verify your Saraha account',
    html: `
      <h2>Verify your email</h2>

      <p>Hello ${user.name},</p>

      <p>Your Saraha verification code is:</p>

      <h1>${code}</h1>

      <p>This code expires in 10 minutes.</p>

      <p>If you did not create this account, you can ignore this email.</p>
    `,
  });

  return {
    user,
  };
};

const login = async ({ email, password }) => {
  const user = await usersRepository.findByEmail(email, {
    includePassword: true,
  });

  if (!user) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    error.code = 'INVALID_CREDENTIALS';

    throw error;
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.password,
  );

  if (!passwordMatches) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    error.code = 'INVALID_CREDENTIALS';

    throw error;
  }

  const { session, token } = await sessionsService.createSession(
    user._id,
  );

  return {
    user,
    session,
    token,
  };
};

const logout = async (sessionId) => {
  await sessionsService.revokeSession(sessionId);
};

export {
  register,
  login,
  logout,
};