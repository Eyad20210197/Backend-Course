import { Router } from 'express';

import {
    createSupplier,
    getAllSuppliers,
    updateSupplier,
    deleteSupplier
} from './suppliers.service.js';

import { successResponse } from '../../common/utils/response.js';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const {
            name,
            contact_number
        } = req.body;

        const supplierId = await createSupplier(
            name,
            contact_number
        );

        return successResponse(
            res,
            201,
            'Supplier created successfully',
            { supplierId }
        );

    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const suppliers = await getAllSuppliers();

        return successResponse(
            res,
            200,
            'Suppliers fetched successfully',
            suppliers
        );

    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            name,
            contact_number
        } = req.body;

        await updateSupplier(
            id,
            name,
            contact_number
        );

        return successResponse(
            res,
            200,
            'Supplier updated successfully'
        );

    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        await deleteSupplier(id);

        return successResponse(
            res,
            200,
            'Supplier deleted successfully'
        );

    } catch (error) {
        next(error);
    }
});

export default router;