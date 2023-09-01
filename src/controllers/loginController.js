const userModel = require('../models/userModel');

function getLogin(req, res){
    res.render('login');
}

async function verificaLogin(req, res) {
    const { email, senha } = req.body;

    try {
        const encontraUsuario = await userModel.verificaEmailSenha(email, senha);
        if (encontraUsuario) {
            req.session.user = {
                id: encontraUsuario.idusuarios,
                nome: encontraUsuario.nome,
                email: encontraUsuario.email
            }
            req.session.onClose(() => {
                req.session.destroy();
            });
            console.log(req.session.user);
            res.redirect('/home');
        } else {
            console.log("Usuário não cadastrado");
            res.redirect('/');
        }



    } catch (error) {
        console.error('Erro ao realizar o login:', error);
        res.redirect('/');
    }
}

module.exports = { getLogin, verificaLogin };