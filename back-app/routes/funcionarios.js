var express = require('express');
var router = express.Router();

const funcionarios = [
    {
        "id": 1,
        "nome": "João Silva",
        "email": "joao.silva@example.com",
        "cargo": "Gerente",
        "sexo": "Masculino"
    },
    {
        "id": 2,
        "nome": "Maria Oliveira",
        "email": "maria.oliveira@example.com",
        "cargo": "Caixa",
        "sexo": "Feminino"
    },
    {
        "id": 3,
        "nome": "Carlos Santos",
        "email": "carlos.santos@example.com",
        "cargo": "Repositor",
        "sexo": "Masculino"
    },
    {
        "id": 4,
        "nome": "Ana Souza",
        "email": "ana.souza@example.com",
        "cargo": "Atendente",
        "sexo": "Feminino"
    },
    {
        "id": 5,
        "nome": "Pedro Lima",
        "email": "pedro.lima@example.com",
        "cargo": "Segurança",
        "sexo": "Masculino"
    }
]



/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(funcionarios);
});

module.exports = router;