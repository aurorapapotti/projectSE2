const userGroupFunc = require('./functionsEntities/userGroupFunctions.js');
const userFunc = require('./functionsEntities/userFunctions.js');

const bodyParser = require("body-parser");

function listUserGroups(req, res) {
	if (!req)
		return res.status(400).json("Bad request");
	return res.status(200).json(userGroupFunc.getAllUserGroups());
}

function createUserGroup(req, res) {
	if(req && req.body && req.body.name && req.body.author && req.body.users){
		const name = req.body.name;
		const authorId = req.body.author;
		const users = req.body.users;

		var author = userFunc.getUser(authorId);
		
		if(author["id"]){
			return res.status(404).json("Author not found");
		}
		else{
			var userGroup = new Object();
			if(typeof name === 'string'){
				userGroup["name"] = name;
			}
			else{
				return res.status(400).json("Bad request");
			}
			userGroup["author"] = authorId;
			
			for(i = 0; i<users.length; i++){
				var us = userFunc.getUser(users[i]);
				if(us["id"]){
					return res.status(404).json("User not found");
				}
			}
			
			userGroup["users"] = users;

			userGroupFunc.writeUserGroup(userGroup);

			console.log("Created: ", userGroupFunc.getAllUserGroups());
			return res.status(201).json("Created");
		}
	}
	else{
		return res.status(400).json("Bad request");
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

	if(id == null || id == undefined){
		res.status(400).json("Invalid request");
	}

	console.log("received request: ", id);
	var us = userGroupFunctions.getUserGroupById(id);
	author = us["author"];
	if(author == null){
		res.status(404).json("Not Found");
	}
	else{
		console.log("Autore: ", author);
		res.status(200).json(author);
	}
}

function getUsersByIdUserGroup(req, res){
	const userGroup = userGroupFunctions.getUserGroupById(req.params.userGroupId);
	console.log("UserGroup: ", userGroup);

	if (userGroup === null){
		res.status(400).send("Invalid request");
	}
	else {
		var users = new Array();
		var allUsers = new Array();
		allUsers = userGroup["users"];
		
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
	
	if(idUser == null || idUser == undefined){
		return res.status(400).json("Id user invalid");
	}
	else if(idUserGroup == null || idUserGroup == undefined){
		return res.status(400).json("Id userGroup invalid");
	}
	else{
		var userGroup = userGroupFunctions.getUserGroupById(idUserGroup);
		var users = new Array();
		users = userGroup["users"];
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
			res.status(400).json("Bad request");
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