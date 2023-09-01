const db = require('./db');

async function getFerramentas() {
    const sql = `SELECT * FROM cadastro_ferramenta`;

    try {
        const connection = await db.connection();
        const [rows] = await connection.query(sql);

        if (rows.length > 0) {
            return rows;
        } else {
            return null;
        }

    } catch (error) {
        console.error('Erro ao listar ferramentas:', error);
        throw error;
    }
}

async function cadastraFerramenta(nome_ferramenta, descricao, codigo, numero_serie, imagem, usuarios_idusuarios){
    const sql = `INSERT INTO cadastro_ferramenta (nome_ferramenta, descricao, codigo, numero_serie, imagem, usuarios_idusuarios) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [nome_ferramenta, descricao, codigo, numero_serie, imagem, usuarios_idusuarios];

    try {
        const connection = await db.connection();
        const [rows] = await connection.query(sql, values);

        if (rows.affectedRows > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error('Erro ao cadastrar ferramenta:', error);
        throw error;
    }
}

async function minhasFerramentas(usuarios_idusuarios) {
    const sql = `SELECT * FROM cadastro_ferramenta WHERE usuarios_idusuarios = ?`;
    const values = [usuarios_idusuarios];

    try {
        const connection = await db.connection();
        const [rows] = await connection.query(sql, values);

        if (rows.length > 0) {
            return rows;
        } else {
            return null;
        }

    } catch (error) {
        console.error('Erro ao listar ferramentas:', error);
        throw error;
    }
}

async function editaFerramenta(idcadastro_ferramenta, nome_ferramenta, descricao, codigo, numero_serie, imagem) {
    const sql = `UPDATE cadastro_ferramenta SET nome_ferramenta = ?, descricao = ?, codigo = ?, numero_serie = ?, imagem = ? WHERE idcadastro_ferramenta = ?`;
    const values = [nome_ferramenta, descricao, codigo, numero_serie, imagem, idcadastro_ferramenta];

    try {
        const connection = await db.connection();
        const [rows] = await connection.query(sql, values);

        if (rows.affectedRows > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error('Erro ao editar ferramenta:', error);
        throw error;
    }
}

async function deletaFerramenta(idcadastro_ferramenta) {
    const sql = `DELETE FROM cadastro_ferramenta WHERE idcadastro_ferramenta = ?`;
    const values = [idcadastro_ferramenta];

    try {
        const connection = await db.connection();
        const [rows] = await connection.query(sql, values);

        if (rows.affectedRows > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error('Erro ao deletar ferramenta:', error);
        throw error;
    }
}

module.exports = { getFerramentas, cadastraFerramenta, minhasFerramentas, editaFerramenta, deletaFerramenta };