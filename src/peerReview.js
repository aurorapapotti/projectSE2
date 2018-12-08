const peerReviewFunctions = require('./functionsEntities/peerReviewFunctions.js');

function listAllPeerReview(req, res){
  if (!req)
    return res.status(400).json("Bad Request");
  return res.status(200).json(peerReviewFunctions.getAllPeerReview());
}

function getPeerReview(req, res){
  if(!req || !req.params.idPeerReview || typeof req.params.idPeerReview !== 'string')
    return res.status(400).json("Bad Request");
  peerReview = new Object();
  peerReview = peerReviewFunctions.getPeerReviewById(req.params.idPeerReview);
  if (!peerReview.student || !peerReview.taskAnswer || !peerReview.comment)
    return res.status(404).json("PeerReview NOT found");
  return res.status(200).json(peerReview);
}

module.exports = {
  listAllPeerReview: listAllPeerReview,
  getPeerReview: getPeerReview
}
