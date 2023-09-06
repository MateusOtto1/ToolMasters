const mysql = require('mysql2/promise');
require("dotenv").config();

async function connection() {
    try {
        if (global.connection && global.connection.state !== 'disconnected') {
            return global.connection;
        }
        const connection = await mysql.createConnection({
            url: process.env.DB_URL,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT
        });

        console.log("Banco conectado!");
        global.connection = connection;
        return connection;
    } catch (error) {
        console.error("Banco não conectado:", error);
        throw error;
    }
}

module.exports = { connection };