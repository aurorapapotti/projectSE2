const persistencyLayer = require('./persistencyLayer.js');

function listUserGroups(req, res) {
  console.log("recived request: ",req.body);
  persistencyLayer.getAllUserGroups();
  res.status(201).send("Found");
}

function createUserGroup(req, res) {
  console.log("recived request: ",req.body);
  persistencyLayer.writeUserGroup(req.body);
  console.log("wrote completed: ",persistencyLayer.getAllUserGroups());
  res.status(201).send("Created");
}
//...
function getUserGroup(req, res) {
  console.log("recived request: ",req.params.id);
  persistencyLayer.getUserGroup(req.params.id);
  res.status(201).send("Found");
}

function getUserGroupById(id) {
  console.log("recived request: ", id);
  persistencyLayer.getUserGroupById(id);
  res.status(201).send("Found");
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
		var allUsers = userGroup["user"];

		for (var i=0; i<allUsers.length; i++){
			console.log("Element: " + allUsers[i]);
			var users = persistencyLayer.getUserGroup(allUsers[i]);

			if (users == null){
				res.status(400).send("Something has gone wrong");
			}
			else {
				users.push(user);
			}
		}

		res.status(200).send(users);
	}
}

function deleteUserByIdUserGroup(){
	//...
}




module.exports = {
    createUserGroup: createUserGroup,
	getUserGroup: getUserGroup,
	getUserGroupById: getUserGroupById,
	listUserGroups: listUserGroups,
	updateUserGroup: updateUserGroup,
	deleteUserGroup: deleteUserGroup,
	getAuthorByIdUserGroup: getAuthorByIdUserGroup
}