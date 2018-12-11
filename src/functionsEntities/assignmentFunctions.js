const persistencyLayer = require("../persistencyLayer.js");
const dbAssignmentPath = __dirname+"/../../entities/assignments.js";
const dbUserPath = __dirname+"/../../entities/users.js";
const dbUserGroupPath = __dirname+"/../../entities/usergroups.js";
const dbTaskGroupPath = __dirname+"/../../entities/taskgroups.js";

/*function writeAssignment(assignmentId){
	return persistencyLayer.addObject(assignmentId, dbAssignmentPath);
}*/

function addAssignment (assignment){
	return persistencyLayer.addObject(assignment, dbAssignmentPath);
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

module.exports = {
    addAssignment: addAssignment,
    getAllAssignments: getAllAssignments,
    getAssignmentById: getAssignmentById,
    deleteAssignment: deleteAssignment,
    modifyAssignment: modifyAssignment,
    getUserById: getUserById,
    getTaskGroupById: getTaskGroupById,
    getUserGroupById: getUserGroupById
}
