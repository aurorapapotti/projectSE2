const persistencyLayer = require("../persistencyLayer.js");

const dbAssignmentPath = __dirname+"/../../entities/assignments.js";

function getAssignment(idAssignment){
  return persistencyLayer.getObject(idAssignment, dbAssignmentPath);
}

module.exports = {
    getAssignment: getAssignment
}