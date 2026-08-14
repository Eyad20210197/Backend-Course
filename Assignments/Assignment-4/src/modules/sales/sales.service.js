import db from '../../db/connection.js';

export const createSale = async (
    productId,
    quantitySold,
    saleDate
) => {
    const [result] = await db.execute(
        `
        INSERT INTO sales
        (ProductID, SaleQuantitySold, SaleDate)
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
        SET ProductStockQuantity = ProductStockQuantity - ?
        WHERE ProductID = ?
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
        `
        SELECT
            SaleID AS id,
            ProductID AS product_id,
            SaleQuantitySold AS quantity_sold,
            DATE_FORMAT(SaleDate, '%Y-%m-%d') AS sale_date
        FROM sales
        `
    );

    return rows;
};

export const getSalesByProduct = async (productId) => {
    const [rows] = await db.execute(
        `
        SELECT
            SaleID AS id,
            ProductID AS product_id,
            SaleQuantitySold AS quantity_sold,
            DATE_FORMAT(SaleDate, '%Y-%m-%d') AS sale_date
        FROM sales
        WHERE ProductID = ?
        `,
        [productId]
    );

    return rows;
};
