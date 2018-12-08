const reviewFunc = require("./functionsEntities/reviewFunctions.js");
const peerReviewFunc = require("./functionsEntities/peerReviewFunctions.js");
const taskAnswerFunc = require("./functionsEntities/taskAnswerFunctions.js");

function createReview (req, res) {
	if (req.body.taskAnswer && req.body.peerReview){
		let taskAnswer = req.body.taskAnswer;
		if (taskAnswer[0] === '[' && taskAnswer[taskAnswer.length-1] === ']')
			taskAnswer = taskAnswer.substring(1, taskAnswer.length-1);

		const taskAnswers = taskAnswer.split(",");

		for (var i=0; i<taskAnswers.length; i++){
			let found = taskAnswerFunc.getTaskAnswer(taskAnswers[i]);
			if (found["id"])
				return res.status(404).json("taskAnswer " + taskAnswers[i] + " doesn't exist");
		}

		let peerReview = req.body.peerReview;
		if(peerReview[0] === '[' && peerReview[peerReview.length-1] === ']')
			peerReview = peerReview.substring(1, peerReview.length-1);

		const peerReviews = peerReview.split(",");

		for (var j=0; j<peerReviews.length; j++){
			let found = peerReviewFunc.getPeerReviewById(peerReviews[j]);
			if (found["id"])
				return res.status(404).json("peerReview " + peerReviews[j] + " doesn't exist");
		}

		var review = new Object();
		review["taskAnswer"] = taskAnswers;
		review["peerReview"] = peerReviews;
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