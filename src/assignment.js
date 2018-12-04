const persistencyLayer = require('./persistencyLayer.js');
const dbUserPath = "./entities/users.js";
const dbAssignmentPath = "./entities/assignments.js";

function createAssignment(req, res) {
	var professor = req.body.professor;
	var tasks = req.body.taskGroup;
	var clas = req.body.userGroup;
	
	if (professor == null || tasks == null || clas == null)
		res.status(400).send("Invalid request");
	
	var ass = '{"assignment": {'+
		'"id": "' + getUUID() + '",'+
		'"title": "' + req.body.title + '",'+
		'"professor": "' + professor + '",'+
		'"tasks": "' + tasks + '",'+
		'"clas": "' + clas + '",'+
		'"start": "' + req.body.deadline + '",'+
		'"deadline: "' + req.body.deadline + '"}"'
		
	console.log("recived request: ",req.body);
	persistencyLayer.writeAssignment(req.body);
	console.log("wrote completed: ",persistencyLayer.getAllAssignments());
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