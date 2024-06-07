var express = require('express');
var router = express.Router();

const cols = ["id", "nome", "email", "cpf"]

/* GET home page. */
router.get('/', function(req, res, next) {
    fetch("https://redesigned-space-xylophone-g45x67pw7v52vvv6-3000.app.github.dev//usuarios")
    .then((res)=>{return res.json()})
    .then((usuarios)=>{
        res.render('usuario', { title: 'Lista de Usuarios', usuarios: usuarios, cols: cols });
    })
  
});

module.exports = router;