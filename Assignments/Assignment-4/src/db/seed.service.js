import db from './connection.js';

export const seedDatabase = async () => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [supplierRows] = await connection.execute(
            `
            SELECT SupplierID AS id
            FROM suppliers
            WHERE SupplierName = ?
            LIMIT 1
            `,
            ['FreshFoods']
        );

        let supplierId;

        if (supplierRows.length > 0) {
            supplierId = supplierRows[0].id;
        } else {
            const [supplierResult] = await connection.execute(
                `
                INSERT INTO suppliers
                (SupplierName, SupplierContactNumber)
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

        for (const [name, price, stockQuantity, productSupplierId] of products) {
            const [productRows] = await connection.execute(
                `
                SELECT ProductID AS id
                FROM products
                WHERE ProductName = ?
                LIMIT 1
                `,
                [name]
            );

            if (productRows.length > 0) {
                await connection.execute(
                    `
                    UPDATE products
                    SET ProductPrice = ?,
                        ProductStockQuantity = ?,
                        SupplierID = ?
                    WHERE ProductID = ?
                    `,
                    [
                        price,
                        stockQuantity,
                        productSupplierId,
                        productRows[0].id
                    ]
                );
            } else {
                await connection.execute(
                    `
                    INSERT INTO products
                    (ProductName, ProductPrice, ProductStockQuantity, SupplierID)
                    VALUES (?, ?, ?, ?)
                    `,
                    [name, price, stockQuantity, productSupplierId]
                );
            }
        }

        const [milkRows] = await connection.execute(
            `
            SELECT ProductID AS id
            FROM products
            WHERE ProductName = ?
            LIMIT 1
            `,
            ['Milk']
        );

        if (milkRows.length > 0) {
            const [saleRows] = await connection.execute(
                `
                SELECT SaleID AS id
                FROM sales
                WHERE ProductID = ?
                    AND SaleQuantitySold = ?
                    AND SaleDate = ?
                LIMIT 1
                `,
                [milkRows[0].id, 2, '2025-05-20']
            );

            if (saleRows.length === 0) {
                await connection.execute(
                    `
                    INSERT INTO sales
                    (ProductID, SaleQuantitySold, SaleDate)
                    VALUES (?, ?, ?)
                    `,
                    [milkRows[0].id, 2, '2025-05-20']
                );
            }
        }

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
