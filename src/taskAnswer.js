const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const taskAnswerFunc = require("./functionsEntities/taskAnswerFunctions.js");
const userFunc = require("./functionsEntities/userFunctions.js");
const assignmentFunc = require("./functionsEntities/assignmentFunctions.js");
const taskGroupFunc = require("./functionsEntities/taskGroupFunctions.js");

function createTaskAnswer (req, res) {
	const student = req.body.student;
	const assignment = req.body.assignment;
	const taskGroup = req. body.taskGroup;

	if (student && assignment && taskGroup) {
		var taskAnswer = new Object();
		taskAnswer["answers"] = new Array();
		const user = userFunc.getUserById(student);
		if (user["id"]){
			return res.status(404).json("Student "+student+" not found");
		}
		const assign = assignmentFunc.getAssignmentById(assignment);
		if(assign["id"]){
			return res.status(404).json("Assignment "+assignment+" not found");
		}
		const taskG = taskGroupFunc.getTaskGroupById(taskGroup);
		if (taskG["id"]){
			return res.status(404).json("TaskGroup "+taskGroup+" not found");
		}
		taskAnswer["student"] = student;
		taskAnswer["assignment"] = assignment;
		taskAnswer["taskGroup"] = taskGroup;
			
		taskAnswerFunc.writeTaskAnswer(taskAnswer);
		return res.status(201).json("Created");
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function getAllTaskAnswers (req, res)  {
	return res.status(200).json(taskAnswerFunc.getAllTaskAnswers());
}

function getTaskAnswer (req, res) {
	if (req.params.taskAnswerId){
		const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);
		if (taskAnswer["id"]) {
			return res.status(404).json("TaskAnswer "+req.params.taskAnswerId+" not found");
		}
		else {
			return res.status(200).json(taskAnswer);
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function getAllAnswers (req, res) {
	if (req.params.taskAnswerId){
		const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);

		if (taskAnswer["id"]){
			return res.status(404).json("TaskAnswer "+req.params.taskAnswerId+" not found");
		}
		else { 
			return res.status(200).json(taskAnswer["answers"]);
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function getAnswer (req, res) {
	const taskAnswerId = req.params.taskAnswerId;
	const answerId = req.params.answerId;

	if (taskAnswerId && answerId){
		const taskAnswer = taskAnswerFunc.getTaskAnswer(taskAnswerId);
		if (taskAnswer["id"]){
			return res.status(404).json("TaskAnswer "+taskAnswerId+" not found");
		}
		else {
			const answers = taskAnswer["answers"];

			for (let i=0; i<answers.length; i++){
				if (answers[i]["task"] == answerId){
					return res.status(200).json(answer[i]["response"]);
				}
			}

			return res.status(404).json("Answer "+answerId+ "not found in this taskAnswer");
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function getStudent (req, res){
	const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);

	const student = userFunc.getUser(taskAnswer["student"]);

	res.status(200).send(student);
}

function getAssignment(req, res){
	const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);

	const assignment = assignmentFunc.getAssignment(taskAnswer["assignment"]);

	res.status(200).send(assignment);
}

function getTaskGroup(req, res){
	const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);

	const taskGroup = taskGroupFunc.getTaskGroup(taskAnswer["taskGroup"]);

	res.status(200).send(taskGroup);
}

function deleteTaskAnswer (req, res) {
	res.status(200).send(taskAnswerFunc.deleteTaskAnswer(req.params.taskAnswerId));
}

function addAnswer (req, res){
	const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);
	const newAnswer = req.body.answer;

	let answers = taskAnswer["answers"];
	answers.push(newAnswer);

	res.status(201).send(taskAnswerFunc.modifyTaskAnswer(req.params.taskAnswerId, taskAnswer));
}

function editAssignment (req, res){
	const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);
	const newAssignment = req.body.assignment;

	taskAnswer["assignment"] = newAssignment;

	res.status(201).send(taskAnswerFunc.modifyTaskAnswer(req.params.taskAnswerId, taskAnswer));
}

function editTaskGroup (req, res) {
	const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);
	const newTaskGroup = req.body.taskGroup;

	taskAnswer["taskGroup"] = newTaskGroup;

	res.status(201).send(taskAnswerFunc.modifyTaskAnswer(req.params.taskAnswerId, taskAnswer));
}

function editStudent(req, res){
	const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);
	const newStudent = req.body.student;

	taskAnswer["student"] = newStudent;

	res.status(201).send(taskAnswerFunc.modifyTaskAnswer(req.params.taskAnswerId, taskAnswer));
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