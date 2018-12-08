const persistencyLayer = require('../persistencyLayer.js')
const dbPeerReviewPath = __dirname+"/../../entities/peerReviews.js";

function getAllPeerReview(){
  return persistencyLayer.getObjectsList(dbPeerReviewPath);
}

function getPeerReviewById(idPeerReview){
  //console.log("Id passato:", idUser);
  return persistencyLayer.getObject(idPeerReview, dbPeerReviewPath);
}

module.exports = {
  getAllPeerReview: getAllPeerReview,
  getPeerReviewById: getPeerReviewById
}
