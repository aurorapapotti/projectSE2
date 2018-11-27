const createRev = require ('./reviews').create

test('create test', () => {
	var taskAnswer = 1;
	var peerReview = 1;

	expect(createRev(taskAnswer, peerReview)).toBe(201);
});

test('create test taskAnswer null', () => {
	var taskAnswer = null;
	var peerReview = 1;

	expect(createRev(taskAnswer, peerReview)).toBe(400);
});

test('create test peerReview null', () => {
	var taskAnswer = 1;
	var peerReview = null;

	expect(createRev(taskAnswer, peerReview)).toBe(400);
});

test('create test: taskAnswer e peerReview null', () => {
	var taskAnswer = null;
	var peerReview = null;

	expect(createRev(taskAnswer, peerReview)).tpBe(400);
});

const editRev = require('./review/reviewId').edit;

test ('edit id', () => {
	var oldRev = 0;
	var newRev = 1;

	expect(editRev(oldRev, newRev)).toBe(200);
});

test('edit id: equals id', () => {
	var oldRev = 0;
	var newRev = 0;

	expect(editRev(oldRev, newRev)).toBe(200);
});

test('edit id: oldRev null', () => {
	var oldRev = null;
	var newRev = 1;

	expect(editRev(oldRev, newRev)).toBe(400);
});

test('edit id: newRev null', () => {
	var oldRev = 1;
	var newRev = null;

	expect(editRev(oldRev, newRev)).toBe(400);
});

test('edit id: oldRev newRev null', () => {
	var oldRev = null;
	var newRev = null;

	expect(editRev(oldRev, newRev)).toBe(400);
});

const deleteRev = require('./reviews/reviewId').deleteRev

test('delete review', () => {
	var review = 1;

	expect(deleteRev(review)).toBe(200);
});

test('delete review: null', () => {
	var review = null;

	expect(deleteRev(review)).toBe(200);
});

const editPeerReview = require('./reviews/reviewId/peerReviews/peerReviewId').edit;

test('edit peerReview', () => {
	var reviewId = 1;
	var peerReviewId = 1;
	var newPeerReviewId = 1;

	expect(editPeerReview(reviewId, peerReviewId, newPeerReviewId)).toBe(200);
});

test('edit peerReview: reviewId null', () => {
	var reviewId = null;
	var peerReviewId = 1;
	var newPeerReviewId =  1;

	expect(editPeerReview(reviewId, peerReviewId, newPeerReviewId)).toBe(400);
});

test('edit peerReview: peerReviewId null', () => {
	var reviewId = 1;
	var peerReviewId = null;
	var newPeerReviewId = 1;

	expect(editPeerReview(reviewId, peerReviewId, newPeerReviewId)).toBe(400);
});

test('edit peerReview: newPeerReviewId null', () => {
	var reviewId = 1;
	var peerReviewId = 1;
	var newPeerReviewId = null;

	expect(editPeerReview(reviewId, peerReviewId, newPeerReviewId)).toBe(400);
});

test('edit peerReview: reviewId peerReviewId null', () => {
	var reviewId = null;
	var peerReviewId = null;
	var newPeerReviewId = 1;

	expect(editPeerReview(reviewId, peerReviewId, newPeerReviewId)).toBe(400);
});

test('edit peerReview: peerReviewId newPeerReviewId null', () => {
	var reviewId = 1;
	var peerReviewId = null;
	var newPeerReviewId = null;

	expect(editPeerReview(reviewId, peerReviewId, newPeerReviewId)).toBe(400);
});

test('edit peerReview: reviewId newPeerReviewId null', () => {
	var reviewId = null;
	var peerReviewId = 1;
	var newPeerReviewId = null;

	expect(editPeerReview(reviewId, peerReviewId, newPeerReviewId)).toBe(400);
});

test('edit peerReview: all attributes null', () => {
	var reviewId = null;
	var peerReviewId = null;
	var newPeerReviewId = null;

	expect(editPeerReview(reviewId, peerReviewId, newPeerReviewId)).toBe(400);
});

const editTaskAnswer = require ('./reviews/reviewId/taskAnswers/taskAnswerId').edit;

test('edit taskAnswer', () => {
	var reviewId = 1;
	var taskAnswerId = 1;
	var newTaskAnswerId = 1;
	
	expect(editTaskAnswer(reviewId, taskAnswerId, newTaskAnswerId));
});

test('edit taskAnswer: reviewId null', () => {
	var reviewId = null;
	var taskAnswerId = 1;
	var newTaskAnswerId = 1;
	
	expect(editTaskAnswer(reviewId, taskAnswerId, newTaskAnswerId));
});

test('edit taskAnswer: taskAnswer null', () => {
	var reviewId = 1;
	var taskAnswerId = null;
	var newTaskAnswerId = 1;
	
	expect(editTaskAnswer(reviewId, taskAnswerId, newTaskAnswerId));
});

test('edit taskAnswer: newTaskAnswerId null'. () => {
	var reviewId = 1;
	var taskAnswerId = 1;
	var newTaskAnswerId = null;
	
	expect(editTaskAnswer(reviewId, taskAnswerId, newTaskAnswerId));
});

test('edit taskAnswer: all attributes null' () => {
	var reviewId = null;
	var taskAnswerId = null;
	var newTaskAnswerId = null;
	
	expect(editTaskAnswer(reviewId, taskAnswerId, newTaskAnswerId));
});