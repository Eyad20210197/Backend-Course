import AppError from '../../common/errors/AppError.js';
import * as conversationsRepository from './conversations.repository.js';

const getOrCreateConversation = async ({ originalMessageId, participants }) => {
  const existingConversation = await conversationsRepository.findConversationByOriginalMessageId(
    originalMessageId,
  );

  if (existingConversation) {
    return existingConversation;
  }

  return conversationsRepository.createConversation({
    originalMessageId,
    participants,
  });
};

const getUserConversations = async (userId) => {
  return conversationsRepository.findConversationsByUserId(userId);
};

const sendConversationMessage = async ({ conversationId, userId, content }) => {
  const conversation = await conversationsRepository.findConversationById(conversationId);

  if (!conversation) {
    throw new AppError(
      'Conversation not found.',
      404,
      'CONVERSATION_NOT_FOUND',
    );
  }

  const isParticipant = conversation.participants.some(
    (participant) => participant._id.toString() === userId.toString(),
  );

  if (!isParticipant) {
    throw new AppError(
      'You are not authorized to send messages in this conversation.',
      403,
      'FORBIDDEN',
    );
  }

  const message = await conversationsRepository.createConversationMessage({
    conversationId,
    senderId: userId,
    content,
  });

  await message.populate('senderId', 'name email');

  return message;
};

const getConversationMessages = async ({
  conversationId,
  userId,
  page = 1,
  limit = 20,
}) => {
  const conversation = await conversationsRepository.findConversationById(conversationId);

  if (!conversation) {
    throw new AppError(
      'Conversation not found.',
      404,
      'CONVERSATION_NOT_FOUND',
    );
  }

  const isParticipant = conversation.participants.some(
    (participant) => participant._id.toString() === userId.toString(),
  );

  if (!isParticipant) {
    throw new AppError(
      'You are not authorized to access messages in this conversation.',
      403,
      'FORBIDDEN',
    );
  }

  const pageNumber = Math.max(1, Number(page) || 1);
  const limitNumber = Math.min(50, Math.max(1, Number(limit) || 20));
  const skip = (pageNumber - 1) * limitNumber;

  const [messages, total] = await Promise.all([
    conversationsRepository.findMessagesByConversationId(conversationId, {
      skip,
      limit: limitNumber,
    }),
    conversationsRepository.countMessagesByConversationId(conversationId),
  ]);

  return {
    messages,
    pagination: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber) || 1,
    },
  };
};

export {
  getOrCreateConversation,
  getUserConversations,
  sendConversationMessage,
  getConversationMessages,
};
