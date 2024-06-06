var express = require('express');
var router = express.Router();

const cols = ["id", "nome", "email", "cpf"]

/* GET home page. */
router.get('/', function(req, res, next) {
    fetch("https://cuddly-space-chainsaw-w6wjq5p67x4cg6j5-3000.app.github.dev/usuarios")
    .then((res)=>{return res.json()})
    .then((usuarios)=>{
        res.render('usuario', { title: 'Lista de Usuarios', usuarios: usuarios, cols: cols });
    })
  
});

module.exports = router;