const persistencyLayer = require('../persistencyLayer.js')
const dbTaskGroupPath = __dirname+"/../../entities/taskGroups.js";

function addTaskGroup(taskGroup){
  return persistencyLayer.addObject(taskGroup,dbTaskGroupPath);
}

function getAllTaskGroups(){
  return persistencyLayer.getObjectsList(dbTaskGroupPath);
}

function getTaskGroupById(idTaskGroup){
  return persistencyLayer.getObject(idTaskGroup, dbTaskGroupPath);
}

function getTaskGroupByName (taskGroupName){
  return persistencyLayer.getObject(taskGroupName, dbTaskGroupPath);
}

function getTaskGroup(taskGroupName, param){
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
  getTaskGroupByName: getTaskGroupByName,
  getTaskGroup: getTaskGroup,
  modifyTaskGroup: modifyTaskGroup,
  removeTaskGroup: removeTaskGroup
}
