
const usergroupFunc = require('../src/functionsEntities/userGroupFunctions.js');
const userFunc = require('../src/functionsEntities/userFunctions.js');
const usergroup = require("../src/usergroup.js");
const user = require("../src/user.js");

const res = {
	"status": (statuscode) =>{ return {
		"json": (message) => {return {
			"code": statuscode,
			"message": message
		}}
	}}
}

//	/userGroup
describe ('GET /userGroup valid tests', () =>{
	test('GET /userGroup return code 200', () => {
		var req = {};
		expect(usergroup.getAllUserGroups({body: req}, res)).toEqual(res.status(200).json(usergroupFunc.getAllUserGroups));
	})
});

describe ('POST /userGroup valid tests', () =>{
	test('POST /userGroup valid creation', () => {
		var userGroup = {
			name: "classe 1",
			author: "user1",
			users: ["user1", 
					"user2", 
					"user3"]
		}	
		expect(userGroup.createUserGroup({body: userGroup}, res)).toEqual(res.status(201).json("Created."));
	})
});

describe ('POST /userGroup invalid tests', () =>{
	test('POST /userGroup name not string', () => {
		var userGroup = {
			name: 1,
			author: "user1",
			users: ["user1", 
					"user2", 
					"user3"]
		}
		expect(userGroup.createUserGroup({body: userGroup}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /userGroup author undefined', () => {
		var userGroup = {
			name: "classe 1",
			users: ["user1", 
					"user2", 
					"user3"]
		}
		expect(userGroup.createUserGroup({body: userGroup}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /userGroup author not exists', () => {
		var userGroup = {
			name: "classe 1",
			author: "a",
			users: ["user1", 
					"user2", 
					"user3"]
		}
		expect(userGroup.createUserGroup({body: userGroup}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /userGroup users undefined', () => {
		var userGroup = {
			name: "classe 1",
			author: "user 1"
		}
		expect(userGroup.createUserGroup({body: userGroup}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

//	/userGroup/:userGroupId
describe ('GET /userGroup/:userGroupId valid tests', () =>{
	test('GET /userGroup/:userGroupId return code 200', () => {
		var userGroup = {
			name: "classe 1",
			author: "user 1",
			users: ["user1", 
					"user2", 
					"user3"]
		}
		var req = {
			userGroupId: usergroupFunc.writeUserGroup(userGroup)
		}
		expect(usergroup.getUserGroupById({params: req}, res)).toEqual(res.status(200).json(req["userGroupId"]));
	})
});

describe ('GET /userGroup/:userGroupId invalid tests', () =>{
	test('GET /userGroup/:userGroupId userGroup NOT found', () => {
		var req = {
			userGroupId: "u"
		}
		expect(usergroup.getUserGroupById({params: req}, res)).toEqual(res.status(404).json("UserGroup NOT Found"));
	})

	test('GET /userGroup/:userGroupId req empty', () => {
		var req = {}
		expect(usergroup.getUserGroupById({params: req}, res)).toEqual(res.status(400).json("Bad Request"));
	})
});

describe ('PUT /userGroup/:userGroupId valid tests', () =>{

});

describe ('PUT /userGroup/:userGroupId invalid tests', () =>{

});

describe ('DELETE /userGroup/:userGroupId valid tests', () =>{
	test('DELETE /userGroup/:userGroupId return code 200', () =>{
		var userGroup = {
			name: "classe 1",
			author: "user 1",
			users: ["user1", 
					"user2", 
					"user3"]
		}
		var req = {
			userGroupId: usergroupFunc.writeUserGroup(userGroup)
		}
		expect(usergroup.deleteUserGroup({params: req}, res)).toEqual(res.status(200).json("UserGroup Deleted."));
	})
});

describe ('DELETE /userGroup/:userGroupId invalid tests', () =>{
	test('DELETE /userGroup/:userGroupId userGroup NOT found', () => {
		var req = {
			userGroupId: "1"
		}
		expect(usergroup.deleteUserGroup({params: req}, res)).toEqual(res.status(404).json("UserGroup NOT Found"));
	})

	test('DELETE /userGroup/:userGroupId req empty', () => {
		var req = {}
		expect(usergroup.deleteUserGroup({params: req}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId params empty', () => {
		expect(usergroup.deleteUserGroup({"": req}, res)).toEqual(res.status(400).json("Bad Request"));
	})
});

//	/userGroup/:userGroupId/author
describe ('GET /userGroup/:userGroupId/author valid tests ', () =>{
	test('GET /userGroup/:userGroupId/author valid author', () => {
		var userGroup = {
			name: "classe 1",
			author: "user 1",
			users: ["user1", 
					"user2", 
					"user3"]
		}
		var req = {
			userGroupId: usergroupFunc.writeUserGroup(userGroup)
		}
		expect(usergroup.getAuthorByIdUserGroup({param: req}, res)).toEqual(res.status(200).json(req["author"]));
	})
});

describe ('GET /userGroup/:userGroupId/author invalid tests', () =>{
	test('GET /userGroup/:userGroupId/author userGroup NOT found', () => {
		var req = {
			userGroupId: "u"
		}
		expect(usergroup.getAuthorByIdUserGroup({params: req}, res)).toEqual(res.status(404).json("UserGroup NOT Found"));
	})

	test('GET /userGroup/:userGroupId/author req empty', () => {
		var req = {}
		expect(usergroup.getAuthorByIdUserGroup({params: req}, res)).toEqual(res.status(400).json("Bad Request"));
	})
});

//	/userGroup/:userGroupId/users
describe ('GET /userGroup/:userGroupId/users valid tests', () =>{
	test('GET /userGroup/:userGroupId/users valid users', () => {
		var userGroup = {
			name: "classe 2",
			author: "user 1",
			users: ["1", "2"]
		}
		var req = {
			userGroupId: userFunc.writeUserGroup(userGroup)
		}
		expect(usergroup.getUsersByIdUserGroup({param: req}, res)).toEqual(res.status(200).json(req["users"]));
	})
});

describe ('GET /userGroup/:userGroupId/users invalid tests', () =>{
	test('GET /userGroup/:userGroupId/users userGroup not Found', () => {
		var req = {
			userGroupId: "1"
		}
		expect(usergroup.getUsersByIdUserGroup({param: req}, res)).toEqual(res.status(400).json("Bad request"));
	})
	
	test('GET /userGroup/:userGroupId/users req empty', () => {
		var req = {}
		expect(usergroup.getUsersByIdUserGroup({param: req}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('GET /userGroup/:userGroupId/users params empty', () => {
		expect(usergroup.getUsersByIdUserGroup({"": req}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

//	/userGroup/:userGroupId/users/:userId
describe ('DELETE /userGroup/:userGroupId/users/:userId valid', () =>{
	test('DELETE /userGroup/:userGroupId/users/:userId return code 200', () =>{
		var userGroup = {
			name: "classe 1",
			author: "user1",
			users: ["user1", 
					"user2", 
					"user3"]
		}

		var user = {
			name: "Marco",
			surname: "Rossi",
			email: "marco.rossi@gmail.com",
			badgeNumber: 185698
		}
		var req = {
			userGroupId: usergroupFunc.writeUserGroup(userGroup),
			userId: userFunc.writeUser(user)
		}
		expect(userGroup.deleteUserByIdUserGroup({param: req}, res)).toEqual(res.status(200).json("Deleted."));
	})
});

describe ('DELETE /userGroup/:userGroupId/users/:userId invalid', () =>{
	test('DELETE /userGroup/:userGroupId/users/:userId userGroup undefined', () => {
		var req = {
			userId: "_88hdk39dj8"
		}
		expect(usergroup.deleteUserByIdUserGroup({params: req}, res)).toEqual(res.status(404).json("UserGroup NOT Found"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId userId undefined', () => {
		var req = {
			userGroupId: "_88hdk39dj8"
		}
		expect(usergroup.deleteUserByIdUserGroup({params: req}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId usergroupId not exists', () => {
		var req = {
			userGroupId: "1",
			userId: "_88hdk39dj8"
		}
		expect(usergroup.deleteUserByIdUserGroup({params: req}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId userId not exists', () => {
		var req = {
			userGroupId: "_88hdk39dj8",
			userId: "1"
		}
		expect(usergroup.deleteUserByIdUserGroup({params: req}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId req empty', () => {
		var req = {}
		expect(usergroup.deleteUserByIdUserGroup({params: req}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId params is empty', () => {
		expect(usergroup.deleteUserByIdUserGroup({"": req}, res)).toEqual(res.status(400).json("Bad Request"));
	})
});

