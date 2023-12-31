const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const loginController = require('./controllers/loginController');
const homeController = require('./controllers/homeController');
const cadastroController = require('./controllers/cadastroController');
const cadastroFerramentaController = require('./controllers/cadastroFerramentaController');
const minhasFerramentasController = require('./controllers/minhasFerramentasController');
const Autenticacao = require('./controllers/midlewareController');
const app = express();
const port = 5000;
const session = require("express-session");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/img',
    filename: (req, file, cb) => {
        const filename = file.originalname;
        cb(null, filename);
    }
});

const img = multer({ storage });

app.use('/img', express.static(__dirname + '/img'));
app.use(express.json());
app.use(session({ secret: "ToolMasters" }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    app.set('layout', './layouts/default/login');
    loginController.getLogin(req, res);
});

app.post('/', (req, res) => {
    loginController.verificaLogin(req, res);
});

app.get('/home', Autenticacao, (req, res) => {
    app.set('layout', './layouts/default/index');
    homeController.getHome(req, res);
});

app.get('/cadastro', (req, res) => {
    app.set('layout', './layouts/default/login');
    cadastroController.getCadastro(req, res);
});

app.post('/cadastro', (req, res) => {
    cadastroController.verificaCadastro(req, res);
});

app.get('/cadastroFerramenta', Autenticacao, (req, res) => {
    app.set('layout', './layouts/default/login');
    cadastroFerramentaController.getCadastroFerramenta(req, res);
});

app.post('/cadastroFerramenta', img.single('imagem'), (req, res) => {
    cadastroFerramentaController.cadastroFerramenta(req, res);
});

app.get('/minhasFerramentas', Autenticacao, (req, res) => {
    app.set('layout', './layouts/default/index');
    minhasFerramentasController.getMinhasFerramentas(req, res);
});

app.get('/editarFerramenta:id', Autenticacao, (req, res) => {
    app.set('layout', './layouts/default/login');
    minhasFerramentasController.getEditar(req, res);
});

app.post('/editarFerramenta:id', img.single('imagem'), (req, res) => {
    minhasFerramentasController.editarFerramenta(req, res);
});

app.post('/excluirFerramenta:id', (req, res) => {
    minhasFerramentasController.excluirFerramenta(req, res);
});

app.get('/sair', (req, res) => {
    homeController.sair(req, res);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});