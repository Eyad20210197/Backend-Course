import authentication from '../../common/middleware/authentication.js';
import { Router } from 'express';
import {
    getMyProfile,
    updateMyProfile,
    deleteMyAccount,
} from './users.controller.js';

const router = Router();

router.get('/me', authentication, getMyProfile);
router.put('/me', authentication, updateMyProfile);
router.delete('/me', authentication, deleteMyAccount);

export default router;


