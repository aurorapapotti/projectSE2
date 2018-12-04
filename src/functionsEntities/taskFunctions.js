const persistencyLayer = require('../persistencyLayer.js')
const dbTaskPath = "./entities/task.js";

function createTask(task){
  return persistencyLayer.addObject(task,dbTaskPath);
}

function getAllTask(){
  return persistencyLayer.getObjectsList(dbTaskPath);
}

function getTask(idTask){
  console.log("Id passato:", Id);
  return persistencyLayer.getObject(Id, dbTaskPath);
}

function getTaskById(Id){
  console.log("Id passato:", Id);
  return persistencyLayer.getObject(Id, dbTaskPath);
}

function removeTask(idTask){
  return persistencyLayer.deleteObject(Id, dbTaskPath);
}

module.exports = {
  createTask: createTask,
  getAllTask: getAllTask,
  getTask: getTask,
  getTaskById: getTaskById,
  removeTask: removeTask
}

