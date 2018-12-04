const userFunctions = require('./functionsEntities/userFunctions.js');

function loginUser(req, res) {
  console.log("recived request: ",req.body);
  userFunctions.getUser(req.body.id);
  res.status(201).send("Found");
}

module.exports = {
    loginUser: loginUser
}
