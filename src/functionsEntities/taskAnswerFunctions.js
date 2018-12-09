const persistencyLayer = require("../persistencyLayer.js");

const dbTaskAnswerPath = __dirname+"/../../entities/taskAnswer.js";

function writeTaskAnswer(taskAnswer){
  return persistencyLayer.addObject(taskAnswer, dbTaskAnswerPath);
}

function getTaskAnswer(idPeerReview){
  return persistencyLayer.getObject(idPeerReview, dbTaskAnswerPath);
}

function getAllTaskAnswers(){
  return persistencyLayer.getObjectsList(dbTaskAnswerPath);
}

function deleteTaskAnswer (idTaskAnswer){
  return persistencyLayer.deleteObject(idTaskAnswer, dbTaskAnswerPath);
}

function modifyTaskAnswer(idTaskAnswer, newTaskAnswer){
  return persistencyLayer.modifyObject(idTaskAnswer, dbTaskAnswerPath, newTaskAnswer);
}

module.exports = {
    writeTaskAnswer: writeTaskAnswer,
    getTaskAnswer: getTaskAnswer,
    getAllTaskAnswers: getAllTaskAnswers,
    deleteTaskAnswer: deleteTaskAnswer,
    modifyTaskAnswer: modifyTaskAnswer
}
