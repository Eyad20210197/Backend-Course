import { Router } from 'express';
import authentication from '../../common/middleware/authentication.js';
import validate from '../../common/validation/validate.js'

import {
  register,
  login,
  logout,
  verifyEmail,
  resendVerification,
} from './auth.controller.js';

import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resendVerificationSchema,
} from '../../common/validation/schemas/auth.schema.js';

const router = Router();

router.post('/register',
  validate(registerSchema),
  register
);
router.post('/login',
  validate(loginSchema),
  login
);
router.post('/logout',
  authentication,
  logout
);
router.post('/verify-email',
  validate(verifyEmailSchema),
  verifyEmail
);

router.post('/resend-verification',
  validate(resendVerificationSchema),
  resendVerification
);

export default router;