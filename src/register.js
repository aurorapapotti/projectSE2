const userFunctions = require('./functionsEntities/userFunctions.js');

function registerUser(req, res) {
  if(!req||!req.body||!req.body.name||!req.body.surname||!req.body.email||!req.body.badgeNumber)
    return res.status(400).send("Bad Request");
  if(typeof req.body.name !== "string" ||typeof req.body.surname !== "string" ||typeof req.body.email !== "string" || !Number.isInteger(req.body.badgeNumber) )
    return res.status(400).send("Bad Request");
  let idUser = userFunctions.createUser(req.body);
  return res.status(201).send("Created User");
}

module.exports = {
    registerUser: registerUser
}
