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
app.get ('/assignment/assignmentId', function (req, res)){
	res.send(assignment.getAssignmentById(req, res));
}

app.put ('/assignment/assignmentId', function (req, res)){
	res.send(assignment.updateAssignment(req, res));
}

app.delete ('/assignment/assignmentId', function (req, res)){
	res.send(assignment.deleteAssignment(req, res));
}
//...
app.get ('/assignment/assignmentId/Professor', function(req, res)){
	res.send(assignment.getProfessorByIdAssignment(req, res));
}

app.get ('/assignment/assignmentId/users', function(req, res)){
	res.send(assignment.getUsers(req, res));
}

app.update ('/assignment/assignmentId/users', function(assignmentId)){
	res.send(assignment.updateUsers(assignmentId));
}
//...
app.get ('/assignment/assignmentId/tasks', function(assignmentId)){
	res.send(assignment.getTasks(assignmentId));
}

app.update ('/assignment/assignmentId/tasks', function(assignmentId)){
	res.send(assignment.updateTasks(assignmentId));
}



app.listen(PORT, () => console.log('App listening on port'+ PORT))
