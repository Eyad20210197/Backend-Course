import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3306,
    database: 'retail_store_assignment',

    waitForConnections: true,
    connectionLimit: 4,
    queueLimit: 0
});

async function testConnection() {
    try {
        await db.execute('SELECT 1 + 1 AS result');

        console.log('Connected to the database');

    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}

testConnection();

export default db;