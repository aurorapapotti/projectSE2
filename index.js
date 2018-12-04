const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());

const register = require("./src/register.js");
const login = require("./src/login.js");
const user = require("./src/user.js");

//app.get('/', (req, res) => res.send('Hello World!'))

//REGISTER
app.post ('/register',register.registerUser);

//LOGIN
app.post ('/login', function(req, res){
  res.send(login.loginUser(req,res));
})

//USER
app.get ('/user', function(req, res){
  res.send(user.listAllUsers(req, res));
})

app.delete ('/user/:idUser', function(req, res){
  res.send(user.deleteUser(req, res));
})

app.get ('/user/:idUser', function(req, res){
  res.send(user.getUser(req, res));
})

app.get('/user/:idUser/assignments', function(req, res){
  res.send(user.getAssignmentsByIdUser(req, res));
})

app.listen(PORT, () => console.log('App listening on port'+ PORT))
