var express = require('express');
var app = express();
var fs = require('fs');

const dbUserGroupPath = "./entities/usergroup.json"; 

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

function createUserGroup(req, res) {
  console.log("recived request: ",req.body);
  addObject(req.body);
  console.log("wrote completed: ",getObjectsList(dbUserGroupPath));
  res.status(201).send("Created");
}

module.exports = {
    createUserGroup: createUserGroup
}