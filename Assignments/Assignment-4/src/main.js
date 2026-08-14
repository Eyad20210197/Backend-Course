import express from 'express';
import cors from 'cors';

import adminController from './modules/admin/index.js';
import productsController from './modules/products/index.js';
import reportsController from './modules/reports/index.js';
import salesController from './modules/sales/index.js';
import suppliersController from './modules/suppliers/index.js';

import { successResponse } from './common/utils/response.js';
import { errorHandler } from './common/middleware/errorHandler.js';
import { seedDatabase } from './db/seed.service.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return successResponse(
        res,
        200,
        'Welcome to the Retail Store API'
    );
});

app.use('/admin', adminController);
app.use('/suppliers', suppliersController);
app.use('/products', productsController);
app.use('/sales', salesController);
app.use('/reports', reportsController);

app.post('/seed', async (req, res, next) => {
    try {
        await seedDatabase();

        return successResponse(
            res,
            200,
            'Initial data inserted successfully'
        );
    } catch (error) {
        next(error);
    }
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
