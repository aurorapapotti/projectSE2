var express = require('express');
var app = express();
var fs = require("fs");

app.post('/reviews', function (req, res){
	var review = '{"review": {'+
		'"id": "1",'+
		'"taskAnswer": "'+req.body.taskAnswer+'",'+
		'"peerReview": "'+req.body.peerReview+'",'+
		'"vote": "1"}'+
	'}';
	
	if (!review.taskAnswer || !Number.isInteger(review.taskAnswer)){
		res.status(400).json({error: Invalid request});
		return;
	}
	
	if (!review.peerReview || !Number.isInteger(review.peerReview)){
		res.status(400).json({error: Invalid request});
	}
	
	fs.writeFile("../entities/review.json", review);
});

app.put('/reviews/reviewId', function (req, res){
	fs.readFile()
	
	if (!review.taskAnswer || !Number.isInteger(review.taskAnswer)){
		res.status(400).json({error: Invalid request});
		return;
	}
	
	if (!review.peerReview || !Number.isInteger(review.peerReview)){
		res.status(400).json({error: Invalid request});
		return;
	}
	
	fs.writeFile("../entities/review.json", review);
	res.status(200);
	return;
});