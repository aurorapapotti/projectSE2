var fs = require("fs");

function getUUID(){
  return '_' + Math.random().toString(36).substr(2, 9);
}

function addObject(obj,dbpath){
  let id = getUUID();
  if (fs.existsSync(dbpath)){
    let data = fs.readFileSync( dbpath, 'utf8');
    if (data == "") {
      db = new Object();
      db[id] = obj;
      fs.writeFileSync(dbpath,JSON.stringify(db,null, 4));
    }
    else {
      let db = JSON.parse(data);
      db[id] = obj;
      fs.writeFileSync(dbpath,JSON.stringify(db,null, 4));
    }
  }
  else {
    db = new Object();
    db[id] = obj;
    fs.writeFileSync(dbpath,JSON.stringify(db,null, 4));
  }
  return id;
}

function deleteObject(idObject, dbpath){
  if (fs.existsSync(dbpath)) {
    let data = fs.readFileSync(dbpath, 'utf8');
    if (data == "") {
      return idObject;
    }
    else {
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
      else
        return idObject;
    }
  }
  else
    return idObject;
}

function modifyObject(idObject, dbpath, newObject){
  if (fs.existsSync(dbpath)){
    let data = fs.readFileSync(dbpath, 'utf8');
    if (data == "")
      return idObject;
    else {
      let db = JSON.parse(data);
      let object = Object.keys(db).filter(x => x == idObject);
      if (object.length > 0){
        db[idObject] = newObject;
        fs.writeFileSync(dbpath,JSON.stringify(db,null, 4));
        return db[idObject];
      }
      else
        return idObject;
    }
  }
  else
    return idObject;
}

function getObjectsList(dbpath){
  let message = "Object's List doesn't exist";
  if (fs.existsSync(dbpath)){
    let data = fs.readFileSync( dbpath, 'utf8');
    if (data == "") {
      return message;
    }
    else {
      let db = JSON.parse(data);
      return db;
    }
  }
  else
    return message;
}

function getObject(idObject, dbpath){
  object_notFound = new Object();
  object_notFound = {"id": idObject};
  if (fs.existsSync(dbpath)){
    let data = fs.readFileSync(dbpath, 'utf8');
    if (data == "")
      return object_notFound;
    else {
      let db = JSON.parse(data);
      let object = Object.keys(db).filter(x => x == idObject);
      if (object.length > 0)
        return db[idObject];
      else
        return object_notFound;
    }
  }
  else
    return object_notFound;
}

function getObjectByParam(idObject, param, dbPathidObject, dbPathObjectToFind){
  object_notFound = new Object();
  object_notFound = {"id": idObject};
  if (fs.existsSync(dbPathidObject) && fs.existsSync(dbPathObjectToFind)){
    let data = fs.readFileSync(dbPathidObject, 'utf8');
    if (data == "")
      return object_notFound;
    else {
      let db = JSON.parse(data);
      let object = Object.keys(db).filter(x => x == idObject);
      if (object.length > 0) {
        let data2 = fs.readFileSync(dbPathObjectToFind, 'utf8');
        if (data2 == "")
          return object_notFound;
        else {
          let db2 = JSON.parse(data2);
          object_filtered = new Object();
          for (key in db2){
            if (db2[key][param] == idObject)
              object_filtered[key] = db2[key];
          }
          return object_filtered;
        }
      }
      else
        return object_notFound;
    }
  }
  else
    return object_notFound;
}

function getObjectByQuery(query, param, dbpath){
  object_filtered = new Object();
  if (fs.existsSync(dbpath)){
    let data = fs.readFileSync(dbpath, 'utf8');
    if (data == "")
      return object_filtered;
    else {
      for (key in db){
        if(db[key][param] == query)
          object_filtered[key] = db[key];
      }
      return object_filtered;
    }
  }
}

module.exports = {
  getObjectsList: getObjectsList,
  getObjectByParam: getObjectByParam,
  modifyObject: modifyObject,
  addObject: addObject,
  getObject: getObject,
  deleteObject: deleteObject,
  getObjectByQuery: getObjectByQuery
}
