const validateTeam = (req, res, next) => {
  const requiredBody = ['nome', 'sigla'];

  if (requiredBody.every((property) => property in req.body)) {
    next()
  } else {
    return res.status(400).json({ message: "Body incorreto"})
  }
}

module.exports = validateTeam;
