const express = require('express');

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

app.use(express.json());

app.get("/teams", (req, res) => res.status(200).json(
  { teams: timesArray}
))

app.post("/teams", (req, res) => {
  const newTeam = req.body;
  timesArray.push(newTeam)

  return res.status(201).json({ team: newTeam })
})

app.put('/teams/:id', (req, res) => {
  const { id } = req.params;
  const { nome, sigla } = req.body;
  const updateTeam = teams.find((team) => team.id === Number(id));
  if (!updateTeam) {
    return res.status(404).json({ message: 'Team not found' });
  }
  updateTeam.nome = nome;
  updateTeam.sigla = sigla;
  res.status(200).json({ updateTeam });
});



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
