var express = require('express');
var app = express();
var fs = require('fs');

const dbAssignmentPath = "./entities/assignment.json";

function getUUID(){
  return '_' + Math.random().toString(36).substr(2, 9);
}

function addObject(obj,dbpath){
  let data = fs.readFileSync( dbpath, 'utf8');
  let db = JSON.parse(data);
  let id = getUUID();
  db[id] = obj;
  fs.writeFileSync(dbpath,JSON.stringify(db,null, 4));
  return id;
}

function getObjectsList(dbpath){
  let data = fs.readFileSync( dbpath, 'utf8');
  let db = JSON.parse(data);
  return db;
}

function createAssignment(req, res) {
	var professor = req.body.professor;
	var tasks = req.body.taskGroup;
	var clas = req.body.userGroup;
	
	if (professor == null || tasks == null || clas == null)
		res.status(400).send("Invalid request");
	
	var ass = '{"assignment": {'+
		'"id": "' + getUUID() + '",'+
		'"title": "' + req.body.title + '",'+
		'"professor": "' + professor + '",'+
		'"tasks": "' + tasks + '",'+
		'"clas": "' + clas + '",'+
		'"start": "' + req.body.deadline + '",'+
		'"deadline: "' + req.body.deadline + '"}"'
		
	console.log("recived request: ",req.body);
	addObject(ass,dbAssignmentPath);
	console.log("wrote completed: ",getObjectsList(dbAssignmentPath));
	res.status(201).send("Created");
}

module.exports = {
    createAssignment: createAssignment
}