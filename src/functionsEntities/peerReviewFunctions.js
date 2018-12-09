const persistencyLayer = require('../persistencyLayer.js')
const dbPeerReviewPath = __dirname+"/../../entities/peerReviews.js";

function getAllPeerReview(){
  return persistencyLayer.getObjectsList(dbPeerReviewPath);
}

function getPeerReviewById(idPeerReview){
  //console.log("Id passato:", idUser);
  return persistencyLayer.getObject(idPeerReview, dbPeerReviewPath);
}

function addPeerReview(peerReview){
  return persistencyLayer.addObject(peerReview, dbPeerReviewPath);
}

function removePeerReview(idPeerReview){
  return persistencyLayer.deleteObject(idPeerReview, dbPeerReviewPath);
}

function modifyPeerReview(idPeerReview, newPeerReview){
  return persistencyLayer.modifyObject(idPeerReview, dbPeerReviewPath, newPeerReview);
}

module.exports = {
  getAllPeerReview: getAllPeerReview,
  getPeerReviewById: getPeerReviewById,
  addPeerReview: addPeerReview,
  removePeerReview: removePeerReview,
  modifyPeerReview: modifyPeerReview
}
