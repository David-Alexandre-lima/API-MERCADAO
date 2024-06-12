var express = require('express');
var router = express.Router();
const sqlite3 = require("sqlite3");

//instanciando database
const db = new sqlite3.Database('./database/database.db');

//criando tabela
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  email TEXT UNIQUE,
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

//Registrando um usuário(POST)
router.post('/register', (req, res) => {
  console.log(req.body)
  const { nome, email, telefone, senha } = req.body
  db.run('INSERT INTO usuarios (nome, email, telefone, senha) VALUES(?,?,?,?)', [nome, email, telefone, senha]
    , (err) => {
      if (err) {
        console.log("Erro ao inserir dados", err);
        return res.status(500).send({ error: "Erro ao criar usuário" });
      } else {
        res.status(200).send({ message: "usuário criado com sucesso" });
      }
    });
});

//PESQUISA DE USUARIOS(get)
router.get('/', function (req, res, next) {
  db.all('SELECT * FROM usuarios', (err, usuarios) => {
    if (err) {
      console.log("Aconteceu um erro", err);
      return res.status(500).send({ error: "Não encontrado" });
    } else {
      console.log("concluído");
      res.status(200).send(usuarios);
    }
  });
});

//GET POR ID
router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, usuarios) => {
    if (err) {
      console.log("Usuário não encontrado", err);
      return res.status(500).json({ error: "não foi possível encontrar usuário" });
    } if (!usuarios) {
      return res.status(400).json({ error: "usuário não encontrado" });
    }
    res.status(200).json(usuarios);
  });
});
//PUT
router.put('/:id', function (req, res, next) {
  const { id } = req.params;
  const { nome, email, telefone, senha } = req.body;
  db.run('UPDATE usuarios SET nome = ?, email = ?, telefone = ?, senha = ? WHERE id = ?', [nome, email, telefone, senha, id], function (err) {
    if (err) {
      console.log("Erro ao atualizar usuário", err);
      return res.status(500).send({ error: "Ocorreu um erro" });
    } if (this.changes === 0) {
      res.status(404).json({ error: "Usuário não encontrado" });
    } res.status(200).json({ message: "Usuário atualizado com sucesso!" })
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

  db.run(`UPDATE usuarios SET ${setClause}  WHERE id = ?`, [...values, id], function (err) {
    if(err) {
      console.log("Erro ao atualiza usuário parcialmente", err);
      return res.status(500).json({ error: "Erro ao atualizar o usuário parcialmente" });
    }
    if(this.changes === 0) {
      return res.status(404).json({ error: "Usário não encontrado!" });
    } 
    res.status(200).json({ message: "Atualizado com sucesso" });
  });

  //DELETE
  router.delete('/:id', function(req, res, next){
    const {id} = req.params;
    db.run('DELETE FROM usuarios WHERE id = ?', [id], function(err){
      if(err){
        console.error("Erro ao deletar usuário",err);
        return res.status(500).json({error: "Erro ao deletar usuário"});
      }
      if(this.changes === 0){
        return res.status(404).json({error: "usuário não encontrado"});
      }
      res.status(200).json({message: "Usuário deletado com sucesso!"});
    });
  });
})
module.exports = router;