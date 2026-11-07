import { Router } from 'express';
import authentication from '../../common/middleware/authentication.js';
import validate from '../../common/validation/validate.js';
import {
  getMyConversations,
  sendMessage,
  getConversationMessages,
} from './conversations.controller.js';
import {
  conversationIdParamSchema,
  sendConversationMessageSchema,
  getConversationMessagesQuerySchema,
} from '../../common/validation/schemas/conversations.schema.js';

const router = Router();

router.get(
  '/',
  authentication,
  getMyConversations,
);

router.post(
  '/:id/messages',
  authentication,
  validate(conversationIdParamSchema, 'params'),
  validate(sendConversationMessageSchema, 'body'),
  sendMessage,
);

router.get(
  '/:id/messages',
  authentication,
  validate(conversationIdParamSchema, 'params'),
  validate(getConversationMessagesQuerySchema, 'query'),
  getConversationMessages,
);

export default router;
