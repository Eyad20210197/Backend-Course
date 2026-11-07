import { Router } from 'express';
import authentication from '../../common/middleware/authentication.js';
import validate from '../../common/validation/validate.js';
import {
  createRequest,
  getSenderRequests,
  respondToRequest,
  getRequestDetails,
} from './identity-requests.controller.js';
import {
  createIdentityRequestSchema,
  updateIdentityRequestStatusSchema,
  identityRequestIdParamSchema,
} from '../../common/validation/schemas/identity-requests.schema.js';

const router = Router();

router.post(
  '/',
  authentication,
  validate(createIdentityRequestSchema, 'body'),
  createRequest,
);

router.get(
  '/',
  authentication,
  getSenderRequests,
);

router.get(
  '/:id',
  authentication,
  validate(identityRequestIdParamSchema, 'params'),
  getRequestDetails,
);

router.patch(
  '/:id',
  authentication,
  validate(identityRequestIdParamSchema, 'params'),
  validate(updateIdentityRequestStatusSchema, 'body'),
  respondToRequest,
);

export default router;
