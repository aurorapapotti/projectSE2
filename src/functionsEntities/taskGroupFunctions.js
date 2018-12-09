const persistencyLayer = require('../persistencyLayer.js')
const dbTaskGroupPath = __dirname+"/../../entities/taskGroups.js";

function createTaskGroup(taskGroup){
  return persistencyLayer.addObject(taskGroup,dbTaskGroupPath);
}

function getAllTaskGroups(){
  return persistencyLayer.getObjectsList(dbTaskGroupPath);
}

function getTaskGroupById(idTaskGroup){
  //console.log("Id passato:", Id);
  return persistencyLayer.getObject(idTaskGroup, dbTaskGroupPath);
}

function getTaskGroupByName (taskGroupName){
  return persistencyLayer.getObject(taskGroupName, dbTaskGroupPath);
}

function getTaskGroup(taskGroupName, param){
  //console.log("Nome passato:", taskGroupName);
  return persistencyLayer.getObjectByQuery(taskGroupName, param, dbTaskGroupPath);
}

function removeTaskGroup(idTaskGroup){
  return persistencyLayer.deleteObject(idTaskGroup, dbTaskGroupPath);
}

module.exports = {
  createTaskGroup: createTaskGroup,
  getAllTaskGroups: getAllTaskGroups,
  getTaskGroupById: getTaskGroupById,
  getTaskGroupByName: getTaskGroupByName,
  getTaskGroup: getTaskGroup,
  removeTaskGroup: removeTaskGroup
}
