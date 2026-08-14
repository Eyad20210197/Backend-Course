import db from '../../db/connection.js';

export const createProduct = async (
    name,
    price,
    stockQuantity,
    supplierId
) => {
    const [result] = await db.execute(
        `
        INSERT INTO products
        (ProductName, ProductPrice, ProductStockQuantity, SupplierID)
        VALUES (?, ?, ?, ?)
        `,
        [name, price, stockQuantity, supplierId]
    );

    return result.insertId;
};

export const getAllProducts = async () => {
    const [rows] = await db.execute(
        `
        SELECT
            ProductID AS id,
            ProductName AS name,
            ProductPrice AS price,
            ProductStockQuantity AS stock_quantity,
            SupplierID AS supplier_id
        FROM products
        `
    );

    return rows;
};

export const getProductById = async (id) => {
    const [rows] = await db.execute(
        `
        SELECT
            ProductID AS id,
            ProductName AS name,
            ProductPrice AS price,
            ProductStockQuantity AS stock_quantity,
            SupplierID AS supplier_id
        FROM products
        WHERE ProductID = ?
        `,
        [id]
    );

    if (rows.length === 0) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        throw error;
    }

    return rows[0];
};

export const updateProduct = async (
    id,
    name,
    price,
    stockQuantity,
    supplierId
) => {
    const [result] = await db.execute(
        `
        UPDATE products
        SET ProductName = ?,
            ProductPrice = ?,
            ProductStockQuantity = ?,
            SupplierID = ?
        WHERE ProductID = ?
        `,
        [
            name,
            price,
            stockQuantity,
            supplierId,
            id
        ]
    );

    if (result.affectedRows === 0) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        throw error;
    }
};

export const deleteProduct = async (id) => {
    const [result] = await db.execute(
        'DELETE FROM products WHERE ProductID = ?',
        [id]
    );

    if (result.affectedRows === 0) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        throw error;
    }
};

export const updateBreadPrice = async () => {
    const [result] = await db.execute(
        'UPDATE products SET ProductPrice = ? WHERE ProductName = ?',
        [25, 'Bread']
    );

    if (result.affectedRows === 0) {
        const error = new Error('Bread not found');
        error.statusCode = 404;
        throw error;
    }
};

export const deleteEggs = async () => {
    const [result] = await db.execute(
        'DELETE FROM products WHERE ProductName = ?',
        ['Eggs']
    );

    if (result.affectedRows === 0) {
        const error = new Error('Eggs not found');
        error.statusCode = 404;
        throw error;
    }
};
