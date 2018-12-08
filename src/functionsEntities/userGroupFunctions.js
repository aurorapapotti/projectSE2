const persistencyLayer = require("../persistencyLayer.js");
const dbUserGroupPath = __dirname+"/../../entities/usergroups.js";

function writeUserGroup(userGroup){
	return persistencyLayer.addObject(userGroup, dbUserGroupPath);
}

function getAllUserGroups(){
	return persistencyLayer.getObjectsList(dbUserGroupPath);
}

function deleteUserGroup(idUserGroup){
	console.log("Id passato: ", idUserGroup);
	return persistencyLayer.deleteObject(idUserGroup, dbUserGroupPath);
}

function getUserGroupById(id){
	return persistencyLayer.getObject(id, dbUserGroupPath);
}

function modifyUserGroup(id, userGroup){
  return persistencyLayer.modifyObject(id, dbUserGroupPath, userGroup);
}

module.exports = {
    writeUserGroup: writeUserGroup,
    getAllUserGroups: getAllUserGroups,
    deleteUserGroup: deleteUserGroup,
    getUserGroupById: getUserGroupById,
    modifyUserGroup: modifyUserGroup,
}