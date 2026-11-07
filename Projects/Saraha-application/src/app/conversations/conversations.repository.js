import {
  Conversation,
  ConversationMessage,
} from './conversations.model.js';

const findConversationById = async (id) => {
  return Conversation.findById(id)
    .populate('participants', 'name email')
    .populate('originalMessageId', 'content createdAt');
};

const findConversationByOriginalMessageId = async (originalMessageId) => {
  return Conversation.findOne({ originalMessageId });
};

const createConversation = async (data) => {
  return Conversation.create(data);
};

const findConversationsByUserId = async (userId) => {
  return Conversation.find({
    participants: userId,
  })
    .populate('participants', 'name email')
    .populate('originalMessageId', 'content createdAt')
    .sort({ updatedAt: -1 });
};

const createConversationMessage = async (data) => {
  return ConversationMessage.create(data);
};

const findMessagesByConversationId = async (conversationId, { skip = 0, limit = 20 } = {}) => {
  return ConversationMessage.find({ conversationId })
    .populate('senderId', 'name email')
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);
};

const countMessagesByConversationId = async (conversationId) => {
  return ConversationMessage.countDocuments({ conversationId });
};

export {
  findConversationById,
  findConversationByOriginalMessageId,
  createConversation,
  findConversationsByUserId,
  createConversationMessage,
  findMessagesByConversationId,
  countMessagesByConversationId,
};
