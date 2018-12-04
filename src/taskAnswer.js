const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const percLayer = require("./persistencyLayer.js");

function createTaskAnswer (req, res) {
	const student = req.body.student;
	const assignment = req.body.assignment;
	const taskGroup = req. body.taskGroup;

	var taskAnswer = new Object();
	taskAnswer["answers"] = new Array();
	taskAnswer["student"] = student;
	taskAnswer["assignment"] = assignment;
	taskAnswer["taskGroup"] = taskGroup;
		
	percLayer.writeTaskAnswer(taskAnswer);
	res.status(201).send("Created");
}

function getAllTaskAnswers (req, res)  {
	res.status(200).send(percLayer.getAllTaskAnswers());
}

function getTaskAnswer (req, res) {
	const taskAnswer = percLayer.getTaskAnswer(req.params.taskAnswerId);
	if (taskAnswer == null) {
		res.status(400).send("Invalid request");
	}
	else {
		res.status(200).send(taskAnswer);
	}
}

function getAllAnswers (req, res) {
	const taskAnswer = percLayer.getTaskAnswer(req.params.taskAnswerId);
	console.log(taskAnswer);

	if (taskAnswer === null){
		res.status(400).send("Invalid request");
	}
	else { 
		res.status(200).send(taskAnswer["answers"]);
	}
}

function getAnswer (req, res) {
	const taskAnswerId = req.params.taskAnswerId;
	const answerId = req.params.answerId;
	console.log(answerId);
	const taskAnswer = percLayer.getTaskAnswer(taskAnswerId);

	if (taskAnswer === null){
		res.status(400).send("Invalid request");
	}
	else {
		res.status(200).send(taskAnswer["answers"][parseInt(answerId)]);
	}
}

function getStudent (req, res){

}

function getAssignment(req, res){

}

function getTaskGroup(req, res){

}

function deleteTaskAssignment (req, res) {

}

function addAnswer (req, res){

}

function editAssignment (req, res){

}

function editTaskGroup (req, res) {

}

function editStudent(req, res){
	
}

module.exports = {
	createTaskAnswer: createTaskAnswer,
	getAllTaskAnswers: getAllTaskAnswers,
	getTaskAnswer: getTaskAnswer,
	getAllAnswers: getAllAnswers,
	getAnswer: getAnswer
}
