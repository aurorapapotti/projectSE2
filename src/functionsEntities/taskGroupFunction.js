const persistencyLayer = require('../persistencyLayer.js')
const dbTaskGroupPath = __dirname+"/../../entities/taskGroup.js";

function createTaskGroup(taskGroup){
  return persistencyLayer.addObject(taskGroup,dbTaskGroupPath);
}

function getAllTaskGroups(){
  return persistencyLayer.getObjectsList(dbTaskGroupPath);
}

function getTaskGroupById(Id){
  console.log("Id passato:", Id);
  return persistencyLayer.getObject(Id, dbTaskGroupPath);
}

function getTaskGroupByName(taskGroupName){
  console.log("Nome passato:", taskGroupName);
  return persistencyLayer.getObject(taskGroupName, dbTaskGroupPath);
}

function removeTaskGroup(idTaskGroup){
  return persistencyLayer.deleteObject(idTaskGroup, dbTaskGroupPath);
}

module.exports = {
  createTaskGroup: createTaskGroup,
  getAllTaskGroups: getAllTaskGroups,
  getTaskGroupById: getTaskGroupById,
  getTaskGroupByName: getTaskGroupByName,
  removeTaskGroup: removeTaskGroup
}

