import db from '../../db/connection.js';

export const createSupplier = async (
    name,
    contactNumber
) => {
    const [result] = await db.execute(
        `
        INSERT INTO suppliers
        (SupplierName, SupplierContactNumber)
        VALUES (?, ?)
        `,
        [name, contactNumber]
    );

    return result.insertId;
};

export const getAllSuppliers = async () => {
    const [rows] = await db.execute(
        `
        SELECT
            SupplierID AS id,
            SupplierName AS name,
            SupplierContactNumber AS contact_number
        FROM suppliers
        `
    );

    return rows;
};

export const updateSupplier = async (
    id,
    name,
    contactNumber
) => {
    const [result] = await db.execute(
        `
        UPDATE suppliers
        SET SupplierName = ?, SupplierContactNumber = ?
        WHERE SupplierID = ?
        `,
        [name, contactNumber, id]
    );

    if (result.affectedRows === 0) {
        const error = new Error('Supplier not found');
        error.statusCode = 404;
        throw error;
    }
};

export const deleteSupplier = async (id) => {
    const [result] = await db.execute(
        'DELETE FROM suppliers WHERE SupplierID = ?',
        [id]
    );

    if (result.affectedRows === 0) {
        const error = new Error('Supplier not found');
        error.statusCode = 404;
        throw error;
    }
};
