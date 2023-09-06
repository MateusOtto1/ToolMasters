const ferramentaModel = require('../models/ferramentaModel');

async function getHome(req, res){
    try {
        const ferramentas = await ferramentaModel.getFerramentas();
        res.render('home', { ferramentas });
    } catch (error) {
        console.error('Erro ao achar ferramentas:', error);
        res.redirect('/home');
    }
}

async function sair(req, res){
    delete req.session.user;
    res.redirect('/');
}

module.exports = { getHome, sair };