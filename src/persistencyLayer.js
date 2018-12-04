var fs = require("fs");

const dbUserPath = "./entities/users.json";
const dbAssignmentPath = "./entities/assignments.json";

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

function getObject(idObject, dbpath){
  let data = fs.readFileSync(dbpath, 'utf8');
  let db = JSON.parse(data);
  let object = Object.keys(db).filter(x => x == idObject);
  if (object.length > 0) {
    console.log("Object found :)");
    return object[0];
  }
  else {
    //TODO: mettere a posto sto schifo, deve ritornare una cosa più intelligente
    console.log("Object NOT found :(");
    return null;
  }
}

function getObjectByParam(idObject, param, dbPathidObject, dbPathObjectToFind){
  let data = fs.readFileSync(dbPathidObject, 'utf8');
  let db = JSON.parse(data);
  let object = Object.keys(db).filter(x => x == idObject);
  if (object.length > 0) {
    let data2 = fs.readFileSync(dbPathObjectToFind, 'utf8');
    let db2 = JSON.parse(data);
    let object2 = Object.keys(db2).filter(x => x[param] == idObject);
    return db[idObject];
  }
  else {
    console.log("Object NOT found :(");
    return null;
  }
}

function deleteObject(idObject, dbpath){
  let data = fs.readFileSync(dbpath, 'utf8');
  let db = JSON.parse(data);
  delete db[idObject];
  fs.writeFileSync(dbpath,JSON.stringify(db,null, 4));
  return idObject;

}


//USER
function writeUser(user){
  return addObject(user,dbUserPath);
}

function getAllUsers(){
  return getObjectsList(dbUserPath);
}

function getUser(idUser){
  console.log("Id passato:", idUser);
  return getObject(idUser, dbUserPath);
}

//ASSIGNMENT
function writeAssignment(assignmentId){
	return addObject(assignmentId, dbAssignmentPath);
}

function getAllAssignments(){
	return getObjectsList(dbAssignmentPath);
}

function getAssignment(assignmentId){
	return getObject(assignmentId, dbAssignmentPath);
}

function deleteAssignment(assignmentId){
  return deleteObject(assignmentId, dbAssignmentPath);
}

module.exports = {
    writeUser: writeUser,
    getAllUsers: getAllUsers,
    getUser: getUser,
	
	writeAssignment: writeAssignment,
	getAllAssignments: getAllAssignments,
	getAssignment, getAssignment,
	deleteAssignment: deleteAssignment
}
