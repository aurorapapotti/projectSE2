const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const register = require("./src/register.js");
const login = require("./src/login.js");
const review = require("./src/review.js");
const taskAnswer = require("./src/taskAnswer.js");

app.get('/', (req, res) => res.send('Hello World!'))

//REGISTER
app.post ('/register', register.registerUser(req, res));

//LOGIN
app.post ('/login', login.loginUser(req,res));

//REVIEW
app.post("/reviews", review.createReview(req, res));

app.get("/reviews", review.getAllReviews(req, res));  

app.get("/reviews/:reviewId", review.getReview(req, res));

app.get("/reviews/:reviewId/peerReviews", review.getAllPeerReviews(req, res));

app.get("/reviews/:reviewId/peerReviews/:peerReviewId", review.getPeerReview(req, res));

app.get("/reviews/:reviewId/taskAnswers", review.getAllTaskAnswers(req, res));

app.get("/reviews/:reviewId/taskAnswers/:taskAnswerId", review.getTaskAnswer(req, res));

app.delete("/reviews/:reviewId", review.deleteReview(req, res));

app.put("/reviews/:reviewId/peerReviews/:peerReviewId", res.send(review.addPeerReview(req, res));

app.put("/reviews/:reviewId/taskAnswers/:taskAnswerId", review.addTaskAnswer(req, res));

app.post("/taskAnswers", taskAnswer.createTaskAnswer(req, res));

app.get("/taskAnswers", taskAnswer.getAllTaskAnswers(req, res));

app.get("/taskAnswers/:taskAnswerId", taskAnswer.getTaskAnswer(req, res));

app.get("/taskAnswers/:taskAnswerId/answers", taskAnswer.getAllAnswers(req, res));

app.get("/taskAnswers/:taskAnswerId/answers/:answerId", taskAnswer.getAnswer(req, res));

app.get("/taskAnswers/:taskAnswerId/student", taskAnswer.getStudent(req, res));

app.get("/taskAnswers/:taskAnswerId/assignment", taskAnswer.getAssignment(req, res));

app.get("/taskAnswers/:taskAnswerId/taskGroup", taskAnswer.getTaskGroup(req, res));

app.delete("/taskAnswers/:taskAnswerId", taskAnswer.deleteTaskAnswer(req, res));

app.put("/taskAnswers/:taskAnswerId/answers", taskAnswer.addAnswer(req, res));

app.put("/taskAnswers/:taskAnswerId/assignment", taskAnswer.editAssignment(req, res));

app.put("/taskAnswers/:taskAnswerId/taskGroup", taskAnswer.editTaskGroup(req, res));

app.put("/taskAnswers/:taskAnswerId/student", taskAnswer.editStudent(req, res));

app.listen(PORT, () => console.log('App listening on port '+ PORT))
