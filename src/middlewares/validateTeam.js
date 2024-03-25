const validateTeam = (req, res, next) => {
  console.log(req.body)
  const requiredBody = ['nome', 'sigla'];

  if (requiredBody.every((property) => property in req.body)) {
    next()
  } else {
    console.log(req.body)
    if (!req.body.sigla) {
      return res.status(400).json({ message: "Faltou a propriedade sigla!"})
    }

    if (!req.body.nome) {
      return res.status(400).json({ message: "Faltou a propriedade nome!"})
    }
  }
}

module.exports = validateTeam;
