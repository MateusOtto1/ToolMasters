const userModel = require('../models/userModel');

function getCadastro(req, res) {
    res.render('cadastro');
}

async function verificaCadastro(req, res) {
    const { nome, email, senha } = req.body;

    try {
        const encontraUsuario = await userModel.verificaEmail(email);
        if (encontraUsuario) {
            console.log("Usuário já cadastrado");
            res.redirect('/');
        } else {
            const cadastraUsuario = await userModel.cadastraUsuario(nome, email, senha);
            if (cadastraUsuario) {
                const encontraUsuario = await userModel.verificaEmailSenha(email, senha);
                if (encontraUsuario) {
                    req.session.user = {
                        id: encontraUsuario.idusuarios,
                        nome: encontraUsuario.nome,
                        email: encontraUsuario.email
                    }
                    console.log(req.session.user);
                    res.redirect('/home');
                } else {
                    console.log("Usuário não cadastrado");
                    res.redirect('/cadastro');
                }
            } else {
                console.log("Usuário não cadastrado");
                res.redirect('/cadastro');
            }
        }
    } catch (error) {
        console.error('Erro ao realizar o cadastro:', error);
        res.redirect('/');
    }
}

module.exports = { getCadastro, verificaCadastro };