import db from '../../db/connection.js';

export const getTotalSoldReport = async () => {
    const [rows] = await db.execute(`
        SELECT
            products.name,
            COALESCE(SUM(sales.quantity_sold), 0)
            AS total_quantity_sold
        FROM products
        LEFT JOIN sales
            ON products.id = sales.product_id
        GROUP BY products.id, products.name
    `);

    return rows;
};

export const getHighestStockProduct = async () => {
    const [rows] = await db.execute(
        `
        SELECT *
        FROM products
        ORDER BY stock_quantity DESC
        LIMIT 1
        `
    );

    return rows[0] || null;
};

export const getSuppliersStartingWithF = async () => {
    const [rows] = await db.execute(
        `
        SELECT *
        FROM suppliers
        WHERE name LIKE 'F%'
        `
    );

    return rows;
};

export const getNeverSoldProducts = async () => {
    const [rows] = await db.execute(`
        SELECT products.*
        FROM products
        LEFT JOIN sales
            ON products.id = sales.product_id
        WHERE sales.id IS NULL
    `);

    return rows;
};

export const getSalesDetails = async () => {
    const [rows] = await db.execute(`
        SELECT
            products.name AS product_name,
            sales.quantity_sold,
            sales.sale_date
        FROM sales
        JOIN products
            ON sales.product_id = products.id
    `);

    return rows;
};