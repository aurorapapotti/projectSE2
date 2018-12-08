
const assignmentFunc = require('./functionEntities/assignmentFunctions.js');
const userFunc = require('./functionEntities/userFunctions.js');
const userGroupFunc = require('./functionEntities/userGroupFunctions.js');
const taskGroupFunc = require('./functionEntities/taskGroupFunctions.js');

const bodyParser = require("body-parser");
const fetch = require("node-fetch");

function createAssignment(req, res) {
	console.log("recived request: ",req.body);
	
	var title = req.body.title;
	var professor = req.body.professor;
	var tasks = req.body.taskGroup;
	var users = req.body.userGroup;
	var start = req.body.start;
	var deadline = req.body.deadline;
	
	if (title == null || professor == null || tasks == null || users == null)
		res.status(400).send("Invalid request");
	
	var ass = new Object();
	ass["title"] = title;
	ass["professor"] = professor;
	ass["tasks"] = tasks;
	ass["users"] = users;
	ass["start"] = start;
	ass["deadline"] = deadline;
		
	const a = assignmentFunc.writeAssignment(ass);
	if(a == null){
		res.status(400).send("Invalid request");
	}
	else{
		console.log("Created: ",assignmentFunc.getAllAssignments());
		res.status(201).send("Created");
	}
}

function getAllAssignments(req, res){
	const ass = assignmentFunc.getAllAssignments();
	if(ass == null){
		res.status(400).send("Invalid request");
	}
	else{
		console.log("Get all: ", ass);
		res.status(201).send(ass);
	}
}

function getAssignmentById(req, res){
	var id = req.params.assignmentId;
	var ass = assignmentFunc.getAssignmentById(id);

	if(ass == undefined || ass == null){
		res.status(400).send("Invalid request");
	}
	else{
		res.status(201).send(ass);
	}
}

function updateAssignment(req, res){
	var id = req.params.assignmentId;

	var title = req.body.title;
	var professor = req.body.professor;
	var tasks = req.body.taskGroup;
	var users = req.body.userGroup;
	var start = req.body.start;
	var deadline = req.body.deadline;

	if(title == null && professor == null && tasks == null && users == null && start == null && deadline == null){
		req.status(400).send("Invalid request");
	}
	else{
		var ass = assignmentFunc.getAssignmentById(id);

		if(id == null || id == undefined){
			req.status(400).send("Invalid request: id not valid");
		}
		else{
			if(typeof title === string){
				ass["title"] = title;
			}
			var prof = userFunc.getUserById(professor);
			if(prof != null && prof != undefined){
				ass["professor"] = professor;
			}
			var t = taskGroupFunc.getTaskGroupById(tasks);
			if(t != null && t != undefined){
				ass["tasks"] = tasks;
			}
			var u = userGroupFunc.getUserGroupById(users);
			if(u != null && u != undefined){
				ass["users"] = users;
			}
			if(typeof start instanceof Date){
				ass["start"] = start;
			}
			if(typeof deadline instanceof Integer){
				ass["deadline"] = deadline;
			}

			assignmentFunc.modifyAssignment(id, ass);
			console.log("Updated.");
			res.status(201).send(ass);
		}
	}
}

function deleteAssignment(req, res){
	var id = req.params.assignmentId;
	if( id == undefined || id == null){
		res.status(400).send("Invalid request");
	}
	else{
		res.status(201).send(assignmentFunc.deleteAssignment(id));
	}
}

function getProfessorByIdAssignment(req, res){
	var id = req.params.assignmentId;

	if(id != null && id != undefined){
		var ass = assignmentFunc.getAssignmentById(id);
		res.status(200).send(ass["professor"]);
	}
	else{
		res.status(400).send("Id null");
	}
}

function getUsersByIdAssignment(req, res){
	var id = req.params.assignmentId;

	if(id != null && id != undefined){
		var ass = assignmentFunc.getAssignmentById(id);
		res.status(200).send(ass["users"]);
	}
	else{
		res.status(400).send("Id null");
	}
}

function updateUsers(req, res){
	const idAssignment = req.body.assignmentId;
	const users = req.body.users;
	
	if(idAssignment == null || idAssignment == undefined){
		res.status(400).send("Id null or undefined");
	}
	else{
		var ass = assignmentFunc.getAssignmentById(idAssignment);

		if(ass == null){
			res.status(400).send("Invalid request");
		}
		else{
			ass["users"] = users;
			assignmentFunc.modifyAssignment(idAssignment, ass);
			res.status(200).send(ass);
		}
	}
}

function getTasksByIdAssignment(req, res){
	var id = req.params.assignmentId;

	if(id != null && id != undefined){
		var ass = assignmentFunc.getAssignmentById(id);
		res.status(200).send(ass["tasks"]);
	}
	else{
		res.status(400).send("Id null");
	}
}

function updateTasks(req, res){
	const idAssignment = req.body.assignmentId;
	const tasks = req.body.tasks;
	
	if(idAssignment == null || idAssignment == undefined){
		res.status(400).send("Id null or undefined");
	}
	else{
		var ass = assignmentFunc.getAssignmentById(idAssignment);

		if(ass == null){
			res.status(400).send("Invalid request");
		}
		else{
			ass["tasks"] = tasks;
			assignmentFunc.modifyAssignment(idAssignment, ass);
			res.status(200).send(ass);
		}
	}
}


module.exports = {
    createAssignment: createAssignment,
	getAssignment: getAssignment,
	getAllAssignments: getAllAssignments,
	getAssignmentById: getAssignmentById,
	updateAssignment: updateAssignment,
	deleteAssignment: deleteAssignment,
	getProfessorByIdAssignment: getProfessorByIdAssignment,
	getUsersByIdAssignment: getUsersByIdAssignment,
	updateUsers: updateUsers,
	getTasksByIdAssignment: getTasksByIdAssignment,
	updateTasks: updateTasks
}