const taskFunctions = require('./functionsEntities/taskFunctions.js');
const userFunctions = require('./functionsEntities/userFunctions.js');

function listAllTasks(req, res){
  if (req && req.query && req.query.taskArgument){
    return getTasksByArgument(req, res);
  }
  else if (req){
    return res.status(200).json(taskFunctions.getAllTasks());
  }
  return res.status(400).json("Bad Request");  
}

function getTask(req, res){
  if(!req || !req.params.idTask || typeof req.params.idTask !== 'string')
    return res.status(400).json("Bad Request");
  task = new Object();
  task = taskFunctions.getTaskById(req.params.idTask);
  if (!task.author || !task.taskType || !task.argument || !task.correctAnswer)
    return res.status(404).json("Task NOT found");
  return res.status(200).json(task);
}

function createTask(req, res) {
  if(!req || !req.body || !req.body.author|| !req.body.taskType || !req.body.argument || !req.body.correctAnswer)
    return res.status(401).json("Bad Request");
  if(typeof req.body.author !== "string" ||typeof req.body.taskType !== "string" || typeof req.body.argument !== "string" || typeof req.body.correctAnswer !== "string" )
    return res.status(401).json("Bad Request");
  let idTask = taskFunctions.addTask(req.body);
	console.log(idTask);
  return res.status(201).json("Created Task");
}

function deleteTask(req, res){
  if (!req || !req.params.idTask || typeof req.params.idTask !== 'string')
    return res.status(400).json("Bad Request");
  task_deleted = new Object();
  task_deleted = taskFunctions.removeTask(req.params.idTask);
  if (!task_deleted.author || !task_deleted.taskType || !task_deleted.argument || !task_deleted.correctAnswer)
    return res.status(404).json("Task NOT found");
  return res.status(200).json("Task deleted");
}

function getTasksByArgument(req, res){
  if (!req || !req.query || !req.query.taskArgument|| typeof (req.query.taskArgument) !== 'string' )
    return res.status(400).json("Bad Request");

  let param = "argument";
  var taskByArg = taskFunctions.getTasks(req.query.taskArgument, param);

  return res.status(200).json(taskByArg);
}

function putTask(req, res){
  if (!req || !req.params.idTask ||typeof req.params.idTask !== 'string')
    return res.status(400).json("Bad Request");
  if(!req || !req.body || !req.body.author || !req.body.taskType || !req.body.argument || !req.body.correctAnswer)
    return res.status(400).json("Bad Request");
  if(typeof req.body.author !== "string" || typeof req.body.taskType !== "string" || typeof req.body.argument !== "string" ||typeof req.body.correctAnswer !== "string")
    return res.status(400).json("Bad Request");
  let idAuthor = userFunctions.getUser(req.body.author);
  if (idAuthor.id)
    return res.status(404).json("User NOT found");
  task_modify = new Object();
  task_modify = taskFunctions.modifyTask(req.params.idTask, req.body);
  if (!task_modify.author || !task_modify.taskType || !task_modify.argument || !task_modify.correctAnswer)
    return res.status(404).json("Task NOT found");
  return res.status(200).json("Task modified");
}

module.exports = {
  createTask : createTask,
	listAllTasks: listAllTasks,
	getTask : getTask,
	getTasksByArgument: getTasksByArgument,
  deleteTask : deleteTask,
  putTask: putTask
}
