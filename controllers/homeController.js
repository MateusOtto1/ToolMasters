const AutenticacaoHome = require('./midlewareController');

function getHome(req, res){
    AutenticacaoHome.AutenticacaoHome(req, res);
}

module.exports = { getHome };