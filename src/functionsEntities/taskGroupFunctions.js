const persistencyLayer = require('../persistencyLayer.js')
const dbTaskGroupPath = __dirname+"/../../entities/taskGroups.js";

function addTaskGroup(taskGroup){
  return persistencyLayer.addObject(taskGroup,dbTaskGroupPath);
}

function getAllTaskGroups(){
  return persistencyLayer.getObjectsList(dbTaskGroupPath);
}

function getTaskGroupById(idTaskGroup){
  //console.log("Id passato:", Id);
  return persistencyLayer.getObject(idTaskGroup, dbTaskGroupPath);
}

function getTaskGroup(taskGroupName, param){
  //console.log("Nome passato:", taskGroupName);
  return persistencyLayer.getObjectByQuery(taskGroupName, param, dbTaskGroupPath);
}

function modifyTaskGroup(idTaskGroup, newTaskGroup){
  return persistencyLayer.modifyObject(idTaskGroup, dbTaskGroupPath, newTaskGroup);
}

function removeTaskGroup(idTaskGroup){
  return persistencyLayer.deleteObject(idTaskGroup, dbTaskGroupPath);
}

module.exports = {
  addTaskGroup: addTaskGroup,
  getAllTaskGroups: getAllTaskGroups,
  getTaskGroupById: getTaskGroupById,
  getTaskGroup: getTaskGroup,
  modifyTaskGroup: modifyTaskGroup,
  removeTaskGroup: removeTaskGroup
}
