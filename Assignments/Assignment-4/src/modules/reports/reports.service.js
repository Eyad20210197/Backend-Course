import db from '../../db/connection.js';

export const getTotalSoldReport = async () => {
    const [rows] = await db.execute(`
        SELECT
            products.ProductName AS name,
            COALESCE(SUM(sales.SaleQuantitySold), 0)
            AS total_quantity_sold
        FROM products
        LEFT JOIN sales
            ON products.ProductID = sales.ProductID
        GROUP BY products.ProductID, products.ProductName
    `);

    return rows;
};

export const getHighestStockProduct = async () => {
    const [rows] = await db.execute(
        `
        SELECT
            ProductID AS id,
            ProductName AS name,
            ProductPrice AS price,
            ProductStockQuantity AS stock_quantity,
            SupplierID AS supplier_id
        FROM products
        ORDER BY ProductStockQuantity DESC
        LIMIT 1
        `
    );

    return rows[0] || null;
};

export const getSuppliersStartingWithF = async () => {
    const [rows] = await db.execute(
        `
        SELECT
            SupplierID AS id,
            SupplierName AS name,
            SupplierContactNumber AS contact_number
        FROM suppliers
        WHERE SupplierName LIKE 'F%'
        `
    );

    return rows;
};

export const getNeverSoldProducts = async () => {
    const [rows] = await db.execute(`
        SELECT
            products.ProductID AS id,
            products.ProductName AS name,
            products.ProductPrice AS price,
            products.ProductStockQuantity AS stock_quantity,
            products.SupplierID AS supplier_id
        FROM products
        LEFT JOIN sales
            ON products.ProductID = sales.ProductID
        WHERE sales.SaleID IS NULL
    `);

    return rows;
};

export const getSalesDetails = async () => {
    const [rows] = await db.execute(`
        SELECT
            products.ProductName AS product_name,
            sales.SaleQuantitySold AS quantity_sold,
            DATE_FORMAT(sales.SaleDate, '%Y-%m-%d') AS sale_date
        FROM sales
        JOIN products
            ON sales.ProductID = products.ProductID
    `);

    return rows;
};
