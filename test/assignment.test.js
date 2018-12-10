
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

const newUser2 = {
	name: "b",
	surname: "b",
	email: "a@gmail.it",
	badgeNumber: "65"
}

const newTaskGroup = {
	name: "a",
	author: "a",
	tasks: ["1"]
}

const newTaskGroup2 = {
	name: "b",
	author: "b",
	tasks: ["1"]
}

const newUserGroup2 = {
	name: "c",
	author: "c",
	users: ["a"]
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
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
		}	
		expect(assignment.createAssignment({body: ass}, res)).toEqual(res.status(201).json("Created"));
	})
});

describe ('POST /assignment invalid tests', () =>{
	test('POST /assignment title not string', () => {
		var ass = {
			title: 1,
			professor: userFunc.createUser(newUser),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
		}	
		expect(assignment.createAssignment({body: ass}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /assignment professor undefined', () => {
		var ass = {
			title: "ingegneria",
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
		}	
		expect(assignment.createAssignment({body: ass}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /assignment professor not exists', () => {
		var ass = {
			title: "ingegneria",
			professor: "not exists",
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
		}	
		expect(assignment.createAssignment({body: ass}, res)).toEqual(res.status(404).json("User not found"));
	})

	test('POST /assignment tasks undefined', () => {
		var ass = {
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			start: "12",
			deadline: "2"
		}	
		expect(assignment.createAssignment({body: ass}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /assignment tasks not exist', () => {
		var ass = {
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: "u1",
			start: "12",
			deadline: "2"
		}	
		expect(assignment.createAssignment({body: ass}, res)).toEqual(res.status(404).json("TaskGroup not found"));
	})

	test('POST /assignment class undefined', () => {
		var ass = {
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
		}	
		expect(assignment.createAssignment({body: ass}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /assignment class not exist', () => {
		var ass = {
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			userGroup: "not exist",
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
		}	
		expect(assignment.createAssignment({body: ass}, res)).toEqual(res.status(404).json("UserGroup not found"));
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
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
		}
		var req = {
			assignmentId: assignmentFunc.addAssignment(ass)
		}
		expect(assignment.getAssignmentById({params: req}, res)).toEqual(res.status(200).json(ass));
	})
});

describe ('GET /assignment/:assignmentId invalid tests', () =>{
	test('GET /assignment/:assignmentId req empty', () => {
		var req = {}
		expect(assignment.getAssignmentById({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('GET /assignment/:assignmentId id not Found', () => {
		var req = {
			assignmentId: "not exist"
		}
		expect(assignment.getAssignmentById({params: req}, res)).toEqual(res.status(404).json("Assignment not found"));
	})
});


describe ('PUT /assignment/:assignmentId valid tests', () => {
	test('PUT /assignment/:assignmentId edited', () => {
		var ass = {
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
		}
		var id = assignmentFunc.addAssignment(ass);
		var req = {
			assignmentId: id
		}

		var newAss = {
			title: "filosofia",
			professor: userFunc.createUser(newUser2),
			userGroup: ass["userGroup"],
			taskGroup: ass["taskGroup"],
			start: "13.00",
			deadline: "1"
		}

		expect(assignment.updateAssignment({params: req, body: newAss}, res)).toEqual(res.status(200).json(newAss));
	})
});

describe ('PUT /assignment/:assignmentId invalid tests', () =>{
	test('PUT /assignment/:assignmentId req undefined', () => {
		var req = {}
		expect(assignment.updateAssignment({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})
	
	test('PUT /assignment/:assignmentId params undefined', () => {
		var req = {}
		expect(assignment.updateAssignment({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
	
	test('PUT /assignment/:assignmentId id not exists', () => {
		var req = {
			assignmentId: "not exists"
		}
		var ass = {
			title: "filosofia",
			professor: userFunc.createUser(newUser),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "13.00",
			deadline: "1"
		}
		expect(assignment.updateAssignment({params: req, body: ass}, res)).toEqual(res.status(404).json("Assignment not found"));
	})
});

describe ('DELETE /assignment/:assignmentId valid tests', () =>{
	test('DELETE /assignment/:assignmentId return code 200', () =>{
		var ass = {
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
		}
		var req = {
			assignmentId: assignmentFunc.addAssignment(ass)
		}
		expect(assignment.deleteAssignment({params: req}, res)).toEqual(res.status(200).json(ass));
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
		expect(assignment.deleteAssignment({params: req}, res)).toEqual(res.status(404).json("Assignment not found"));
	})
	
	test('DELETE /assignment/:assignmentId params empty', () =>{
		var ass = {
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
		}
		var req = {
			assignmentId: assignmentFunc.addAssignment(ass)
		}
		expect(assignment.deleteAssignment({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

//	/assignment/:assignmentId/professor
describe ('GET /assignment/:assignmentId/professor valid tests', () => {
	test('GET /assignment/:assignmentId/professor valid professor', () => {
		var ass = {
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
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

	test('GET /assignment/:assignmentId/professor assignment not found', () => {
		var req = {
			assignmentId: "not exists"
		}
		expect(assignment.getProfessorByIdAssignment({params: req}, res)).toEqual(res.status(404).json("Assignment not found"));
	})
});

//	/assignment/:assignmentId/users
describe ('GET /assignment/:assignmentId/users valid tests', () => {
	test('GET /assignment/:assignmentId/users valid users', () => {
		var ass = {
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
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

	test('GET /assignment/:assignmentId/users assignment not found', () => {
		var req = {
			assignmentId: "not exists"
		}
		expect(assignment.getUsersByIdAssignment({params: req}, res)).toEqual(res.status(404).json("Assignment not found"));
	})
});


describe ('PUT /assignment/:assignmentId/users valid tests', () => {
	test('PUT /assignment/:assignmentId/users valid users', () => {
		var ass = {
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
		}
		var req = {
			assignmentId: assignmentFunc.addAssignment(ass)
		}

		var req2 = {
			userGroupId: userGroupFunc.writeUserGroup(newUserGroup2)
		}

		var ass2 = {
			title: "ingegneria",
			professor: ass["professor"],
			userGroup: req2["userGroupId"],
			taskGroup: ass["taskGroup"],
			start: "12.00",
			deadline: "2"
		}		
		
		expect(assignment.updateUsers({params: req, body: req2}, res)).toEqual(res.status(200).json(ass2));
	})
});

describe ('PUT /assignment/:assignmentId/users invalid tests', () => {
	test('PUT /assignment/:assignmentId/users req empty', () => {
		var req = {}
		expect(assignment.updateUsers({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})
	
	test('PUT /assignment/:assignmentId/users params empty', () => {
		var req = {}
		expect(assignment.updateUsers({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('PUT /assignment/:assignmentId/users assignment not found', () => {
		var req = {
			assignmentId: "not exists"
		}
		var req2 = {
			userGroupId: userGroupFunc.writeUserGroup(newUserGroup2)
		}
		expect(assignment.updateUsers({params: req, body: req2}, res)).toEqual(res.status(404).json("Assignment not found"));
	})

	test('PUT /assignment/:assignmentId/users userGroup not found', () => {
		var ass = {
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
		}
		var req = {
			assignmentId: assignmentFunc.addAssignment(ass)
		}
		var req2 = {
			userGroupId: "not exists"
		}
		expect(assignment.updateUsers({params: req, body: req2}, res)).toEqual(res.status(404).json("UserGroup not found"));
	})
});


//	/assignment/:assignmentId/tasks
describe ('GET /assignment/:assignmentId/tasks valid tests', () => {
	test('GET /assignment/:assignmentId/tasks valid professor', () => {
		var ass = {
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
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

	test('GET /assignment/:assignmentId/tasks assignment not found', () => {
		var req = {
			assignmentId: "not exists"
		}
		expect(assignment.getTasksByIdAssignment({params: req}, res)).toEqual(res.status(404).json("Assignment not found"));
	})
});


describe ('PUT /assignment/:assignmentId/tasks valid tests', () => {
	test('PUT /assignment/:assignmentId/tasks valid users', () => {
		var ass = {
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
		}
		var req = {
			assignmentId: assignmentFunc.addAssignment(ass)
		}

		var req2 = {
			taskGroupId: taskGroupFunc.addTaskGroup(newTaskGroup2)
		}

		var ass2 = {
			title: "ingegneria",
			professor: ass["professor"],
			userGroup: ass["userGroup"],
			taskGroup: req2["taskGroupId"],
			start: "12.00",
			deadline: "2"
		}		
		
		expect(assignment.updateTasks({params: req, body: req2}, res)).toEqual(res.status(200).json(ass2));
	})
});

describe ('PUT /assignment/:assignmentId/tasks invalid tests', () => {
	test('PUT /assignment/:assignmentId/tasks req empty', () => {
		var req = {}
		expect(assignment.updateTasks({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})
	
	test('PUT /assignment/:assignmentId/tasks params empty', () => {
		var req = {}
		expect(assignment.updateTasks({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('PUT /assignment/:assignmentId/tasks assignment not found', () => {
		var req = {
			assignmentId: "not exists"
		}
		var req2 = {
			taskGroupId: taskGroupFunc.addTaskGroup(newTaskGroup2)
		}
		expect(assignment.updateTasks({params: req, body: req2}, res)).toEqual(res.status(404).json("Assignment not found"));
	})

	test('PUT /assignment/:assignmentId/tasks taskGroup not found', () => {
		var ass = {
			title: "ingegneria",
			professor: userFunc.createUser(newUser),
			userGroup: userGroupFunc.writeUserGroup(newUserGroup),
			taskGroup: taskGroupFunc.addTaskGroup(newTaskGroup),
			start: "12.00",
			deadline: "2"
		}
		var req = {
			assignmentId: assignmentFunc.addAssignment(ass)
		}
		var req2 = {
			taskGroupId: "not exists"
		}
		expect(assignment.updateTasks({params: req, body: req2}, res)).toEqual(res.status(404).json("TaskGroup not found"));
	})
});