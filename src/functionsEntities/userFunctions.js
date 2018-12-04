const persistencyLayer = require('../persistencyLayer.js')
const dbUserPath = "./entities/users.js";
const dbAssignmentPath = "./entities/assignments.js";

function createUser(user){
  return persistencyLayer.addObject(user,dbUserPath);
}

function getAllUsers(){
  return persistencyLayer.getObjectsList(dbUserPath);
}

function getUser(idUser){
  console.log("Id passato:", idUser);
  return persistencyLayer.getObject(idUser, dbUserPath);
}

function getUserById(idUser){
  console.log("Id passato:", idUser);
  return persistencyLayer.getObject(idUser, dbUserPath);
}

function removeUser(idUser){
  return persistencyLayer.deleteObject(idUser, dbUserPath);
}

function getAssignments(idUser){
  return persistencyLayer.getObjectByParam(idUser, dbUserPath, dbAssignmentPath);
}

module.exports = {
  createUser: createUser,
  getAllUsers: getAllUsers,
  getUser: getUser,
  getUserById: getUserById,
  removeUser: removeUser,
  getAssignments: getAssignments,
}
