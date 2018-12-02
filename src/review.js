const fetch = require("node-fetch");
const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 3000;

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
})

function createReview (req, res) {
	var taskAnswer = req.body.taskAnswer;
	var peerReview = req.body.peerReview;
	
	if (taskAnswer == null || peerReview == null)
		res.status(400).send("Invalid request");
	
	var review = '{"review": {'+
		'"taskAnswer": "'+taskAnswer+'",'+
		'"peerReview": "'+peerReview+'",'+
		'"vote":"1"}'
		
	percistencyLayer.writeReview(review);
	res.status(201).send("Created");
}

function getAllReviews (req, res)  {
	return percistencyLayer.getAllReview(req.query);
}

function getReview (req, res) {
	return percistencyLayer.getReview(req.params.reviewId);
};
/*
app.put("/reviews/:reviewId", (req, res) => {

});


app.delete("/reviews/:reviewId", (req, res) => {

});
*/
app.get("/reviews/:reviewId/peerReviews", (req, res) => {
	const review = percistencyLayer.getReview(req.params.reviewId);

});

app.get("/reviews/:reviewId/peerReviews/:peerReviewId", (req, res) => {

});

/*
app.put("/reviews/:reviewId/peerReviews/:peerReviewId", (req, res) => {

});

app.get("/reviews/:reviewId/taskAnswers/:taskAnswerId", (req, res) => {

});

app.put("/reviews/:reviewId/taskAnswers/:taskAnswerId", (req, res) => {

});
*/
module.exports = {
	createReview: createReview,
	getAllReviews: getAllReviews
}

//app.listen(PORT, () => console.log("App listening on PORT "+ PORT));