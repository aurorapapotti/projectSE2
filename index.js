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

app.get('/user/:idUser/tasks', user.getTasksByIdUser); //teskOK
app.post('/user/:idUser/tasks', task.createTaskByIdUser); //testOK
app.get('/user/:idUser/tasks/:idTask', user.getTaskByIdUser); //teskOK
app.put('/user/:idUser/tasks/:idTask', task.putTaskByIdUser); //testOK
app.delete('/user/:idUser/tasks/:idTask', task.deleteTaskByIdUser); //testOK

app.get('/user/:idUser/taskGroups', user.getTaskGroupsByIdUser); //testOK
app.post('/user/:idUser/taskGroups', taskGroup.createTaskGroupByIdUser); //testOK
app.get('/user/:idUser/taskGroups/:idTaskGroup', user.getTaskGroupByIdUser); //testOK
app.put('/user/:idUser/taskGroups/:idTaskGroup', taskGroup.putTaskGroupByIdUser); //testOK
app.delete('/user/:idUser/taskGroups/:idTaskGroup', taskGroup.deleteTaskGroupByIdUser); //testOK

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

app.get('/user/:idUser/peerReviews', user.getPeerReviewsByIdUser); //testOK
//app.post('/user/:idUser/taskAnswers/:idTaskAnswer/peerReviews', peerReview.createPeerReviewByIdUser);
app.get('/user/:idUser/peerReviews/:idPeerReview', user.getPeerReviewByIdUser); //testOk
//app.put('/user/:idUser/taskAnswers/:idTaskAnswer/peerReviews/:idPeerReview', peerReview.putPeerReviewByIdUser);
//app.delete('/user/:idUser/peerReviews/:idPeerReview', peerReview.deletePeerReviewByIdUser);

//REVIEW
app.post("/reviews", review.createReview); //testOK
app.get("/reviews", review.getAllReviews); //testOK
app.get("/reviews/:reviewId", review.getReview); //testOK
app.get("/reviews/:reviewId/peerReviews", review.getAllPeerReviews); //testOK
app.get("/reviews/:reviewId/peerReviews/:peerReviewId", review.getPeerReview); //testOK
app.get("/reviews/:reviewId/taskAnswers", review.getAllTaskAnswers); //testOK
app.get("/reviews/:reviewId/taskAnswers/:taskAnswerId", review.getTaskAnswer); //testOK
app.delete("/reviews/:reviewId", review.deleteReview); //testOK
app.put("/reviews/:reviewId/peerReviews/:peerReviewId", review.editPeerReview); //testOK
app.put("/reviews/:reviewId/taskAnswers/:taskAnswerId", review.editTaskAnswer); //testOK
app.put("/reviews/:reviewId/vote", review.editVote); //testOK

//TASK ANSWER
app.post("/taskAnswers", taskAnswer.createTaskAnswer); //testOK
app.get("/taskAnswers", taskAnswer.getAllTaskAnswers); //testOK
app.get("/taskAnswers/:taskAnswerId", taskAnswer.getTaskAnswer); //testOK
app.get("/taskAnswers/:taskAnswerId/answers", taskAnswer.getAllAnswers); //testOK
app.get("/taskAnswers/:taskAnswerId/answers/:answerId", taskAnswer.getAnswer); //testOK
app.get("/taskAnswers/:taskAnswerId/student", taskAnswer.getStudent); //testOK
app.get("/taskAnswers/:taskAnswerId/assignment", taskAnswer.getAssignment); //testOK
app.get("/taskAnswers/:taskAnswerId/taskGroup", taskAnswer.getTaskGroup); //testOK
app.delete("/taskAnswers/:taskAnswerId", taskAnswer.deleteTaskAnswer); //testOK
app.put("/taskAnswers/:taskAnswerId/assignment", taskAnswer.editAssignment); //testOK
app.put("/taskAnswers/:taskAnswerId/taskGroup", taskAnswer.editTaskGroup); //testOK
app.put("/taskAnswers/:taskAnswerId/student", taskAnswer.editAnswer); //testOK
app.put("/taskAnswers/:taskAnswerId/answers", taskAnswer.editAnswer); //testOK


//USER GROUP
app.get ('/userGroup', userGroup.listUserGroups); //testOK
app.post ('/userGroup', userGroup.createUserGroup); //testOK
app.get ('/userGroup/:userGroupId', userGroup.getUserGroupById); //testOK
app.put ('/userGroup/:userGroupId', userGroup.updateUserGroup); //testOK
app.delete ('/userGroup/:userGroupId', userGroup.deleteUserGroup); //testOK
app.get ('/userGroup/:userGroupId/author', userGroup.getAuthorByIdUserGroup); //testOK
app.get ('/userGroup/:userGroupId/users', userGroup.getUsersByIdUserGroup); //testOK
app.delete ('/userGroup/:userGroupId/users/:userId', userGroup.deleteUserByIdUserGroup); //testOK

//TASK
app.get('/task', task.listAllTasks);
//app.get('/task', task.getTasksByArgument);
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
app.get ('/assignment', assignment.listAllAssignments); //testOK
app.post('/assignment', assignment.createAssignment); //testOK
app.get('/assignment/:assignmentId', assignment.getAssignmentById); //testOK
app.put('/assignment/:assignmentId', assignment.updateAssignment); //testOK
app.delete ('/assignment/:assignmentId', assignment.deleteAssignment); //testOK
app.get ('/assignment/:assignmentId/professor', assignment.getProfessorByIdAssignment); //testOK
app.get ('/assignment/:assignmentId/users', assignment.getUsersByIdAssignment); //testOK
app.put ('/assignment/:assignmentId/users', assignment.updateUsers); //testOK
app.get ('/assignment/:assignmentId/tasks', assignment.getTasksByIdAssignment); //testOK
app.put ('/assignment/:assignmentId/tasks', assignment.updateTasks); //testOK



//PEER REVIEW
app.get('/peerReview', peerReview.listAllPeerReview); //testOK
app.post('/peerReview', peerReview.createPeerReview); //testOK
app.get('/peerReview/:idPeerReview', peerReview.getPeerReview); //testOK
app.put('/peerReview/:idPeerReview', peerReview.putPeerReview); //testOK
app.delete('/peerReview/:idPeerReview', peerReview.deletePeerReview); //testOK


app.listen(PORT, () => console.log('App listening on port'+ PORT))
