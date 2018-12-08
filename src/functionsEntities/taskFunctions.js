const persistencyLayer = require('../persistencyLayer.js')
const dbTaskPath = __dirname+"/../../entities/task.js";

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

function getTaskByArgument(taskArgument){
  console.log("Argument passato:", taskArgument);
  return persistencyLayer.getObject(taskArgument, dbTaskPath);
}

function getTaskByDescription(taskDescription){
  console.log("Description passata:", taskDescription);
  return persistencyLayer.getObject(taskDescription, dbTaskPath);
}

function removeTask(idTask){
  return persistencyLayer.deleteObject(idTask, dbTaskPath);
}

module.exports = {
  createTask: createTask,
  getAllTasks: getAllTask,
  getTask: getTask,
  getTaskById: getTaskById,
  getTaskByArgument: getTaskByArgument,
  getTaskByDescription: getTaskByDescription,
  removeTask: removeTask
}

