const reviewFunc = require('../src/review.js');

const res = {
	"status": (statuscode) => { 
		return {
	  		"send": (message) => { 
				  return {
					"code": statuscode, 
					"message": message
				}
	   		}
		}
	}
}

describe ("POST", () => {
    test ("/reviews return code 201", async () => {
		var review = {
			taskAnswer: ["1", "2"],
			peerReview: ["1"]
		}

		expect(reviewFunc.createReview({body: review}, res)).toEqual(res.status(201).json("Created"));
	} )
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