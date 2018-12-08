const persistencyLayer = require('./functionEntities/userGroupFunctions.js');
const bodyParser = require("body-parser");

function listUserGroups(req, res) {
	const us = userGroupFunctions.getAllUserGroups();
	if (us == null) {
		res.status(400).send("Invalid request");
	}
	else {
		console.log("GetAll: ",userGroupFunctions.getAllUserGroups());
		res.status(201).send(us);
	}
}

function createUserGroup(req, res) {
	console.log("recived request: ",req.body);
	const name = req.body.name;
	const author = req.body.author;
	const users = req.body.users;
	
	var userGroup = new Object();
	userGroup["name"] = name;
	userGroup["author"] = author;
	userGroup["users"] = new Array();
	//userGroup["users"].push(users);
	
	const us = userGroupFunctions.writeUserGroup(userGroup);
	if (us == null) {
		res.status(400).send("Invalid request");
	}
	else {
		console.log("Created: ",userGroupFunctions.getAllUserGroups());
		res.status(201).send(userGroup);
	}
}

function getUserGroupById(req, res) {
	var id = req.params.userGroupId;
	console.log("recived request: ", id);
	
	const us = userGroupFunctions.getUserGroupById(id);
	if (us == null) {
		res.status(400).send("Invalid request");
	}
	else {
		console.log(us);
		res.status(201).send(us);
	}
}

function updateUserGroup(req, res){
	var id = req.params.userGroupId;
	var name = req.body.name;
	var author = req.body.author;
	var users = req.body.users;

	if(name == undefined && author == undefined && users == undefined){
		res.status(400).send("Cannot Update");
	}
	else{
		const us = userGroupFunctions.getUserGroupById(id);
		if (us == null) {
			res.status(400).send("Id null");
		}
		else {
			console.log("Name: ", name);
			if(typeof name === "string")
				us["name"] = name;
			if(typeof author === "string")
				us["author"] = author;
			if(typeof users === "string"){
				var str = new Array();
				str = users.slice(1,users.length-1);
				var split = str.split(",");			//splitto
				console.log(split);
				for(i = 0; i<split.length; i++){
					us["users"].push(split[i]);
				}
			}
			userGroupFunctions.modifyUserGroup(id, us);

			console.log("Updated.");
			res.status(201).send(us);
		}
	}
}

function deleteUserGroup(req, res){
	var id = req.params.userGroupId;
	console.log("received request: ", id);
	console.log(userGroupFunctions.deleteUserGroup(id));
}

function getAuthorByIdUserGroup(req, res){
	var id = req.params.userGroupId;
	console.log("received request: ", id);
	var us = userGroupFunctions.getUserGroupById(id);
	author = us["author"];
	if(author == null){
		res.status(400).send("Invalid request, authorId null");
	}
	else{
		console.log("Autore: ", author);
		res.status(200).send(author);
	}
}

function getUsersByIdUserGroup(req, res){
	const userGroup = userGroupFunctions.getUserGroupById(req.params.userGroupId);
	console.log("UserGroup: ", userGroup);

	if (userGroup === null){
		res.status(400).send("Invalid request");
	}
	else {
		var users = [];
		var allUsers = userGroup["users"];
		
		for (var i=0; i<allUsers.length; i++){
			console.log("Element: " + allUsers[i]);
			var user = userGroupFunctions.getUser(allUsers[i]);

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

	var trovato = -1;
	var userGroup = userGroupFunctions.getUserGroupById(idUserGroup);
	
	if(userGroup === null){
		res.status(400).send("Id userGroup null");
	}
	else{
		var users = userGroup["users"];
		//console.log("Lunghezza: ", users.length);
		for(var i = 0; i<(users.length) && (trovato ==-1); i++){
			if(users[i] == idUser){			
				trovato = i;
				if(i == 0 && users.length == 1){
					users = new Array();
				}
				else{
					users.splice(i, 1);
				}

				userGroup["users"] = users;
				console.log("Deleted.");
				console.log("Users: ", users);
				userGroupFunctions.modifyUserGroup(idUserGroup, userGroup);	//UPDATE
				res.status(200).send(userGroup);	
			}
		}
		
		if(trovato == -1){
			res.status(400).send("User not Found!");
		}
	}	
}

module.exports = {
	listUserGroups: listUserGroups,
    createUserGroup: createUserGroup,
	getUserGroupById: getUserGroupById,
	updateUserGroup: updateUserGroup,
	deleteUserGroup: deleteUserGroup,
	getAuthorByIdUserGroup: getAuthorByIdUserGroup,
	getUsersByIdUserGroup: getUsersByIdUserGroup,
	deleteUserByIdUserGroup: deleteUserByIdUserGroup
}