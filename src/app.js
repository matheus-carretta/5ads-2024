const express = require('express');
const validateTeam = require('./middlewares/validateTeam');
const validateCredential = require('./middlewares/apiCredentials');
require('express-async-errors');

const app = express();

const timesArray = [
  {
    id: 1,
    nome: "Vasco",
    sigla: "VAS"
  },
  {
    id: 2,
    nome: "Flamengo",
    sigla: "FLA"
  }
]

app.use(validateCredential); //middleware global
app.use(express.json());

app.get("/teams", validateCredential, (req, res) => res.status(200).json(
  { teams: timesArray}
))

app.post("/teams", validateTeam, (req, res) => {
    console.log('oioii')
    const newTeam = req.body;
    timesArray.push(newTeam)
    return res.status(201).json({ team: newTeam })
})

app.put('/teams/:id', validateTeam, (req, res) => {
    const { id } = req.params;
    const { nome, sigla } = req.body;
  
    const updateTeam = timesArray.find((team) => team.id === Number(id));
    if (!updateTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    updateTeam.nome = nome;
    updateTeam.sigla = sigla;
    return res.status(200).json({ updateTeam });  
});

app.delete('/teams/:id', (req, res) => {
  const { id } = req.params;
  const arrayPosition = timesArray.findIndex((team) => team.id === Number(id));
  timesArray.splice(arrayPosition, 1);

  res.status(200).end();
});

app.get("/teams/:id", (req, res) => {
  const id = Number(req.params.id);

  const team = timesArray.find((team) => team.id === id)

  if (!team) {
    return res.status(404).json({ message: "Time não encontrado!"})
  }

  return res.status(200).json({ team })
})

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

app.get("/body", (req, res) => {
  console.log(req.body)

  return res.status(200).json({ data: req.body })
})

module.exports = app;
