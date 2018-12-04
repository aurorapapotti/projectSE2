const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());

const register = require("./src/register.js");
const login = require("./src/login.js");
const assignment = require("./src/assignment.js");

app.get('/', (req, res) => res.send('Hello World!'))

//REGISTER
app.post ('/register', function(req, res){
  res.send(register.registerUser(req, res));
})

//LOGIN
app.post ('/login', function(req, res){
  res.send(login.loginUser(req,res));
})

//ASSIGNMENT
app.get ('/assignment', function ()){
	res.send(assignment.getAllAssignments());
}

app.post ('/assignment', function (req, res)){
	res.send(assignment.createAssignment(req, res));
}
//...
app.get ('/assignment/assignmentId', function (id)){
	res.send(assignment.getAssignmentById(id));
}

app.put ('/assignment/assignmentId', function (req, res)){
	res.send(assignment.updateAssignment(req, res));
}

app.delete ('/assignment/assignmentId', function (id)){
	res.send(assignment.deleteAssignment(id));
}
//...
app.get ('/assignment/Professor', function(req, res)){
	res.send(assignment.getProfessor(req, res));
}
//...
app.get ('/assignment/assignmentId/users', function(id)){
	res.send(assignment.getUsers(id));
}

app.update ('/assignment/assignmentId/users', function(id)){
	res.send(assignment.updateUsers(id));
}
//...
app.get ('/assignment/assignmentId/tasks', function(id)){
	res.send(assignment.getTasks(id));
}

app.update ('/assignment/assignmentId/tasks', function(id)){
	res.send(assignment.updateTasks(id));
}



app.listen(PORT, () => console.log('App listening on port'+ PORT))
