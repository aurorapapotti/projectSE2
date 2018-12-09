const taskFunctions = require('./functionsEntities/taskFunctions.js');
const userFunctions = require('./functionsEntities/userFunctions.js');

function listAllTasks(req, res){
  if (!req)
    return res.status(400).json("Bad Request");
  return res.status(200).json(taskFunctions.getAllTasks());
}

function getTask(req, res){
  if(!req || typeof req.params.idTask !== 'string')
    return res.status(400).json("Bad Request");
  task = new Object();
  task = taskFunctions.getTaskById(req.params.idTask);
  if (!task.author || !task.taskType || !task.argument || !task.correctAnswer)
    return res.status(404).json("Task NOT found");
  return res.status(200).json(task);
}

function createTask(req, res) {
  if(!req || !req.body || !req.body.author || !req.body.taskType || !req.body.argument || !req.body.correctAnswer)
    return res.status(401).json("Bad Request");
  if(typeof req.body.author !== "string" || typeof req.body.taskType !== "string" || typeof req.body.argument !== "string" || typeof req.body.correctAnswer !== "string" )
    return res.status(401).json("Bad Request");
  //console.log("recived request: ",req.body);
  let idTask = taskFunctions.addTask(req.body);
	console.log(idTask);
  //console.log("wrote completed: ", userFunctions.getAllUsers());
  return res.status(201).json("Created Task");
}

function createTaskByIdUser(req, res) {
  if(!req || !req.params.idUser || !req.body || !req.body.taskType || !req.body.argument || !req.body.correctAnswer)
    return res.status(401).json("Bad Request");
  if(typeof req.params.idUser !== "string" ||typeof req.body.taskType !== "string" || typeof req.body.argument !== "string" || typeof req.body.correctAnswer !== "string" )
    return res.status(401).json("Bad Request");
  //console.log("recived request: ",req.body);
  req.body.author = req.params.idUser;
  let idTask = taskFunctions.addTask(req.body);
	console.log(idTask);
  //console.log("wrote completed: ", userFunctions.getAllUsers());
  return res.status(201).json("Created Task");
}

function putTask(req, res){
  if (!req || typeof req.params.idTask !== 'string')
    return res.status(400).json("Bad Request");
  if(!req || !req.body || !req.body.author || !req.body.taskType || !req.body.argument || !req.body.correctAnswer)
    return res.status(401).json("Bad Request");
  if(typeof req.body.author !== "string" || typeof req.body.taskType !== "string" || typeof req.body.argument !== "string" ||typeof req.body.correctAnswer !== "string")
    return res.status(400).json("Bad Request");
  task_modify = new Object();
  task_modify = taskFunctions.modifyTask(req.params.idTask, req.body);
  if (!task_modify.author || !task_modify.taskType || !task_modify.argument || !task_modify.correctAnswer)
    return res.status(404).json("Task NOT found");
  return res.status(200).json("Task modified");
}

function putTaskByIdUser(req, res){
  if (!req || !req.params.idUser || typeof req.params.idTask !== 'string')
    return res.status(400).json("Bad Request");
  if (!req.body || !req.body.taskType || !req.body.argument|| !req.body.correctAnswer)
    return res.status(400).json("Bad Request");
  if(typeof req.params.idUser !== "string" || typeof req.body.taskType !== "string" ||typeof req.body.argument !== "string" ||typeof req.body.correctAnswer !== "string")
    return res.status(400).json("Bad Request");
  task_modify = new Object();
  task_modify = userFunctions.getTasks(req.params.idUser, "author");
  if (!task_modify[req.params.idTask].author || !task_modify[req.params.idTask].taskType || !task_modify[req.params.idTask].argument || !task_modify[req.params.idTask].correctAnswer)
    return res.status(404).json("Task NOT found");
  req.body.author = req.params.idUser;
  taskFunctions.modifyTask(req.params.idTask, req.body);
  return res.status(200).json("Task modified");
}

function deleteTask(req, res){
  if (!req || typeof req.params.idTask !== 'string')
    return res.status(400).json("Bad Request");
  task_deleted = new Object();
  task_deleted = taskFunctions.removeTask(req.params.idTask);
  if (!task_deleted.author || !task_deleted.taskType || !task_deleted.argument || !task_deleted.correctAnswer)
    return res.status(404).json("Task NOT found");
  return res.status(200).json("Task deleted");
}

function deleteTaskByIdUser(req, res){
  if (!req || !req.params.idUser || typeof req.params.idTask !== 'string')
    return res.status(400).json("Bad Request");
  task_deleted = new Object();
  task_deleted = userFunctions.getTasks(req.params.idUser, "author");
  if (!task_deleted[req.params.idTask].author || !task_deleted[req.params.idTask].taskType || !task_deleted[req.params.idTask].argument || !task_deleted[req.params.idTask].correctAnswer)
    return res.status(404).json("Task NOT found");
  taskFunctions.removeTask(req.params.idTask);
  return res.status(200).json("Task deleted");
}

function getTasksByArgument(req, res){
  if (!req || !req.query || req.query.taskArgument === undefined || typeof (req.query.taskArgument) !== 'string' )
    return res.status(400).json("Bad Request");
  tasks = new Object();
  let param = "argument";
  tasks = taskFunctions.getTasks(req.query.taskArgument, param);
  return res.status(200).json(tasks);
}

module.exports = {
  createTask : createTask,
  createTaskByIdUser: createTaskByIdUser,
	listAllTasks: listAllTasks,
	getTask : getTask,
  putTask: putTask,
  putTaskByIdUser: putTaskByIdUser,
	getTasksByArgument: getTasksByArgument,
	deleteTask : deleteTask,
  deleteTaskByIdUser: deleteTaskByIdUser
}
