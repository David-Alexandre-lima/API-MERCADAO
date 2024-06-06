var express = require('express');
var router = express.Router();

const usuarios = [
    {
        "id": 1,
        "nome": "João Silva",
        "email": "joao.silva@example.com",
        "cpf": "123.456.789-00"
    },
    {
        "id": 2,
        "nome": "Maria Oliveira",
        "email": "maria.oliveira@example.com",
        "cpf": "987.654.321-00"
    },
    {
        "id": 3,
        "nome": "Carlos Santos",
        "email": "carlos.santos@example.com",
        "cpf": "456.789.123-00"
    },
    {
        "id": 4,
        "nome": "Ana Souza",
        "email": "ana.souza@example.com",
        "cpf": "321.654.987-00"
    },
    {
        "id": 5,
        "nome": "Pedro Lima",
        "email": "pedro.lima@example.com",
        "cpf": "789.123.456-00"
    }
]


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(usuarios);
});

module.exports = router;