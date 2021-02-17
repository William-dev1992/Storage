import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';
import itens from '../model/itens.js';

router.get('/all', (req,res) => { 
  res.json(JSON.stringify(itens.getAll()))
});

router.post('/new', bodyParser.json(), (req,res) => { 

  let nome = req.body.nome;
  let quantidade = req.body.quantidade;
  let data = req.body.data;

  itens.newItem(nome, quantidade, data);

  res.send("Item adicionado");
})

router.get('/edit/:id', (req,res) => {
  let id = req.params.id;

  itens.edit(id)

  res.send(itens.edit(id))
})

router.delete('/:id',bodyParser.json(), (req,res,next) => {
  let id = req.params.id;

  itens.del(id)
  res.send(id)
})

export default router;