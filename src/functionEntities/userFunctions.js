const persistencyLayer = require("../persistencyLayer.js");

const dbUserPath = __dirname+"/../../entities/users.js";

function writeUser(user){
    return persistencyLayer.addObject(user,dbUserPath);
}
  
function getAllUsers(){
    return persistencyLayer.getObjectsList(dbUserPath);
}
  
function getUser(idUser){
    return persistencyLayer.getObject(idUser, dbUserPath);
}

module.exports = {
    writeUser: writeUser,
    getAllUsers: getAllUsers,
    getUser: getUser
}