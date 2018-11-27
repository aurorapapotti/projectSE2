var fs = require("fs");

const dbPath = "./entities/taskAnswer.json";

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

function createTaskAnswer(req, res) {
	var student = req.body.student;
	var assignment = req.body.assignment;
	var taskGroup = req.body.taskGroup;
	
	if (student == null || assignment == null || taskGroup == null)
		res.status(400).send("Invalid request");
	
	var taskAnswer = '{"taskAnswer": {'+
		'"student": "'+student+'",'+
		'"assignment": "'+assignment+'",'+
		'"taskGroup": "'+taskGroup+'"}'
		
	addObject(review, dbPath);
	res.status(201).send("Created");
} 

module.exports = {
	create: createTaskAnswer
}
