const taskFunc = require('./functionsEntities/taskFunction.js');

function createTask(req, res){
	const author = req.body.author;
	const type = req.body.taskType;
	const id = req.body.taskId;
	const argument = req.body.taskArgument;
	const description = req.body.taskDescription;
	let task = new Object ();
	task ["author"] = author;
	task["taskType"] = type;
	task["taskId"] = id;
	task["argument"] = taskArgument;
	task["description"] = taskDescription;
	
	taskFunc.createTask(task);
	
	res.status(201).send("Created");
}

function getAllTasks(req, res){
	res.status(200).send(taskFunc.getAllTasks());
}

function getTaskbyId(req, res){
	const task = taskFunc.getTaskbyId(req.params.taskId);
	if (task == null){
		res.status(400).send("Invalid request");
	}
	else{
		res.status(200).send(task);
	}
}

function getTaskbyArgument(req,res){
	const taskArgument = req.params.taskArgument;
	const allTasks = taskFunc.getAllTasks();
	
	let searched = {};
	
	allTasks.forEach (element =>){
		if (allTasks[element]["taskArgument"] == taskArgument){
			searched[element] = allTasks[element];
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
	const allTasks = taskFunc.getAllTasks();
	
	let searched = {};
	
	allTasks.forEach (element =>){
		if (allTasks[element]["taskDescription"] == taskDescription){
			searched[element] = allTasks[element];
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
		res.status
	}
}

const Task = (req, res) => {
    let task = {
        argument: req.body.argument,
        description: req.body.description,
        type: req.body.type,
        author: req.body.author
    };

    if (!task.type || typeof task.type != 'string' || (task.type != 'Normal' && task.type != "Multiple_choice")) {
        res.status(400).json({ error: 'The field "type" must be a non-empty string. Possible types: "Normal", 
"Multiple_choice' });
        return;
    }

    if (!task.argument || typeof task.argument != 'string') {
        res.status(400).json({ error: 'The field "argument" must be a string' });
        return;
    }

    if (!task.description || typeof task.description != 'string') {
        res.status(400).json({ error: 'The field "description" must be a non-empty string' });
        return;
    }
	
	if (!task.author || typeof task.author != 'string') {
        res.status(400).json({ error: 'The field "author" must be a  non-empty string' });
        return;
    }
};

module.exports = {
    Task
};

