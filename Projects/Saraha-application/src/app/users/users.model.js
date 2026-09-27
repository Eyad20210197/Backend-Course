
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 100,
      default: () => `user${Math.floor(10000 + Math.random() * 90000)}`,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      select: false,
      default: null,
    },

    provider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
      required: true,
    },

    providerAccountId: {
      type: String,
      default: null,
      select: false,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true,
    },

    dateOfBirth: {
      type: Date,
      default: null,
    },

    profilePicture: {
      type: String,
      default: null,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index(
  { provider: 1, providerAccountId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      providerAccountId: { $type: 'string' },
    },
  },
);

const User = mongoose.model('User', userSchema);

export default User;