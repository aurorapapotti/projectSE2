const taskAnswerFunctions = require('../src/functionsEntities/taskAnswerFunctions.js');
const userFunctions = require('../src/functionsEntities/userFunctions.js');
const taskGroupFunctions = require('../src/functionsEntities/taskGroupFunctions.js');
const assignmentFunctions = require('../src/functionsEntities/assignmentFunctions.js');

const createTaskAnswer = require('../src/taskAnswer.js').createTaskAnswer;
const getAllTaskAnswers = require('../src/taskAnswer.js').getAllTaskAnswers;
const getTaskAnswer = require('../src/taskAnswer.js').getTaskAnswer;
const getAllAnswers = require('../src/taskAnswer.js').getAllAnswers;

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
			student: userFunctions.createUser(newStudent),
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
	/*test("return code 200", async () => {
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

	});*/
});

describe("PUT /taskAnswers/:taskAnswerId/answers/:answerId", () => {

});

describe("PUT /taskAnswers/:taskAnswerId/assignment", () => {

});

describe("PUT /taskAnswers/:taskAnswerId/taskGroup", () => {

});

describe("PUT /taskAnswers/:taskAnswerId/student", () => {

});