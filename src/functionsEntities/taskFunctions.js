const persistencyLayer = require('../persistencyLayer.js')
const dbTaskPath = __dirname+"/../../entities/tasks.js";

function createTask(task){
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

function getTaskByArgument(taskArgument){
  console.log("Argomento passato:", taskArgument);
  return persistencyLayer.getObject(taskArgument, dbTaskPath);
}



module.exports = {
  getAllTasks: getAllTasks,
  getTaskById: getTaskById,
  createTask: createTask,
  getTasks: getTasks,
  getTaskByArgument: getTaskByArgument,
  removeTask: removeTask
}
