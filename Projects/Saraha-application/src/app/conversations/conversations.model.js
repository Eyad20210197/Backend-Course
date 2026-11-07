import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    originalMessageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      required: true,
      unique: true,
      index: true,
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const conversationMessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
  },
);

const Conversation = mongoose.model('Conversation', conversationSchema);
const ConversationMessage = mongoose.model('ConversationMessage', conversationMessageSchema);

export {
  Conversation,
  ConversationMessage,
};
