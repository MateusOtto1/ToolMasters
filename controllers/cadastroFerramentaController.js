const AutenticacaoCadastroFerramenta = require('./midlewareController');

function getCadastroFerramenta(req, res){
    AutenticacaoCadastroFerramenta.AutenticacaoCadastroFerramenta(req, res);
}

module.exports = { getCadastroFerramenta };