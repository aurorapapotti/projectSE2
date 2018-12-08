const taskFunctions = require('./functionsEntities/taskFunctions.js');

function listAllTasks(req, res){
  if (!req)
    return res.status(400).json("Bad Request");
  return res.status(200).json(taskFunctions.getAllTasks());
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
  //console.log("recived request: ",req.body);
  let idTask = taskFunctions.addTask(req.body);
	console.log(idTask);
  //console.log("wrote completed: ", userFunctions.getAllUsers());
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

function getTaskByArgument(req, res){
  if (!req || !req.query || req.query.taskArgument === undefined || typeof (req.query.taskArgument) !== 'string' )
    return res.status(400).json("Bad Request");
  tasks = new Object();
  let param = "professor";
  assignments = userFunctions.getAssignments(req.params.idUser, param);
  if (assignments.id)
    return res.status(404).json("User NOT found");
  else if (!assignments[req.params.idAssignment])
    return res.status(404).json("Assignment NOT found");
  else
    return res.status(200).json(assignments[req.params.idAssignment]);
}


/*


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
}*/

module.exports = {
  createTask : createTask,
	listAllTasks: listAllTasks,
	getTask : getTask,
	//getTaskbyArgument: getTaskbyArgument,
	//getTaskbyDescription : getTaskbyDescription,
	deleteTask : deleteTask
}
