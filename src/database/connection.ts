// src/database/connection.ts
import mysql from 'mysql2';

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'rodsql', // Troque pela sua senha do MySQL
    database: 'portfolio_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default connection.promise(); // Usamos .promise() para poder usar async/await