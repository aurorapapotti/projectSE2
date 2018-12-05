var fs = require("fs");

const dbUserPath = "./entities/users.js";
const dbReviewPath = "./entities/reviews.js";
const dbPeerReviewPath = "./entities/peerReviews.js";
const dbTaskAnswerPath = "./entities/taskAnswer.js";
const dbAssignmentPath = "./entities/assignments.js";
const dbTaskGroupPath = "./entities/taskGroups.js";

function getUUID(){
  return '_' + Math.random().toString(36).substr(2, 9);
}

function addObject(obj,dbpath){
  let data = fs.readFileSync( dbpath, 'utf8');
  let db = JSON.parse(data);
  let id = getUUID();
  db[id] = obj;
  fs.writeFileSync(dbpath, JSON.stringify(db, null, 4));
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
  let obj = db[object];
  if (object.length > 0) {
    console.log("Object found :)");
    return obj;
  }
  else {
    console.log("Object NOT found :(");
    return null;
  }
}

function deleteObject(idObject, dbpath){
  let data = fs.readFileSync(dbpath, 'utf8');
  let db = JSON.parse(data);
  let object = Object.keys(db).filter(x => x == idObject);
  delete db[object];
  fs.writeFileSync(dbpath,JSON.stringify(db,null, 4));
  return idObject;
}

function modifyObject(idObject, dbpath, newObject){
  let data = fs.readFileSync(dbpath, 'utf8');
  let db = JSON.parse(data);
  let object = Object.keys(db).filter(x => x == idObject);
  db[object] = newObject;

  fs.writeFileSync(dbpath,JSON.stringify(db, null, 4));  
}

//USER
function writeUser(user){
  return addObject(user,dbUserPath);
}

function getAllUsers(){
  return getObjectsList(dbUserPath);
}

function getUser(idUser){
  return getObject(idUser, dbUserPath);
}

//REVIEW
function writeReview(review){
  return addObject(review,dbReviewPath);
}

function getReview (idReview){
	return getObject(idReview, dbReviewPath);
}

function getAllReview(){
  return getObjectsList(dbReviewPath);
} 

function deleteReview(idReview){
  return deleteObject(idReview, dbReviewPath);
}

function modifyReview(idReview, newObject){
  return modifyObject(idReview, dbReviewPath, newObject);
}

//PEER REVIEW
function getPeerReview(idPeerReview){
  return getObject(idPeerReview, dbPeerReviewPath);
}

function getAllPeerReviews(){
  return getObjectsList(dbPeerReviewPath);
}

//TASK ANSWERS
function writeTaskAnswer(taskAnswer){
  return addObject(taskAnswer, dbTaskAnswerPath);
}

function getTaskAnswer(idPeerReview){
  return getObject(idPeerReview, dbTaskAnswerPath);
}

function getAllTaskAnswers(){
  return getObjectsList(dbTaskAnswerPath);
}

function deleteTaskAnswer (idTaskAnswer){
  return deleteObject(idTaskAnswer, dbTaskAnswerPath);
}

function modifyTaskAnswer(idTaskAnswer, newTaskAnswer){
  return modifyObject(idTaskAnswer, dbTaskAnswerPath, newTaskAnswer);
}

//ASSIGNMENT
function getAssignment(idAssignment){
  return getObject(idAssignment, dbAssignmentPath);
}

//TASKGROUP
function getTaskGroup(idTaskGroup){
  return getObject(idTaskGroup, dbTaskGroupPath);
}

module.exports = {
  writeUser: writeUser,
  getAllUsers: getAllUsers,
  getUser: getUser,
	writeReview: writeReview,
  getAllReviews: getAllReview,
  getReview: getReview,
  getAllPeerReviews: getAllPeerReviews,
  getPeerReview: getPeerReview,
  getAllTaskAnswers: getAllTaskAnswers,
  getTaskAnswer: getTaskAnswer,
  deleteReview: deleteReview,
  modifyReview: modifyReview,
  writeTaskAnswer: writeTaskAnswer,
  getAssignment: getAssignment,
  getTaskGroup: getTaskGroup,
  deleteTaskAnswer: deleteTaskAnswer,
  modifyTaskAnswer: modifyTaskAnswer
}
