
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
	if(req && req.params && req.body && req.params.assignmentId && 
		(req.body.title || req.body.professor || req.body.taskGroup || req.body.userGroup || req.body.start|| req.body.deadline)){
		var id = req.params.assignmentId;
		
		var title = req.body.title;
		var professor = userFunc.getUser(req.body.professor);
		var tasks = taskGroupFunc.getTaskGroupById(req.body.taskGroup);
		var users = userGroupFunc.getUserGroupById(req.body.userGroup);
		var start = req.body.start;
		var deadline = req.body.deadline;
		
		var ass = assignmentFunc.getAssignmentById(id);

		if (ass["id"]){		//Questo è un 404 perchè non trova l'assignment, sarebbe 400 se id dell'assignment fosse undefined
			return res.status(404).json("Assignment not found");
		}
		else{
			if(typeof title === 'string'){
				ass["title"] = title;
			}

			if(professor["id"]){
				return res.status(404).json("Professor not found");
			}
			else{
				ass["professor"] = req.body.professor;
			}

			if(tasks["id"]){
				return res.status(404).json("TaskGroup not found");
			}
			else{
				ass["taskGroup"] = req.body.taskGroup;
			}

			if(users["id"]){
				return res.status(404).json("UserGroup not found");
			}
			else{
				ass["userGroup"] = req.body.userGroup;
			}

			if(typeof start === 'string'){
				ass["start"] = start;
			}

			if(typeof deadline === 'string'){
				ass["deadline"] = deadline;
			}

			assignmentFunc.modifyAssignment(id, ass);
			return res.status(200).json(ass);
		}
	}
	else{
		return res.status(400).json("Bad request");
	}
}

function deleteAssignment(req, res){
	if(req && req.params && req.params.assignmentId){
		var id = req.params.assignmentId;
		var obj = assignmentFunc.getAssignmentById(id);
		if(obj["id"]){
			return res.status(404).json("Assignment not found");
		}
		else{
			return res.status(200).json(assignmentFunc.deleteAssignment(id));
		}
	}
	else{
		return res.status(400).json("Bad request");
	}
}

function getProfessorByIdAssignment(req, res){
	if(req && req.params && req.params.assignmentId){
		var id = req.params.assignmentId;
		var ass = assignmentFunc.getAssignmentById(id);

		if(ass["id"]){
			return res.status(404).json("Assignment not found");
		}
		else{
			return res.status(200).json(ass["professor"]);
		}
	}
	else{
		return res.status(400).json("Bad request");
	}
}

function getUsersByIdAssignment(req, res){
	if(req && req.params && req.params.assignmentId){
		var id = req.params.assignmentId;
		var ass = assignmentFunc.getAssignmentById(id);

		if(ass["id"]){
			return res.status(404).json("Assignment not found");
		}
		else{
			return res.status(200).json(ass["users"]);
		}
	}
	else{
		return res.status(400).json("Bad request");
	}
}

function updateUsers(req, res){
	if(req && req.params && req.body && req.params.assignmentId && req.body.userGroupId){
		const idAssignment = req.params.assignmentId;
		const usersId = req.body.userGroupId;

		var ass = assignmentFunc.getAssignmentById(idAssignment);
		var users = userGroupFunc.getUserGroupById(usersId);

		if(ass["id"]){
			return res.status(404).json("Assignment not found");
		}
		else{
			if(users["id"]){
				return res.status(404).json("UserGroup not found");
			}
			else{
				ass["userGroup"] = usersId;
				assignmentFunc.modifyAssignment(idAssignment, ass);
				return res.status(200).json(ass);
			}
		}
	}
	else{
		return res.status(400).json("Bad request");
	}
}

function getTasksByIdAssignment(req, res){
	if(req && req.params && req.params.assignmentId){
		var id = req.params.assignmentId;
		var ass = assignmentFunc.getAssignmentById(id);

		if(ass["id"]){
			return res.status(404).json("Assignment not found");
		}
		else{
			return res.status(200).json(ass["tasks"]);
		}
	}
	else{
		return res.status(400).json("Bad request");
	}
}

function updateTasks(req, res){
	if(req && req.params && req.body && req.params.assignmentId && req.body.taskGroupId){
		const idAssignment = req.params.assignmentId;
		const idTasks = req.body.taskGroupId;
		
		var ass = assignmentFunc.getAssignmentById(idAssignment);
		var tasks = taskGroupFunc.getTaskGroupById(idTasks);
		
		if(ass["id"]){
			return res.status(404).json("Assignment not found");
		}
		else{
			if(tasks["id"]){
				return res.status(404).json("TaskGroup not found");
			}
			else{
				ass["taskGroup"] = idTasks;
				assignmentFunc.modifyAssignment(idAssignment, ass);
				return res.status(200).json(ass);
			}
		}
	}
	else{
		return res.status(400).json("Bad request");
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
