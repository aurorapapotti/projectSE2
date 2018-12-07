const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
app.get ('/userGroup', function(req, res){
	res.send(userGroup.listUserGroups(req, res));
})

app.post ('/userGroup', function(req, res){
	res.send(userGroup.createUserGroup(req, res));
})
//---
app.get ('/userGroup/:userGroupId', function(req, res){
	res.send(userGroup.getUserGroupById(req, res));
})

app.put ('/userGroup/:userGroupId', function(req, res){
	res.send(userGroup.updateUserGroup(req, res));
})

app.delete ('/userGroup/:userGroupId', function(req, res){
	res.send(userGroup.deleteUserGroup(req, res));
})
//...
app.get ('/userGroup/:userGroupId/author', function(req, res){
	res.send(userGroup.getAuthorByIdUserGroup(req, res));
})
//...
app.get ('/userGroup/:userGroupId/users', function(req, res){
	res.send(userGroup.getUsersByIdUserGroup(req, res));
})
//...
app.delete ('/userGroup/:userGroupId/users/:userId', function (req, res){
	res.send(userGroup.deleteUserByIdUserGroup(req, res));
})

app.listen(PORT, () => console.log('App listening on port'+ PORT))
