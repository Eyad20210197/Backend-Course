import Joi from 'joi';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const sendMessageSchema = Joi.object({
  receiverId: Joi.string()
    .pattern(objectIdPattern)
    .required()
    .messages({
      'string.pattern.base': 'receiverId must be a valid ObjectId.',
    }),

  content: Joi.string()
    .trim()
    .min(1)
    .max(1000)
    .required(),
});

export {
  sendMessageSchema,
};
