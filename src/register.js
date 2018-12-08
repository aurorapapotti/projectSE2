const userFunctions = require('./functionsEntities/userFunctions.js');

function registerUser(req, res) {
  if(!req||!req.body||!req.body.name||!req.body.surname||!req.body.email||!req.body.badgeNumber)
    return res.status(401).send("Bad Request");
  if(typeof req.body.name !== "string" ||typeof req.body.surname !== "string" ||typeof req.body.email !== "string" || !Number.isInteger(req.body.badgeNumber) )
    return res.status(401).send("Bad Request");
  //console.log("recived request: ",req.body);
  let idUser = userFunctions.createUser(req.body);
  //console.log("wrote completed: ", userFunctions.getAllUsers());
  return res.status(201).send("Created User: ",idUser);
}

module.exports = {
    registerUser: registerUser
}
