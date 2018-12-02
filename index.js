const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const register = require("./src/register.js");
const login = require("./src/login.js");
const review = require("./src/review.js");

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

});

app.get("/reviews/:reviewId/peerReviews/:peerReviewId", (req, res) => {

});


app.listen(PORT, () => console.log('App listening on port'+ PORT))
