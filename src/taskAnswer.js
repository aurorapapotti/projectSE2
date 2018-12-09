const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const taskAnswerFunc = require("./functionsEntities/taskAnswerFunctions.js");
const userFunc = require("./functionsEntities/userFunctions.js");
const assignmentFunc = require("./functionsEntities/assignmentFunctions.js");
const taskGroupFunc = require("./functionsEntities/taskGroupFunctions.js");
const taskFunc = require("./functionsEntities/taskFunctions.js");

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
					return res.status(200).json(answers[i]["response"]);
				}
			}

			return res.status(404).json("Answer "+answerId+ " not found in this taskAnswer");
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function getStudent (req, res){
	if (req.params.taskAnswerId){
		const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);
		if (taskAnswer["id"]){
			return res.status(404).json("TaskAnswer "+req.params.taskAnswerId+" not found");
		}
		else {
			const student = userFunc.getUser(taskAnswer["student"]);
			return res.status(200).json(student);
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function getAssignment(req, res){
	if (req.params.taskAnswerId){
		const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);
		if (taskAnswer["id"]){
			return res.status(404).json("TaskAnswer "+req.params.taskAnswerId+" not found")
		}
		else {
			const assignment = assignmentFunc.getAssignmentById(taskAnswer["assignment"]);
			return res.status(200).json(assignment);
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function getTaskGroup(req, res){
	if (req.params.taskAnswerId) {
		const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);
		
		if (taskAnswer["id"]){
			return res.status(404).json("TaskAnswer "+req.params.taskAnswerId+" not found")
		}
		else {
			const taskGroup = taskGroupFunc.getTaskGroupById(taskAnswer["taskGroup"]);
			return res.status(200).json(taskGroup);
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function deleteTaskAnswer (req, res) {
	if (req.params.taskAnswerId){
		deleted = taskAnswerFunc.deleteTaskAnswer(req.params.taskAnswerId);

		if (deleted["id"]){
			return res.status(404).json("TaskAnswer "+req.params.taskAnswerId+" not found");
		}
		else {
			return res.status(200).json("Deleted");
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}

}

function editAnswer (req, res){
	if (req.params.taskAnswerId){
		const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);

		if(taskAnswer["id"]){
			return res.status(404).json("TaskAnswer "+req.params.taskAnswerId+" not found");
		}
		else {
			if (req.body.add && req.body.task && req.body.answer){
				const taskGroup = taskGroupFunc.getTaskGroupById(taskAnswer["taskGroup"]);
				const tasks = taskGroup["tasks"];
				
				for (let i=0; i<tasks.length; i++){
					if (taskGroup["tasks"][i] == req.body.task){
						const newAnswer = {
							task: req.body.task,
							response: req.body.answer
						}
						taskAnswer["answers"].push(newAnswer);
						taskAnswerFunc.modifyTaskAnswer(req.params.taskAnswerId, taskAnswer)

						return res.status(201).json("Added new answer");
					}
				}
				
				return res.status(404).json("Task "+req.body.task+" not found in this taskGroup");
			}
			else if (req.body.delete && req.body.task){
				for (let i=0; i<taskAnswer["answers"].length; i++){
					if (taskAnswer["answers"][i]["task"] == req.body.task){
						delete taskAnswer["answers"][i];
						taskAnswerFunc.modifyTaskAnswer(req.params.taskAnswerId, taskAnswer)
						return res.status(200).json("Deleted answer");
					}
				}

				return res.status(404).json("Task "+req.body.task+" not found in the answers");
			}
			else if (req.body.edit && req.body.task && req.body.newAnswer){
				for (let i=0; i<taskAnswer["answers"].length; i++){
					console.log((taskAnswer));
					if (taskAnswer["answers"][i]["task"] == req.body.task){
						taskAnswer["answers"][i]["response"] = req.body.newAnswer;
						taskAnswerFunc.modifyTaskAnswer(req.params.taskAnswerId, taskAnswer)
						return res.status(200).json("Modified answer");
					}
				}

				return res.status(404).json("Task "+req.body.task+" not found in the answers");
			}
			else {
				return res.status(400).json("Invalid request");
			}
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function editAssignment (req, res){
	if (req.params.taskAnswerId && req.body.assignment){
		const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);
		
		if (taskAnswer["id"]){
			return res.status(404).json("TaskAnswer "+req.params.taskAnswerId+" not found");
		}
		else{
			const assignment = assignmentFunc.getAssignmentById(req.body.assignment);

			if(assignment["id"]){
				return res.status(404).json("Assignment "+req.body.assignment+" not found");
			}
			else {
				taskAnswer["assignment"] = req.body.assignment;
				taskAnswerFunc.modifyTaskAnswer(req.params.taskAnswerId, taskAnswer);
				return res.status(201).json("Assignment modified");
			}
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function editTaskGroup (req, res) {
	if (req.params.taskAnswerId && req.body.taskGroup){
		const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);
		
		if (taskAnswer["id"]){
			return res.status(404).json("TaskAnswer "+req.params.taskAnswerId+" not found");
		}
		else{
			const taskGroup = taskGroupFunc.getTaskGroupById(req.body.taskGroup);

			if(taskGroup["id"]){
				return res.status(404).json("TaskGroup "+req.body.taskGroup+" not found");
			}
			else {
				taskAnswer["taskGroup"] = req.body.taskGroup;
				taskAnswerFunc.modifyTaskAnswer(req.params.taskAnswerId, taskAnswer);
				return res.status(201).json("TaskGroup modified");
			}
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function editStudent(req, res){
	if (req.params.taskAnswerId && req.body.student){
		const taskAnswer = taskAnswerFunc.getTaskAnswer(req.params.taskAnswerId);
		
		if (taskAnswer["id"]){
			return res.status(404).json("TaskAnswer "+req.params.taskAnswerId+" not found");
		}
		else{
			const student = userFunc.getUserById(req.body.student);

			if(student["id"]){
				return res.status(404).json("Student "+req.body.student+" not found");
			}
			else {
				taskAnswer["student"] = req.body.student;
				taskAnswerFunc.modifyTaskAnswer(req.params.taskAnswerId, taskAnswer);
				return res.status(201).json("Student modified");
			}
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
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
	editAnswer: editAnswer,
	editAssignment: editAssignment,
	editTaskGroup: editTaskGroup,
	editStudent: editStudent
}