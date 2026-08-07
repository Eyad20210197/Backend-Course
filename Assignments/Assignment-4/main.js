const db = require('./db');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
    res.json('Welcome to the Retail Store API');
});

app.post('/products', async (req, res) => {
    const { name, price, stock_quantity, supplier_id } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO products (name, price, stock_quantity, supplier_id) VALUES (?, ?, ?, ?)',
            [name, price, stock_quantity, supplier_id]
        );

        res.status(201).json({
            message: 'Product created successfully',
            productId: result.insertId
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/products', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, stock_quantity, supplier_id } = req.body;

    try {
        const [result] = await db.execute(
            'UPDATE products SET name = ?, price = ?, stock_quantity = ?, supplier_id = ? WHERE id = ?',
            [name, price, stock_quantity, supplier_id, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/suppliers', async (req, res) => {
    const { name, contact_number } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO suppliers (name, contact_number) VALUES (?, ?)',
            [name, contact_number]
        );

        res.status(201).json({
            message: 'Supplier created successfully',
            supplierId: result.insertId
        });
    } catch (error) {
        console.error('Error creating supplier:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/suppliers', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM suppliers');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/suppliers/:id', async (req, res) => {
    const { id } = req.params;
    const { name, contact_number } = req.body;

    try {
        const [result] = await db.execute(
            'UPDATE suppliers SET name = ?, contact_number = ? WHERE id = ?',
            [name, contact_number, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        res.json({ message: 'Supplier updated successfully' });
    } catch (error) {
        console.error('Error updating supplier:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/suppliers/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute('DELETE FROM suppliers WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        res.json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        console.error('Error deleting supplier:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/sales', async (req, res) => {
    const { product_id, quantity_sold, sale_date } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO sales (product_id, quantity_sold, sale_date) VALUES (?, ?, ?)',
            [product_id, quantity_sold, sale_date]
        );

        await db.execute(
            'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
            [quantity_sold, product_id]
        );

        res.status(201).json({
            message: 'Sale recorded successfully',
            saleId: result.insertId
        });
    } catch (error) {
        console.error('Error recording sale:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/sales', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM sales');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching sales:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/sales/product/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const [rows] = await db.execute('SELECT * FROM sales WHERE product_id = ?', [productId]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching product sales:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/seed', async (req, res) => {
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
                'INSERT INTO suppliers (name, contact_number) VALUES (?, ?)',
                ['FreshFoods', '01001234567']
            );
            supplierId = supplierResult.insertId;
        }

        await db.execute(
            'INSERT INTO products (name, price, stock_quantity, supplier_id) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE price = VALUES(price), stock_quantity = VALUES(stock_quantity), supplier_id = VALUES(supplier_id)',
            ['Milk', 15.00, 50, supplierId]
        );

        await db.execute(
            'INSERT INTO products (name, price, stock_quantity, supplier_id) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE price = VALUES(price), stock_quantity = VALUES(stock_quantity), supplier_id = VALUES(supplier_id)',
            ['Bread', 10.00, 30, supplierId]
        );

        await db.execute(
            'INSERT INTO products (name, price, stock_quantity, supplier_id) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE price = VALUES(price), stock_quantity = VALUES(stock_quantity), supplier_id = VALUES(supplier_id)',
            ['Eggs', 20.00, 40, supplierId]
        );

        const [milkRows] = await db.execute(
            'SELECT id FROM products WHERE name = ?',
            ['Milk']
        );

        if (milkRows.length > 0) {
            await db.execute(
                'INSERT INTO sales (product_id, quantity_sold, sale_date) VALUES (?, ?, ?)',
                [milkRows[0].id, 2, '2025-05-20']
            );
        }

        res.json({ message: 'Initial data inserted successfully' });
    } catch (error) {
        console.error('Error seeding data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.patch('/products/bread/price', async (req, res) => {
    try {
        const [result] = await db.execute(
            'UPDATE products SET price = ? WHERE name = ?',
            [25.00, 'Bread']
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Bread not found' });
        }

        res.json({ message: 'Bread price updated successfully' });
    } catch (error) {
        console.error('Error updating bread price:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/products/eggs', async (req, res) => {
    try {
        const [result] = await db.execute('DELETE FROM products WHERE name = ?', ['Eggs']);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Eggs not found' });
        }

        res.json({ message: 'Eggs deleted successfully' });
    } catch (error) {
        console.error('Error deleting eggs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/reports/total-sold', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT products.name, COALESCE(SUM(sales.quantity_sold), 0) AS total_quantity_sold
            FROM products
            LEFT JOIN sales ON products.id = sales.product_id
            GROUP BY products.id, products.name
        `);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching total sold report:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/reports/highest-stock', async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM products ORDER BY stock_quantity DESC LIMIT 1'
        );

        res.json(rows[0] || null);
    } catch (error) {
        console.error('Error fetching highest stock product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/reports/suppliers-starting-with-f', async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM suppliers WHERE name LIKE 'F%'"
        );

        res.json(rows);
    } catch (error) {
        console.error('Error fetching suppliers report:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/reports/never-sold-products', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT products.*
            FROM products
            LEFT JOIN sales ON products.id = sales.product_id
            WHERE sales.id IS NULL
        `);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching never sold products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/reports/sales-details', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT products.name AS product_name, sales.quantity_sold, sales.sale_date
            FROM sales
            JOIN products ON sales.product_id = products.id
        `);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching sales details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/admin/create-store-manager', async (req, res) => {
    try {
        await db.query("CREATE USER IF NOT EXISTS 'store_manager'@'localhost' IDENTIFIED BY 'store123'");
        await db.query("GRANT SELECT, INSERT, UPDATE ON retail_store_assignment.* TO 'store_manager'@'localhost'");
        await db.query('FLUSH PRIVILEGES');

        res.json({ message: 'store_manager created and permissions granted successfully' });
    } catch (error) {
        console.error('Error creating store_manager:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/admin/revoke-update', async (req, res) => {
    try {
        await db.query("REVOKE UPDATE ON retail_store_assignment.* FROM 'store_manager'@'localhost'");
        await db.query('FLUSH PRIVILEGES');

        res.json({ message: 'UPDATE permission revoked successfully' });
    } catch (error) {
        console.error('Error revoking update permission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/admin/grant-sales-delete', async (req, res) => {
    try {
        await db.query("GRANT DELETE ON retail_store_assignment.sales TO 'store_manager'@'localhost'");
        await db.query('FLUSH PRIVILEGES');

        res.json({ message: 'DELETE permission granted on sales table successfully' });
    } catch (error) {
        console.error('Error granting delete permission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
