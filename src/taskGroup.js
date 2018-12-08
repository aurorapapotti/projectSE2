const taskGroupFunctions = require('./functionsEntities/taskGroupFunctions.js');

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
    return res.status(401).json("Bad Request");
  if(typeof req.body.name !== "string" || typeof req.body.author !== "string")
    return res.status(401).json("Bad Request");
	Object.keys(req.body.tasks).forEach(function(key){
		if (typeof req.body.tasks[key] !== 'string')
			return res.status(401).json("Bad Request");
	});
  //console.log("recived request: ",req.body);
  let idTaskGroup = taskGroupFunctions.addTaskGroup(req.body);
	console.log(idTaskGroup);
  //console.log("wrote completed: ", userFunctions.getAllUsers());
  return res.status(201).json("Created TaskGroup");
}

function getTaskGroupByName(req, res){
  if (!req || !req.query || req.query.taskGroupName === undefined || typeof (req.query.taskGroupName) !== 'string' )
    return res.status(400).json("Bad Request");
  taskGroup = new Object();
  let param = "name";
  taskGroup = taskGroupFunctions.getTaskGroup(req.query.taskGroupName, param);
  return res.status(200).json(taskGroup);
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

module.exports = {
	listAllTaskGroups: listAllTaskGroups,
  createTaskGroup : createTaskGroup,
	getTaskGroup: getTaskGroup,
	getTaskGroupByName: getTaskGroupByName,
	deleteTaskGroup : deleteTaskGroup
}
