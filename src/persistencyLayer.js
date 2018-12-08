var fs = require("fs");

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

function deleteObject(idObject, dbpath){
  let data = fs.readFileSync(dbpath, 'utf8');
  let db = JSON.parse(data);
  let object = Object.keys(db).filter(x => x == idObject);
  object_deleted = new Object();
  if (object.length > 0) {
    //console.log("Object found :)");
    object_deleted = db[idObject];
    delete db[idObject];
    fs.writeFileSync(dbpath,JSON.stringify(db,null, 4));
    console.log(object_deleted);
    return object_deleted;
  }
  else {
    object_deleted = {"id": idObject};
    //console.log("Object NOT found :(");
    return idObject;
  }
}

function modifyObject(idObject, dbpath, newObject){
  let data = fs.readFileSync(dbpath, 'utf8');
  let db = JSON.parse(data);
  let object = Object.keys(db).filter(x => x == idObject);
  db[object] = newObject;

  fs.writeFileSync(dbpath,JSON.stringify(db, null, 4));
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
<<<<<<< HEAD
    //console.log("Object found :)");
    return db[idObject];
  }
  else {
    //console.log("Object NOT found :(");
    object_notFound = new Object();
    object_notFound = {"id": idObject};
    return object_notFound;
  }
}

function getObjectByParam(idObject, param, dbPathidObject, dbPathObjectToFind){
  let data = fs.readFileSync(dbPathidObject, 'utf8');
  let db = JSON.parse(data);
  let object = Object.keys(db).filter(x => x == idObject);
  if (object.length > 0) {
    let data2 = fs.readFileSync(dbPathObjectToFind, 'utf8');
    let db2 = JSON.parse(data2);
    object_filtered = new Object();
    Object.keys(db2).forEach(function(key){
      if (db2[key][param] == idObject)
        object_filtered[key] = db2[key];
    });
    return object_filtered;
  }
  else {
    object_notFound = new Object();
    object_notFound = {"id": idObject};
    return object_notFound;
  }
=======
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

  fs.writeFileSync(dbpath,JSON.stringify(db));
}

//USER
function writeUser(user){
  return addObject(user,dbUserPath);
}

function getAllUsers(){
  return getObjectsList(dbUserPath);
>>>>>>> review
}

function getObjectByQuery(query, param, dbpath){
  let data = fs.readFileSync(dbpath, 'utf8');
  let db = JSON.parse(data);
  object_filtered = new Object();
  Object.keys(db).forEach(function(key){
    if(db[key][param] == query)
      object_filtered[key] = db[key];
  });
  return object_filtered;
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


module.exports = {
<<<<<<< HEAD
  getObjectsList: getObjectsList,
  getObjectByParam: getObjectByParam,
  addObject: addObject,
  getObject: getObject,
  deleteObject: deleteObject,
  getObjectByQuery: getObjectByQuery
=======
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
  writeTaskAnswer: writeTaskAnswer
>>>>>>> review
}
