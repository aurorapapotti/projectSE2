var fs = require("fs");

const dbUserPath = "./entities/users.js";
const dbReviewPath = "./entities/reviews.js";
const dbPeerReviewPath = "./entities/peerReviews.js";
const dbTaskAnswerPath = "./entities/taskAnswer.js";

function getUUID(){
  return '_' + Math.random().toString(36).substr(2, 9);
}

function addObject(obj,dbpath){
  let data = fs.readFileSync( dbpath, 'utf8');
  let db = JSON.parse(data);
  let id = getUUID();
  db[id] = obj;
  fs.writeFileSync(dbpath, JSON.stringify(db));
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

//PEER REVIEW
function getPeerReview(idPeerReview){
  return getObject(idPeerReview, dbPeerReviewPath);
}

function getAllPeerReviews(){
  return getObjectsList(dbPeerReviewPath);
}

//TASK ANSWERS
function getTaskAnswer(idPeerReview){
  return getObject(idPeerReview, dbTaskAnswerPath);
}

function getAllTaskAnswers(){
  return getObjectsList(dbTaskAnswerPath);
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
  getAllTaskAnswer: getAllTaskAnswers,
  getTaskAnswer: getTaskAnswer
}
