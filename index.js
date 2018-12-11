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
app.post('/register',register.registerUser); 

//LOGIN
app.post('/login', login.loginUser); 

//USER
app.get('/v1/user', user.listAllUsers); 
app.get('/v1/user/:idUser', user.getUser); 
app.put('/v1/user/:idUser', user.putUser); 
app.delete('/v1/user/:idUser', user.deleteUser); 

app.get('/v1/user/:idUser/tasks', user.getTasksByIdUser); 
app.post('/v1/user/:idUser/tasks', task.createTaskByIdUser); 
app.get('/v1/user/:idUser/tasks/:idTask', user.getTaskByIdUser); 
app.put('/v1/user/:idUser/tasks/:idTask', task.putTaskByIdUser); 
app.delete('/v1/user/:idUser/tasks/:idTask', task.deleteTaskByIdUser); 

app.get('/v1/user/:idUser/taskGroups', user.getTaskGroupsByIdUser); 
app.post('/v1/user/:idUser/taskGroups', taskGroup.createTaskGroupByIdUser); 
app.get('/v1/user/:idUser/taskGroups/:idTaskGroup', user.getTaskGroupByIdUser); 
app.put('/v1/user/:idUser/taskGroups/:idTaskGroup', taskGroup.putTaskGroupByIdUser); 
app.delete('/v1/user/:idUser/taskGroups/:idTaskGroup', taskGroup.deleteTaskGroupByIdUser); 

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

app.get('/v1/user/:idUser/peerReviews', user.getPeerReviewsByIdUser);  
//app.post('/user/:idUser/taskAnswers/:idTaskAnswer/peerReviews', peerReview.createPeerReviewByIdUser);
app.get('/v1/user/:idUser/peerReviews/:idPeerReview', user.getPeerReviewByIdUser);  
//app.put('/user/:idUser/taskAnswers/:idTaskAnswer/peerReviews/:idPeerReview', peerReview.putPeerReviewByIdUser);
//app.delete('/user/:idUser/peerReviews/:idPeerReview', peerReview.deletePeerReviewByIdUser);

//REVIEW
app.post("/v1/reviews", review.createReview);  
app.get("/v1/reviews", review.getAllReviews);  
app.get("/v1/reviews/:reviewId", review.getReview);  
app.get("/v1/reviews/:reviewId/peerReviews", review.getAllPeerReviews);  
app.get("/v1/reviews/:reviewId/peerReviews/:peerReviewId", review.getPeerReview);  
app.get("/v1/reviews/:reviewId/taskAnswers", review.getAllTaskAnswers);  
app.get("/v1/reviews/:reviewId/taskAnswers/:taskAnswerId", review.getTaskAnswer);  
app.delete("/v1/reviews/:reviewId", review.deleteReview);  
app.put("/v1/reviews/:reviewId/peerReviews/:peerReviewId", review.editPeerReview);  
app.put("/v1/reviews/:reviewId/taskAnswers/:taskAnswerId", review.editTaskAnswer);  
app.put("/v1/reviews/:reviewId/vote", review.editVote);  

//TASK ANSWER
app.post("/v1/taskAnswers", taskAnswer.createTaskAnswer);  
app.get("/v1/taskAnswers", taskAnswer.getAllTaskAnswers);  
app.get("/v1/taskAnswers/:taskAnswerId", taskAnswer.getTaskAnswer);  
app.get("/v1/taskAnswers/:taskAnswerId/answers", taskAnswer.getAllAnswers);  
app.get("/v1/taskAnswers/:taskAnswerId/answers/:answerId", taskAnswer.getAnswer);  
app.get("/v1/taskAnswers/:taskAnswerId/student", taskAnswer.getStudent);  
app.get("/v1/taskAnswers/:taskAnswerId/assignment", taskAnswer.getAssignment);  
app.get("/v1/taskAnswers/:taskAnswerId/taskGroup", taskAnswer.getTaskGroup);  
app.delete("/v1/taskAnswers/:taskAnswerId", taskAnswer.deleteTaskAnswer);  
app.put("/v1/taskAnswers/:taskAnswerId/assignment", taskAnswer.editAssignment);  
app.put("/v1/taskAnswers/:taskAnswerId/taskGroup", taskAnswer.editTaskGroup);  
app.put("/v1/taskAnswers/:taskAnswerId/student", taskAnswer.editAnswer);  
app.put("/v1/taskAnswers/:taskAnswerId/answers", taskAnswer.editAnswer);  


//USER GROUP
app.get ('/v1/userGroup', userGroup.listUserGroups);  
app.post ('/v1/userGroup', userGroup.createUserGroup);  
app.get ('/v1/userGroup/:userGroupId', userGroup.getUserGroupById);  
app.put ('/v1/userGroup/:userGroupId', userGroup.updateUserGroup);  
app.delete ('/v1/userGroup/:userGroupId', userGroup.deleteUserGroup);  
app.get ('/v1/userGroup/:userGroupId/author', userGroup.getAuthorByIdUserGroup);  
app.get ('/v1/userGroup/:userGroupId/users', userGroup.getUsersByIdUserGroup);  
app.delete ('/v1/userGroup/:userGroupId/users/:userId', userGroup.deleteUserByIdUserGroup);  

//TASK
app.get('/v1/task', task.listAllTasks);
//app.get('/task', task.getTasksByArgument);
app.get('/v1/task/:idTask', task.getTask);
app.post('/v1/task', task.createTask);
app.delete('/v1/task/:idTask', task.deleteTask);

//TASKGROUP
app.get('/v1/taskGroup', taskGroup.listAllTaskGroups);
app.get('/v1/taskGroup', taskGroup.getTaskGroupByName);
app.get('/v1/taskGroup/:idTaskGroup', taskGroup.getTaskGroup);
app.post('/v1/taskGroup', taskGroup.createTaskGroup);
app.put('/v1/taskGroup/:idTaskGroup', taskGroup.putTaskGroup);
app.delete('/v1/taskGroup/:idTaskGroup', taskGroup.deleteTaskGroup);

//ASSIGNMENT
app.get ('/v1/assignment', assignment.listAllAssignments);  
app.post('/v1/assignment', assignment.createAssignment);  
app.get('/v1/assignment/:assignmentId', assignment.getAssignmentById);  
app.put('/v1/assignment/:assignmentId', assignment.updateAssignment);  
app.delete ('/v1/assignment/:assignmentId', assignment.deleteAssignment);  
app.get ('/v1/assignment/:assignmentId/professor', assignment.getProfessorByIdAssignment);  
app.get ('/v1/assignment/:assignmentId/users', assignment.getUsersByIdAssignment);  
app.put ('/v1/assignment/:assignmentId/users', assignment.updateUsers);  
app.get ('/v1/assignment/:assignmentId/tasks', assignment.getTasksByIdAssignment);  
app.put ('/v1/assignment/:assignmentId/tasks', assignment.updateTasks);  

//PEER REVIEW
app.get('/v1/peerReview', peerReview.listAllPeerReview);  
app.post('/v1/peerReview', peerReview.createPeerReview);  
app.get('/v1/peerReview/:idPeerReview', peerReview.getPeerReview);  
app.put('/v1/peerReview/:idPeerReview', peerReview.putPeerReview);  
app.delete('/v1/peerReview/:idPeerReview', peerReview.deletePeerReview);  

app.listen(PORT, () => console.log('App listening on port'+ PORT))
