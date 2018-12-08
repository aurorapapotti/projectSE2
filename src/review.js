const reviewFunc = require("./functionsEntities/reviewFunctions.js");
const peerReviewFunc = require("./functionsEntities/peerReviewFunctions.js");
const taskAnswerFunc = require("./functionsEntities/taskAnswerFunctions.js");

function createReview (req, res) {
	if (req.body.taskAnswer && req.body.peerReview && req.body.vote){
		let taskAnswer = req.body.taskAnswer;
		let peerReview = req.body.peerReview;

		//if (taskAnswer.isArray() && peerReview.isArray()){
			for (var i=0; i<taskAnswer.length; i++){
				let found = taskAnswerFunc.getTaskAnswer(taskAnswer[i]);
				if (found["id"])
					return res.status(404).json("taskAnswer " + taskAnswer[i] + " doesn't exist");
			}

			for (var j=0; j<peerReview.length; j++){
				let found = peerReviewFunc.getPeerReviewById(peerReview[j]);
				if (found["id"])
					return res.status(404).json("peerReview " + peerReview[j] + " doesn't exist");
			}

			reviewFunc.writeReview(req.body);
			return res.status(201).json("Created");
		/*}
		else {
			return res.status(400).json("Invalid request: taskAnswer e peerRevie devono essere array")
		}*/
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function getAllReviews (req, res)  {
	return res.status(200).json(reviewFunc.getAllReviews());
}

function getReview (req, res) {
	if (req.params.reviewId){
		const review = reviewFunc.getReview(req.params.reviewId);
		if (review["id"]) {
			return res.status(404).json("Review "+req.params.reviewId+" not found");
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

		if (review["id"]){
			return res.status(404).json("Review "+req.params.reviewId+"Not found");
		}
		else {
			var peerReviews = [];
			var allPeerReviews = review["peerReview"];

			for (var i=0; i<allPeerReviews.length; i++){
				var peerReview = peerReviewFunc.getPeerReviewById(allPeerReviews[i]);

				if (peerReview["id"]){
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

		if (review["id"]){
			return res.status(404).json("Review "+ req.params.reviewId + " not found");
		}
		else {
			var taskAnswers = [];
			var allTaskAnswer = review["taskAnswer"];

			for (var i=0; i<allTaskAnswer.length; i++){
				var taskAnswer = taskAnswerFunc.getTaskAnswer(allTaskAnswer[i]);

				if (taskAnswer["id"]){
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

		if (review["id"]){
			return res.status(404).json("Review "+reviewId+" not found");
		}
		else {
			var allTaskAnswer = review["taskAnswer"];
			
			for (var i=0; i<allTaskAnswer.length; i++){
				if (allTaskAnswer[i] == taskAnswerId){
					return res.status(200).json(taskAnswerFunc.getTaskAnswer(allTaskAnswer[i]));
				}
			}

			return res.status(404).json("TaskAnswer "+taskAnswerId+" not found in review "+ reviewId);
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function deleteReview (req, res) {
	if (req.params.reviewId){
		const deleted = reviewFunc.deleteReview(req.params.reviewId);
		if (deleted["id"] !== undefined){
			return res.status(204);
		}
		else{
			return res.status(200).json("Review "+ req.params.reviewId + " deleted");
		}
	} 
	else {
		return res.status(400).json("Invalid request");
	}
}

function editPeerReview (req, res){
	if (req.params.reviewId && req.params.peerReviewId){
		let review = reviewFunc.getReview(req.params.reviewId);
		if (review !== null) {
			if (req.body.add){
				review["peerReview"].push(req.params.peerReviewId);
				reviewFunc.modifyReview(req.params.reviewId, review)
				return res.status(200).json("Modified");
			}
			else if (req.body.delete) {
				for (let i=0; i<review["peerReview"].length; i++){
					if (review["peerReview"] == req.params.peerReviewId) {
						delete review["peerReview"][i];
						reviewFunc.modifyReview(req.params.reviewId, review)
						return res.status(200).json("Modified");
					}
				}
				return res.status(404).json("PeerReview "+req.params.peerReviewId+" not found in review "+ req.params.reviewId);
			}
		}
		else {
			return res.status(404).json("Review " + req.params.reviewId +" not found");
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
}

function editTaskAnswer (req, res){
	if (req.params.reviewId && req.params.taskAnswerId){
		let review = reviewFunc.getReview(req.params.reviewId);
		if (review !== null) {
			if (req.body.add){
				review["taskAnswer"].push(req.params.taskAnswerId);
				reviewFunc.modifyReview(req.params.reviewId, review)
				return res.status(200).json("Modified");
			}
			else if (req.body.delete) {
				for (let i=0; i<review["taskAnswer"].length; i++){
					if (review["taskAnswer"] == req.params.taskAnswerId) {
						delete review["taskAnswer"][i];
						reviewFunc.modifyReview(req.params.reviewId, review)
						return res.status(200).json("Modified");
					}
				}
				return res.status(404).json("TaskAnswer "+req.params.taskAnswerId+" not found in review "+ req.params.reviewId);
			}
		}
		else {
			return res.status(404).json("Review " + req.params.reviewId +" not found");
		}
	}
	else {
		return res.status(400).json("Invalid request");
	}
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
	editPeerReview: editPeerReview,
	editTaskAnswer: editTaskAnswer
}