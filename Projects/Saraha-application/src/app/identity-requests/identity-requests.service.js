import AppError from '../../common/errors/AppError.js';
import * as messagesService from '../messages/messages.service.js';
import * as usersRepository from '../users/users.repository.js';
import * as conversationsService from '../conversations/conversations.service.js';
import * as identityRequestsRepository from './identity-requests.repository.js';

const createIdentityRequest = async ({ receiverId, messageId }) => {
  const message = await messagesService.getMessageById(messageId, {
    includeSender: true,
  });

  if (message.receiverId.toString() !== receiverId.toString()) {
    throw new AppError(
      'You are not authorized to request sender identity for this message.',
      403,
      'FORBIDDEN',
    );
  }

  const existingRequest = await identityRequestsRepository.findByMessageId(
    messageId,
  );

  if (existingRequest) {
    throw new AppError(
      'An identity disclosure request already exists for this message.',
      409,
      'REQUEST_ALREADY_EXISTS',
    );
  }

  const request = await identityRequestsRepository.create({
    messageId,
    senderId: message.senderId,
    receiverId,
    status: 'pending',
  });

  return {
    _id: request._id,
    messageId: request.messageId,
    receiverId: request.receiverId,
    status: request.status,
    createdAt: request.createdAt,
    updatedAt: request.updatedAt,
  };
};

const getSenderIdentityRequests = async (senderId) => {
  return identityRequestsRepository.findBySenderId(senderId);
};

const respondToIdentityRequest = async ({ requestId, senderId, status }) => {
  const request = await identityRequestsRepository.findById(requestId);

  if (!request) {
    throw new AppError(
      'Identity request not found.',
      404,
      'REQUEST_NOT_FOUND',
    );
  }

  if (request.senderId.toString() !== senderId.toString()) {
    throw new AppError(
      'You are not authorized to respond to this identity request.',
      403,
      'FORBIDDEN',
    );
  }

  if (request.status !== 'pending') {
    throw new AppError(
      'This identity request has already been processed.',
      400,
      'REQUEST_ALREADY_PROCESSED',
    );
  }

  const updatedRequest = await identityRequestsRepository.updateStatusById(
    requestId,
    status,
  );

  let conversation = null;

  if (status === 'accepted') {
    const originalMessageId = request.messageId?._id || request.messageId;

    conversation = await conversationsService.getOrCreateConversation({
      originalMessageId,
      participants: [request.senderId, request.receiverId],
    });
  }

  return {
    request: updatedRequest,
    conversation,
  };
};

const getIdentityRequestDetails = async ({ requestId, currentUserId }) => {
  const request = await identityRequestsRepository.findById(requestId);

  if (!request) {
    throw new AppError(
      'Identity request not found.',
      404,
      'REQUEST_NOT_FOUND',
    );
  }

  const isReceiver = request.receiverId.toString() === currentUserId.toString();
  const isSender = request.senderId.toString() === currentUserId.toString();

  if (!isReceiver && !isSender) {
    throw new AppError(
      'You are not authorized to access this identity request.',
      403,
      'FORBIDDEN',
    );
  }

  if (isReceiver) {
    if (request.status === 'accepted') {
      const sender = await usersRepository.findById(request.senderId);

      return {
        _id: request._id,
        messageId: request.messageId,
        receiverId: request.receiverId,
        status: request.status,
        sender: sender
          ? {
              _id: sender._id,
              name: sender.name,
              email: sender.email,
            }
          : null,
        createdAt: request.createdAt,
        updatedAt: request.updatedAt,
      };
    }

    return {
      _id: request._id,
      messageId: request.messageId,
      receiverId: request.receiverId,
      status: request.status,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
    };
  }

  return request;
};

export {
  createIdentityRequest,
  getSenderIdentityRequests,
  respondToIdentityRequest,
  getIdentityRequestDetails,
};
