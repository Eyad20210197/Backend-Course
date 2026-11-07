import * as identityRequestsService from './identity-requests.service.js';
import { successResponse } from '../../common/utils/response.js';

const createRequest = async (req, res, next) => {
  try {
    const { messageId } = req.body;

    const request = await identityRequestsService.createIdentityRequest({
      receiverId: req.user._id,
      messageId,
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'Identity disclosure request created successfully.',
      data: {
        request,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSenderRequests = async (req, res, next) => {
  try {
    const requests = await identityRequestsService.getSenderIdentityRequests(
      req.user._id,
    );

    return successResponse(res, {
      message: 'Identity requests retrieved successfully.',
      data: {
        requests,
      },
    });
  } catch (error) {
    next(error);
  }
};

const respondToRequest = async (req, res, next) => {
  try {
    const { id: requestId } = req.params;
    const { status } = req.body;

    const result = await identityRequestsService.respondToIdentityRequest({
      requestId,
      senderId: req.user._id,
      status,
    });

    return successResponse(res, {
      message: `Identity request ${status} successfully.`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getRequestDetails = async (req, res, next) => {
  try {
    const { id: requestId } = req.params;

    const request = await identityRequestsService.getIdentityRequestDetails({
      requestId,
      currentUserId: req.user._id,
    });

    return successResponse(res, {
      message: 'Identity request retrieved successfully.',
      data: {
        request,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  createRequest,
  getSenderRequests,
  respondToRequest,
  getRequestDetails,
};
