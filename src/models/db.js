const mysql = require('mysql2/promise');

async function connection() {
    try {
        if (global.connection && global.connection.state !== 'disconnected') {
            return global.connection;
        }
        const connection = await mysql.createConnection({
            url: 'mysql://root:1fFl2Xq6jIE8ePuxnSAE@containers-us-west-163.railway.app:7334/railway',
            host: 'containers-us-west-163.railway.app',
            user: 'root',
            password: '1fFl2Xq6jIE8ePuxnSAE',
            database: 'railway',
            port: 7334
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