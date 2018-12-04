const userFunctions = require('./functionsEntities/userFunctions.js');

function registerUser(req, res) {
  console.log("recived request: ",req.body);
  userFunctions.createUser(req.body);
  console.log("wrote completed: ", userFunctions.getAllUsers());
  res.status(201).send("Created");
}

module.exports = {
    registerUser: registerUser
}
