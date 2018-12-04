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
app.post ('/register', function(req, res){
  res.send(register.registerUser(req, res));
})

//LOGIN
app.post ('/login', function(req, res){
  res.send(login.loginUser(req,res));
})

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

app.listen(PORT, () => console.log('App listening on port '+ PORT))
