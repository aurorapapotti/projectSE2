const persistencyLayer = require("../persistencyLayer.js");

const dbPeerReviewPath = __dirname+"/../../entities/peerReviews.js";

function getPeerReview(idPeerReview){
  return persistencyLayer.getObject(idPeerReview, dbPeerReviewPath);
}

function getAllPeerReviews(){
  return persistencyLayer.getObjectsList(dbPeerReviewPath);
}

module.exports = {
    getPeerReview: getPeerReview,
    getAllPeerReviews: getAllPeerReviews
}
