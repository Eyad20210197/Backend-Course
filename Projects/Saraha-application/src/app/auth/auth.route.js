import { Router } from 'express';
import authentication from '../../common/middleware/authentication.js';

import {
  register,
  login,
  logout,
} from './auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authentication, logout);

export default router;