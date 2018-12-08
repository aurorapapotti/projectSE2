const root = process.env.SERVER_URL || "http://localhost:3000";
const fetch = require ("node-fetch");
const reviewRoot = root + "/reviews";
const review = {
    "taskAnswer": ["1"],
    "peerReview": ["1"],
    "vote": "0"
}

const postReview = function (newReview){
    return fetch (reviewRoot, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: newReview
    })
}

const getReviews = function () {
    return fetch (reviewRoot, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
}

const getReview = function (reviewId) {
    return fetch (reviewRoot+"/"+reviewId, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
}

const getPeerReview = function (reviewId) {
    return fetch (reviewRoot+"/"+reviewId, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
}

describe ("POST", () => {
    it("should create a review", () => {
        return postReview (review)
            .then (jsonResponse => {
                expect(jsonResponse.reviewResult).toEqual(review.reviewResult);
            })
    })

    it ("should not create a review", () => {

    })
})

describe ("GET", () => {
    it("should return the list of Reviews", () => {
        return getReviews ()
            .then (jsonResponse => {
                expect(jsonResponse.reviewResult).toEqual(review.reviewResult);
            })
    })

    it("should return the review with a specific ID", () => {
        return getReview("1")
            .then(jsonResponse => {
                expect(jsonResponse.reviewResult).toEqual(review.reviewResult);
            })
    })

    it("should return the list of peerReview of a Review", () => {
        return getPeerReview("1")
            .then(jsonResponse => {
                expect(jsonResponse.peerReviews).toEqual(review.reviewResult);
            })
    })
});

describe ("PUT", () => {

});

describe ("DELETE", () => {

});