import AppError from '../../common/errors/AppError.js';
import * as usersRepository from '../users/users.repository.js';
import * as messagesRepository from './messages.repository.js';

const sendAnonymousMessage = async ({ senderId, receiverId, content }) => {
  if (senderId.toString() === receiverId.toString()) {
    throw new AppError(
      'You cannot send an anonymous message to yourself.',
      400,
      'CANNOT_MESSAGE_SELF',
    );
  }

  const receiver = await usersRepository.findById(receiverId);

  if (!receiver) {
    throw new AppError(
      'Receiver not found.',
      404,
      'RECEIVER_NOT_FOUND',
    );
  }

  const message = await messagesRepository.create({
    senderId,
    receiverId,
    content,
  });

  return {
    _id: message._id,
    receiverId: message.receiverId,
    content: message.content,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  };
};

const getReceivedMessages = async (receiverId) => {
  return messagesRepository.findByReceiverId(receiverId);
};

const getMessageById = async (messageId, options = {}) => {
  const message = await messagesRepository.findById(messageId, options);

  if (!message) {
    throw new AppError(
      'Message not found.',
      404,
      'MESSAGE_NOT_FOUND',
    );
  }

  return message;
};

export {
  sendAnonymousMessage,
  getReceivedMessages,
  getMessageById,
};
