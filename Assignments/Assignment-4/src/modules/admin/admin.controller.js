import { Router } from 'express';

import {
    createStoreManager,
    revokeUpdatePermission,
    grantSalesDeletePermission
} from './admin.service.js';

import { successResponse } from '../../common/utils/response.js';

const router = Router();

router.post('/create-store-manager', async (req, res, next) => {
    try {
        await createStoreManager();

        return successResponse(
            res,
            201,
            'store_manager created and permissions granted successfully'
        );

    } catch (error) {
        next(error);
    }
});

router.post('/revoke-update', async (req, res, next) => {
    try {
        await revokeUpdatePermission();

        return successResponse(
            res,
            200,
            'UPDATE permission revoked successfully'
        );

    } catch (error) {
        next(error);
    }
});

router.post('/grant-sales-delete', async (req, res, next) => {
    try {
        await grantSalesDeletePermission();

        return successResponse(
            res,
            200,
            'DELETE permission granted on sales table successfully'
        );

    } catch (error) {
        next(error);
    }
});

export default router;