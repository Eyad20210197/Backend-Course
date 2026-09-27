import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    codeHash: {
      type: String,
      required: true,
      select: false,
    },

    purpose: {
      type: String,
      enum: [
        'emailVerification',
        'passwordReset',
        'loginVerification',
        'changeEmail',
      ],
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    usedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
  },
);

otpSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 },
);

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;