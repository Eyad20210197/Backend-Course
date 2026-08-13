import { Router } from 'express';

import {
    getTotalSoldReport,
    getHighestStockProduct,
    getSuppliersStartingWithF,
    getNeverSoldProducts,
    getSalesDetails
} from './reports.service.js';

import { successResponse } from '../../common/utils/response.js';

const router = Router();

router.get('/total-sold', async (req, res, next) => {
    try {
        const report = await getTotalSoldReport();

        return successResponse(
            res,
            200,
            'Total sold report fetched successfully',
            report
        );

    } catch (error) {
        next(error);
    }
});

router.get('/highest-stock', async (req, res, next) => {
    try {
        const product = await getHighestStockProduct();

        return successResponse(
            res,
            200,
            'Highest stock product fetched successfully',
            product
        );

    } catch (error) {
        next(error);
    }
});

router.get('/suppliers-starting-with-f', async (req, res, next) => {
    try {
        const suppliers = await getSuppliersStartingWithF();

        return successResponse(
            res,
            200,
            'Suppliers report fetched successfully',
            suppliers
        );

    } catch (error) {
        next(error);
    }
});

router.get('/never-sold-products', async (req, res, next) => {
    try {
        const products = await getNeverSoldProducts();

        return successResponse(
            res,
            200,
            'Never sold products fetched successfully',
            products
        );

    } catch (error) {
        next(error);
    }
});

router.get('/sales-details', async (req, res, next) => {
    try {
        const sales = await getSalesDetails();

        return successResponse(
            res,
            200,
            'Sales details fetched successfully',
            sales
        );

    } catch (error) {
        next(error);
    }
});

export default router;