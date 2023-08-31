const mysql = require('mysql2/promise');

async function connection() {
    try {
        if (global.connection && global.connection.state !== 'disconnected') {
            return global.connection;
        }
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'vertrigo',
            database: 'toolmasters'
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