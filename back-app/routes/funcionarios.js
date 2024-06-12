var express = require('express');
var router = express.Router();
const sqlite3 = require("sqlite3");

//instanciando database
const db = new sqlite3.Database('./database/database.db');

//criando tabela
db.run(`CREATE TABLE IF NOT EXISTS funcionarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  email TEXT UNIQUE,
  cpf INTEGER UNIQUE,
  telefone TEXT UNIQUE,
  senha TEXT
)`, (err) => {
  if (err) {
    console.error('Erro ao criar a tabela:', err.message);
    return;
  }
  console.log('Tabela criada com sucesso.');
});

//ROTAS

//Registrando um funcionarios(POST)
router.post('/register', (req, res) => {
  console.log(req.body)
  const { nome, email, cpf, telefone, senha } = req.body
  db.run('INSERT INTO funcionarios (nome, email, cpf, telefone, senha) VALUES(?,?,?,?,?)', [nome, email, cpf, telefone, senha]
    , (err) => {
      if (err) {
        console.log("Erro ao inserir dados", err);
        return res.status(500).send({ error: "Erro ao criar funcionarios" });
      } else {
        res.status(200).send({ message: "funcionarios criado com sucesso" });
      }
    });
});

//PESQUISA DE funcionarios(get)
router.get('/', function (req, res, next) {
  db.all('SELECT * FROM funcionarios', (err, funcionarios) => {
    if (err) {
      console.log("Aconteceu um erro", err);
      return res.status(500).send({ error: "Não encontrado" });
    } else {
      console.log("concluído");
      res.status(200).send(funcionarios);
    }
  });
});

//GET POR ID
router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  db.get('SELECT * FROM funcionarios WHERE id = ?', [id], (err, funcionarios) => {
    if (err) {
      console.log("funcionarios não encontrado", err);
      return res.status(500).json({ error: "não foi possível encontrar funcionarios" });
    } if (!funcionarios) {
      return res.status(400).json({ error: "funcionarios não encontrado" });
    }
    res.status(200).json(funcionarios);
  });
});
//PUT
router.put('/:id', function (req, res, next) {
  const { id } = req.params;
  const { nome, email, cpf, telefone, senha } = req.body;
  db.run('UPDATE funcionarios SET nome = ?, email = ? ,cpf = ?, telefone = ?, senha = ? WHERE id = ?', [nome, email, cpf, telefone, senha, id], function (err) {
    if (err) {
      console.log("Erro ao atualizar funcionarios", err);
      return res.status(500).send({ error: "Ocorreu um erro" });
    } if (this.changes === 0) {
      res.status(404).json({ error: "funcionarios não encontrado" });
    } res.status(200).json({ message: "funcionarios atualizado com sucesso!" })
  });
});

//PATCH
router.patch('/:id', function (req, res, next) {
  const { id } = req.params;
  const fields = req.body;
  const keys = Object.keys(fields);
  const values = Object.values(fields);

  if (keys.lenght === 0) {
    return res.status(400).json({ error: "nenhum campo fornecido para atualização" })
  }

  const setClause = keys.map((key) => `${key} = ?`).join(', ');

  db.run(`UPDATE funcionarios SET ${setClause}  WHERE id = ?`, [...values, id], function (err) {
    if (err) {
      console.log("Erro ao atualiza funcionarios parcialmente", err);
      return res.status(500).json({ error: "Erro ao atualizar o funcionarios parcialmente" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Funcionário não encontrado!" });
    }
    res.status(200).json({ message: "Atualizado com sucesso" });
  });

  //DELETE
  router.delete('/:id', function (req, res, next) {
    const { id } = req.params;
    db.run('DELETE FROM funcionarios WHERE id = ?', [id], function (err) {
      if (err) {
        console.error("Erro ao deletar funcionarios", err);
        return res.status(500).json({ error: "Erro ao deletar funcionarios" });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "funcionarios não encontrado" });
      }
      res.status(200).json({ message: "funcionarios deletado com sucesso!" });
    });
  });
})
module.exports = router;