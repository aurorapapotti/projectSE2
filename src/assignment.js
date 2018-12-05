const persistencyLayer = require('./persistencyLayer.js');
const dbUserPath = "./entities/users.js";
const dbAssignmentPath = "./entities/assignments.js";

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
		
	persistencyLayer.writeAssignment(ass);
	console.log("Created: ",persistencyLayer.getAllAssignments());
	res.status(201).send("Created");
}

function getAssignment(req, res) {
	console.log("recived request: ",req.body);
	const ass = persistencyLayer.getAssignment(req.params.assignmentId);
	
	if(ass = null){
		res.status(400).send("Invalid request");
	}
	else{
		res.status(201).send(ass);
	}
}

function getAllAssignments(req, res){
	console.log("recived request: ",req.body);
	persistencyLayer.getAllAssignments();
	res.status(201).send("Found");
}

function getAssignmentById(req, res){
	if(req.params.assignmentId == undefined || req.params.assignmentId == null){
		res.status(400).send("Invalid request");
	}
	else{
		res.status(201).send(persistencyLayer.getObject(req.params.assignmentId, dbAssignmentPath));
	}
}

function updateAssignment(req, res){
	//...
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

function updateUsers(id){
	
}

function getTasks(id){
	return persistencyLayer.getObjectByParam(id, dbAssignmentPath, dbTaskPath);
}

function updateTasks(id){
	
}


module.exports = {
    createAssignment: createAssignment,
	getAssignment: getAssignment,
	getAllAssignments: getAllAssignments
}