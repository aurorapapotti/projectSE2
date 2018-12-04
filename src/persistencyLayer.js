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
  delete db[idObject];
  fs.writeFileSync(dbpath,JSON.stringify(db,null, 4));
  return idObject;

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
    return db[idObject];
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

module.exports = {
  getObjectsList: getObjectsList,
  getObjectByParam: getObjectByParam,
  addObject: addObject,
  getObject: getObject,
  deleteObject: deleteObject
}
