const persistencyLayer = require('./persistencyLayer.js');

function listUserGroups(req, res) {
  console.log("recived request: ",req.body);
  persistencyLayer.getAllUserGroups();
  res.status(201).send("Found");
}

function createUserGroup(req, res) {
	console.log("recived request: ",req.body);
	const name = req.body.name;
	const author = req.body.author;
	
	var userGroup = new Object();
	userGroup["name"] = name;
	userGroup["author"] = author;
	userGroup["users"] = new Array();
	
	const userGroup = persistencyLayer.writeUserGroup(req.body);
	if (userGroup == null) {
		res.status(400).send("Invalid request");
	}
	else {
		console.log("Created: ",persistencyLayer.getAllUserGroups());
		res.status(201).send(userGroup);
	}
}
//...
function getUserGroup(req, res) {
	console.log("recived request: ",req.params.id);
	const userGroup = persistencyLayer.getUserGroup(req.params.id);
	if (userGroup == null) {
		res.status(400).send("Invalid request");
	}
	else {
		res.status(201).send(userGroup);
	}
}

function getUserGroupById(req, res) {
	var id = req.params.userGroupId;
	console.log("recived request: ", id);
	
	const userGroup = persistencyLayer.getUserGroupById(id);
	if (userGroup == null) {
		res.status(400).send("Invalid request");
	}
	else {
		res.status(201).send(userGroup);
	}
}

function updateUserGroup(req, res){
	//.....
}

function deleteUserGroup(id){
	console.log("received request: ", id);
	console.log(persistencyLayer.deleteUserGroup(id));
}

function getAuthorByIdUserGroup(id){
	console.log("received request: ", id);
	console.log(persistencyLayer.getAuthorByIdUserGroup(id));
}

function getUsersByIdUserGroup(req, res){
	const userGroup = persistencyLayer.getUserGroup(req.params.userGroupId);
	console.log(userGroup);

	if (userGroup === null){
		res.status(400).send("Invalid request");
	}
	else {
		var users = [];
		var allUsers = userGroup["users"];

		for (var i=0; i<allUsers.length; i++){
			console.log("Element: " + allUsers[i]);
			var user = persistencyLayer.getUser(allUsers[i]);

			if (user == null){
				res.status(400).send("Something has gone wrong");
			}
			else {
				users.push(user);
			}
		}

		res.status(200).send(users);
	}
}

function deleteUserByIdUserGroup(req, res){
	const idUserGroup = req.params.userGroupId;
	const idUser = req.params.userId;
	
	var userGroup = getObject(idUserGroup, dbUserGroupPath);
	if(userGroup == null){
		res.status(400).send("Id userGroup null");
	}
	else{
		var users = userGroup["users"];
		for(i = 0; i<users.length; i++){
			if(users[i] == idUser){
				res.status(200).send(users.delete(users[i]));
			}
		}
		res.status(400).send("Id User Not Found");
	}
}




module.exports = {
	listUserGroups: listUserGroups,
    createUserGroup: createUserGroup,
	getUserGroup: getUserGroup,
	getUserGroupById: getUserGroupById,
	updateUserGroup: updateUserGroup,
	deleteUserGroup: deleteUserGroup,
	getAuthorByIdUserGroup: getAuthorByIdUserGroup,
	getUsersByIdUserGroup: deleteUserByIdUserGroup,
	deleteUserByIdUserGroup: deleteUserByIdUserGroup
}