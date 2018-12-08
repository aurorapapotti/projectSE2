var fs = require("fs");

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
  if (object.length > 0) {
    delete db[object];
    fs.writeFileSync(dbpath,JSON.stringify(db,null, 4));
    return idObject;
  }
  else {
    return null;
  }
  
}

function modifyObject(idObject, dbpath, newObject){
  let data = fs.readFileSync(dbpath, 'utf8');
  let db = JSON.parse(data);
  let object = Object.keys(db).filter(x => x == idObject);
  db[object] = newObject;

  fs.writeFileSync(dbpath,JSON.stringify(db, null, 4));  
}

module.exports = {
  addObject: addObject,
  getObjectsList: getObjectsList,
  getObject: getObject,
  deleteObject: deleteObject,
  modifyObject: modifyObject
}
