const taskAnswerFunctions = require('../src/functionsEntities/taskAnswerFunctions.js');
const userFunctions = require('../src/functionsEntities/userFunctions.js');
const taskGroupFunctions = require('../src/functionsEntities/taskGroupFunctions.js');
const assignmentFunctions = require('../src/functionsEntities/assignmentFunctions.js');
const taskFunctions = require('../src/functionsEntities/taskFunctions.js');

const createTaskAnswer = require('../src/taskAnswer.js').createTaskAnswer;
const getAllTaskAnswers = require('../src/taskAnswer.js').getAllTaskAnswers;
const getTaskAnswer = require('../src/taskAnswer.js').getTaskAnswer;
const getAllAnswers = require('../src/taskAnswer.js').getAllAnswers;
const getAnswer = require('../src/taskAnswer.js').getAnswer;
const getStudent = require('../src/taskAnswer.js').getStudent;
const getAssignment = require('../src/taskAnswer.js').getAssignment;
const getTaskGroup = require('../src/taskAnswer.js').getTaskGroup;
const deleteTaskAnswer = require('../src/taskAnswer.js').deleteTaskAnswer;
const editAnswer = require('../src/taskAnswer.js').editAnswer;
const editAssignment = require('../src/taskAnswer.js').editAssignment;
const editStudent = require('../src/taskAnswer.js').editStudent;
const editTaskGroup = require('../src/taskAnswer.js').editTaskGroup;

const res = {
	"status": (statuscode) => {
		return {
	  		"json": (message) => {
				  return {
					"code": statuscode,
					"message": message
				}
	   		}
		}
	}
}

describe ("POST /taskAnswers", () =>{
	test("return code 201", async () => {
		var newStudent = {
			name: "A",
			surname: "a",
			email: "a@a.com",
			badgeNumber: "1234"
		}

		var userID = userFunctions.createUser(newStudent);

		var newAssignment = {
			title: "B",
			professor: "b",
			tasks: "b",
			userGroup: "b",
			start: "12.00",
			deadline: "3"
		}

		var newTaskGroup = {
			name: "c",
			author: "C",
			tasks: ["1", ""]
		}

		var newTaskAnswer = {
			student: userID,
			assignment: assignmentFunctions.addAssignment(newAssignment),
			taskGroup: taskGroupFunctions.addTaskGroup(newTaskGroup)
		}

		expect(createTaskAnswer({body: newTaskAnswer}, res)).toEqual(res.status(201).json("Created"));
	});

	test("return code 404 student wrong", async () => {
		var newAssignment = {
			title: "B",
			professor: "b",
			tasks: "b",
			userGroup: "b",
			start: "12.00",
			deadline: "3"
		}

		var newTaskGroup = {
			name: "c",
			author: "C",
			tasks: ["1", ""]
		}

		var newTaskAnswer = {
			student: "a",
			assignment: assignmentFunctions.addAssignment(newAssignment),
			taskGroup: taskGroupFunctions.addTaskGroup(newTaskGroup)
		}

		expect(createTaskAnswer({body: newTaskAnswer}, res)).toEqual(res.status(404).json("Student a not found"));
	});

	test("return code 404 assignment wrong", async () => {
		var newStudent = {
			name: "A",
			surname: "a",
			email: "a@a.com",
			badgeNumber: "1234"
		}

		var newTaskGroup = {
			name: "c",
			author: "C",
			tasks: ["1", ""]
		}

		var newTaskAnswer = {
			student: userFunctions.createUser(newStudent),
			assignment: "a",
			taskGroup: taskGroupFunctions.addTaskGroup(newTaskGroup)
		}

		expect(createTaskAnswer({body: newTaskAnswer}, res)).toEqual(res.status(404).json("Assignment a not found"));
	});

	test("return code 404 TaskGroup wrong", async () => {
		var newStudent = {
			name: "A",
			surname: "a",
			email: "a@a.com",
			badgeNumber: "1234"
		}

		var newAssignment = {
			title: "B",
			professor: "b",
			tasks: "b",
			userGroup: "b",
			start: "12.00",
			deadline: "3"
		}

		var newTaskAnswer = {
			student: userFunctions.createUser(newStudent),
			assignment: assignmentFunctions.addAssignment(newAssignment),
			taskGroup: "a"
		}

		expect(createTaskAnswer({body: newTaskAnswer}, res)).toEqual(res.status(404).json("TaskGroup a not found"));
	});

	test("return code 400 student undefined", async () => {
		var reqBody = {
			assignment: "1",
			taskGroup: "1"
		}

		expect(createTaskAnswer({body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 400 assignment undefined", async () => {
		var reqBody = {
			student: "1",
			taskGroup: "1"
		}

		expect(createTaskAnswer({body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 400 taskGroup undefined", async () => {
		var reqBody = {
			student: "1",
			assignment: "1"
		}

		expect(createTaskAnswer({body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});
});

describe ("GET /taskAnswers", () => {
	test("return code 200", async() => {
		expect(getAllTaskAnswers({params:{}}, res)).toEqual(res.status(200).json(taskAnswerFunctions.getAllTaskAnswers()));
	})
});

describe("GET /taskAnswers/:taskAnswerId", () => {
	test("return code 200", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1"
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		expect(getTaskAnswer({params: req}, res)).toEqual(res.status(200).json(taskAnswerFunctions.getTaskAnswer(req["taskAnswerId"])));
	});

	test("return code 404 taskAnswerId wrong", async () => {
		var req = {
			taskAnswerId: "a"
		}

		expect(getTaskAnswer({params: req}, res)).toEqual(res.status(404).json("TaskAnswer a not found"));
	});

	test("return code 400 taskAnswerId undefined", async () => {
		expect(getTaskAnswer({params: {}}, res)).toEqual(res.status(400).json("Invalid request"));
	});
});

describe("GET /taskAnswers/:taskAnswerId/answers", () => {
	test ("return code 200", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1"
		}

		var id = taskAnswerFunctions.writeTaskAnswer(newTaskAnswer);
		var taskAnswer = taskAnswerFunctions.getTaskAnswer(id);

		taskAnswer["answers"] = new Array();
		taskAnswer["answers"].push({task: "1", response: "a"});
		taskAnswer["answers"].push({task: "2", response: "b"});

		taskAnswerFunctions.modifyTaskAnswer(id, taskAnswer)

		var req = {
			taskAnswerId: id
		}

		expect(getAllAnswers({params: req}, res)).toEqual(res.status(200).json((taskAnswerFunctions.getTaskAnswer(id))["answers"]));
	});

	test ("return code 404 taskAnswerId wrong", async () => {
		var req = {
			taskAnswerId: "a"
		}

		expect(getAllAnswers({params: req}, res)).toEqual(res.status(404).json("TaskAnswer a not found"));
	});

	test ("return code 400 taskAnswerId undefined", async () => {
		expect(getAllAnswers({params: {}}, res)).toEqual(res.status(400).json("Invalid request"));
	});
});

describe("GET /taskAnswers/:taskAnswerId/answers/:answerId", () => {
	test("return code 200", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1"
		}

		var id = taskAnswerFunctions.writeTaskAnswer(newTaskAnswer);
		var taskAnswer = taskAnswerFunctions.getTaskAnswer(id);

		taskAnswer["answers"] = new Array();
		taskAnswer["answers"].push({task: "1", response: "a"});
		taskAnswer["answers"].push({task: "2", response: "b"});

		taskAnswerFunctions.modifyTaskAnswer(id, taskAnswer)

		var req = {
			taskAnswerId: id,
			answerId: "1"
		}

		expect(getAnswer({params: req}, res)).toEqual(res.status(200).json("a"));

	});

	test("return code 404 answerId wrong", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1"
		}

		var id = taskAnswerFunctions.writeTaskAnswer(newTaskAnswer);
		var taskAnswer = taskAnswerFunctions.getTaskAnswer(id);

		taskAnswer["answers"] = new Array();
		taskAnswer["answers"].push({task: "1", response: "a"});
		taskAnswer["answers"].push({task: "2", response: "b"});

		taskAnswerFunctions.modifyTaskAnswer(id, taskAnswer)

		var req = {
			taskAnswerId: id,
			answerId: "3"
		}

		expect(getAnswer({params: req}, res)).toEqual(res.status(404).json("Answer 3 not found in this taskAnswer"));
	});

	test("return code 404 taskAnswerId wrong", async () => {
		var req = {
			taskAnswerId: "a",
			answerId: "3"
		}

		expect(getAnswer({params: req}, res)).toEqual(res.status(404).json("TaskAnswer a not found"));
	});

	test("return code 400 taskAnswerId undefined", async () => {
		var req = {
			answerId: "3"
		}

		expect(getAnswer({params: req}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 400 answerId undefined", async () => {
		var req = {
			taskAnswerId: "a"
		}

		expect(getAnswer({params: req}, res)).toEqual(res.status(400).json("Invalid request"));
	});
});

describe("GET /taskAnswers/:taskAnswerId/student", () => {
	test("return code 200", async () => {
		var newStudent = {
			name: "A",
			surname: "a",
			email: "a@a.com",
			badgeNumber: "1234"
		}

		var newTaskAnswer = {
			student: userFunctions.createUser(newStudent),
			assignment: "1",
			taskGroup: "1"
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		expect(getStudent({params: req}, res)).toEqual(res.status(200).json(userFunctions.getUserById(newTaskAnswer["student"])));
	});

	test("return code 404 taskAnswerId wrong", async () => {
		var req = {
			taskAnswerId: "a"
		}

		expect(getStudent({params: req}, res)).toEqual(res.status(404).json("TaskAnswer a not found"));
	});

	test("return code 400 taskanswerId undefined", async () => {
		expect(getStudent({params: {}}, res)).toEqual(res.status(400).json("Invalid request"));
	});
});

describe("GET /taskAnswers/:taskAnswerId/assignment", () => {
	test("return code 200", async () => {
		var newAssignment = {
			title: "B",
			professor: "b",
			tasks: "b",
			userGroup: "b",
			start: "12.00",
			deadline: "3"
		}

		var newTaskAnswer = {
			student: "1",
			assignment: assignmentFunctions.addAssignment(newAssignment),
			taskGroup: "1"
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		expect(getAssignment({params: req}, res)).toEqual(res.status(200).json(assignmentFunctions.getAssignmentById(newTaskAnswer["assignment"])));
	});

	test("return code 404 taskAnswerId wrong", async () => {
		var req = {
			taskAnswerId: "a"
		}

		expect(getAssignment({params: req}, res)).toEqual(res.status(404).json("TaskAnswer a not found"));
	});

	test("return code 400 taskanswerId undefined", async () => {
		expect(getAssignment({params: {}}, res)).toEqual(res.status(400).json("Invalid request"));
	});
});

describe("GET /taskAnswers/:taskAnswerId/taskGroup", () => {
	test("return code 200", async () => {
		var newTaskGroup = {
			name: "c",
			author: "C",
			tasks: ["1", "2"]
		}

		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: taskGroupFunctions.addTaskGroup(newTaskGroup)
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		expect(getTaskGroup({params: req}, res)).toEqual(res.status(200).json(taskGroupFunctions.getTaskGroupById(newTaskAnswer["taskGroup"])));
	});

	test("return code 404 taskAnswerId wrong", async () => {
		var req = {
			taskAnswerId: "a"
		}

		expect(getTaskGroup({params: req}, res)).toEqual(res.status(404).json("TaskAnswer a not found"));
	});

	test("return code 400 taskanswerId undefined", async () => {
		expect(getTaskGroup({params: {}}, res)).toEqual(res.status(400).json("Invalid request"));
	});
});

describe("DELETE /taskAnswers/:taskAnswerId", () => {
	test("return code 200", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1"
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		expect(deleteTaskAnswer({params: req},res)).toEqual(res.status(200).json("Deleted"));
	});

	test("return code 404", async () => {
		var req = {
			taskAnswerId: "a"
		}

		expect(deleteTaskAnswer({params: req},res)).toEqual(res.status(404).json("TaskAnswer a not found"));
	});

	test("return code 200", async () => {
		expect(deleteTaskAnswer({params: {}},res)).toEqual(res.status(400).json("Invalid request"));
	});
});

describe("PUT /taskAnswers/:taskAnswerId/answers", () => {
	test("return code 200 add", async () => {
		var newTaskGroup = {
			name: "c",
			author: "C",
			tasks: ["1", "2"]
		}

		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: taskGroupFunctions.addTaskGroup(newTaskGroup),
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			add: true,
			task: "1",
			answer: "a"
		}

		expect(editAnswer({params: req, body: reqBody}, res)).toEqual(res.status(201).json("Added new answer"));
	});

	test("return code 200 delete", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1",
			answers: [{task: "1", response: "a"}]
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			delete: true,
			task: "1"
		}

		expect(editAnswer({params: req, body: reqBody}, res)).toEqual(res.status(200).json("Deleted answer"));
	});

	test("return code 200 edit", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1",
			answers: [{task: "1", response: "a"}]
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			edit: true,
			task: "1",
			newAnswer: "b"
		}

		expect(editAnswer({params: req, body: reqBody}, res)).toEqual(res.status(200).json("Modified answer"));
	});

	test("return code 404 add task wrong", async () => {
		var newTaskGroup = {
			name: "c",
			author: "C",
			tasks: ["1", "2"]
		}

		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: taskGroupFunctions.addTaskGroup(newTaskGroup),
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			add: true,
			task: "3",
			answer: "a"
		}

		expect(editAnswer({params: req, body: reqBody}, res)).toEqual(res.status(404).json("Task 3 not found in this taskGroup"));
	});

	test("return code 404 delete task wrong", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1",
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			delete: true,
			task: "1",
		}

		expect(editAnswer({params: req, body: reqBody}, res)).toEqual(res.status(404).json("Task 1 not found in the answers"));
	});

	test("return code 404 edit task wrong", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1",
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			edit: true,
			task: "1",
			newAnswer: "b"
		}

		expect(editAnswer({params: req, body: reqBody}, res)).toEqual(res.status(404).json("Task 1 not found in the answers"));
	});

	test("return code 400 add task undefined", async () => {
		var newTaskGroup = {
			name: "c",
			author: "C",
			tasks: ["1", "2"]
		}

		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: taskGroupFunctions.addTaskGroup(newTaskGroup),
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			add: true,
			answer: "a"
		}

		expect(editAnswer({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 400 add answer undefined", async () => {
		var newTaskGroup = {
			name: "c",
			author: "C",
			tasks: ["1", "2"]
		}

		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: taskGroupFunctions.addTaskGroup(newTaskGroup),
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			add: true,
			task: "3",
		}

		expect(editAnswer({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 400 add undefined", async () => {
		var newTaskGroup = {
			name: "c",
			author: "C",
			tasks: ["1", "2"]
		}

		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: taskGroupFunctions.addTaskGroup(newTaskGroup),
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			task: "3",
			answer: "a"
		}

		expect(editAnswer({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 400 delete task undefined", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1",
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			delete: true,
		}

		expect(editAnswer({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 400 delete undefined", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1",
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			task: "1"
		}

		expect(editAnswer({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 400 edit task undefined", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1",
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			edit: true,
			newAnswer: "b"
		}

		expect(editAnswer({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 404 edit newAnswer undefined", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1",
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			edit: true,
			task: "1"
		}

		expect(editAnswer({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 404 edit undefined", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1",
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			task: "1",
			newAnswer: "b"
		}

		expect(editAnswer({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 404 taskAnswerId wrong", async () => {
		var req = {
			taskAnswerId: "a"
		}

		var reqBody = {
			edit: true,
			task: "1",
			newAnswer: "b"
		}

		expect(editAnswer({params: req, body: reqBody}, res)).toEqual(res.status(404).json("TaskAnswer a not found"));
	});

	test("return code 400 taskAnswerId undefined", async () => {
		var reqBody = {
			edit: true,
			task: "1",
			newAnswer: "b"
		}

		expect(editAnswer({params: {}, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});
});

describe("PUT /taskAnswers/:taskAnswerId/assignment", () => {
	test("return code 201", async () => {
		var newAssignment = {
			title: "B",
			professor: "b",
			tasks: "b",
			userGroup: "b",
			start: "12.00",
			deadline: "3"
		}

		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1",
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			assignment: assignmentFunctions.addAssignment(newAssignment)
		}

		expect(editAssignment({params: req, body: reqBody}, res)).toEqual(res.status(201).json("Assignment modified"));
	});

	test("return code 404 assignment wrong", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1",
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			assignment: "a"
		}

		expect(editAssignment({params: req, body: reqBody}, res)).toEqual(res.status(404).json("Assignment a not found"));
	});

	test("return code 404 taskAnswerId wrong", async () => {
		var req = {
			taskAnswerId: "a"
		}

		var reqBody = {
			assignment: "a"
		}

		expect(editAssignment({params: req, body: reqBody}, res)).toEqual(res.status(404).json("TaskAnswer a not found"));
	});

	test("return code 400 taskAnswerId undefined", async () => {
		var req = {
		}

		var reqBody = {
			assignment: "a"
		}

		expect(editAssignment({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 400 assignment undefined", async () => {
		var req = {
			taskAnswerId: "a"
		}

		var reqBody = {
		}

		expect(editAssignment({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});
});

describe("PUT /taskAnswers/:taskAnswerId/taskGroup", () => {
	test("return code 201", async () => {
		var newTaskGroup = {
			name: "c",
			author: "C",
			tasks: ["1", ""]
		}

		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1",
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			taskGroup: taskGroupFunctions.addTaskGroup(newTaskGroup)
		}

		expect(editTaskGroup({params: req, body: reqBody}, res)).toEqual(res.status(201).json("TaskGroup modified"));
	});

	test("return code 404 taskGroup wrong", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1",
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			taskGroup: "a"
		}

		expect(editTaskGroup({params: req, body: reqBody}, res)).toEqual(res.status(404).json("TaskGroup a not found"));
	});

	test("return code 404 taskAnswerId wrong", async () => {
		var req = {
			taskAnswerId: "a"
		}

		var reqBody = {
			taskGroup: "a"
		}

		expect(editTaskGroup({params: req, body: reqBody}, res)).toEqual(res.status(404).json("TaskAnswer a not found"));
	});

	test("return code 400 taskAnswerId undefined", async () => {
		var req = {
		}

		var reqBody = {
			taskGroup: "a"
		}

		expect(editTaskGroup({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 400 taskGroup undefined", async () => {
		var req = {
			taskAnswerId: "a"
		}

		var reqBody = {
		}

		expect(editAssignment({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});
});

describe("PUT /taskAnswers/:taskAnswerId/student", () => {
	test("return code 201", async () => {
		var newStudent = {
			name: "A",
			surname: "a",
			email: "a@a.com",
			badgeNumber: "1234"
		}

		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1",
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			student: userFunctions.createUser(newStudent)
		}

		expect(editStudent({params: req, body: reqBody}, res)).toEqual(res.status(201).json("Student modified"));
	});

	test("return code 404 student wrong", async () => {
		var newTaskAnswer = {
			student: "1",
			assignment: "1",
			taskGroup: "1",
			answers: []
		}

		var req = {
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			student: "a"
		}

		expect(editStudent({params: req, body: reqBody}, res)).toEqual(res.status(404).json("Student a not found"));
	});

	test("return code 404 taskAnswerId wrong", async () => {
		var req = {
			taskAnswerId: "a"
		}

		var reqBody = {
			student: "a"
		}

		expect(editStudent({params: req, body: reqBody}, res)).toEqual(res.status(404).json("TaskAnswer a not found"));
	});

	test("return code 400 taskAnswerId undefined", async () => {
		var req = {
		}

		var reqBody = {
			student: "a"
		}

		expect(editStudent({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 400 student undefined", async () => {
		var req = {
			taskAnswerId: "a"
		}

		var reqBody = {
		}

		expect(editAssignment({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	});
});
