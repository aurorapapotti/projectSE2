const peerReviewFunctions = require('./functionsEntities/peerReviewFunctions.js');
const taskAnswerFunctions = require('./functionsEntities/taskAnswerFunctions.js');
const userFunctions = require('./functionsEntities/userFunctions.js');

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
  if (!peerReview.user || !peerReview.taskAnswer || !peerReview.comment)
    return res.status(404).json("PeerReview NOT found");
  return res.status(200).json(peerReview);
}

function createPeerReview(req, res) {
  if(!req || !req.body || !req.body.user|| !req.body.taskAnswer || !req.body.comment)
    return res.status(400).json("Bad Request");
  if(typeof req.body.user !== "string" ||typeof req.body.taskAnswer !== "string" || typeof req.body.comment !== "string")
    return res.status(400).json("Bad Request");
  //console.log("recived request: ",req.body);
  idTaskAnswer = taskAnswerFunctions.getTaskAnswer(req.body.taskAnswer);
  if (idTaskAnswer.id)
    return res.status(404).json("TaskAnswer NOT found");
  let idPeerReview = peerReviewFunctions.addPeerReview(req.body);
	console.log(idPeerReview);
  //console.log("wrote completed: ", userFunctions.getAllUsers());
  return res.status(201).json("Created Peer Review");
}

function createPeerReviewByIdUser(req,res){
  if(!req || !req.body || !req.params.idUser|| !req.params.idTaskAnswer || !req.body.comment)
    return res.status(400).json("Bad Request");
  if(typeof req.params.idUser !== "string" || typeof req.params.idTaskAnswer !== "string" || typeof req.body.comment !== "string")
    return res.status(400).json("Bad Request");
  //console.log("recived request: ",req.body);
  req.body.user = req.params.idUser;
  req.body.taskAnswer = req.params.idTaskAnswer;
  let idPeerReview = peerReviewFunctions.addPeerReview(req.body);
	console.log(idPeerReview);
  //console.log("wrote completed: ", userFunctions.getAllUsers());
  return res.status(201).json("Created Peer Review");
}

function putPeerReview(req, res){
  if (!req || !req.params.idPeerReview || typeof req.params.idPeerReview !== 'string')
    return res.status(400).json("Bad Request");
  if (!req.body || !req.body.user || !req.body.taskAnswer || !req.body.comment)
    return res.status(400).json("Bad Request");
  if (typeof req.body.user !== 'string' || typeof req.body.taskAnswer !== 'string' || typeof req.body.comment !== 'string')
    return res.status(400).json("Bad Request");
  idTaskAnswer = taskAnswerFunctions.getTaskAnswer(req.body.taskAnswer);
  if (idTaskAnswer.id)
    return res.status(404).json("TaskAnswer NOT found");
  peerReview_modify = new Object();
  peerReview_modify = peerReviewFunctions.modifyPeerReview(req.params.idPeerReview, req.body);
  if (!peerReview_modify.user || !peerReview_modify.taskAnswer || !peerReview_modify.comment)
    return res.status(404).json("PeerReview NOT found");
  return res.status(200).json("PeerReview modified");
}

function putPeerReviewByIdUser(req, res){
  if(!req || !req.body || !req.params.idUser|| !req.params.idTaskAnswer|| !req.params.idPeerReview || !req.body.comment)
    return res.status(400).json("Bad Request");
  if(typeof req.params.idUser !== "string" ||  typeof req.params.idTaskAnswer !== "string" ||typeof req.params.idPeerReview !== "string" || typeof req.body.comment !== "string")
    return res.status(400).json("Bad Request");
  //console.log("recived request: ",req.body);
  req.body.user = req.params.idUser;
  req.body.taskAnswer = req.params.idTaskAnswer;
  peerReview_modify = new Object();
  peerReview_modify = userFunctions.getPeerReviews(req.params.idUser, "user");
  if (!peerReview_modify[req.params.idPeerReview].user || !peerReview_modify[req.params.idPeerReview].taskAnswer || !peerReview_modify[req.params.idPeerReview].comment)
    return res.status(404).json("PeerReview NOT found");
  peerReviewFunctions.modifyPeerReview(req.params.idPeerReview, req.body);
  return res.status(200).json("PeerReview modified");
}

function deletePeerReview(req, res){
  if (!req || !req.params.idPeerReview || typeof req.params.idPeerReview !== 'string')
    return res.status(400).json("Bad Request");
  peerReview_deleted = new Object();
  peerReview_deleted = peerReviewFunctions.removePeerReview(req.params.idPeerReview);
  if (!peerReview_deleted.user || !peerReview_deleted.taskAnswer || !peerReview_deleted.comment)
    return res.status(404).json("PeerReview NOT found");
  return res.status(200).json("PeerReview deleted");
}

function deletePeerReviewByIdUser(req, res){
  if (!req || !req.params.idUser || !req.params.idPeerReview || typeof req.params.idPeerReview !== 'string')
    return res.status(400).json("Bad Request");
  if (typeof req.params.idUser !== 'string' || typeof req.params.idPeerReview !== 'string')
    return res.status(400).json("Bad Request");
  peerReview_deleted = new Object();
  peerReview_deleted = userFunctions.getPeerReviews(req.params.idUser, "user");
  if (!peerReview_deleted[req.params.idPeerReview].user || !peerReview_deleted[req.params.idPeerReview].taskAnswer || !peerReview_deleted[req.params.idPeerReview].comment)
    return res.status(404).json("PeerReview NOT found");
  peerReviewFunctions.removePeerReview(req.params.idPeerReview);
  return res.status(200).json("PeerReview deleted");
}


module.exports = {
  listAllPeerReview: listAllPeerReview,
  getPeerReview: getPeerReview,
  createPeerReview: createPeerReview,
  createPeerReviewByIdUser: createPeerReviewByIdUser,
  putPeerReview: putPeerReview,
  putPeerReviewByIdUser: putPeerReviewByIdUser,
  deletePeerReview: deletePeerReview,
  deletePeerReviewByIdUser: deletePeerReviewByIdUser,
}
