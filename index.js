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
const peerReview = require("./src/peerReview.js");
const assignment = require("./src/assignment.js");
const review = require("./src/review.js");
const taskAnswer = require("./src/taskAnswer.js");

app.get('/', (req, res) => res.send('Hello World!'))

//REGISTER
app.post('/register',register.registerUser);

//LOGIN
app.post('/login', login.loginUser);

//USER
app.get('/user', user.listAllUsers);
app.get('/user/:idUser', user.getUser);
app.delete('/user/:idUser', user.deleteUser);
app.get('/user/:idUser/assignments', user.getAssignmentsByIdUser);
app.get('/user/:idUser/assignments/:idAssignment', user.getAssignmentByIdUser);
app.delete('/user/:idUser/assignments/:idAssignment', user.deleteAssignmentByIdUser);
//app.get('/user/:idUser/peerReview', user.getPeerReview

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
app.delete('/taskGroup/:idTaskGroup', taskGroup.deleteTaskGroup);

//ASSIGNMENT
app.get('/assignment', assignment.listAllAssignments);
app.post('/assignment', assignment.createAssignment);

//REVIEW
app.post("/reviews", review.createReview);
app.get("/reviews", review.getAllReviews);
app.get("/reviews/:reviewId", review.getReview);
app.get("/reviews/:reviewId/peerReviews", review.getAllPeerReviews);
app.get("/reviews/:reviewId/peerReviews/:peerReviewId", review.getPeerReview);
app.get("/reviews/:reviewId/taskAnswers", review.getAllTaskAnswers);
app.get("/reviews/:reviewId/taskAnswers/:taskAnswerId", review.getTaskAnswer);
app.delete("/reviews/:reviewId", review.deleteReview);
app.put("/reviews/:reviewId/peerReviews/:peerReviewId", review.editPeerReview);
app.put("/reviews/:reviewId/taskAnswers/:taskAnswerId", review.editTaskAnswer);
app.put("/reviews/:reviewId/vote", review.editVote);

//TASK ANSWER
app.post("/taskAnswers", taskAnswer.createTaskAnswer);
app.get("/taskAnswers", taskAnswer.getAllTaskAnswers);
app.get("/taskAnswers/:taskAnswerId", taskAnswer.getTaskAnswer);
app.get("/taskAnswers/:taskAnswerId/answers", taskAnswer.getAllAnswers);
app.get("/taskAnswers/:taskAnswerId/answers/:answerId", taskAnswer.getAnswer);
app.get("/taskAnswers/:taskAnswerId/student", taskAnswer.getStudent);
app.get("/taskAnswers/:taskAnswerId/assignment", taskAnswer.getAssignment);
app.get("/taskAnswers/:taskAnswerId/taskGroup", taskAnswer.getTaskGroup);
app.delete("/taskAnswers/:taskAnswerId", taskAnswer.deleteTaskAnswer);
app.put("/taskAnswers/:taskAnswerId/assignment", taskAnswer.editAssignment);
app.put("/taskAnswers/:taskAnswerId/taskGroup", taskAnswer.editTaskGroup);
app.put("/taskAnswers/:taskAnswerId/student", taskAnswer.editAnswer);
app.put("/taskAnswers/:taskAnswerId/answers", taskAnswer.editAnswer);

//PEER REVIEW
app.get('/peerReview', peerReview.listAllPeerReview);
app.get('/peerReview/:idPeerReview', peerReview.getPeerReview);

app.listen(PORT, () => console.log('App listening on port'+ PORT))
