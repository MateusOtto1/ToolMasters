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

module.exports = { getHome };