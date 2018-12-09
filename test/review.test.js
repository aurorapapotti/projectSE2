const reviewFunctions = require('../src/functionsEntities/reviewFunctions.js');
const peerReviewFunctions = require('../src/functionsEntities/peerReviewFunctions.js');
const taskAnswerFunctions = require('../src/functionsEntities/taskAnswerFunctions.js');

const createReview = require('../src/review.js').createReview;
const getAllReviews = require("../src/review.js").getAllReviews;
const getReview = require("../src/review.js").getReview;
const getAllPeerReviews = require("../src/review.js").getAllPeerReviews;
const getAllTaskAnswers = require("../src/review.js").getAllTaskAnswers;
const getTaskAnswer = require("../src/review.js").getTaskAnswer;
const deleteReview = require("../src/review.js").deleteReview;
const editTaskAnswer = require("../src/review.js").editTaskAnswer;
const editVote = require("../src/review.js").editVote;

const res = {
	"status": (statuscode) => { 
		return {
	  		"json": (message) => { 
				  return {
					"code": statuscode, 
					"message": message
				}
	   		}
		}
	}
}

describe ("POST /reviews", () => {
    test ("return code 201", async () => {
		var review = {
			taskAnswer: ["1", "2"],
			peerReview: ["1"],
			vote: "3"
		}

		expect(createReview({body: review}, res)).toEqual(res.status(201).json("Created"));
	});

	test ("return code 404 taskAnswer wrong", async () => {
		var review = {
			taskAnswer: ["a", "2"],
			peerReview: ["1"],
			vote: "3"
		}

		expect(createReview({body: review}, res)).toEqual(res.status(404).json("taskAnswer a doesn't exist"));
	});

	test("return code 404 peerReview wrong", async () => {
		var review = {
			taskAnswer: ["1", "2"],
			peerReview: ["a"],
			vote: "3"
		}

		expect(createReview({body: review}, res)).toEqual(res.status(404).json("peerReview a doesn't exist"));
	});

	test("return code 400 taskAnswer undefined", async () => {
		var review = {
			peerReview: ["1"],
			vote: "3"
		}

		expect(createReview({body: review}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 400 peerReview undefined", async () => {
		var review = {
			taskAnswer: ["1", "2"],
			vote: "3"
		}

		expect(createReview({body: review}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 400 vote undefined", async () => {
		var review = {
			taskAnswer: ["1", "2"],
			peerReview: ["1"]
		}

		expect(createReview({body: review}, res)).toEqual(res.status(400).json("Invalid request"));
	});
})

describe ("GET /reviews", () => {
	test("return code 200", async () => {
		expect(getAllReviews({body: {}}, res)).toEqual(res.status(200).json(reviewFunctions.getAllReviews()));
	});
});

describe ("GET /reviews/:reviewId", () => {
	test("return code 200", async () => {
		const newReview = {
			taskAnswer: ["1"],
			peerReview: ["1"],
			vote: "2"
		}
		var req = {
			reviewId: reviewFunctions.writeReview(newReview)
		}
		expect(getReview({params: req},res)).toEqual(res.status(200).json(reviewFunctions.getReview(req["reviewId"])));
	});

	test("return code 404", async () => {
		var req = {
			reviewId: "a"
		}
		expect(getReview({params: req},res)).toEqual(res.status(404).json("Review a not found"));
	});

	test("return code 400", async () => {
		var req = {}
		expect(getReview({params: req},res)).toEqual(res.status(400).json("Invalid request"));
	});
});

describe("GET /reviews/:reviewId/peerReviews", () => {
	//Aspettare funzioni peerReview
	/*test ("return code 200", async () => {
		var newPeerReview = {
			student: "1",
			taskAnswer: "1",
			comment: "1"
		}

		var newReview = {
			taskAnswer: [peerReviewFunctions.(newTaskAnswer)],
			peerReview: ["1"],
			vote: "3"
		}

		var req = {
			reviewId: reviewFunctions.writeReview(newReview)
		}

		var review = reviewFunctions.getReview(req["reviewId"]);
		var taskAnswers = new Array();

		for (var i=0; i<review["taskAnswer"].length; i++){
			var taskAnswer = taskAnswerFunctions.getTaskAnswer(review["taskAnswer"][i]);
			taskAnswers.push(taskAnswer);
		}

		expect(getAllTaskAnswers({params: req}, res)).toEqual(res.status(200).json(taskAnswers));
	});*/

});

describe("GET /reviews/:reviewId/peerReviews/:peerReviewId", () => {
});

describe("GET /reviews/:reviewId/taskAnswers", () => {
	test ("return code 200", async () => {
		var newTaskAnswer = {
			answers: ["1", "2"],
			student: "1",
			assignment: "1",
			task: "1"
		}

		var newReview = {
			taskAnswer: [taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)],
			peerReview: ["1"],
			vote: "3"
		}

		var req = {
			reviewId: reviewFunctions.writeReview(newReview)
		}

		var review = reviewFunctions.getReview(req["reviewId"]);
		var taskAnswers = new Array();

		for (var i=0; i<review["taskAnswer"].length; i++){
			var taskAnswer = taskAnswerFunctions.getTaskAnswer(review["taskAnswer"][i]);
			taskAnswers.push(taskAnswer);
		}

		expect(getAllTaskAnswers({params: req}, res)).toEqual(res.status(200).json(taskAnswers));
	});

	test ("return code 200", async () => {
		var newTaskAnswer = {
			answers: ["1", "2"],
			student: "1",
			assignment: "1",
			task: "1"
		}

		var newReview = {
			taskAnswer: [taskAnswerFunctions.writeTaskAnswer(newTaskAnswer), taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)],
			peerReview: ["1"],
			vote: "3"
		}

		var req = {
			reviewId: reviewFunctions.writeReview(newReview)
		}

		var review = reviewFunctions.getReview(req["reviewId"]);
		var taskAnswers = new Array();

		for (var i=0; i<review["taskAnswer"].length; i++){
			var taskAnswer = taskAnswerFunctions.getTaskAnswer(review["taskAnswer"][i]);
			taskAnswers.push(taskAnswer);
		}

		expect(getAllTaskAnswers({params: req}, res)).toEqual(res.status(200).json(taskAnswers));
	});

	test ("return code 404 taskAnswer wrong", async () => {
		var newReview = {
			taskAnswer: ["a"],
			peerReview: ["1"],
			vote: "3"
		}

		var req = {
			reviewId: reviewFunctions.writeReview(newReview)
		}

		expect(getAllTaskAnswers({params: req}, res)).toEqual(res.status(404).json("Something has gone wrong"));
	});

	test ("return code 404 taskAnswer wrong", async () => {
		var req = {
			reviewId: "a"
		}

		expect(getAllTaskAnswers({params: req}, res)).toEqual(res.status(404).json("Review a not found"));
	});

	test ("return code 400 reviewId undefined", async () => {
		expect(getAllTaskAnswers({params: {}}, res)).toEqual(res.status(400).json("Invalid request"));
	})
});

describe("GET /reviews/:reviewId/taskAnswers/:taskAnswersId", () => {
	test("return code 200", async () => {
		var newTaskAnswer = {
			answers: ["1", "2"],
			student: "1",
			assignment: "1",
			task: "1"
		}

		const searched = taskAnswerFunctions.writeTaskAnswer(newTaskAnswer);
		var newReview = {
			taskAnswer: [taskAnswerFunctions.writeTaskAnswer(newTaskAnswer), searched],
			peerReview: ["1"],
			vote: "3"
		}

		var req = {
			reviewId: reviewFunctions.writeReview(newReview),
			taskAnswerId: searched
		}

		expect(getTaskAnswer({params: req}, res)).toEqual(res.status(200).json(taskAnswerFunctions.getTaskAnswer(searched)));
	});

	test("return code 404 taskAnswerId wrong", () => {
		var newTaskAnswer = {
			answers: ["1", "2"],
			student: "1",
			assignment: "1",
			task: "1"
		}

		var newReview = {
			taskAnswer: [taskAnswerFunctions.writeTaskAnswer(newTaskAnswer), taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)],
			peerReview: ["1"],
			vote: "3"
		}

		var req = {
			reviewId: reviewFunctions.writeReview(newReview),
			taskAnswerId: "a"
		}

		expect(getTaskAnswer({params: req}, res)).toEqual(res.status(404).json("TaskAnswer a not found in review "+req["reviewId"]));
	});

	test("return code 404 reviewId wrong", async () => {
		var req = {
			reviewId: "a",
			taskAnswerId: "1"
		}

		expect(getTaskAnswer({params: req}, res)).toEqual(res.status(404).json("Review a not found"));
	});

	test("return code 400 reviewId undefined", async () => {
		var req = {
			taskAnswerId: "1"
		}

		expect(getTaskAnswer({params: req}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test("return code 400 taskAnswerId undefined", async () => {
		var req = {
			reviewId: "1"
		}

		expect(getTaskAnswer({params: req}, res)).toEqual(res.status(400).json("Invalid request"));
	});
});

describe("DELETE /reviews/:reviewId", () => {
	test("return code 200", async () => {
		var newReview = {
			taskAnswer: ["1", "2"],
			peerReview: ["1"],
			vote: "3"
		}

		var req = {
			reviewId: reviewFunctions.writeReview(newReview)
		}

		expect(deleteReview({params: req}, res)).toEqual(res.status(200).json("Review "+req["reviewId"]+" deleted"));
	});

	test("return code 204", async () => {
		var req = {
			reviewId: "a"
		}

		expect(deleteReview({params: req}, res)).toEqual(res.status(204).json(""));
	});

	test("return code 400", async () => {
		expect(deleteReview({params: {}}, res)).toEqual(res.status(400).json("Invalid request"));
	});
});

describe("PUT /reviews/:reviewId/peerReviews/:peerReviewId", () => {
	/*test ("return code 200 add", () => {
		var newReview = {
			taskAnswer: ["1", "2"],
			peerReview: ["1"],
			vote: "3"
		}

		var newPeerReview = {

		}

		var req = {
			reviewId: reviewFunctions.writeReview(newReview),
			peerReviewId: 
		}

		var reqBody = {

		}
	})*/
});

describe("PUT /reviews/:reviewId/taskAnswers", () => {
	test ("return code 200 add", async () => {
		var newReview = {
			taskAnswer: ["1", "2"],
			peerReview: ["1"],
			vote: "3"
		}

		var newTaskAnswer = {
			answers: ["1", "2"],
			student: "1",
			assignment: "1",
			task: "1"
		}

		var req = {
			reviewId: reviewFunctions.writeReview(newReview),
			taskAnswerId: taskAnswerFunctions.writeTaskAnswer(newTaskAnswer)
		}

		var reqBody = {
			add: true
		}

		expect(editTaskAnswer({params: req, body: reqBody}, res)).toEqual(res.status(200).json("Modified"));
	});

	test ("return code 200 delete", async () => {
		var newReview = {
			taskAnswer: ["1", "2"],
			peerReview: ["1"],
			vote: "3"
		}

		var req = {
			reviewId: reviewFunctions.writeReview(newReview),
			taskAnswerId: "1"
		}

		var reqBody = {
			delete: true
		}

		expect(editTaskAnswer({params: req, body: reqBody}, res)).toEqual(res.status(200).json("Modified"));
	});

	test ("return code 404 delete taskAnswerId wrong", async () => {
		var newReview = {
			taskAnswer: ["1", "2"],
			peerReview: ["1"],
			vote: "3"
		}

		var req = {
			reviewId: reviewFunctions.writeReview(newReview),
			taskAnswerId: "3"
		}

		var reqBody = {
			delete: true
		}

		expect(editTaskAnswer({params: req, body: reqBody}, res)).toEqual(res.status(404).json("TaskAnswer "+req["taskAnswerId"]+" not found in review "+ req["reviewId"]));
	});

	test ("return code 400 delete/add undefined", async () => {
		var newReview = {
			taskAnswer: ["1", "2"],
			peerReview: ["1"],
			vote: "3"
		}

		var req = {
			reviewId: reviewFunctions.writeReview(newReview),
			taskAnswerId: "3"
		}

		expect(editTaskAnswer({params: req, body: {}}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test ("return code 400 reviewId undefined", async () => {
		var req = {
			taskAnswerId: "1"
		}

		expect(editTaskAnswer({params: req, body: {add: true}}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test ("return code 400 taskAnswerId undefined", async () => {
		var req = {
			reviewId: "1"
		}

		expect(editTaskAnswer({params: req, body: {add: true}}, res)).toEqual(res.status(400).json("Invalid request"));
	});

	test ("return code 404 reviewId wrong", async () => {
		var req = {
			reviewId: "a",
			taskAnswerId: "1"
		}

		expect(editTaskAnswer({params: req, body: {add: true}}, res)).toEqual(res.status(404).json("Review a not found"));
	});

});

describe("PUT /reviews/:reviewId/vote", () => {
	test ("return code 200", async () => {
		var newReview = {
			taskAnswer: ["1", "2"],
			peerReview: ["1"],
			vote: "3"
		}

		var req = {
			reviewId: reviewFunctions.writeReview(newReview)
		}

		var reqBody = {
			vote: "10"
		}

		expect(editVote({params: req, body: reqBody}, res)).toEqual(res.status(200).json("Modified"));
	})

	test ("return code 404 reviewId wrong", async () => {
		var req = {
			reviewId: "a"
		}

		var reqBody = {
			vote: "10"
		}

		expect(editVote({params: req, body: reqBody}, res)).toEqual(res.status(404).json("Review a not found"));
	})

	test ("return code 400 reviewId undefined", async () => {
		var reqBody = {
			vote: "10"
		}

		expect(editVote({params: {}, body: reqBody}, res)).toEqual(res.status(400).json("Invalid request"));
	})

	test ("return code 400 vote undefined", async () => {
		var req = {
			reviewId: "a"
		}

		expect(editVote({params: req, body: {}}, res)).toEqual(res.status(400).json("Invalid request"));
	})
});