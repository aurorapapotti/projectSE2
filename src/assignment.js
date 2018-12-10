
const assignmentFunc = require('./functionsEntities/assignmentFunctions.js');
const userFunc = require('./functionsEntities/userFunctions.js');
const taskGroupFunc = require('./functionsEntities/taskGroupFunctions.js');
const userGroupFunc = require('./functionsEntities/userGroupFunctions.js');

const bodyParser = require("body-parser");

function createAssignment(req, res) {
	if(req && req.body && 
		req.body.title && req.body.professor && req.body.taskGroup && req.body.userGroup && req.body.start && req.body.deadline){
		var title = req.body.title;
		var professor = req.body.professor;
		var tasks = req.body.taskGroup;
		var users = req.body.userGroup;
		var start = req.body.start;
		var deadline = req.body.deadline;
		
		var user = userFunc.getUser(professor);
		var userGroup = userGroupFunc.getUserGroupById(users);
		var taskGroup = taskGroupFunc.getTaskGroupById(tasks);

		if(user["id"]){
			return res.status(404).json("User not found");
		}
		else if(userGroup["id"]){
			return res.status(404).json("UserGroup not found");
		}
		else if(taskGroup["id"]){
			return res.status(404).json("TaskGroup not found");
		}
		else{
			var ass = new Object();
			if(typeof title === 'string'){
				ass["title"] = title;
			}
			else{
				return res.status(400).json("Bad request");
			}

			ass["professor"] = professor;
			ass["tasks"] = tasks;
			ass["users"] = users;

			if(typeof start === 'string'){
				ass["start"] = start;
			}
			else{
				return res.status(400).json("Bad request");
			}

			if(typeof deadline === 'string'){
				ass["deadline"] = deadline;
			}
			else{
				return res.status(400).json("Bad request");
			}

			assignmentFunc.addAssignment(ass);
			
			console.log("Created: ",assignmentFunc.getAllAssignments());
			return res.status(201).json("Created");
		}
	}
	else{
		return res.status(400).json("Bad request");
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
	if(req && req.params && req.params.assignmentId){
		var id = req.params.assignmentId;
		var ass = assignmentFunc.getAssignmentById(id);

		if(ass["id"]){
			return res.status(404).json("Assignment not found");
		}
		return res.status(200).json(ass);
	}
	else{
		return res.status(400).json("Bad request");
	}
}

function updateAssignment(req, res){
	if(req && req.params && req.params.assignmentId && 
		(req.body.title || req.body.professor || req.body.taskGroup || req.body.userGroup || req.body.start|| req.body.deadline)){

		var id = req.params.assignmentId;
		
		if(req.body.title != undefined)
			var title = req.body.title;
		if(req.body.professor != undefined)
			var professor = req.body.professor;
		if(req.body.taskGroup != undefined)
			var tasks = req.body.taskGroup;
		if(req.body.users != undefined)
			var users = req.body.userGroup;
		if(req.body.start != undefined)
			var start = req.body.start;
		if(req.body.deadline != undefined)
			var deadline = req.body.deadline;
		
		var ass = assignmentFunc.getAssignmentById(id); 
		var prof = userFunc.getUser(professor);
		var t = taskGroupFunc.getTaskGroupById(tasks);
		var u = userGroupFunc.getUserGroupById(users);

		if (ass["id"]){		//Questo è un 404 perchè non trova l'assignment, sarebbe 400 se id dell'assignment fosse undefined
			console.log("\n\n\n\n\n\nAss[id]\n\n\n\n\n\n");
			return res.status(404).json("Assignment not found");
		}
		else{
			if(typeof title === 'string'){
				ass["title"] = title;
			}
			else{
				console.log("\n\n\n\n\n\nTitle\n\n\n\n\n\n");
				return res.status(400).json("Bad request");
			}

			if(prof["id"]){
				return res.status(404).json("Professor not found");
			}
			else{
				ass["professor"] = professor;
			}

			if(t["id"]){
				return res.status(404).json("TaskGroup not found");
			}
			else{
				ass["tasks"] = tasks;
			}

			if(u["id"]){
				return res.status(404).json("TaskGroup not found");
			}
			else{
				ass["users"] = users;
			}

			if(typeof start === 'string'){
				console.log("\n\n\n\n\n\nstart\n\n\n\n\n\n");
				return res.status(400).json("Bad request");
			}
			else{
				ass["start"] = start;
			}

			if(typeof deadline === 'string'){
				console.log("\n\n\n\n\n\ndeadline\n\n\n\n\n\n");
				return res.status(400).json("Bad request");
			}
			else{
				ass["deadline"] = deadline;
			}

			assignmentFunc.modifyAssignment(id, ass);
			console.log("Updated.");
			return res.status(200).json(ass);
		}
	}
	else{
		console.log("\n\n\n\n\n\nelse\n\n\n\n\n\n");
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
