const persistencyLayer = require('../persistencyLayer.js')
const dbUserPath = __dirname+"/../../entities/users.js";
const dbAssignmentPath = __dirname+"/../../entities/assignments.js";

function createUser(user){
  return persistencyLayer.addObject(user,dbUserPath);
}

function getAllUsers(){
  return persistencyLayer.getObjectsList(dbUserPath);
}

function getUser(idUser){
  //console.log("Id passato:", idUser);
  return persistencyLayer.getObject(idUser, dbUserPath);
}

function getUserById(idUser){
  //console.log("Id passato:", idUser);
  return persistencyLayer.getObject(idUser, dbUserPath);
}

function removeUser(idUser){
  return persistencyLayer.deleteObject(idUser, dbUserPath);
}

function removeAssignment(idAssignment){
  return persistencyLayer.deleteObject(idAssignment, dbAssignmentPath);
}

function getAssignments(idUser, param){
  return persistencyLayer.getObjectByParam(idUser, param, dbUserPath, dbAssignmentPath);
}

module.exports = {
  createUser: createUser,
  getAllUsers: getAllUsers,
  getUser: getUser,
  getUserById: getUserById,
  removeUser: removeUser,
  getAssignments: getAssignments,
  removeAssignment: removeAssignment
}
