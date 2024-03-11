const express = require('express');

const app = express();

app.get('/', (req, res) => res.status(200).json(
  { message: "Olá mundo"}
));

app.get("/query", (req, res) => {
  if ( !req.query.nome ){
    return res.status(404).json(
      { message: "Não foi possível encontrar a query nome"}
    )
  }

 // http://localhost:3001/query?sobrenome=Pedro
  return res.status(200).json(
    { nome: req.query.nome, sobrenome: req.query.sobrenome }
  )
})

app.get("/params/:id", (req, res) => {
  console.log(req.params)

  return res.status(200).json(req.params)
})

module.exports = app;
