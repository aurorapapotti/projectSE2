const persistencyLayer = require('../persistencyLayer.js')
const dbUserPath = __dirname+"/../../entities/users.js";
const dbAssignmentPath = __dirname+"/../../entities/assignments.js";
const dbTaskPath = __dirname+"/../../entities/tasks.js";
const dbTaskGroupPath = __dirname+"/../../entities/taskGroups.js";
const dbPeerReviewPath = __dirname+"/../../entities/peerReviews.js";

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

function modifyUser(idUser, newUser){
  return persistencyLayer.modifyObject(idUser, dbUserPath, newUser);
}

function removeUser(idUser){
  return persistencyLayer.deleteObject(idUser, dbUserPath);
}

function getTasks(idUser, param){
  return persistencyLayer.getObjectByParam(idUser, param, dbUserPath, dbTaskPath);
}

function getTaskGroups(idUser, param){
  return persistencyLayer.getObjectByParam(idUser, param, dbUserPath, dbTaskGroupPath);
}

function removeAssignment(idAssignment){
  return persistencyLayer.deleteObject(idAssignment, dbAssignmentPath);
}

function getPeerReviews(idUser, param){
  return persistencyLayer.getObjectByParam(idUser, param, dbUserPath, dbPeerReviewPath);
}

function getAssignments(idUser, param){
  return persistencyLayer.getObjectByParam(idUser, param, dbUserPath, dbAssignmentPath);
}

module.exports = {
  createUser: createUser,
  getAllUsers: getAllUsers,
  getUser: getUser,
  getUserById: getUserById,
  modifyUser: modifyUser,
  removeUser: removeUser,
  getTasks: getTasks,
  getTaskGroups: getTaskGroups,
  getAssignments: getAssignments,
  getPeerReviews: getPeerReviews,
  removeAssignment: removeAssignment
}
