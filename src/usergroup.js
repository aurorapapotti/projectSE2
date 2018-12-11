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
	if(req && req.params && req.params.userGroupId){
		var id = req.params.userGroupId;
		var us = userGroupFunc.getUserGroupById(id);

		if(us["id"]){
			return res.status(404).json("UserGroup not found");
		}
		else{
			return res.status(200).json(us);
		}
	}
	else{
		return res.status(400).json("Bad request");
	}
}

function updateUserGroup(req, res){
	if(req && req.params && req.body && req.params.userGroupId && req.body.users){
		var id = req.params.userGroupId;
		var name = req.body.name;
		var authorId = req.body.author;
		var users = req.body.users;

		var us = userGroupFunc.getUserGroupById(id);
		if(us["id"]){
			return res.status(404).json("UserGroup not found");
		}
		else{
			if(typeof name === 'string')
				us["name"] = name;

			var author = userFunc.getUserById(authorId);
			if(author["id"]){
				return res.status(404).json("Author not found");
			}
			else{
				us["author"] = authorId;

				for(i = 0; i<users.length; i++){
					var utente = userFunc.getUser(users[i]);
					if(utente["id"]){
						return res.status(404).json("User not found");
					}
				}
				us["users"] = users;
				userGroupFunc.modifyUserGroup(id, us);
				return res.status(200).json(us);
			}
		}
	}
	else{
		return res.status(400).json("Bad request");
	}
}

function deleteUserGroup(req, res){
	if(req && req.params && req.params.userGroupId){
		var id = req.params.userGroupId;
		var us = userGroupFunc.getUserGroupById(id);

		if(us["id"]){
			return res.status(404).json("UserGroup not found");
		}
		else{
			var deleted = userGroupFunc.deleteUserGroup(id);
			return res.status(200).json(deleted);
		}
	}
	else{
		return res.status(400).json("Bad request");
	}
}

function getAuthorByIdUserGroup(req, res){
	if(req && req.params && req.params.userGroupId){
		var id = req.params.userGroupId;
		var us = userGroupFunc.getUserGroupById(id);

		if(us["id"]){
			return res.status(404).json("UserGroup not found");
		}
		else{
			var authorId = us["author"];
			var author = userFunc.getUser(authorId);
			return res.status(200).json(author);
		}
	}
	else{
		return res.status(400).json("Bad request");
	}
}

function getUsersByIdUserGroup(req, res){
	if(req && req.params && req.params.userGroupId){
		var id = req.params.userGroupId;
		var us = userGroupFunc.getUserGroupById(id);

		if(us["id"]){
			return res.status(404).json("UserGroup not found");
		}
		else{
			var users = us["users"];
			return res.status(200).json(users);
		}
	}
	else{
		return res.status(400).json("Bad request");
	}
}

function deleteUserByIdUserGroup(req, res){
	if(req && req.params && req.params.userGroupId && req.params.userId){
		var userGroupId = req.params.userGroupId;
		var userId = req.params.userId;

		var userGroup = userGroupFunc.getUserGroupById(userGroupId);
		var user = userFunc.getUser(userId);
		var deleted = 0;

		if(userGroup["id"]){
			return res.status(404).json("UserGroup not found");
		}
		else if(user["id"]){
			return res.status(404).json("User not found");
		}
		else{
			var users = userGroup["users"];
			for(i = 0; i<users.length; i++){
				if(users[i] == userId){
					deleted = 1;
					if(i == 0 && users.length == 1){
						users = new Array();
					}
					else{
						users.splice(i, 1);
					}
					userGroup["users"] = users;
					userGroupFunc.modifyUserGroup(userGroupId, userGroup);
					return res.status(200).json(user);
				}
			}
			return res.status(400).json("Bad request");
		}
	}
	else{
		return res.status(400).json("Bad request");
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