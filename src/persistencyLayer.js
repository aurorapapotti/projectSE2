var fs = require("fs");

const dbUserPath = "../entities/users.js";
const dbAssignmentPath = "../entities/assignments.js"

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
}

module.exports = {
  getObjectsList: getObjectsList,
  getObjectByParam: getObjectByParam,
  addObject: addObject,
  getObject: getObject,
  deleteObject: deleteObject
}
