import db from '../../db/connection.js';

export const createSale = async (
    productId,
    quantitySold,
    saleDate
) => {
    const [result] = await db.execute(
        `
        INSERT INTO sales
        (product_id, quantity_sold, sale_date)
        VALUES (?, ?, ?)
        `,
        [
            productId,
            quantitySold,
            saleDate
        ]
    );

    await db.execute(
        `
        UPDATE products
        SET stock_quantity = stock_quantity - ?
        WHERE id = ?
        `,
        [
            quantitySold,
            productId
        ]
    );

    return result.insertId;
};

export const getAllSales = async () => {
    const [rows] = await db.execute(
        'SELECT * FROM sales'
    );

    return rows;
};

export const getSalesByProduct = async (productId) => {
    const [rows] = await db.execute(
        'SELECT * FROM sales WHERE product_id = ?',
        [productId]
    );

    return rows;
};