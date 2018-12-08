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


/*function getTaskById(Id){
  console.log("Id passato:", Id);
  return persistencyLayer.getObject(Id, dbTaskPath);
}*/

function getTaskByArgument(taskArgument){
  console.log("Argument passato:", taskArgument);
  return persistencyLayer.getObject(taskArgument, dbTaskPath);
}

function getTaskByDescription(taskDescription){
  console.log("Description passata:", taskDescription);
  return persistencyLayer.getObject(taskDescription, dbTaskPath);
}



module.exports = {
  //createTask: createTask,
  getAllTasks: getAllTasks,
  getTaskById: getTaskById,
  addTask: addTask,
  //getTaskById: getTaskById,
  getTaskByArgument: getTaskByArgument,
  getTaskByDescription: getTaskByDescription,
  removeTask: removeTask
}
