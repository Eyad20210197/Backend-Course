import express from 'express';
import db from './db/connection.js';

import adminController from './modules/admin/index.js';
import productsController from './modules/products/index.js';
import reportsController from './modules/reports/index.js';
import salesController from './modules/sales/index.js';
import suppliersController from './modules/suppliers/index.js';

import { successResponse } from './common/utils/response.js';
import { errorHandler } from './common/middleware/errorHandler.js';

const app = express();
const port = 3000;

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
        const [supplierRows] = await db.execute(
            'SELECT id FROM suppliers WHERE name = ?',
            ['FreshFoods']
        );

        let supplierId;

        if (supplierRows.length > 0) {
            supplierId = supplierRows[0].id;

        } else {
            const [supplierResult] = await db.execute(
                `
                INSERT INTO suppliers
                (name, contact_number)
                VALUES (?, ?)
                `,
                ['FreshFoods', '01001234567']
            );

            supplierId = supplierResult.insertId;
        }

        const products = [
            ['Milk', 15, 50, supplierId],
            ['Bread', 10, 30, supplierId],
            ['Eggs', 20, 40, supplierId]
        ];

        for (const product of products) {
            await db.execute(
                `
                INSERT INTO products
                (name, price, stock_quantity, supplier_id)
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    price = VALUES(price),
                    stock_quantity = VALUES(stock_quantity),
                    supplier_id = VALUES(supplier_id)
                `,
                product
            );
        }

        const [milkRows] = await db.execute(
            'SELECT id FROM products WHERE name = ?',
            ['Milk']
        );

        if (milkRows.length > 0) {
            await db.execute(
                `
                INSERT INTO sales
                (product_id, quantity_sold, sale_date)
                VALUES (?, ?, ?)
                `,
                [
                    milkRows[0].id,
                    2,
                    '2025-05-20'
                ]
            );
        }

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