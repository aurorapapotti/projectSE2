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
	const taskAnswer = percLayer.getTaskAnswer(req.params.taskAnswerId);

	const student = percLayer.getUser(taskAnswer["student"]);

	res.status(200).send(student);
}

function getAssignment(req, res){
	const taskAnswer = percLayer.getTaskAnswer(req.params.taskAnswerId);

	const assignment = percLayer.getAssignment(taskAnswer["assignment"]);

	res.status(200).send(assignment);
}

function getTaskGroup(req, res){
	const taskAnswer = percLayer.getTaskAnswer(req.params.taskAnswerId);

	const taskGroup = percLayer.getTaskGroup(taskAnswer["taskGroup"]);

	res.status(200).send(taskGroup);
}

function deleteTaskAnswer (req, res) {
	res.status(200).send(percLayer.deleteTaskAnswer(req.params.taskAnswerId));
}

function addAnswer (req, res){
	const taskAnswer = percLayer.getTaskAnswer(req.params.taskAnswerId);
	const newAnswer = req.body.answer;

	let answers = taskAnswer["answers"];
	answers.push(newAnswer);

	res.status(201).send(percLayer.modifyTaskAnswer(req.params.taskAnswerId, taskAnswer));
}

function editAssignment (req, res){
	const taskAnswer = percLayer.getTaskAnswer(req.params.taskAnswerId);
	const newAssignment = req.body.assignment;

	taskAnswer["assignment"] = newAssignment;

	res.status(201).send(percLayer.modifyTaskAnswer(req.params.taskAnswerId, taskAnswer));
}

function editTaskGroup (req, res) {
	const taskAnswer = percLayer.getTaskAnswer(req.params.taskAnswerId);
	const newTaskGroup = req.body.taskGroup;

	taskAnswer["taskGroup"] = newTaskGroup;

	res.status(201).send(percLayer.modifyTaskAnswer(req.params.taskAnswerId, taskAnswer));
}

function editStudent(req, res){
	const taskAnswer = percLayer.getTaskAnswer(req.params.taskAnswerId);
	const newStudent = req.body.student;

	taskAnswer["student"] = newStudent;

	res.status(201).send(percLayer.modifyTaskAnswer(req.params.taskAnswerId, taskAnswer));
}

module.exports = {
	createTaskAnswer: createTaskAnswer,
	getAllTaskAnswers: getAllTaskAnswers,
	getTaskAnswer: getTaskAnswer,
	getAllAnswers: getAllAnswers,
	getAnswer: getAnswer,
	getStudent: getStudent,
	getAssignment: getAssignment,
	getTaskGroup: getTaskGroup,
	deleteTaskAnswer: deleteTaskAnswer,
	addAnswer: addAnswer,
	editAssignment: editAssignment,
	editTaskGroup: editTaskGroup,
	editStudent: editStudent
}
