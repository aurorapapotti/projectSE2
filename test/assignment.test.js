
const userGroupFunc = require('../src/functionsEntities/userGroupFunctions.js');
const userFunc = require('../src/functionsEntities/userFunctions.js');
const assignmentFunc = require('../src/functionsEntities/assignmentFunctions.js');
const taskGroupFunc = require('../src/functionsEntities/taskGroupFunctions.js');

const usergroup = require("../src/usergroup.js");
const user = require("../src/user.js");
const assignment = require('../src/assignment.js');


const req = {}
const res = {
	"status": (statuscode) =>{ return {
		"json": (message) => {return {
			"code": statuscode,
			"message": message
		}}
	}}
}

const newUser = {
	name: "a",
	surname: "a",
	email: "a@a.it",
	badgeNumber: "1234"
}

const newTaskGroup = {
	name: "a",
	author: "a",
	tasks: ["1"]
}

const newUserGroup = {
	name: "a",
	author: "a",
	users: ["a"]
}

//	/assignment
describe ('GET /assignment valid tests', () =>{
	test('GET /assignment return code 200', () => {
		var req = {};
		expect(assignment.listAllAssignments({params: req}, res)).toEqual(res.status(200).json(assignmentFunc.getAllAssignments()));
	})
});

describe ('POST /assignment valid tests', () =>{
	test('POST /assignment valid creation', () => {
		var ass = {
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			start: "12.00",
			deadline: "2"
		}	
		expect(assignment.createAssignment({body: ass}, res)).toEqual(res.status(201).json("Created"));
	})
});
/*
describe ('POST /assignment invalid tests', () =>{
	test('POST /assignment title not string', () => {
		var ass = {
			title: 1,
			professor: "user1",
			tasks: "t1",
			class: "u1",
			start: "12",
			deadline: 2
		}	
		expect(assignment.createAssignment({body: ass}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /assignment professor undefined', () => {
		var ass = {
			title: 1,
			tasks: "t1",
			class: "u1",
			start: "12",
			deadline: 2
		}	
		expect(assignment.createAssignment({body: ass}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /assignment tasks undefined', () => {
		var ass = {
			title: 1,
			professor: "user 1",
			class: "u1",
			start: "12",
			deadline: 2
		}	
		expect(assignment.createAssignment({body: ass}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /assignment class undefined', () => {
		var ass = {
			title: 1,
			professor: "user 1",
			tasks: "t1",
			start: "12",
			deadline: 2
		}	
		expect(assignment.createAssignment({body: ass}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /assignment req empty', () => {
		var req = {}
		expect(assignment.createAssignment({body: req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

//	/assignment/:assignmentId
describe ('GET /assignment/:assignmentId valid tests', () =>{
	test('GET /assignment/:assignmentId return code 200', () => {
		var ass = {
			title: 1,
			professor: "user 1",
			tasks: "t1",
			users: "u1",
			start: "12",
			deadline: 2
		}	
		var req = {
			assignmentId: assignmentFunc.addAssignment(ass)
		}
		expect(assignment.getAssignmentById({params: req}, res)).toEqual(res.status(200).json(req["assignmentId"]));
	})
});

describe ('GET /assignment/:assignmentId invalid tests', () =>{
	test('GET /assignment/:assignmentId req empty', () => {
		var req = {}
		expect(assignment.getAssignmentById({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('GET /assignment/:assignmentId id not Found', () => {
		var req = {
			assignmentId: 1
		}
		expect(assignment.getAssignmentById({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

describe ('PUT /assignment/:assignmentId valid tests', () =>{
	test('PUT /assignment/:assignmentId edited', () => {
		var ass = {
			title: "ingegneria",
			professor: "user 1",
			tasks: "t1",
			users: "u1",
			start: "12",
			deadline: 2
		}	
		var req = {
			assignmentId: assignmentFunc.addAssignment(ass)
		}

		var newAss = {
			title: "ingegneria",
			professor: "user 1",
			tasks: "t1",
			users: "u1",
			start: "12",
			deadline: 2
		}	

		expect(assignment.updateAssignment({params: req, body: newAss}, res)).toEqual(res.status(200).json(newAss));
	})
});

describe ('PUT /assignment/:assignmentId invalid tests', () =>{
	test('PUT /assignment/:assignmentId req undefined', () => {
		var req = {}
		expect(assignment.deleteAssignment({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})
	
	test('PUT /assignment/:assignmentId params undefined', () => {
		var req = {}
		expect(assignment.deleteAssignment({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

describe ('DELETE /assignment/:assignmentId valid tests', () =>{
	test('DELETE /assignment/:assignmentId return code 200', () =>{
		var ass = {
			title: 1,
			professor: "user 1",
			tasks: "t1",
			users: "u1",
			start: "12",
			deadline: 2
		}	
		var req = {
			assignmentId: assignmentFunc.addAssignment(ass)
		}
		expect(assignment.deleteAssignment({params: req}, res)).toEqual(res.status(200).json("Deleted."));
	})
});

describe ('DELETE /assignment/:assignmentId invalid tests', () =>{
	test('DELETE /assignment/:assignmentId req empty', () =>{
		var req = {}
		expect(assignment.deleteAssignment({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('DELETE /assignment/:assignmentId assignment not exists', () =>{
		var req = {
			assignmentId: "1"
		}
		expect(assignment.deleteAssignment({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})
	
	test('DELETE /assignment/:assignmentId params empty', () =>{
		var req = {
			assignmentId: "_8heb7eyv5w"
		}
		expect(assignment.deleteAssignment({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

//	/assignment/:assignmentId/professor
describe ('GET /assignment/:assignmentId/professor valid tests', () => {
	test('GET /assignment/:assignmentId/professor valid professor', () => {
		var ass = {
			title: "ingegneria",
			professor: "user 1",
			tasks: "t1",
			users: "u1",
			start: "12",
			deadline: 2
		}	
		var req = {
			assignmentId: assignmentFunc.addAssignment(ass)
		}
		expect(assignment.getProfessorByIdAssignment({params: req}, res)).toEqual(res.status(200).json(ass["professor"]));
	})
});

describe ('GET /assignment/:assignmentId/professor invalid tests', () => {
	test('GET /assignment/:assignmentId/professor req empty', () => {
		var req = {}
		expect(assignment.getProfessorByIdAssignment({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})
	
	test('GET /assignment/:assignmentId/professor params empty', () => {
		var req = {}
		expect(assignment.getProfessorByIdAssignment({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

//	/assignment/:assignmentId/users
describe ('GET /assignment/:assignmentId/users valid tests', () => {
	test('GET /assignment/:assignmentId/users valid users', () => {
		var ass = {
			title: "ingegneria",
			professor: "user 1",
			tasks: "t1",
			users: "u1",
			start: "12",
			deadline: 2
		}	
		var req = {
			assignmentId: assignmentFunc.addAssignment(ass)
		}
		expect(assignment.getUsersByIdAssignment({params: req}, res)).toEqual(res.status(200).json(ass["users"]));
	})
});

describe ('GET /assignment/:assignmentId/users invalid tests', () => {
	test('GET /assignment/:assignmentId/users req empty', () => {
		var req = {}
		expect(assignment.getUsersByIdAssignment({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})
	
	test('GET /assignment/:assignmentId/users params empty', () => {
		var req = {}
		expect(assignment.getUsersByIdAssignment({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

describe ('PUT /assignment/:assignmentId/users valid tests', () => {
	test('PUT /assignment/:assignmentId/users valid users', () => {
		var ass = {
			title: "ingegneria",
			professor: "user 1",
			tasks: "t1",
			users: "u1",
			start: "12",
			deadline: 2
		}	
		var req = {
			assignmentId: assignmentFunc.addAssignment(ass)
		}
		var userGroup = ["user1", "user2"];
		expect(assignment.updateAssignment({params: req, body: userGroup}, res)).toEqual(res.status(200).json(ass));
	})
});

describe ('PUT /assignment/:assignmentId/users invalid tests', () => {
	test('PUT /assignment/:assignmentId/users req empty', () => {
		var req = {}
		expect(assignment.updateAssignment({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})
	
	test('PUT /assignment/:assignmentId/users params empty', () => {
		var req = {}
		expect(assignment.updateAssignment({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

//	/assignment/:assignmentId/tasks
describe ('GET /assignment/:assignmentId/tasks valid tests', () => {
	test('GET /assignment/:assignmentId/tasks valid professor', () => {
		var ass = {
			title: "ingegneria",
			professor: "user 1",
			tasks: "t1",
			users: "u1",
			start: "12",
			deadline: 2
		}	
		var req = {
			assignmentId: assignmentFunc.addAssignment(ass)
		}
		expect(assignment.getTasksByIdAssignment({params: req}, res)).toEqual(res.status(200).json(ass["tasks"]));
	})
});

describe ('GET /assignment/:assignmentId/tasks invalid tests', () => {
	test('GET /assignment/:assignmentId/tasks req empty', () => {
		var req = {}
		expect(assignment.getTasksByIdAssignment({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})
	
	test('GET /assignment/:assignmentId/tasks params empty', () => {
		var req = {}
		expect(assignment.getTasksByIdAssignment({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

describe ('PUT /assignment/:assignmentId/tasks valid tests', () => {
	test('PUT /assignment/:assignmentId/tasks valid users', () => {


		var ass = {
			title: "ingegneria",
			professor: "user 1",
			tasks: "t1",
			users: "u1",
			start: "12",
			deadline: 2
		}	
		var req = {
			assignmentId: assignmentFunc.addAssignment(ass)
		}
		var newTasks = ["user1", "user2"];
		expect(assignment.updateAssignment({params: req, body: newTasks}, res)).toEqual(res.status(200).json(ass));
	})
});

describe ('PUT /assignment/:assignmentId/tasks invalid tests', () => {
	test('PUT /assignment/:assignmentId/tasks req empty', () => {
		var req = {}
		expect(assignment.updateAssignment({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})
	
	test('PUT /assignment/:assignmentId/tasks params empty', () => {
		var req = {}
		expect(assignment.updateAssignment({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});*/