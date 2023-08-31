function AutenticacaoHome(req, res) {
    if (req.session.user) {
        res.render('home');
    } else {
      res.redirect('/');
    }
}

function AutenticacaoCadastroFerramenta(req, res) {
    if (req.session.user) {
        res.render('home');
    } else {
      res.redirect('/');
    }
}

module.exports = { AutenticacaoHome, AutenticacaoCadastroFerramenta};