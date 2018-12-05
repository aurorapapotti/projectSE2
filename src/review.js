const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const reviewFunc = require("./functionEntities/reviewFunctions.js");
const peerReviewFunc = require("./functionEntities/peerReviewFunctions.js");
const taskAnswerFunc = require("./functionEntities/taskAnswerFunctions.js");

function createReview (req, res) {
	var taskAnswer = req.body.taskAnswer;
	var peerReview = req.body.peerReview;
	
	if (taskAnswer == null || peerReview == null)
		res.status(400).send("Invalid request");
	
	var review = new Object();
	review["taskAnswer"] = new Array();
	review["taskAnswer"].push(taskAnswer);
	review["peerReview"] = new Array();
	review["peerReview"].push(peerReview);	
		
	reviewFunc.writeReview(review);
	res.status(201).send("Created");
}

function getAllReviews (req, res)  {
	res.status(200).send(reviewFunc.getAllReviews());
}

function getReview (req, res) {
	const review = reviewFunc.getReview(req.params.reviewId);
	if (review == null) {
		res.status(400).send("Invalid request");
	}
	else {
		res.status(200).send(review);
	}
}

function getAllPeerReviews (req, res) {
	const review = reviewFunc.getReview(req.params.reviewId);
	console.log(review);

	if (review === null){
		res.status(400).send("Invalid request");
	}
	else {
		var peerReviews = [];
		var allPeerReviews = review["peerReview"];
		console.log(review["peerReview"][0])

		for (var i=0; i<allPeerReviews.length; i++){
			console.log("Element: " + allPeerReviews[i]);
			var peerReview = peerReviewFunc.getPeerReview(allPeerReviews[i]);

			console.log(peerReview);

			if (peerReview == null){
				res.status(400).send("Something has gone wrong");
			}
			else {
				peerReviews.push(peerReview);
			}
		}

		res.status(200).send(peerReviews);
	}
}

function getPeerReview (req, res) {
	const reviewId = req.params.reviewId;
	const peerReviewId = req.params.peerReviewId;

	const review = reviewFunc.getReview(reviewId);
	console.log(review);

	if (review === null){
		res.status(400).send("Invalid request");
	}
	else {
		var allPeerReviews = review["peerReview"];
		
		for (var i=0; i<allPeerReviews.length; i++){
			if (allPeerReviews[i] == peerReviewId){
				res.status(200).send(peerReviewFunc.getPeerReview(allPeerReviews[i]));
			}
		}

		res.status(404).send("Element not found in this review");
	}

}

function getAllTaskAnswer (req, res) {
	const review = reviewFunc.getReview(req.params.reviewId);
	console.log(review);

	if (review === null){
		res.status(400).send("Invalid request");
	}
	else {
		var taskAnswers = [];
		var allTaskAnswer = review["taskAnswer"];

		for (var i=0; i<allTaskAnswer.length; i++){
			console.log("Element: " + allTaskAnswer[i]);
			var taskAnswer = taskAnswerFunc.getTaskAnswer(allTaskAnswer[i]);

			if (taskAnswer == null){
				res.status(400).send("Something has gone wrong");
			}
			else {
				taskAnswers.push(taskAnswer);
			}
		}

		res.status(200).send(taskAnswers);
	}
}

function getTaskAnswer (req, res) {
	const reviewId = req.params.reviewId;
	const taskAnswerId = req.params.taskAnswerId;

	const review = reviewFunc.getReview(reviewId);

	if (review === null){
		res.status(400).send("Invalid request");
	}
	else {
		var allTaskAnswer = review["taskAnswer"];
		
		for (var i=0; i<allTaskAnswer.length; i++){
			if (allTaskAnswer[i] == taskAnswerId){
				res.status(200).send(taskAnswerFunc.getTaskAnswer(allTaskAnswer[i]));
			}
		}

		res.status(404).send("Element not found in this review");
	}

}

function deleteReview (req, res) {
	if (req.params.reviewId == undefined || req.params.reviewId == null){
		res.status(400).send("Invalid request");
	}
	else {
		res.status(201).send(reviewFunc.deleteReview(req.params.reviewId));
	}
}

function addPeerReview (req, res){
	let review = reviewFunc.getReview(req.params.reviewId);
	review["peerReview"].push(req.params.peerReviewId);

	res.status(200).send(reviewFunc.modifyReview(req.params.reviewId, review));
}

function addTaskAnswer (req, res){
	let review = reviewFunc.getReview(req.params.reviewId);
	review["taskAnswer"].push(req.params.taskAnswerId);

	res.status(200).send(reviewFunc.modifyReview(req.params.reviewId, review));
}

module.exports = {
	createReview: createReview,
	getAllReviews: getAllReviews,
	getReview: getReview,
	getAllPeerReviews: getAllPeerReviews,
	getPeerReview: getPeerReview,
	getAllTaskAnswers: getAllTaskAnswer,
	getTaskAnswer: getTaskAnswer,
	deleteReview: deleteReview,
	addPeerReview: addPeerReview,
	addTaskAnswer: addTaskAnswer
}
