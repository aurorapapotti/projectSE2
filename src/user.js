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

function putUser(req, res){
  if (!req || !req.params.idUser || typeof req.params.idUser !== 'string')
    return res.status(400).json("Bad Request");
  if (!req.body || !req.body.name || !req.body.surname|| !req.body.email || !req.body.badgeNumber)
    return res.status(400).json("Bad Request");
  if(typeof req.body.name !== "string" ||typeof req.body.surname !== "string" ||typeof req.body.email !== "string" || !Number.isInteger(req.body.badgeNumber) )
    return res.status(400).json("Bad Request");
  user_modify = new Object();
  user_modify = userFunctions.modifyUser(req.params.idUser, req.body);
  if (!user_modify.name || !user_modify.surname || !user_modify.email || !user_modify.badgeNumber)
    return res.status(404).json("User NOT found");
  return res.status(200).json("User modified");
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

function getTasksByIdUser(req, res){
  if (!req || !req.params.idUser || typeof req.params.idUser !== 'string')
    return res.status(400).json("Bad Request");
  tasks = new Object();
  let param = "author";
  tasks = userFunctions.getTasks(req.params.idUser, param);
  if (tasks.id)
    return res.status(404).json("User NOT found");
  else
    return res.status(200).json(tasks);
}

function getTaskByIdUser(req, res){
  if (!req || !req.params.idUser || !req.params.idTask || typeof req.params.idUser !== 'string'|| typeof req.params.idTask !== 'string')
    return res.status(400).json("Bad Request");
  tasks = new Object();
  let param = "author";
  tasks = userFunctions.getTasks(req.params.idUser, param);
  if (tasks.id)
    return res.status(404).json("User NOT found");
  else if (!tasks[req.params.idTask])
    return res.status(404).json("Task NOT found");
  else
    return res.status(200).json(tasks[req.params.idTask]);
}

function getTaskGroupsByIdUser(req, res){
  if (!req || !req.params.idUser || typeof req.params.idUser !== 'string')
    return res.status(400).json("Bad Request");
  taskGroups = new Object();
  let param = "author";
  taskGroups = userFunctions.getTaskGroups(req.params.idUser, param);
  if (taskGroups.id)
    return res.status(404).json("User NOT found");
  else
    return res.status(200).json(taskGroups);
}

function getTaskGroupByIdUser(req, res){
  if (!req || !req.params.idUser || !req.params.idTaskGroup || typeof req.params.idUser !== 'string'|| typeof req.params.idTaskGroup !== 'string')
    return res.status(400).json("Bad Request");
  taskGroups = new Object();
  let param = "author";
  taskGroups = userFunctions.getTaskGroups(req.params.idUser, param);
  if (taskGroups.id)
    return res.status(404).json("User NOT found");
  else if (!taskGroups[req.params.idTaskGroup])
    return res.status(404).json("TaskGroup NOT found");
  else
    return res.status(200).json(taskGroups[req.params.idTaskGroup]);
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

function getPeerReviewsByIdUser(req, res){
  if (!req || !req.params.idUser || typeof req.params.idUser !== 'string')
    return res.status(400).json("Bad Request");
  peerReviews = new Object();
  let param = "user";
  peerReviews = userFunctions.getPeerReviews(req.params.idUser, param);
  if (peerReviews.id)
    return res.status(404).json("User NOT found");
  else
    return res.status(200).json(peerReviews);
}

function getPeerReviewByIdUser(req, res){
  if (!req || !req.params.idUser || !req.params.idPeerReview || typeof req.params.idUser !== 'string'|| typeof req.params.idPeerReview !== 'string')
    return res.status(400).json("Bad Request");
  peerReviews = new Object();
  let param = "user";
  peerReviews = userFunctions.getPeerReviews(req.params.idUser, param);
  if (peerReviews.id)
    return res.status(404).json("User NOT found");
  else if (!peerReviews[req.params.idPeerReview])
    return res.status(404).json("PeerReview NOT found");
  else
    return res.status(200).json(peerReviews[req.params.idPeerReview]);
}


module.exports = {
  listAllUsers: listAllUsers,
  getUser: getUser,
  putUser: putUser,
  deleteUser: deleteUser,
  getTasksByIdUser: getTasksByIdUser,
  getTaskByIdUser: getTaskByIdUser,
  getTaskGroupsByIdUser: getTaskGroupsByIdUser,
  getTaskGroupByIdUser: getTaskGroupByIdUser,
  getAssignmentsByIdUser: getAssignmentsByIdUser,
  getAssignmentByIdUser: getAssignmentByIdUser,
  getPeerReviewsByIdUser: getPeerReviewsByIdUser,
  getPeerReviewByIdUser: getPeerReviewByIdUser,
  deleteAssignmentByIdUser: deleteAssignmentByIdUser
}
