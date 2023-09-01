const AutenticacaoMinhasFerramentas = require('./midlewareController');
const ferramentaModel = require('../models/ferramentaModel');

async function getMinhasFerramentas(req, res){
    // AutenticacaoMinhasFerramentas.AutenticacaoMinhasFerramentas(req, res);
    const usuarios_idusuarios = req.session.user.id;
    try {
        const ferramentas = await ferramentaModel.minhasFerramentas(usuarios_idusuarios);
        if(ferramentas.length == 0){
            res.redirect('/home');
        }
        res.render('minhasFerramentas', { ferramentas });
    } catch (error) {
        console.error('Erro ao achar ferramentas:', error);
        res.redirect('/home');
    }
}

function getEditar(req, res){
    const idcadastro_ferramenta = req.params.id;
    res.render('editar', { idcadastro_ferramenta });
    console.log(idcadastro_ferramenta);
}

async function editar(req, res){
    const { idcadastro_ferramenta, nome_ferramenta, descricao, codigo, numero_serie, imagem } = req.body;
    console.log(idcadastro_ferramenta);
    try {
        const cadastraFerramenta = await ferramentaModel.editaFerramenta(idcadastro_ferramenta, nome_ferramenta, descricao, codigo, numero_serie, imagem);
        if (cadastraFerramenta) {
            console.log(cadastraFerramenta);
            res.redirect('/minhasFerramentas');
        } else {
            console.log("Ferramenta não cadastrada");
            res.redirect('/cadastroFerramenta');
        }
    } catch (error) {
        console.error('Erro ao realizar o cadastro:', error);
        res.redirect('/home');
    }
}

module.exports = { getMinhasFerramentas, getEditar, editar };