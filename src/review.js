var fs = require("fs");

const dbUserPath = "./entities/reviews.json";

function getUUID(){
  return '_' + Math.random().toString(36).substr(2, 9);
}

function addObject(obj,dbpath){
  let data = fs.readFileSync(dbpath, 'utf8');
  let db = JSON.parse(data);
  let id = getUUID();
  db[id] = obj;
  fs.writeFileSync(dbpath,JSON.stringify(db,null, 4));
  return id;
}

function getObjectsList(dbpath){
  let data = fs.readFileSync(dbpath, 'utf8');
  let db = JSON.parse(data);
  return db;
}

function createReview(req, res) {
	var taskAnswer = req.body.taskAnswer;
	var peerReview = req.body.peerReview;
	
	if (taskAnswer == null || peerReview == null)
		res.status(400).send("Invalid request");
	
	var review = '{"review": {'+
		'"taskAnswer": "'+taskAnswer+'",'+
		'"peerReview": "'+peerReview+'",'+
		'"vote":"1"}'
		
	addObject(review, "./entities/reviews.json");
	res.status(201).send("Created");
} 

module.exports = {
	create: createReview
}
