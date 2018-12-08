const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const reviewFunc = require("./functionEntities/reviewFunctions.js");
const peerReviewFunc = require("./functionEntities/peerReviewFunctions.js");
const taskAnswerFunc = require("./functionEntities/taskAnswerFunctions.js");

function createReview (req, res) {
	if (req.body.taskAnswer && req.body.peerReview){
		var taskAnswer = req.body.taskAnswer;
		var peerReview = req.body.peerReview;
		
		var review = new Object();
		review["taskAnswer"] = new Array();
		review["taskAnswer"].push(taskAnswer);
		review["peerReview"] = new Array();
		review["peerReview"].push(peerReview);
		review["vote"] = 0;	
			
		reviewFunc.writeReview(review);
		return res.status(201).json("Created");
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function getAllReviews (req, res)  {
	res.status(200).json(reviewFunc.getAllReviews());
}

function getReview (req, res) {
	if (req.params.reviewId){
		const review = reviewFunc.getReview(req.params.reviewId);
		if (review == null) {
			return res.status(404).json("Review "+req.params.reviewId+"Not found");
		}
		else {
			return res.status(200).json(review);
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function getAllPeerReviews (req, res) {
	if (req.params.reviewId) {
		const review = reviewFunc.getReview(req.params.reviewId);

		if (review === null){
			return res.status(404).json("Review "+req.params.reviewId+"Not found");
		}
		else {
			var peerReviews = [];
			var allPeerReviews = review["peerReview"];

			for (var i=0; i<allPeerReviews.length; i++){
				var peerReview = peerReviewFunc.getPeerReview(allPeerReviews[i]);

				if (peerReview == null){
					return res.status(400).json("Something has gone wrong");
				}
				else {
					peerReviews.push(peerReview);
				}
			}

			return res.status(200).json(peerReviews);
		}
	}
	
}

function getPeerReview (req, res) {
	if (req.params.reviewId && req.params.peerReviewId){
		const reviewId = req.params.reviewId;
		const peerReviewId = req.params.peerReviewId;

		const review = reviewFunc.getReview(reviewId);

		if (review === null){
			return res.status(404).json("Review "+ reviewId + " not found");
		}
		else {
			var allPeerReviews = review["peerReview"];
			
			for (var i=0; i<allPeerReviews.length; i++){
				if (allPeerReviews[i] == peerReviewId){
					return res.status(200).json(peerReviewFunc.getPeerReview(allPeerReviews[i]));
				}
			}

			return res.status(404).json("PeerReview " + peerReviewId + " not found in review "+ reviewId);
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function getAllTaskAnswer (req, res) {
	if (req.params.reviewId){
		const review = reviewFunc.getReview(req.params.reviewId);

		if (review === null){
			return res.status(404).json("Review "+ req.params.reviewId + " not found");
		}
		else {
			var taskAnswers = [];
			var allTaskAnswer = review["taskAnswer"];

			for (var i=0; i<allTaskAnswer.length; i++){
				var taskAnswer = taskAnswerFunc.getTaskAnswer(allTaskAnswer[i]);

				if (taskAnswer == null){
					return res.status(404).json("Something has gone wrong");
				}
				else {
					taskAnswers.push(taskAnswer);
				}
			}

			return res.status(200).json(taskAnswers);
		}
	}
	else {
		return res.status(400).json("Invalid request")
	}
	
}

function getTaskAnswer (req, res) {
	if (req.params.reviewId && req.params.taskAnswerId) {
		const reviewId = req.params.reviewId;
		const taskAnswerId = req.params.taskAnswerId;

		const review = reviewFunc.getReview(reviewId);

		if (review === null){
			return res.status(404).json("Review "+reviewId+" not found");
		}
		else {
			var allTaskAnswer = review["taskAnswer"];
			
			for (var i=0; i<allTaskAnswer.length; i++){
				if (allTaskAnswer[i] == taskAnswerId){
					return res.status(200).json(taskAnswerFunc.getTaskAnswer(allTaskAnswer[i]));
				}
			}

			return res.status(404).send("TaskAnswer "+taskAnswerId+" not found in review "+peerReviewId);
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function deleteReview (req, res) {
	if (req.params.reviewId){
		const deleted = reviewFunc.deleteReview(req.params.reviewId);
		if (deleted !== null)
			return res.status(200).json("Review "+ req.params.reviewId + "deleted");
		else
			return res.status(204);
	}
	else {
		return res.status(400).json("Invalid request");
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

function deletePeerReview (req, res) {

}

function deleteTaskAnswer (req, res) {
	
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
