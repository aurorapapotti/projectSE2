const taskGroupFunctions = require('./functionsEntities/taskGroupFunctions.js');
const taskFunctions = require('./functionsEntities/taskFunctions.js');
const userFunctions = require('./functionsEntities/userFunctions.js');

function listAllTaskGroups(req, res){
  if (!req)
    return res.status(400).json("Bad Request");
  return res.status(200).json(taskGroupFunctions.getAllTaskGroups());
}

function getTaskGroup(req, res){
  if(!req || !req.params.idTaskGroup || typeof req.params.idTaskGroup !== 'string')
    return res.status(400).json("Bad Request");
  taskGroup = new Object();
  taskGroup = taskGroupFunctions.getTaskGroupById(req.params.idTaskGroup);
  if (!taskGroup.name || !taskGroup.author || !taskGroup.tasks)
    return res.status(404).json("TaskGroup NOT found");
  return res.status(200).json(taskGroup);
}

function createTaskGroup(req, res) {
  if(!req || !req.body || !req.body.name|| !req.body.author || !req.body.tasks)
    return res.status(400).json("Bad Request");
  if(typeof req.body.name !== "string" || typeof req.body.author !== "string")
    return res.status(400).json("Bad Request");
  for (key in req.body.tasks) {
    if (typeof req.body.tasks[key] !== "string")
    	return res.status(400).json("Bad Request");
  }
  let idAuthor = userFunctions.getUser(req.body.author);
  if (idAuthor.id)
    return res.status(404).json("User NOT found");
  for (key in req.body.tasks){
    task = taskFunctions.getTaskById(req.body.tasks[key])
  	if (task.id)
  		return res.status(404).json("Task NOT found");
  }
  //console.log("recived request: ",req.body);
  let idTaskGroup = taskGroupFunctions.addTaskGroup(req.body);
	console.log(idTaskGroup);
  return res.status(201).json("Created TaskGroup");
}

function createTaskGroupByIdUser(req, res) {
  if(!req || !req.params.idUser || !req.body || !req.body.name|| !req.body.tasks)
    return res.status(400).json("Bad Request");
  if(typeof req.params.idUser !== 'string' || typeof req.body.name !== "string")
    return res.status(400).json("Bad Request");
  for (key in req.body.tasks) {
    if (typeof req.body.tasks[key] !== "string")
			return res.status(400).json("Bad Request");
  }
  let idUser = userFunctions.getUser(req.params.idUser);
  if (idUser.id)
    return res.status(404).json("User NOT found");
  for (key in req.body.tasks){
    task = taskFunctions.getTaskById(req.body.tasks[key])
  	if (task.id)
  		return res.status(404).json("Task NOT found");
  }
  req.body.author = idUser;
  taskGroupFunctions.addTaskGroup(req.body);
  return res.status(201).json("Created TaskGroup");
}

function putTaskGroup(req, res){
  if (!req || typeof req.params.idTaskGroup !== 'string')
    return res.status(400).json("Bad Request");
  if(!req.body||!req.body.author||!req.body.name||!req.body.tasks||typeof req.body.name !== "string" || typeof req.body.author !== "string")
    return res.status(400).json("Bad Request");
  for (key in req.body.tasks) {
    if (typeof req.body.tasks[key] !== "string")
      return res.status(400).json("Bad Request");
  }
  let idAuthor = userFunctions.getUser(req.body.author);
  if (idAuthor.id)
    return res.status(404).json("User NOT found");
  for (key in req.body.tasks){
    task = taskFunctions.getTaskById(req.body.tasks[key])
  	if (task.id)
  		return res.status(404).json("Task NOT found");
  }
  taskGroup_modify = new Object();
  taskGroup_modify = taskGroupFunctions.modifyTaskGroup(req.params.idTaskGroup, req.body);
  if (!taskGroup_modify.author || !taskGroup_modify.name || !taskGroup_modify.tasks)
    return res.status(404).json("TaskGroup NOT found");
  return res.status(200).json("Task modified");
}

function putTaskGroupByIdUser(req, res){
  if (!req || !req.params.idUser || typeof req.params.idTaskGroup !== 'string')
    return res.status(400).json("Bad Request");
  if (!req.body || !req.body.name || !req.body.tasks)
    return res.status(400).json("Bad Request");
  if(typeof req.params.idUser !== "string" || typeof req.body.name !== "string")
    return res.status(400).json("Bad Request");
  for (key in req.body.tasks) {
    if (typeof req.body.tasks[key] !== "string")
      return res.status(400).json("Bad Request");
  }
  let idUser = userFunctions.getUser(req.params.idUser);
  if (idUser.id)
    return res.status(404).json("User NOT found");
  for (key in req.body.tasks){
    task = taskFunctions.getTaskById(req.body.tasks[key])
  	if (task.id)
  		return res.status(404).json("Task NOT found");
  }
  taskGroups = new Object();
  taskGroups = userFunctions.getTaskGroups(req.params.idUser, "author");
  if (!taskGroups[req.params.idTaskGroup])
    return res.status(404).json("TaskGroup NOT found");
  req.body.author = req.params.idUser;
  taskGroupFunctions.modifyTaskGroup(req.params.idTaskGroup, req.body);
  return res.status(200).json("TaskGroup modified");
}

function deleteTaskGroup(req, res){
  if (!req || !req.params.idTaskGroup || typeof req.params.idTaskGroup !== 'string')
    return res.status(400).json("Bad Request");
  taskGroup_deleted = new Object();
  taskGroup_deleted = taskGroupFunctions.removeTaskGroup(req.params.idTaskGroup);
  if (!taskGroup_deleted.name || !taskGroup_deleted.author|| !taskGroup_deleted.tasks)
    return res.status(404).json("TaskGroup NOT found");
  return res.status(200).json("TaskGroup deleted");
}

function deleteTaskGroupByIdUser(req, res){
  if (!req || !req.params.idUser || !req.params.idTaskGroup || typeof req.params.idTaskGroup !== 'string')
    return res.status(400).json("Bad Request");
  let idUser = userFunctions.getUser(req.params.idUser);
  if (idUser.id)
    return res.status(404).json("User NOT found");
  taskGroup_deleted = new Object();
  taskGroup_deleted = userFunctions.getTaskGroups(req.params.idUser, "author");
  if (!taskGroup_deleted[req.params.idTaskGroup])
    return res.status(404).json("TaskGroup NOT found");
  taskGroupFunctions.removeTaskGroup(req.params.idTaskGroup);
  return res.status(200).json("TaskGroup deleted");
}

function getTaskGroupByName(req, res){
  if (!req || !req.query || req.query.taskGroupName === undefined || typeof (req.query.taskGroupName) !== 'string' )
    return res.status(400).json("Bad Request");
  taskGroup = new Object();
  let param = "name";
  taskGroup = taskGroupFunctions.getTaskGroup(req.query.taskGroupName, param);
  return res.status(200).json(taskGroup);
}

module.exports = {
	listAllTaskGroups: listAllTaskGroups,
  createTaskGroup : createTaskGroup,
  createTaskGroupByIdUser: createTaskGroupByIdUser,
	getTaskGroup: getTaskGroup,
  putTaskGroup: putTaskGroup,
  putTaskGroupByIdUser: putTaskGroupByIdUser,
	getTaskGroupByName: getTaskGroupByName,
	deleteTaskGroup : deleteTaskGroup,
  deleteTaskGroupByIdUser: deleteTaskGroupByIdUser
}
