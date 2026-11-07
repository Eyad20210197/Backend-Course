import Joi from 'joi';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const createIdentityRequestSchema = Joi.object({
  messageId: Joi.string()
    .pattern(objectIdPattern)
    .required()
    .messages({
      'string.pattern.base': 'messageId must be a valid ObjectId.',
    }),
});

const updateIdentityRequestStatusSchema = Joi.object({
  status: Joi.string()
    .valid('accepted', 'rejected')
    .required()
    .messages({
      'any.only': 'Status must be either accepted or rejected.',
    }),
});

const identityRequestIdParamSchema = Joi.object({
  id: Joi.string()
    .pattern(objectIdPattern)
    .required()
    .messages({
      'string.pattern.base': 'id must be a valid ObjectId.',
    }),
});

export {
  createIdentityRequestSchema,
  updateIdentityRequestStatusSchema,
  identityRequestIdParamSchema,
};
