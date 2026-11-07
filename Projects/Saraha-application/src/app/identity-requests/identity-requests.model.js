import mongoose from 'mongoose';

const identityRequestSchema = new mongoose.Schema(
  {
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      required: true,
      unique: true,
      index: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const IdentityRequest = mongoose.model(
  'IdentityRequest',
  identityRequestSchema,
);

export default IdentityRequest;
