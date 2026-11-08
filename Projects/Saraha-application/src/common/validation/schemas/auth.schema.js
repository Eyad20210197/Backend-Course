import Joi from 'joi';

const registerSchema = Joi.object({ 
    name: Joi.string()
    .required()
    .min(3)
    .max(30),

    email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .lowercase()
    .trim(),

    provider: Joi.string()
    .valid('local', 'google')
    .required(),

    password: Joi.string()
    .min(8)
    .max(128)
    .when('provider',{
        is: 'local',
        then: Joi.required(),
        otherwise: Joi.forbidden()
    }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  password: Joi.string()
    .required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  code: Joi.string()
    .pattern(/^\d{6}$/)
    .required(),
});

const resendVerificationSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required(),
});

export {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resendVerificationSchema,
};
