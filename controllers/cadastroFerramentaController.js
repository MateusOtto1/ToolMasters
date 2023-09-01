const AutenticacaoCadastroFerramenta = require('./midlewareController');
const ferramentaModel = require('../models/ferramentaModel');

function getCadastroFerramenta(req, res){
    AutenticacaoCadastroFerramenta.AutenticacaoCadastroFerramenta(req, res);
}

async function cadastroFerramenta(req, res){
    const { nome_ferramenta, descricao, codigo, numero_serie, imagem } = req.body;
    const usuarios_idusuarios = req.session.user.id;
    try {
        const cadastraFerramenta = await ferramentaModel.cadastraFerramenta(nome_ferramenta, descricao, codigo, numero_serie, imagem, usuarios_idusuarios);
        if (cadastraFerramenta) {
            res.redirect('/home');
        } else {
            console.log("Ferramenta não cadastrada");
            res.redirect('/cadastroFerramenta');
        }
    } catch (error) {
        console.error('Erro ao realizar o cadastro:', error);
        res.redirect('/home');
    }
}

module.exports = { getCadastroFerramenta, cadastroFerramenta };