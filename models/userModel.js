const db = require('./db');
const md5 = require('md5');

async function verificaEmailSenha(email, senha) {
    const criptografaSenha = md5(senha);
    const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;
    const values = [email, criptografaSenha];

    try {
        const connection = await db.connection();
        const [ rows ] = await connection.query(sql, values);

        if (rows.length > 0) {
            return rows[0];
        } else{
            return null;
        }

    } catch (error) {
        console.error('Erro ao verificar credenciais:', error);
        throw error;
    }
}

async function cadastraUsuario(nome, email, senha) {
    const criptografaSenha = md5(senha);
    const sql = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
    const values = [nome, email, criptografaSenha];

    try {
        const connection = await db.connection();
        const [ rows ] = await connection.query(sql, values);

        if (rows.affectedRows > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw error;
    }
}

async function verificaEmail(email) {
    const sql = 'SELECT * FROM usuarios WHERE Email = ?';
    const values = [email];

    try {
        const connection = await db.connection();
        const [rows] = await connection.query(sql, values);

        if (rows.length > 0) {
            console.log("Usuário já cadastrado");
            return true;
        } else {
            console.log("Usuário não cadastrado");
            return false;
        }
    } catch (error) {
        console.error('Erro ao verificar email:', error);
        throw error;
    }
}

module.exports = { verificaEmailSenha, cadastraUsuario, verificaEmail };
