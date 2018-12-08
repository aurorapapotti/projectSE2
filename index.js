const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const register = require("./src/register.js");
const login = require("./src/login.js");
const user = require("./src/user.js");
const task = require("./src/task.js");
const taskGroup = require("./src/taskGroup.js");
const userGroup = require("./src/usergroup.js");
const peerReview = require("./src/peerReview.js");
const assignment = require("./src/assignment.js");
const review = require("./src/review.js");
const taskAnswer = require("./src/taskAnswer.js");

app.get('/', (req, res) => res.send('Hello World!'))

//REGISTER
app.post('/register',register.registerUser); //testOK

//LOGIN
app.post('/login', login.loginUser); //testOK

//USER
app.get('/user', user.listAllUsers); //testOK
app.get('/user/:idUser', user.getUser); //testOK
app.put('/user/:idUser', user.putUser); //testOK
app.delete('/user/:idUser', user.deleteUser); //testOK

app.get('/user/:idUser/tasks', user.getTasksByIdUser);
app.post('/user/:idUser/tasks', task.createTaskByIdUser);
app.get('/user/:idUser/tasks/:idTask', user.getTaskByIdUser);
app.put('/user/:idUser/tasks/:idTask', task.putTaskByIdUser);
app.delete('/user/:idUser/tasks/:idTask', task.deleteTaskByIdUser);

app.get('/user/:idUser/taskGroups', user.getTaskGroupsByIdUser);
app.post('/user/:idUser/taskGroups', taskGroup.createTaskGroupByIdUser);
app.get('/user/:idUser/taskGroups/:idTaskGroup', user.getTaskGroupByIdUser);
app.put('/user/:idUser/taskGroups/:idTaskGroup', taskGroup.putTaskGroupByIdUser);
app.delete('/user/:idUser/taskGroups/:idTaskGroup', taskGroup.deleteTaskGroupByIdUser);

//app.get('/user/:idUser/userGroup', user.getUserGroupsByIdUser);
//app.post('/user/:idUser/userGroup', userGroup.createUserGroup);
//app.get('/user/:idUser/userGroup/:idUserGroup', user.getUserGroupByIdUser);
//app.put('/user/:idUser/userGroup/:idUserGroup', userGroup.putUserGroup);
//app.delete('/user/:idUser/userGroup/:idUserGroup', userGroup.deleteUserGroup);

//app.get('/user/:idUser/taskAnswers', user.getTaskAnswersByIdUser);
//app.post('/user/:idUser/assignments/:idAssignment/taskAnswers', taskAnswer.createTaskAnswer);
//app.get('/user/:idUser/taskAnswers/:idTaskAnswer', user.getTaskAnswerByIdUser);
//app.put('/user/:idUser/TaskAnswers/:idTaskAnswer', taskAnswer.putTaskAnswer);
//app.delete('/user/:idUser/TaskAnswers/:idTaskAnswer', taskAnswer.deleteTaskAnswer);

//app.get('/user/:idUser/reviews', user.getReviewsByIdUser);
//app.post('/user/:idUser/taskAnswer/:idTaskAnswer/reviews', review.createReview);
//app.get('/user/:idUser/reviews/:idReview, user.getReviewByIdUser);
//app.put('/user/:idUser/reviews/:idUserGroup', review.putReview;
//app.delete('/user/:idUser/reviews/:idReview', review.deleteReview);

app.get('/user/:idUser/peerReviews', user.getPeerReviewsByIdUser);
app.post('/user/:idUser/taskAnswers/:idTaskAnswer/peerReviews', peerReview.createPeerReviewByIdUser);
app.get('/user/:idUser/peerReviews/:idPeerReview', user.getPeerReviewByIdUser);
app.put('/user/:idUser/taskAnswers/:idTaskAnswer/peerReviews/:idPeerReview', peerReview.putPeerReviewByIdUser);
app.delete('/user/:idUser/peerReviews/:idPeerReview', peerReview.deletePeerReviewByIdUser);


//app.post('/user/:idUser/peerReview', peerReview.createPeerReview);
//app.get('/user/:idUser/assignments', user.getAssignmentsByIdUser);
//app.get('/user/:idUser/assignments/:idAssignment', user.getAssignmentByIdUser);
//app.delete('/user/:idUser/assignments/:idAssignment', user.deleteAssignmentByIdUser);

/*
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
})*/

//TASK
app.get('/task', task.listAllTasks);
app.get('/task', task.getTasksByArgument);
app.get('/task/:idTask', task.getTask);
app.post('/task', task.createTask);
app.delete('/task/:idTask', task.deleteTask);

//TASKGROUP
app.get('/taskGroup', taskGroup.listAllTaskGroups);
app.get('/taskGroup', taskGroup.getTaskGroupByName);
app.get('/taskGroup/:idTaskGroup', taskGroup.getTaskGroup);
app.post('/taskGroup', taskGroup.createTaskGroup);
app.put('/taskGroup/:idTaskGroup', taskGroup.putTaskGroup);
app.delete('/taskGroup/:idTaskGroup', taskGroup.deleteTaskGroup);

//ASSIGNMENT
app.get('/assignment', assignment.listAllAssignments);
app.post('/assignment', assignment.createAssignment);

/*
//ASSIGNMENT
app.get ('/assignment', function (req, res){
	res.send(assignment.getAllAssignments());
})

app.post ('/assignment', function (req, res){
	res.send(assignment.createAssignment(req, res));
})

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

app.get ('/assignment/:assignmentId/tasks', function(req, res){
	res.send(assignment.getTasksByIdAssignment(req, res));
})

app.update ('/assignment/:assignmentId/tasks', function(req, res){
	res.send(assignment.updateTasks(req, res));
})*/

//REVIEW
app.post("/reviews", (req, res) => {
  res.send(review.createReview(req, res));
})

app.get("/reviews", (req, res) => {
  res.send(review.getAllReviews(req, res));
})

app.get("/reviews/:reviewId", (req, res) => {
  res.send(review.getReview(req, res));
});

app.get("/reviews/:reviewId/peerReviews", (req, res) => {
  res.send(review.getAllPeerReviews(req, res));
});

app.get("/reviews/:reviewId/peerReviews/:peerReviewId", (req, res) => {
  res.send(review.getPeerReview(req, res));
});

app.get("/reviews/:reviewId/taskAnswers", (req, res) => {
  res.send(review.getAllTaskAnswers(req, res));
});

app.get("/reviews/:reviewId/taskAnswers/:taskAnswerId", (req, res) => {
  res.send(review.getTaskAnswer(req, res));
});

app.delete("/reviews/:reviewId", (req, res) => {
  res.send(review.deleteReview(req, res));
});

app.put("/reviews/:reviewId/peerReviews/:peerReviewId", (req, res) => {
  res.send(review.addPeerReview(req, res));
});

app.put("/reviews/:reviewId/taskAnswers/:taskAnswerId", (req, res) => {
  res.send(review.addTaskAnswer(req, res));
});

app.post("/taskAnswers", (req, res) => {
  res.send(taskAnswer.createTaskAnswer(req, res));
});

app.get("/taskAnswers", (req, res) => {
  res.send(taskAnswer.getAllTaskAnswers(req, res));
});

app.get("/taskAnswers/:taskAnswerId", (req, res) => {
  res.send(taskAnswer.getTaskAnswer(req, res));
});

app.get("/taskAnswers/:taskAnswerId/answers", (req, res) => {
  res.send(taskAnswer.getAllAnswers(req, res));
});

app.get("/taskAnswers/:taskAnswerId/answers/:answerId", (req, res) => {
  res.send(taskAnswer.getAnswer(req, res));
});


//PEER REVIEW
app.get('/peerReview', peerReview.listAllPeerReview);
app.post('/peerReview', peerReview.createPeerReview);
app.get('/peerReview/:idPeerReview', peerReview.getPeerReview);
app.put('/peerReview/:idPeerReview', peerReview.putPeerReview);
app.delete('/peerReview/:idPeerReview', peerReview.deletePeerReview);


app.listen(PORT, () => console.log('App listening on port'+ PORT))
