
const assignmentFunc = require('./functionsEntities/assignmentFunctions.js');
const userFunc = require('./functionsEntities/userFunctions.js');
const taskGroupFunc = require('./functionsEntities/taskGroupFunctions.js');

const bodyParser = require("body-parser");

function createAssignment(req, res) {
	var title = req.body.title;
	var professor = req.body.professor;
	var tasks = req.body.taskGroup;
	var users = req.body.userGroup;
	var start = req.body.start;
	var deadline = req.body.deadline;

	if (title == null || professor == null || tasks == null || users == null)
		res.status(400).send("Invalid request");
	if (title == undefined || professor == undefined || tasks == undefined || users == undefined)
		res.status(400).send("Invalid request");

	var ass = new Object();
	ass["title"] = title;
	ass["professor"] = professor;
	ass["tasks"] = tasks;
	ass["users"] = users;
	ass["start"] = start;
	ass["deadline"] = deadline;

	const a = assignmentFunc.createAssignment(ass);
	if(a == null){
		res.status(400).send("Invalid request");
	}
	else{
		console.log("Created: ",assignmentFunc.getAllAssignments());
		res.status(201).send("Created");
	}
}

function listAllAssignments(req, res){
  if (!req)
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
	var id = req.params.assignmentId;
	var ass = assignmentFunc.getAssignmentById(id);

	if(ass == undefined || ass == null){
		res.status(400).json("Invalid request");
	}
	else{
		res.status(201).json(ass);
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
