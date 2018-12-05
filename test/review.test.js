const utils = require("./utils.js");

//VALID TEST
test("POST /reviews VALID", () => {
	let payload = {
		taskAnswer: "1",
		peerReview: "2",
	};

	const res = await utils.postReview(payload);
	expect(res.status).toBe(201);
});

test ("GET /reviews VALID", () => {
	const res = await utils.getReviews();
	expect(res.status).toBe(200);
});

test ("GET /reviews/:reviewId VALID", () => {
	const res = await utils.getReview("1");
	expect(res.status).toBe(200);
});

test ("GET /reviews/:reviewId/taskAnswers VALID", () => {
	const res = await utils.getTaskAnswers("1");
	expect(res.status).toBe(200);
});

test ("GET /reviews/:reviewId/peerReviews VALID", () => {
	const res = await utils.getPeerReviews("1");
	expect(res.status).toBe(200);
});

test ("GET /reviews/:reviewId/vote VALID", () => {
	const res = await utils.getVote("1");
	expect(res.status).toBe(200);
});