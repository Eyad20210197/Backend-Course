import * as conversationsService from './conversations.service.js';
import { successResponse } from '../../common/utils/response.js';

const getMyConversations = async (req, res, next) => {
  try {
    const conversations = await conversationsService.getUserConversations(
      req.user._id,
    );

    return successResponse(res, {
      message: 'Conversations retrieved successfully.',
      data: {
        conversations,
      },
    });
  } catch (error) {
    next(error);
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const { id: conversationId } = req.params;
    const { content } = req.body;

    const message = await conversationsService.sendConversationMessage({
      conversationId,
      userId: req.user._id,
      content,
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'Message sent successfully.',
      data: {
        message,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getConversationMessages = async (req, res, next) => {
  try {
    const { id: conversationId } = req.params;
    const { page, limit } = req.query;

    const result = await conversationsService.getConversationMessages({
      conversationId,
      userId: req.user._id,
      page,
      limit,
    });

    return successResponse(res, {
      message: 'Messages retrieved successfully.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getMyConversations,
  sendMessage,
  getConversationMessages,
};
