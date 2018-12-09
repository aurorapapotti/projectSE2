
const assignmentFunc = require('./functionsEntities/assignmentFunctions.js');
const userFunc = require('./functionsEntities/userFunctions.js');
const taskGroupFunc = require('./functionsEntities/taskGroupFunctions.js');

const bodyParser = require("body-parser");

function createAssignment(req, res) {
	if(req && req.params && 
		req.body.title && req.body.professor && req.body.tasks && req.body.users && req.body.start && req.body.deadline){
		var title = req.body.title;
		var professor = req.body.professor;
		var tasks = req.body.taskGroup;
		var users = req.body.userGroup;
		var start = req.body.start;
		var deadline = req.body.deadline;

		if (title == null || professor == null || tasks == null || users == null)
			res.status(400).json("Invalid request");
		if (title == undefined || professor == undefined || tasks == undefined || users == undefined)
			res.status(400).json("Invalid request");

		var ass = new Object();
		ass["title"] = title;
		ass["professor"] = professor;
		ass["tasks"] = tasks;
		ass["users"] = users;
		ass["start"] = start;
		ass["deadline"] = deadline;

		const a = assignmentFunc.createAssignment(ass);
		if(a == null){
			res.status(400).json("Invalid request");
		}
		else{
			console.log("Created: ",assignmentFunc.getAllAssignments());
			res.status(201).json("Created");
		}
	}
	else{
		res.status(400).json("Bad request");
	}
}

function listAllAssignments(req, res){
	if (req)
    	return res.status(400).json("Bad Request");
  	return res.status(200).json(assignmentFunc.getAllAssignments());
}

/*
function createAssignment(req, res) {
  if(!req || !req.body || !req.body.title|| !req.body.professor || !req.body.tasks || !req.body.userGroup || !req.body.start || !req.body.deadline )
    return res.status(401).json("Bad Request");
  if(typeof req.body.title !== "string" || typeof req.body.professor !== "string" || typeof req.body.userGroup !== "string" || typeof req.body.start !== "string" || typeof req.body.deadline !== "string")
    return res.status(401).json("Bad Request");
	Object.keys(req.body.tasks).forEach(function(key){
		if (typeof req.body.tasks[key] !== 'string')
			return res.status(401).json("Bad Request");
	});
	
  let idAssignment = assignmentFunctions.addAssignment(req.body);
	console.log(idAssignment);
  //console.log("wrote completed: ", userFunctions.getAllUsers());
  return res.status(201).json("Created Assignment");
}*/

function getAssignmentById(req, res){
	if(req && req.params && req.params.assignmentId){
		var id = req.params.assignmentId;
		var ass = assignmentFunc.getAssignmentById(id);

		if(ass == undefined || ass == null){
			res.status(400).json("Invalid request");
		}
		res.status(201).json(ass);
	}
	else{
		res.status(400).json("Invalid request");
	}
}

function updateAssignment(req, res){
	if(req && req.params && req.params.assignmentId && 
		req.body.title && req.body.professor && req.body.tasks && req.body.users && req.body.start && req.body.deadline){

		var id = req.params.assignmentId;
		var title = req.body.title;
		var professor = req.body.professor;
		var tasks = req.body.taskGroup;
		var users = req.body.userGroup;
		var start = req.body.start;
		var deadline = req.body.deadline;

		var ass = assignmentFunc.getAssignmentById(id);

		if(id == null || id == undefined){
			return res.status(400).json("Invalid request: id not valid");
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
			return res.status(201).json(ass);
		}
	}
	else{
		return res.status(400).json("Bad request");
	}
}

function deleteAssignment(req, res){
	if(req && req.params && req.params.assignmentId){
		res.status(201).json(assignmentFunc.deleteAssignment(req.params.assignmentId));
	}
	else{
		res.status(400).json("Bad request");
	}
}

function getProfessorByIdAssignment(req, res){
	if(req && req.params && req.params.assignmentId){
		var id = req.params.assignmentId;
		var ass = assignmentFunc.getAssignmentById(id);
		res.status(200).json(ass["professor"]);
	}
	else{
		res.status(400).json("Id null");
	}
}

function getUsersByIdAssignment(req, res){
	if(req && req.params && req.params.assignmentId){
		var id = req.params.assignmentId;
		var ass = assignmentFunc.getAssignmentById(id);
		res.status(200).json(ass["users"]);
	}
	else{
		res.status(400).json("Id null");
	}
}

function updateUsers(req, res){
	if(req && req.params && req.params.assignmentId && req.body.users){
		const idAssignment = req.body.assignmentId;
		const users = req.body.users;

		var ass = assignmentFunc.getAssignmentById(idAssignment);

		if(ass == null){
			res.status(400).json("Bad request");
		}
		else{
			ass["users"] = users;
			assignmentFunc.modifyAssignment(idAssignment, ass);
			res.status(200).json(ass);
		}
	}
	else{
		res.status(400).json("Id null or undefined");
	}
}

function getTasksByIdAssignment(req, res){
	if(req && req.params && req.params.assignmentId){
		var id = req.params.assignmentId;
		var ass = assignmentFunc.getAssignmentById(id);
		res.status(200).json(ass["tasks"]);
	}
	else{
		res.status(400).json("Id null");
	}
}

function updateTasks(req, res){
	if(req && req.params && req.params.assignmentId && req.body.tasks){
		const idAssignment = req.body.assignmentId;
		const tasks = req.body.tasks;

		var ass = assignmentFunc.getAssignmentById(idAssignment);

		if(ass == null){
			res.status(400).json("Bad request");
		}
		else{
			ass["tasks"] = tasks;
			assignmentFunc.modifyAssignment(idAssignment, ass);
			res.status(200).json(ass);
		}
	}
	else{
		res.status(400).json("Id null or undefined");
	}
}

module.exports = {
  createAssignment: createAssignment,
	listAllAssignments: listAllAssignments,
	getAssignmentById: getAssignmentById,
	updateAssignment: updateAssignment,
	deleteAssignment: deleteAssignment,
	getProfessorByIdAssignment: getProfessorByIdAssignment,
	getUsersByIdAssignment: getUsersByIdAssignment,
	updateUsers: updateUsers,
	getTasksByIdAssignment: getTasksByIdAssignment,
	updateTasks: updateTasks
}
