import crypto from 'crypto';
import bcrypt from 'bcrypt';

import * as otpsRepository from './otps.repository.js';
import AppError from '../../common/errors/AppError.js';


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
    throw new AppError(
      'No active OTP found for this email and purpose.',
      400,
      'INVALID_OR_EXPIRED_OTP'
    );
  }

  if (otp.attempts >= MAX_ATTEMPTS) {
    throw new AppError(
      'Maximum OTP verification attempts exceeded.',
      400,
      'MAX_ATTEMPTS_EXCEEDED'
    );
  }

  const codeMatches = await bcrypt.compare(
    code,
    otp.codeHash,
  );

  if (!codeMatches) {
    await otpsRepository.incrementAttempts(otp._id);

    throw new AppError(
      'Invalid OTP code.',
      400,
      'INVALID_OTP'
    );
  }

  await otpsRepository.markAsUsed(otp._id);

  return true;
};

export {
  createOtp,
  verifyOtp,
};