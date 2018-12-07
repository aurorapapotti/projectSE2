const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const assignment = require("./src/assignment.js");

app.get('/', (req, res) => res.send('Hello World!'))

//ASSIGNMENT
app.get ('/assignment', function (req, res){
	res.send(assignment.getAllAssignments());
})

app.post ('/assignment', function (req, res){
	res.send(assignment.createAssignment(req, res));
})
//...
app.get ('/assignment/:assignmentId', function (req, res){
	res.send(assignment.getAssignmentById(req, res));
})

app.put ('/assignment/:assignmentId', function (req, res){
	res.send(assignment.updateAssignment(req, res));
})

app.delete ('/assignment/:assignmentId', function (req, res){
	res.send(assignment.deleteAssignment(req, res));
})

app.get ('/assignment/:assignmentId/professor', function(req, res){
	res.send(assignment.getProfessorByIdAssignment(req, res));
})

app.get ('/assignment/:assignmentId/users', function(req, res){
	res.send(assignment.getUsersByIdAssignment(req, res));
})

app.update ('/assignment/:assignmentId/users', function(req, res){
	res.send(assignment.updateUsers(req, res));
})
//...
app.get ('/assignment/:assignmentId/tasks', function(req, res){
	res.send(assignment.getTasksByIdAssignment(req, res));
})

app.update ('/assignment/:assignmentId/tasks', function(req, res){
	res.send(assignment.updateTasks(req, res));
})


app.listen(PORT, () => console.log('App listening on port'+ PORT))
