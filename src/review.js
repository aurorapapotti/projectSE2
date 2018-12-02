const fetch = require("node-fetch");
const express = require("express");
const bodyParser = require("body-parser");
const percistencyLayer = require("./persistencyLayer.js");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 3000;

app.post("/review", (req, res) => {
	var taskAnswer = req.body.taskAnswer;
	var peerReview = req.body.peerReview;
	
	if (taskAnswer == null || peerReview == null)
		res.status(400).send("Invalid request");
	
	var review = '{"review": {'+
		'"taskAnswer": "'+taskAnswer+'",'+
		'"peerReview": "'+peerReview+'",'+
		'"vote":"1"}'
		
	percistencyLayer.writeReview(review);
	res.status(201).send("Created");
});

app.get("/reviews", (req, res) => {
	const reviews = percistencyLayer.getAllReview(req.query);
	res.json(reviews);
});

module.exports = {
	app
}

app.listen(PORT, () => console.log("App listening on PORT "+ PORT));