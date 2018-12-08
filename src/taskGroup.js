const taskGroupFunc = require('./functionsEntities/taskGroupFunction.js');

function createTaskGroup(req, res){
	const name = req.body.taskGroupName;
	const author = req.body.taskGroupAuthor;
	const tasks = req.body.taskGroupTasks;
	const items = req.body.taskGroupItems;
	let taskGroup = new Object ();
	
	taskGroup["name"] = name;
	taskGroup["author"] = author;
	taskGroup["tasks"] = tasks;
	taskGroup["items"] = items;
	
	taskGroupFunc.createTaskGroup(taskGroup);
	
	res.status(201).send("Created");
}

function getAllTaskGroups(req, res){
	res.status(200).send(taskGroupFunc.getAllTaskGroups());
}

function getTaskGroupById(req, res){
	const taskGroup = taskGroupFunc.getTaskGroupById(req.params.taskGroupId);
	if (taskGroup == null){
		res.status(400).send("Invalid request");
	}
	else{
		res.status(200).send(taskGroup);
	}
}

function getTaskGroupByName(req,res){
	const taskGroupName = req.params.taskGroupName;
	const getAllTaskGroups = taskGroupFunc.getAllTaskGroups();
	
	let searched = {};
	
	for (element in getAllTaskGroups) {
		if (getAllTaskGroups[element]["taskGroupName"] == taskGroupName){
			searched[element] = getAllTaskGroups[element];
		}
	}
	
	if (taskGroupName == null){
		res.status(400).send("Invalid request");
	}
	else{
		res.status(200).send(taskGroupName);
	}
}


function deleteTaskGroup (req, res){
	if (req.params.taskGroupId === undefined || req.params.taskGroupId === null){
		res.status(400).send("Invalid Request");
	}
	else 
		res.status(200).send(taskGroupFunc.removeTaskGroup(req.params.taskGroupId));
}

module.exports = {
    createTaskGroup : createTaskGroup,
	getAllTaskGroups: getAllTaskGroups,
	getTaskGroupById : getTaskGroupById,
	getTaskGroupByName: getTaskGroupByName,
	deleteTaskGroup : deleteTaskGroup
}

