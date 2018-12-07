
const assignmentFunc = require('./functionEntities.assignmentFuncitons.js');
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
		
	const a = persistencyLayer.writeAssignment(ass);
	if(a == null){
		res.status(400).send("Invalid request");
	}
	else{
		console.log("Created: ",persistencyLayer.getAllAssignments());
		res.status(201).send("Created");
	}
}
/*
function getAssignment(req, res) {
	console.log("recived request: ",req.body);
	const ass = persistencyLayer.getAssignment(req.params.assignmentId);
	
	if(ass = null){
		res.status(400).send("Invalid request");
	}
	else{
		res.status(201).send(ass);
	}
}*/

function getAllAssignments(req, res){
	const ass = persistencyLayer.getAllAssignments();
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
	var ass = persistencyLayer.getAssignmentById(id);

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
		var ass = persistencyLayer.getAssignmentById(id);

		if(id == null || id == undefined){
			req.status(400).send("Invalid request: id not valid");
		}
		else{
			if(typeof title === string){
				ass["title"] = title;
			}
			var prof = persistencyLayer.getUserById(professor);
			if(prof != null && prof != undefined){
				ass["professor"] = professor;
			}
			var t = persistencyLayer.getTaskGroupById(tasks);
			if(t != null && t != undefined){
				ass["tasks"] = tasks;
			}
			var u = persistencyLayer.getUserGroupById(users);
			if(u != null && u != undefined){
				ass["users"] = users;
			}
			if(typeof start instanceof Date){
				ass["start"] = start;
			}
			if(typeof deadline instanceof Integer){
				ass["deadline"] = deadline;
			}

			persistencyLayer.modifyAssignment(id, ass);
			console.log("Updated.");
			res.status(201).send(ass);
		}
	}
}

function deleteAssignment(req, res){
	if(req.params.assignmentId == undefined || req.params.assignmentId == null){
		res.status(400).send("Invalid request");
	}
	else{
		res.status(201).send(persistencyLayer.deleteAssignment(req.params.assignmentId));
	}
}

function getProfessorByIdAssignment(req, idAssignment){
	return persistencyLayer.getObjectByParam(idAssignment, req.param.idProfessor, dbAssignmentPath, dbUserPath);
}

function getUsers(req, res){
	return persistencyLayer.getObjectByParam(req.params.assignmentId, req.params.userId, dbAssignmentPath, dbUserPath);
}

function updateUsers(req, res){
	const idAssignment = req.body.assignmentId;
	const users = req.body.users;
	
	if(idAssignment == null || users == null){
		res.status(400).send("Params null");
	}
	else{
		var ass = getObject(idAssignment, dbAssignmentPath);
		ass["users"] = users;
		res.status(200).send("Updated.");
	}
}

function getTasks(req, res){
	return persistencyLayer.getObjectByParam(req.params.assignmentId, req.params.taskId, dbAssignmentPath, dbTaskPath);
}

function updateTasks(req, res){
	const idAssignment = req.body.assignmentId;
	const tasks = req.body.tasks;
	
	if(idAssignment == null || tasks == null){
		res.status(400).send("Params null");
	}
	else{
		var ass = getObject(idAssignment, dbAssignmentPath);
		ass["tasks"] = tasks;
		res.status(200).send("Updated.");
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
	getUsers: getUsers,
	updateUsers: updateUsers,
	getTasks: getTasks,
	updateTasks: updateTasks
}