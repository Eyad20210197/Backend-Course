import db from '../../db/connection.js';

export const createStoreManager = async () => {
    await db.query(
        "CREATE USER IF NOT EXISTS 'store_manager'@'localhost' IDENTIFIED BY 'store123'"
    );

    await db.query(
        "GRANT SELECT, INSERT, UPDATE ON retail_store_assignment.* TO 'store_manager'@'localhost'"
    );

    await db.query('FLUSH PRIVILEGES');
};

export const revokeUpdatePermission = async () => {
    await db.query(
        "REVOKE UPDATE ON retail_store_assignment.* FROM 'store_manager'@'localhost'"
    );

    await db.query('FLUSH PRIVILEGES');
};

export const grantSalesDeletePermission = async () => {
    await db.query(
        "GRANT DELETE ON retail_store_assignment.sales TO 'store_manager'@'localhost'"
    );

    await db.query('FLUSH PRIVILEGES');
};