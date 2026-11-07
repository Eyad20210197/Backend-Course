import * as messagesService from './messages.service.js';
import { successResponse } from '../../common/utils/response.js';

const sendMessage = async (req, res, next) => {
  try {
    const { receiverId, content } = req.body;

    const message = await messagesService.sendAnonymousMessage({
      senderId: req.user._id,
      receiverId,
      content,
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'Anonymous message sent successfully.',
      data: {
        message,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getReceivedMessages = async (req, res, next) => {
  try {
    const messages = await messagesService.getReceivedMessages(req.user._id);

    return successResponse(res, {
      message: 'Received messages retrieved successfully.',
      data: {
        messages,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  sendMessage,
  getReceivedMessages,
};
