import Joi from 'joi';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const conversationIdParamSchema = Joi.object({
  id: Joi.string()
    .pattern(objectIdPattern)
    .required()
    .messages({
      'string.pattern.base': 'id must be a valid ObjectId.',
    }),
});

const sendConversationMessageSchema = Joi.object({
  content: Joi.string()
    .trim()
    .min(1)
    .max(2000)
    .required(),
});

const getConversationMessagesQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(50)
    .default(20),
});

export {
  conversationIdParamSchema,
  sendConversationMessageSchema,
  getConversationMessagesQuerySchema,
};
