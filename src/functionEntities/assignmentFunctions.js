const persistencyLayer = require("../persistencyLayer.js");
const dbAssignmentPath = __dirname+"/../../entities/assignments.js";

function writeAssignment(assignmentId){
	return persistencyLayer.addObject(assignmentId, dbAssignmentPath);
}

function getAllAssignments(){
	return persistencyLayer.getObjectsList(dbAssignmentPath);
}

function getAssignmentById(assignmentId){
	return persistencyLayer.getObject(assignmentId, dbAssignmentPath);
}

function deleteAssignment(assignmentId){
  return persistencyLayer.deleteObject(assignmentId, dbAssignmentPath);
}

function modifyAssignment(id, ass){
  return persistencyLayer.modifyObject(id, dbAssignmentPath, ass);
}

function getUserById(id){
  return persistencyLayer.getObject(id, dbUserPath);
}

function getTaskGroupById(id){
  return persistencyLayer.getObject(id, dbTaskGroupPath);
}

function getUserGroupById(id){
  return persistencyLayer.getObject(id, dbUserGroupPath);
}

module.exports = {
    writeAssignment: writeAssignment,
    getAllAssignments: getAllAssignments,
    getAssignmentById: getAssignmentById,
    deleteAssignment: deleteAssignment,
    modifyAssignment: modifyAssignment,
    getUserById: getUserById,
    getTaskGroupById: getTaskGroupById,
    getUserGroupById: getUserGroupById
}