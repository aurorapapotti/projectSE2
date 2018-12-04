const persistencyLayer = require('./persistencyLayer.js');

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
  persistencyLayer.getAssignment(req.body.id);
  res.status(201).send("Found");
}

function getAllAssignments(req, res){
	console.log("recived request: ",req.body);
	persistencyLayer.getAllAssignments();
	res.status(201).send("Found");
}

function getAssignmentById(id){
	return persistencyLayer.getObject(id, dbAssignmentPath);
}

function updateAssignment(req, res){
	//...
}

function deleteAssignment(id){
	return persistencyLayer.deleteObject(id, dbAssignmentPath);
}

function getProfessor(req, res){
	
}

function getUsers(id){
	return persistencyLayer.getObjectByParam(id, dbAssignmentPath, dbUserPath);
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