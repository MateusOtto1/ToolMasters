const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const loginController = require('./controllers/loginController');
const homeController = require('./controllers/homeController');
const cadastroController = require('./controllers/cadastroController');
const cadastroFerramentaController = require('./controllers/cadastroFerramentaController');
const app = express();
const port = 5000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', './layouts/default/index');
app.use(express.urlencoded({ extended: true }));
app.get('/', loginController.getLogin);

app.get('/home', homeController.getHome);

app.get('/cadastro', cadastroController.getCadastro);

app.get('/cadastroFerramenta', cadastroFerramentaController.getCadastroFerramenta);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});