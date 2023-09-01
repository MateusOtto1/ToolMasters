function AutenticacaoHome(req, res, next) {
  if (req.session.user) {
      res.render('home');
  } else {
    res.redirect('/');
  }
}

function AutenticacaoCadastroFerramenta(req, res) {
    if (req.session.user) {
        res.render('cadastroFerramenta');
    } else {
      res.redirect('/');
    }
}

function AutenticacaoMinhasFerramentas(req, res) {
    if (req.session.user) {
        res.render('minhasFerramentas');
    } else {
      res.redirect('/');
    }
}

module.exports = { AutenticacaoHome, AutenticacaoCadastroFerramenta, AutenticacaoMinhasFerramentas};