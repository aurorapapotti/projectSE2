var fs = require("fs");

const dbUserPath = "./entities/users.json";

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

function writeUser(user){
  return addObject(user,dbUserPath);
}

function getAllUsers(){
  return getObjectsList(dbUserPath);
}



module.exports = {
    writeUser: writeUser,
    getAllUsers: getAllUsers
}
