const request = require("supertest");
const index = require("../index.js");

function postReview (payload) {
    return request(index)
        .post("/reviews")
        .send(payload)
        .set("Content-type", "application/json")
        .set("Accept", "application/json");
}

function getReviews (){
    return request(index)
        .get("/reviews")
        .set("Accept", "application/json");
}

function getReview (reviewId) {
    return request(index)
        .get("/reviews/${reviewId}")
        .set("Accept", "application/json");
}

function getTaskAnswers (reviewId) {
    return request(index)
        .get("/reviews/${reviewId}/taskAnswers")
        .set("Accept", "application/json");
}

function getPeerReviews (reviewId) {
    return request(index)
        .get("/reviews/${reviewId}/peerReviews")
        .set("Accept", "application/json");
}

function getVote (reviewId) {
    return request(index)
        .get("/reviews/${reviewId}/vote")
        .set("Accept", "application/json");
}

module.exports = {
    postReview: postReview,
    getReviews: getReviews,
    getReview: getReview,
    getTaskAnswers: getTaskAnswers,
    getPeerReviews: getPeerReviews,
    getVote: getVote
}