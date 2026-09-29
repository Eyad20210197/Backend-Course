import { Router } from 'express';

import authentication from '../../common/middleware/authentication.js';

import validate from '../../common/validation/validate.js';

import {
    getMyProfile,
    updateMyProfile,
    deleteMyAccount,
    changeMyPassword,
} from './users.controller.js';

import {
    updateProfileSchema,
    changePasswordSchema,
} from '../../common/validation/schemas/users.schema.js';

const router = Router();

router.get(
    '/me',
    authentication,
    getMyProfile,
);

router.patch(
    '/me',
    authentication,
    validate(updateProfileSchema),
    updateMyProfile,
);

router.delete(
    '/me',
    authentication,
    deleteMyAccount,
);

router.patch(
  '/me/password',
  authentication,
  validate(changePasswordSchema),
  changeMyPassword,
);

export default router;