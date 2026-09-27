import OTP from './otps.model.js';

const create = async (otpData) => {
  return OTP.create(otpData);
};

const findActiveByEmailAndPurpose = async (email, purpose) => {
  return OTP.findOne({
    email,
    purpose,
    usedAt: null,
    expiresAt: { $gt: new Date() },
  }).select('+codeHash');
};

const markAsUsed = async (otpId) => {
  return OTP.findByIdAndUpdate(
    otpId,
    {
      usedAt: new Date(),
    },
    {
      new: true,
    },
  );
};

const incrementAttempts = async (otpId) => {
  return OTP.findByIdAndUpdate(
    otpId,
    {
      $inc: {
        attempts: 1,
      },
    },
    {
      new: true,
    },
  );
};

export {
  create,
  findActiveByEmailAndPurpose,
  markAsUsed,
  incrementAttempts,
};