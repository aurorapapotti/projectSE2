const userFunctions = require('./functionsEntities/userFunctions.js');

function listAllUsers(req, res){
  if (!req)
    return res.status(400).json("Bad Request");
  return res.status(200).json(userFunctions.getAllUsers());
}

function getUser(req, res){
  if(!req || !req.params.idUser || typeof req.params.idUser !== 'string')
    return res.status(400).json("Bad Request");
  user = new Object();
  user = userFunctions.getUserById(req.params.idUser);
  if (!user.name || !user.surname || !user.email || !user.badgeNumber)
    return res.status(404).json("User NOT found");
  return res.status(200).json(user);
}

function deleteUser(req, res){
  if (!req || !req.params.idUser || typeof req.params.idUser !== 'string')
    return res.status(400).json("Bad Request");
  user_deleted = new Object();
  user_deleted = userFunctions.removeUser(req.params.idUser);
  if (!user_deleted.name || !user_deleted.surname || !user_deleted.email || !user_deleted.badgeNumber)
    return res.status(404).json("User NOT found");
  return res.status(200).json("User deleted");
}

function getAssignmentsByIdUser(req, res){
  if (!req || !req.params.idUser || typeof req.params.idUser !== 'string')
    return res.status(400).json("Bad Request");
  assignments = new Object();
  let param = "professor";
  assignments = userFunctions.getAssignments(req.params.idUser, param);
  if (assignments.id)
    return res.status(404).json("User NOT found");
  else
    return res.status(200).json(assignments);
}

function getAssignmentByIdUser(req, res){
  if (!req || !req.params.idUser || !req.params.idAssignment || typeof req.params.idUser !== 'string'|| typeof req.params.idAssignment !== 'string')
    return res.status(400).json("Bad Request");
  assignments = new Object();
  let param = "professor";
  assignments = userFunctions.getAssignments(req.params.idUser, param);
  if (assignments.id)
    return res.status(404).json("User NOT found");
  else if (!assignments[req.params.idAssignment])
    return res.status(404).json("Assignment NOT found");
  else
    return res.status(200).json(assignments[req.params.idAssignment]);
}

function deleteAssignmentByIdUser(req, res){
  if (!req || !req.params.idUser || !req.params.idAssignment || typeof req.params.idUser !== 'string'|| typeof req.params.idAssignment !== 'string')
    return res.status(400).json("Bad Request");
  assignments = new Object();
  let param = "professor";
  assignments = userFunctions.getAssignments(req.params.idUser, param);
  if (assignments.id)
    return res.status(404).json("User NOT found");
  else if (!assignments[req.params.idAssignment])
    return res.status(404).json("Assignment NOT found");
  else {
    userFunctions.removeAssignment(req.params.idAssignment);
    return res.status(200).json("Assignment deleted");
  }
}

module.exports = {
  getAssignmentsByIdUser: getAssignmentsByIdUser,
  listAllUsers: listAllUsers,
  deleteUser: deleteUser,
  getUser: getUser,
  getAssignmentByIdUser: getAssignmentByIdUser,
  deleteAssignmentByIdUser: deleteAssignmentByIdUser
}
