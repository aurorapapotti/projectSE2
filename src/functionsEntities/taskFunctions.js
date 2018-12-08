const persistencyLayer = require('../persistencyLayer.js')
const dbTaskPath = __dirname+"/../../entities/tasks.js";

function addTask(task){
  return persistencyLayer.addObject(task,dbTaskPath);
}

function getAllTasks(){
  return persistencyLayer.getObjectsList(dbTaskPath);
}

function getTaskById(idTask){
  //console.log("Id passato:", Id);
  return persistencyLayer.getObject(idTask, dbTaskPath);
}

function removeTask(idTask){
  return persistencyLayer.deleteObject(idTask, dbTaskPath);
}

function getTasks(taskArgument, param){
  return persistencyLayer.getObjectByQuery(taskArgument, param, dbTaskPath);
}

function getTaskByDescription(taskDescription){
  console.log("Description passata:", taskDescription);
  return persistencyLayer.getObject(taskDescription, dbTaskPath);
}



module.exports = {
  getAllTasks: getAllTasks,
  getTaskById: getTaskById,
  addTask: addTask,
  getTasks: getTasks,
  getTaskByDescription: getTaskByDescription,
  removeTask: removeTask
}
