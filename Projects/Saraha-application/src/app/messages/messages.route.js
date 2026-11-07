import { Router } from 'express';
import authentication from '../../common/middleware/authentication.js';
import validate from '../../common/validation/validate.js';
import {
  sendMessage,
  getReceivedMessages,
} from './messages.controller.js';
import { sendMessageSchema } from '../../common/validation/schemas/messages.schema.js';

const router = Router();

router.post(
  '/',
  authentication,
  validate(sendMessageSchema),
  sendMessage,
);

router.get(
  '/',
  authentication,
  getReceivedMessages,
);

export default router;
