import { Router } from 'express';

import {
    createSale,
    getAllSales,
    getSalesByProduct
} from './sales.service.js';

import { successResponse } from '../../common/utils/response.js';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const {
            product_id,
            quantity_sold,
            sale_date
        } = req.body;

        const saleId = await createSale(
            product_id,
            quantity_sold,
            sale_date
        );

        return successResponse(
            res,
            201,
            'Sale recorded successfully',
            { saleId }
        );

    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const sales = await getAllSales();

        return successResponse(
            res,
            200,
            'Sales fetched successfully',
            sales
        );

    } catch (error) {
        next(error);
    }
});

router.get('/product/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;

        const sales = await getSalesByProduct(productId);

        return successResponse(
            res,
            200,
            'Product sales fetched successfully',
            sales
        );

    } catch (error) {
        next(error);
    }
});

export default router;