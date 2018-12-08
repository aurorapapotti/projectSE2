const taskFunc = require('./functionsEntities/taskFunction.js');

function listAllTasks(req, res){
  if (!req)
    return res.status(400).json("Bad Request");
  return res.status(200).json(userFunctions.getAllTasks());
}

function createTask(req, res){
	const author = req.body.author;
	const type = req.body.taskType;
	const id = req.body.taskId;
	const argument = req.body.taskArgument;
	const description = req.body.taskDescription;
	let task = new Object ();

	task["argument"] = argument;
	task["description"] = description;
	task["taskType"] = type;
	task ["author"] = author;

	taskFunc.createTask(task);

	res.status(201).send("Created");
}

function getAllTasks(req, res){
	res.status(200).send(taskFunc.getAllTasks());
}

function getTaskbyId(req, res){
	const task = taskFunc.getTaskById(req.params.taskId);
	if (task == null){
		res.status(400).send("Invalid request");
	}
	else{
		res.status(200).send(task);
	}
}

function getTaskbyArgument(req,res){
	const taskArgument = req.query.taskArgument;
	const AllTasks = taskFunc.getAllTasks();

	let searched = new Object();

	console.log("\nArgomento cercato: ", taskArgument);

	for (element in AllTasks) {
		console.log("\nArgomento trovato: ", AllTasks[element]["taskArgument"]);

		if (AllTasks[element]["taskArgument"] == taskArgument){
			searched[element] = AllTasks[element];
		}
	}

	if (taskArgument == null){
		res.status(400).send("Invalid request");
	}
	else{
		res.status(200).send(taskArgument);
	}
}

function getTaskbyDescription(req,res){
	const taskDescription = req.params.taskDescription;
	const AllTasks = taskFunc.getAllTasks();

	let searched = {};

	for (element in AllTasks) {
		if (AllTasks[element]["taskDescription"] == taskDescription){
			searched[element] = AllTasks[element];
		}
	}

	if (taskDescription == null){
		res.status(400).send("Invalid request");
	}
	else{
		res.status(200).send(taskDescription);
	}
}


function deleteTask (req, res){
	if (req.params.taskId == undefined || req.params.taskId == null){
		res.status(400).send("Invalid Request");
	}
	else
		res.status(200).send(taskFunc.removeTask(req.params.taskId));
}

module.exports = {
    createTask : createTask,
	getAllTasks: getAllTasks,
	getTaskbyId : getTaskbyId,
	getTaskbyArgument: getTaskbyArgument,
	getTaskbyDescription : getTaskbyDescription,
	deleteTask : deleteTask
}
