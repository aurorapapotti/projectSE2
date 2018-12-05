const persistencyLayer = require("../persistencyLayer.js");

const dbTaskGroupPath = __dirname+"/../../entities/taskGroups.js";

function getTaskGroup(idTaskGroup){
  return persistencyLayer.getObject(idTaskGroup, dbTaskGroupPath);
}

module.exports = {
    getTaskGroup: getTaskGroup
}