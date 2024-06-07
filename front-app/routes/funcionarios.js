var express = require('express');
var router = express.Router();

const cols = ["id", "nome", "email", "cargo", "sexo"]

/* GET home page. */
router.get('/', function(req, res, next) {
    fetch("https://redesigned-space-xylophone-g45x67pw7v52vvv6-3000.app.github.dev/funcionarios")
    .then((res)=>{return res.json()})
    .then((funcionarios)=>{
        res.render('funcionario', { title: 'Lista de Funcionarios', funcionarios: funcionarios, cols: cols });
    })
  
});

module.exports = router;