const userFunctions = require('./functionsEntities/userFunctions.js');

function listAllUsers(req, res){
  console.log("recived request: ",req.body);
  res.status(200).send(userFunctions.getAllUsers());
}

function getUser(req, res){
  console.log("receiver request: ", req.params.idUser);
  console.log(userFunctions.getUserById(req.params.idUser));
}

function deleteUser(req, res){
  console.log("receiver request: ", req.body);
  console.log(userFunctions.removeUser(req.body.id));
}

module.exports = {
  listAllUsers: listAllUsers,
  deleteUser: deleteUser,
  getUser: getUser
}
