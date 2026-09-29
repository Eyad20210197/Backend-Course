import joi from 'joi';

const registerSchema = joi.object({ 
    name: joi.string()
    .required()
    .min(3)
    .max(30)
    .required(),

    email: joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .lowercase()
    .trim(),

    provider: joi.string()
    .valid('local', 'google')
    .required(),

    password: joi.string()
    .min(8)
    .max(128)
    .when('provider',{
        is: 'local',
        then: joi.required(),
        otherwise: joi.forbidden()
    }),
});

const loginSchema = joi.object({
  email: joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  password: joi.string()
    .required(),
});

const verifyEmailSchema = joi.object({
  email: joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  code: joi.string()
    .pattern(/^\d{6}$/)
    .required(),
});

const resendVerificationSchema = Joi.object({
  email: joi.string()
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