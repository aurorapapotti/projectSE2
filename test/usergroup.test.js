
const usergroupFunc = require('../src/functionsEntities/userGroupFunctions.js');
const userFunc = require('../src/functionsEntities/userFunctions.js');
const usergroup = require("../src/usergroup.js");
const user = require("../src/user.js");

const res = {
	"status": (statuscode) =>{ return {
		"json": (list) => {return {
			"code": statuscode,
			"list": list
		}}
	}}
}

const userGroup = {
	name: "classe 1",
	author: "user1",
	users: ["user1", 
			"user2", 
			"user3"]
}

//	/userGroup
describe ('GET /userGroup valid tests', () =>{
	test('GET /userGroup return code 200', () => {
		var req = {};
		expect(usergroup.listUserGroups({"body": req}, res)).toEqual(res.status(200).json(usergroupFunc.getAllUserGroups));
	})
});

describe ('GET /userGroup invalid tests', () =>{
	test('GET /userGroup req undefined', () => {
		expect(usergroup.listUserGroups(undefined, res)).toEqual(res.status(400).json("Bad Request"));
	})
});

describe ('POST /userGroup valid tests', () =>{
	test('POST /userGroup valid creation', () => {
		expect(userGroup.createUserGroup({"params":{"name": nome, "author": author, "users": users}}, res)).toEqual(res.status(200).json("Created."));
	})
});

describe ('POST /userGroup invalid tests', () =>{
	test('POST /userGroup name not string', () => {
		var name = 1;
		expect(userGroup.createUserGroup({"params":{"name": nome, "author": author, "users": users}}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /userGroup author null', () => {
		var us = usergroup.getUserGroupById(userGroupId);
		var author = us["author"];
		if(author == null)
			expect(userGroup.createUserGroup({"params":{"name": nome, "author": author, "users": users}}, res)).toEqual(res.status(400).json("Bad request"));
	})

	test('POST /userGroup users null', () => {
		var us = usergroup.getUserGroupById(userGroupId);
		var users = us["users"];
		if(users == null)
			expect(userGroup.createUserGroup({"params":{"name": nome, "author": author, "users": users}}, res)).toEqual(res.status(400).json("Bad request"));
	})
});

//	/userGroup/:userGroupId
describe ('GET /userGroup/:userGroupId valid tests', () =>{
	test('GET /userGroup/:userGroupId return code 200', () => {
		var userGroupId = usergroup.createUserGroup(req, res);
		var us = usergroup.getUserGroupById(userGroupId);
		expect(usergroup.getUserGroupById({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(200).json(us));
	})
});

describe ('GET /userGroup/:userGroupId invalid tests', () =>{
	test('GET /userGroup/:userGroupId userGroup NOT found', () => {
		var userGroupId = "_ciao";
		expect(usergroup.getUserGroupById({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(404).json("UserGroup NOT Found"));
	})

	test('GET /userGroup/:userGroupId usergroupId is a number', () => {
		var userGroupId = 834389;
		expect(usergroup.getUserGroupById({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('GET /userGroup/:userGroupId usergroupId is undefined', () => {
		var userGroupId = undefined;
		expect(usergroup.getUserGroupById({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('GET /userGroup/:userGroupId usergroupId is NULL', () => {
		var userGroupId = null;
		expect(usergroup.getUserGroupById({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('GET /userGroup/:userGroupId params is undefined', () => {
		var userGroupId = "_jhdsd4783x";
		expect(usergroup.getUserGroupById({"": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('GET /userGroup/:userGroupId req is undefined', () => {
		expect(usergroup.getUserGroupById(undefined, res)).toEqual(res.status(400).json("Bad Request"));
	})
});

describe ('PUT /userGroup/:userGroupId valid tests', () =>{

});

describe ('PUT /userGroup/:userGroupId invalid tests', () =>{

});

describe ('DELETE /userGroup/:userGroupId valid tests', () =>{
	test('DELETE /userGroup/:userGroupId return code 200', () =>{
		var userGroupId = usergroupFunc.createUserGroup(userGroup);
		expect(usergroup.deleteUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(200).json("UserGroup Deleted."));
	})
});

describe ('DELETE /userGroup/:userGroupId invalid tests', () =>{
	test('DELETE /userGroup/:userGroupId userGroup NOT found', () => {
		var userGroupId = "_ciao";
		expect(usergroup.deleteUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(404).json("UserGroup NOT Found"));
	})

	test('DELETE /userGroup/:userGroupId usergroupId is a number', () => {
		var userGroupId = 834389;
		expect(usergroup.deleteUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId usergroupId is undefined', () => {
		var userGroupId = undefined;
		expect(usergroup.deleteUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId usergroupId is NULL', () => {
		var userGroupId = null;
		expect(usergroup.deleteUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId params is undefined', () => {
		var userGroupId = "_jhdsd4783x";
		expect(usergroup.deleteUserGroup({"": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId req is undefined', () => {
		expect(usergroup.deleteUserGroup(undefined, res)).toEqual(res.status(400).json("Bad Request"));
	})
});

//	/userGroup/:userGroupId/author
describe ('GET /userGroup/:userGroupId/author valid tests ', () =>{
	test('GET /userGroup/:userGroupId/author valid author', () => {
		var id = "_jhdsd4783x";
		var author = usergroup.getAuthorByIdUserGroup(id);
		expect(usergroup.getAuthorByIdUserGroup({"param": {"idUserGroup": userGroupId, "author": author}}, res)).toEqual(res.status(200).json("Author received."));
	})
});

describe ('GET /userGroup/:userGroupId/author invalid tests', () =>{
	test('DELETE /userGroup/:userGroupId/author userGroup NOT found', () => {
		var userGroupId = "_ciao";
		expect(usergroup.getAuthorByIdUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(404).json("UserGroup NOT Found"));
	})

	test('DELETE /userGroup/:userGroupId/author usergroupId is a number', () => {
		var userGroupId = 834389;
		expect(usergroup.getAuthorByIdUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/author usergroupId is undefined', () => {
		var userGroupId = undefined;
		expect(usergroup.getAuthorByIdUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/author usergroupId is NULL', () => {
		var userGroupId = null;
		expect(usergroup.getAuthorByIdUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/author params is undefined', () => {
		var userGroupId = "_jhdsd4783x";
		expect(usergroup.getAuthorByIdUserGroup({"": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})
});

//	/userGroup/:userGroupId/users
describe ('GET /userGroup/:userGroupId/users valid', () =>{
	test('GET /userGroup/:userGroupId/users valid users', () => {
		var userGroupId = "_jhdsd4783x";
		expect(usergroup.getUsersByIdUserGroup({"param": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(200).json("Users received."));
	})
});

describe ('GET /userGroup/:userGroupId/users invalid', () =>{
	test('DELETE /userGroup/:userGroupId/users userGroup NOT found', () => {
		var userGroupId = "_ciao";
		expect(usergroup.getUsersByIdUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(404).json("UserGroup NOT Found"));
	})

	test('DELETE /userGroup/:userGroupId/users usergroupId is a number', () => {
		var userGroupId = 834389;
		expect(usergroup.getUsersByIdUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/users usergroupId is undefined', () => {
		var userGroupId = undefined;
		expect(usergroup.getUsersByIdUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/users usergroupId is NULL', () => {
		var userGroupId = null;
		expect(usergroup.getUsersByIdUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/users params is undefined', () => {
		var userGroupId = "_jhdsd4783x";
		expect(usergroup.getUsersByIdUserGroup({"": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/users params is undefined', () => {
		var userGroupId = "_jhdsd4783x";
		expect(usergroup.getUsersByIdUserGroup({"": {"idUserGroup": userGroupId, "users": []}}, res)).toEqual(res.status(404).json("Users NOT found"));
	})
});

//	/userGroup/:userGroupId/users/:userId
describe ('DELETE /userGroup/:userGroupId/users/:userId valid', () =>{
	test('DELETE /userGroup/:userGroupId/users/:userId return code 200', () =>{
		var userGroupId = usergroupFunc.getUserGroupById(userGroup);
		var userId = userFunc.getUserById(user);
		expect(usergroup.deleteUserGroup({"params": {"idUserGroup": userGroupId, "idUser": userId}}, res)).toEqual(res.status(200).json("User Deleted from userGroup."));
	})
});

describe ('DELETE /userGroup/:userGroupId/users/:userId invalid', () =>{
	test('DELETE /userGroup/:userGroupId/users/:userId userGroup NOT found', () => {
		var userGroupId = "_ciao";
		expect(usergroup.deleteUserByIdUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(404).json("UserGroup NOT Found"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId userGroupId is a number', () => {
		var userGroupId = 834389;
		expect(usergroup.deleteUserByIdUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId usergroupId is undefined', () => {
		var userGroupId = undefined;
		expect(usergroup.deleteUserByIdUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId usergroupId is NULL', () => {
		var userGroupId = null;
		expect(usergroup.deleteUserByIdUserGroup({"params": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId params is undefined', () => {
		var userGroupId = "_jhdsd4783x";
		expect(usergroup.deleteUserByIdUserGroup({"": {"idUserGroup": userGroupId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId req is undefined', () => {
		expect(usergroup.deleteUserByIdUserGroup(undefined, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId user NOT found', () => {
		var userGroupId = "_jhdsd4783x";
		var userId = "_ciao";
		expect(usergroup.deleteUserByIdUserGroup({"params": {"idUserGroup": userGroupId, "idUser": userId}}, res)).toEqual(res.status(404).json("User NOT Found"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId userGroupId is a number', () => {
		var userGroupId = "_jhdsd4783x";
		var userId = 834389;
		expect(usergroup.deleteUserByIdUserGroup({"params": {"idUserGroup": userGroupId, "idUser": userId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId usergroupId is undefined', () => {
		var userGroupId = "_jhdsd4783x";
		var userId = undefined;
		expect(usergroup.deleteUserByIdUserGroup({"params": {"idUserGroup": userGroupId, "idUser": userId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})

	test('DELETE /userGroup/:userGroupId/users/:userId usergroupId is NULL', () => {
		var userGroupId = "_jhdsd4783x";
		var userId = null;
		expect(usergroup.deleteUserByIdUserGroup({"params": {"idUserGroup": userGroupId, "idUser": userId}}, res)).toEqual(res.status(400).json("Bad Request"));
	})
});

