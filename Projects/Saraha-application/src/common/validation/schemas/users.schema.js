import Joi from 'joi';

const updateProfileSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100),

    dateOfBirth: Joi.date()
        .iso()
        .max('now'),

    profilePicture: Joi.string()
        .uri()
        .allow(null, ''),
}).min(1);

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required(),

  newPassword: Joi.string()
    .min(8)
    .max(128)
    .required(),
}).custom((value, helpers) => {
  if (value.currentPassword === value.newPassword) {
    return helpers.error('any.invalid');
  }

  return value;
}).messages({
  'any.invalid': 'New password must be different from current password.',
});

export {
    updateProfileSchema,
    changePasswordSchema,
};