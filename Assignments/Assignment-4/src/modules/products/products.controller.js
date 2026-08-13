import { Router } from 'express';

import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    updateBreadPrice,
    deleteEggs
} from './products.service.js';

import { successResponse } from '../../common/utils/response.js';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const {
            name,
            price,
            stock_quantity,
            supplier_id
        } = req.body;

        const productId = await createProduct(
            name,
            price,
            stock_quantity,
            supplier_id
        );

        return successResponse(
            res,
            201,
            'Product created successfully',
            { productId }
        );

    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();

        return successResponse(
            res,
            200,
            'Products fetched successfully',
            products
        );

    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await getProductById(id);

        return successResponse(
            res,
            200,
            'Product fetched successfully',
            product
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
            price,
            stock_quantity,
            supplier_id
        } = req.body;

        await updateProduct(
            id,
            name,
            price,
            stock_quantity,
            supplier_id
        );

        return successResponse(
            res,
            200,
            'Product updated successfully'
        );

    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        await deleteProduct(id);

        return successResponse(
            res,
            200,
            'Product deleted successfully'
        );

    } catch (error) {
        next(error);
    }
});

router.patch('/bread/price', async (req, res, next) => {
    try {
        await updateBreadPrice();

        return successResponse(
            res,
            200,
            'Bread price updated successfully'
        );

    } catch (error) {
        next(error);
    }
});

router.delete('/eggs', async (req, res, next) => {
    try {
        await deleteEggs();

        return successResponse(
            res,
            200,
            'Eggs deleted successfully'
        );

    } catch (error) {
        next(error);
    }
});

export default router;