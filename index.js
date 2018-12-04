const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());

const register = require("./src/register.js");
const login = require("./src/login.js");
const userGroup = require("./src/usergroup.js");

app.get('/', (req, res) => res.send('Hello World!'))

//REGISTER
app.post ('/register', function(req, res){
  res.send(register.registerUser(req, res));
})

//LOGIN
app.post ('/login', function(req, res){
  res.send(login.loginUser(req,res));
})

//USER GROUP
app.get ('/userGroup', function(req, res)){
	res.send(userGroup.listUserGroups(req, res));
}

app.post ('/userGroup', function(req, res)){
	res.send(userGroup.createUserGroup(req, res));
}
//---
app.get ('/userGroup/userGroupId', function(id)){
	res.send(userGroup.getUserGroupById(id));
}

app.put ('/userGroup/userGroupId', function(req, res)){
	res.send(userGroup.updateUserGroup(req, res));
}

app.delete ('/userGroup/userGroupId', function(id)){
	res.send(userGroup.deleteUserGroup(id));
}
//...
app.get ('/userGroup/Author', function(req, res)){
	res.send(userGroup.getAuthorByIdUserGroup(req.params.id));
}
//...
app.get ('/userGroup/userGroupId/users', function(req, res)){
	res.send(userGroup.getUsersByIdUserGroup(req.params.id));
}
//...
app.delete ('/userGroup/userGroupId/users/userId', function (req, res)){
	res.send(userGroup.deleteUserByIdUserGroup(req.params.id));
}



app.listen(PORT, () => console.log('App listening on port'+ PORT))
