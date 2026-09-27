import crypto from 'crypto';
import bcrypt from 'bcrypt';

import * as otpsRepository from './otps.repository.js';

const OTP_DURATION = 1000 * 60 * 10; // 10 minutes
const MAX_ATTEMPTS = 5;

const generateOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

const createOtp = async (email, purpose) => {
  const normalizedEmail = email.trim().toLowerCase();

  const code = generateOtp();

  const codeHash = await bcrypt.hash(code, 12);

  const expiresAt = new Date(
    Date.now() + OTP_DURATION,
  );

  const otp = await otpsRepository.create({
    email: normalizedEmail,
    codeHash,
    purpose,
    expiresAt,
  });

  return {
    otp,
    code,
  };
};

const verifyOtp = async (email, purpose, code) => {
  const normalizedEmail = email.trim().toLowerCase();

  const otp = await otpsRepository.findActiveByEmailAndPurpose(
    normalizedEmail,
    purpose,
  );

  if (!otp) {
    const error = new Error('Invalid or expired OTP.');
    error.statusCode = 400;
    error.code = 'INVALID_OR_EXPIRED_OTP';

    throw error;
  }

  if (otp.attempts >= MAX_ATTEMPTS) {
    const error = new Error(
      'Too many verification attempts.',
    );

    error.statusCode = 429;
    error.code = 'OTP_MAX_ATTEMPTS';

    throw error;
  }

  const codeMatches = await bcrypt.compare(
    code,
    otp.codeHash,
  );

  if (!codeMatches) {
    await otpsRepository.incrementAttempts(otp._id);

    const error = new Error('Invalid OTP.');
    error.statusCode = 400;
    error.code = 'INVALID_OTP';

    throw error;
  }

  await otpsRepository.markAsUsed(otp._id);

  return true;
};

export {
  createOtp,
  verifyOtp,
};