const userGroupFunc = require('../src/functionsEntities/userGroupFunctions.js');
const userFunc = require('../src/functionsEntities/userFunctions.js');
const usergroup = require("../src/usergroup.js");
const user = require("../src/user.js");

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
	badgeNumber: 1234
}

const newUser2 = {
	name: "b",
	surname: "b",
	email: "a@gmail.it",
	badgeNumber: 65
}

const newUserGroup = {
	name: "a",
	author: "a",
	users: ["a"]
}

const newUserGroup2 = {
	name: "c",
	author: "c",
	users: ["a"]
}

//	/userGroup
describe ('GET /userGroup valid tests', () =>{
	test('GET /userGroup return code 200', () => {
		var req = {};
		expect(usergroup.listUserGroups({body: req}, res)).toEqual(res.status(200).json(userGroupFunc.getAllUserGroups()));
	})
});

describe ('POST /userGroup valid tests', () =>{
	test('POST /userGroup valid creation', () => {
		var users = {
			name: "classe 1",
			author: userFunc.createUser(newUser),
			users: [userFunc.createUser(newUser), userFunc.createUser(newUser2)]
		}
		userGroupFunc.writeUserGroup(users);
		expect(usergroup.createUserGroup({body: users}, res)).toEqual(res.status(201).json("Created"));
	})
});

describe ('POST /userGroup invalid tests', () =>{
	test('POST /userGroup name not string', () => {
		var users = {
			name: 1,
			author: userFunc.createUser(newUser),
			users: [userFunc.createUser(newUser), userFunc.createUser(newUser2)]
		}
		userGroupFunc.writeUserGroup(users);
		expect(usergroup.createUserGroup({body: users}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /userGroup author not exists', () => {
		var users = {
			name: "classe 1",
			author: "not exists",
			users: [userFunc.createUser(newUser), userFunc.createUser(newUser2)]
		}
		userGroupFunc.writeUserGroup(users);
		expect(usergroup.createUserGroup({body: users}, res)).toEqual(res.status(404).json("Author not found"));
	})

	test('POST /userGroup user not exists', () => {
		var users = {
			name: "classe 1",
			author: userFunc.createUser(newUser),
			users: [userFunc.createUser(newUser), "not exists"]
		}
		userGroupFunc.writeUserGroup(users);
		expect(usergroup.createUserGroup({body: users}, res)).toEqual(res.status(404).json("User not found"));
	})

	test('POST /userGroup name undefined', () => {
		var users = {
			author: userFunc.createUser(newUser),
			users: [userFunc.createUser(newUser), userFunc.createUser(newUser2)]
		}
		userGroupFunc.writeUserGroup(users);
		expect(usergroup.createUserGroup({body: users}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /userGroup author undefined', () => {
		var users = {
			name: 1,
			users: [userFunc.createUser(newUser), userFunc.createUser(newUser2)]
		}
		userGroupFunc.writeUserGroup(users);
		expect(usergroup.createUserGroup({body: users}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /userGroup users undefined', () => {
		var users = {
			name: 1,
			author: userFunc.createUser(newUser)
		}
		userGroupFunc.writeUserGroup(users);
		expect(usergroup.createUserGroup({body: users}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /userGroup params is empty', () => {
		expect(usergroup.createUserGroup({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

//	/userGroup/:userGroupId
describe ('GET /userGroup/:userGroupId valid tests', () =>{
	test('GET /userGroup/:userGroupId return code 200', () => {
		var users = {
			name: "classe 1",
			author: userFunc.createUser(newUser),
			users: [userFunc.createUser(newUser), userFunc.createUser(newUser2)]
		}
		var req = {
			userGroupId: userGroupFunc.writeUserGroup(users)
		}

		expect(usergroup.getUserGroupById({params: req}, res)).toEqual(res.status(200).json(users));
	})
});

describe ('GET /userGroup/:userGroupId invalid tests', () =>{
	test('GET /userGroup/:userGroupId userGroup NOT found', () => {
		var req = {
			userGroupId: "not exists"
		}
		expect(usergroup.getUserGroupById({params: req}, res)).toEqual(res.status(404).json("UserGroup not found"));
	})

	test('GET /userGroup/:userGroupId req empty', () => {
		var req = {}
		expect(usergroup.getUserGroupById({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('GET /userGroup/:userGroupId params is empty', () => {
		expect(usergroup.getUserGroupById({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

describe ('PUT /userGroup/:userGroupId valid tests', () =>{
	test('PUT /userGroup/:userGroupId return code 200', () => {
		var users = {
			name: "classe 1",
			author: userFunc.createUser(newUser),
			users: [userFunc.createUser(newUser)]
		}
		var req = {
			userGroupId: userGroupFunc.writeUserGroup(users)
		}
		var req2 = {
			name: "classe 100",
			author: userFunc.createUser(newUser),
			users: [userFunc.createUser(newUser2)]
		}

		expect(usergroup.updateUserGroup({params: req, body: req2}, res)).toEqual(res.status(200).json(req2));
	})
});

describe ('PUT /userGroup/:userGroupId invalid tests', () =>{
	test('PUT /userGroup/:userGroupId author not exists', () => {
		var users = {
			name: "classe 1",
			author: userFunc.createUser(newUser),
			users: [userFunc.createUser(newUser)]
		}
		var req = {
			userGroupId: userGroupFunc.writeUserGroup(users)
		}
		var req2 = {
			name: "classe 100",
			author: "not exists",
			users: [userFunc.createUser(newUser2)]
		}

		expect(usergroup.updateUserGroup({params: req, body: req2}, res)).toEqual(res.status(404).json("Author not found"));
	})

	test('PUT /userGroup/:userGroupId userGroup NOT found', () => {
		var req = {
			userGroupId: "not exists"
		}
		var req2 = {
			name: "classe 100",
			author: "not exists",
			users: [userFunc.createUser(newUser2)]
		}
		expect(usergroup.updateUserGroup({params: req, body: req2}, res)).toEqual(res.status(404).json("UserGroup not found"));
	})

	test('PUT /userGroup/:userGroupId req empty', () => {
		var req = {}
		expect(usergroup.updateUserGroup({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('PUT /userGroup/:userGroupId params is empty', () => {
		expect(usergroup.updateUserGroup({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

describe ('DELETE /userGroup/:userGroupId valid tests', () =>{
	test('DELETE /userGroup/:userGroupId return code 200', () =>{
		var users = {
			name: "classe 1",
			author: userFunc.createUser(newUser),
			users: [userFunc.createUser(newUser)]
		}
		var req = {
			userGroupId: userGroupFunc.writeUserGroup(users)
		}
		expect(usergroup.deleteUserGroup({params: req}, res)).toEqual(res.status(200).json(users));
	})
});

describe ('DELETE /userGroup/:userGroupId invalid tests', () =>{
	test('DELETE /userGroup/:userGroupId userGroup NOT found', () => {
		var req = {
			userGroupId: "not exists"
		}
		expect(usergroup.deleteUserGroup({params: req}, res)).toEqual(res.status(404).json("UserGroup not found"));
	})

	test('DELETE /userGroup/:userGroupId req empty', () => {
		var req = {}
		expect(usergroup.deleteUserGroup({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('DELETE /userGroup/:userGroupId params empty', () => {
		expect(usergroup.deleteUserGroup({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

//	/userGroup/:userGroupId/author
describe ('GET /userGroup/:userGroupId/author valid tests ', () =>{
	test('GET /userGroup/:userGroupId/author valid author', () => {
		var users = {
			name: "classe 1",
			author: userFunc.createUser(newUser),
			users: [userFunc.createUser(newUser)]
		}
		var req = {
			userGroupId: userGroupFunc.writeUserGroup(users)
		}
		var author = userFunc.getUser(users["author"]);
		expect(usergroup.getAuthorByIdUserGroup({params: req}, res)).toEqual(res.status(200).json(author));
	})
});

describe ('GET /userGroup/:userGroupId/author invalid tests ', () =>{
	test('GET /userGroup/:userGroupId/author userGroup not found', () => {
		var req = {
			userGroupId: "not exists"
		}
		expect(usergroup.getAuthorByIdUserGroup({params: req}, res)).toEqual(res.status(404).json("UserGroup not found"));
	})

	test('GET /userGroup/:userGroupId/author req empty', () => {
		var req = {}
		expect(usergroup.getAuthorByIdUserGroup({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('GET /userGroup/:userGroupId/author params empty', () => {
		expect(usergroup.getAuthorByIdUserGroup({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

//	/userGroup/:userGroupId/users
describe ('GET /userGroup/:userGroupId/users valid tests', () =>{
	test('GET /userGroup/:userGroupId/users valid users', () => {
		var users = {
			name: "classe 1",
			author: userFunc.createUser(newUser),
			users: [userFunc.createUser(newUser)]
		}
		var req = {
			userGroupId: userGroupFunc.writeUserGroup(users)
		}
		expect(usergroup.getUsersByIdUserGroup({params: req}, res)).toEqual(res.status(200).json(users["users"]));
	})
});

describe ('GET /userGroup/:userGroupId/users invalid tests', () =>{
	test('GET /userGroup/:userGroupId/users userGroup not found', () => {
		var req = {
			userGroupId: "not exists"
		}
		expect(usergroup.getUsersByIdUserGroup({params: req}, res)).toEqual(res.status(404).json("UserGroup not found"));
	})
	
	test('GET /userGroup/:userGroupId/users req empty', () => {
		var req = {}
		expect(usergroup.getUsersByIdUserGroup({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('GET /userGroup/:userGroupId/users params empty', () => {
		expect(usergroup.getUsersByIdUserGroup({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

//	/userGroup/:userGroupId/users/:userId
describe ('DELETE /userGroup/:userGroupId/users/:userId valid', () =>{
	test('DELETE /userGroup/:userGroupId/users/:userId return code 200', () =>{
		var id = userFunc.createUser(newUser);
		var users = {
			name: "classe 1",
			author: userFunc.createUser(newUser),
			users: [id]
		}
		var req = {
			userGroupId: userGroupFunc.writeUserGroup(users),
			userId: id
		}

		expect(usergroup.deleteUserByIdUserGroup({params: req}, res)).toEqual(res.status(200).json(userFunc.getUser(id)));
	})
});

describe ('DELETE /userGroup/:userGroupId/users/:userId invalid', () =>{
	test('DELETE /userGroup/:userGroupId/users/:userId usergroupId not exists', () => {
		var req = {
			userGroupId: "not exists",
			userId: userFunc.createUser(newUser)
		}
		expect(usergroup.deleteUserByIdUserGroup({params: req}, res)).toEqual(res.status(404).json("UserGroup not found"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId userId not exists', () => {
		var req = {
			userGroupId: userGroupFunc.writeUserGroup(newUserGroup),
			userId: "not exists"
		}
		expect(usergroup.deleteUserByIdUserGroup({params: req}, res)).toEqual(res.status(404).json("User not found"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId userId not in UserGroup', () => {
		var id = userFunc.createUser(newUser);
		var id2 = userFunc.createUser(newUser2);

		var users = {
			name: "classe 1",
			author: id,
			users: [id]
		}
		var req = {
			userGroupId: userGroupFunc.writeUserGroup(users),
			userId: id2
		}
		expect(usergroup.deleteUserByIdUserGroup({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId req empty', () => {
		var req = {}
		expect(usergroup.deleteUserByIdUserGroup({params: req}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId params is empty', () => {
		expect(usergroup.deleteUserByIdUserGroup({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});