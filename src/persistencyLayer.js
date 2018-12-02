var fs = require("fs");

const dbUserPath = "./entities/users.json";
const dbReviewPath = "./entities/reviews.json";

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

module.exports = {
    writeUser: writeUser,
    getAllUsers: getAllUsers,
    getUser: getUser,
	writeReview: writeReview,
    getAllReview: getAllReview,
    getReview: getReview
}
