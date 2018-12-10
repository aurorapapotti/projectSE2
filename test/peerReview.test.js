const peerReviewFunctions = require("../src/functionsEntities/peerReviewFunctions.js");
const userFunctions = require("../src/functionsEntities/userFunctions.js");
const taskAnswerFunctions = require("../src/functionsEntities/taskAnswerFunctions.js");
const listAllPeerReview = require("../src/peerReview.js").listAllPeerReview;
const createPeerReview = require("../src/peerReview.js").createPeerReview;
const getPeerReview = require("../src/peerReview.js").getPeerReview;
const putPeerReview = require("../src/peerReview.js").putPeerReview;
const deletePeerReview = require("../src/peerReview.js").deletePeerReview;

const res = {
  "status": (statuscode) =>{ return {
    "json": (list) => { return {"code": statuscode, "list": list}
     }
   }}
}

const user = {
  name: "Gianni",
  surname: "Morandi",
  email: "gianni.morandi@email.it",
  badgeNumber: 123456
}

const task = {
  author: userFunctions.createUser(user),
  taskType: "multiple choice",
  argument: "Testing",
  correctAnswer: "Black Box"
}

const taskAnswer = {
  student: userFunctions.createUser(user),
  assignment: "_dkfjwie67",
  taskGroup: "_37286vsf4"
}

const peerReview = {
  user: userFunctions.createUser(user),
  taskAnswer: taskAnswerFunctions.writeTaskAnswer(taskAnswer),
  comment: "Poco dettagliata"
}

const newPeerReview = {
  user: userFunctions.createUser(user),
  taskAnswer: taskAnswerFunctions.writeTaskAnswer(taskAnswer),
  comment: "Molto dettagliata"
}

describe('POST /peerReview valid tests', () => {
  test('POST /peerReview return code 201', () => {
    expect(createPeerReview({"body": peerReview}, res)).toEqual(res.status(201).json("Created Peer Review"));
  })
});

describe('POST /peerReview invalid tests', () => {
  test ('POST /peerReview user is a number', () => {
    var invalidPeerReview ={
      user: 323946239,
      taskAnswer: "_4bcdbi4x",
      comment: "Poco dettagliata"
    }
    expect(createPeerReview({"body": invalidPeerReview}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('POST /peerReview user is undefined', () => {
    var invalidPeerReview ={
      user: undefined,
      taskAnswer: "_4bcdbi4x",
      comment: "Poco dettagliata"
    }
    expect(createPeerReview({"body": invalidPeerReview}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('POST /peerReview taskAnswer is null', () => {
    var invalidPeerReview ={
      user: userFunctions.createUser(user),
      taskAnswer: null,
      comment: "Poco dettagliata"
    }
    expect(createPeerReview({"body": invalidPeerReview}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('POST /peerReview taskAnswer NOT exists', () => {
    var invalidPeerReview ={
      user: userFunctions.createUser(user),
      taskAnswer: "_ciao",
      comment: "Poco dettagliata"
    }
    expect(createPeerReview({"body": invalidPeerReview}, res)).toEqual(res.status(404).json("TaskAnswer NOT found"));
  })

  test ('POST /peerReview body is undefined', () => {
    expect(createPeerReview({"body": undefined}, res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('GET /peerReview valid tests', () => {
  test ('GET /peerReview return code 200', () => {
      expect(listAllPeerReview({"body": {}}, res)).toEqual(res.status(200).json(peerReviewFunctions.getAllPeerReview()));
  })
});

describe('GET /peerReview invalid tests', () => {
  test('GET /peerReview req undefined', () => {
    expect(listAllPeerReview(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('GET /peerReview/:idPeerReview valid tests', () => {
  test('GET /peerReview/:idPeerReview return code 200', () => {
    peerReviewID = peerReviewFunctions.addPeerReview(peerReview);
    expect(getPeerReview({"params": {"idPeerReview": peerReviewID}}, res)).toEqual(res.status(200).json(peerReview));
  })
});

describe('GET /peerReview/:idPeerReview invalid tests', () => {
  test('GET /peerReview/:idPeerReview return code 404', () => {
    var peerReviewID = "_ciao";
    expect(getPeerReview({"params": {"idPeerReview": peerReviewID}}, res)).toEqual(res.status(404).json("PeerReview NOT found"));
  })

  test('GET /peerReview/:idPeerReview peerReviewID is a number', () => {
    var peerReviewID = 834389
    expect(getPeerReview({"params": {"idPeerReview": peerReviewID}}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /peerReview/:idPeerReview peerReviewID is undefined', () => {
    var peerReviewID = undefined
    expect(getPeerReview({"params": {"idPeerReview": peerReviewID}}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /peerReview/:idPeerReview peerReviewID is null', () => {
    var peerReviewID = null
    expect(getPeerReview({"params": {"idPeerReview": peerReviewID}}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /peerReview/:idPeerReview params is undefined', () => {
    var peerReviewID = "_jhdsd4783x"
    expect(getPeerReview({"params": {"": peerReviewID}}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /peerReview/:idPeerReview req is undefined', () => {
    expect(getPeerReview(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
})

describe('PUT /peerReview/:idPeerReview valid tests', () => {
  test('PUT /peerReview return code 200', () => {
    var peerReviewID = peerReviewFunctions.addPeerReview(peerReview);
    expect(putPeerReview({"params": {"idPeerReview": peerReviewID},"body":newPeerReview},res)).toEqual(res.status(200).json("PeerReview modified"));
  })
});

describe('PUT /peerReview/:idPeerReview invalid tests', () => {
  test('PUT /peerReview/:idPeerReview return code 404 peerReview NOT found', () => {
    var peerReviewID = "_ciao"
    expect(putPeerReview({"params": {"idPeerReview": peerReviewID},"body":newPeerReview},res)).toEqual(res.status(404).json("PeerReview NOT found"));
  })

  test('PUT /peerReview/:idPeerReview return code 404 taskAnswer NOT found', () => {
    var peerReviewID = peerReviewFunctions.addPeerReview(peerReview);
    var invalidPeerReview = {
      user: userFunctions.createUser(user),
      taskAnswer: "_ciao",
      comment: "Molto dettagliata"
    }
    expect(putPeerReview({"params": {"idPeerReview": peerReviewID},"body":invalidPeerReview},res)).toEqual(res.status(404).json("TaskAnswer NOT found"));
  })

  test('PUT peerReview/:idPeerReview peerReviewID is a number', () => {
    var peerReviewID = 947398;
    expect(putPeerReview({"params": {"idPeerReview": peerReviewID},"body":peerReview},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT peerReview/:idPeerReview peerReviewID is undefined', () => {
    var peerReviewID = undefined;
    expect(putPeerReview({"params": {"idPeerReview": peerReviewID},"body":peerReview},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT peerReview/:idPeerReview peerReviewID is null', () => {
    var peerReviewID = null;
    expect(putPeerReview({"params": {"idPeerReview": peerReviewID},"body":peerReview},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT peerReview/:idPeerReview params is undefined', () => {
    var peerReviewID = "_ytrtw8282";
    expect(putPeerReview({"params": {"": peerReviewID},"body":peerReview},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT peerReview/:idPeerReview req is undefined', () => {
    expect(putPeerReview(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT peerReview/:idPeerReview bad user format', () => {
    var peerReviewID = peerReviewFunctions.addPeerReview(peerReview);
    var invalidPeerReview = {
      user: 3642361,
      taskAnswer: "_3gdfuw28x",
      comment: "Molto dettagliata"
    }
    expect(putPeerReview({"params": {"idPeerReview": peerReviewID},"body":invalidPeerReview},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT peerReview/:idPeerReview bad comment format', () => {
    var peerReviewID = peerReviewFunctions.addPeerReview(peerReview);
    var invalidPeerReview = {
      user: userFunctions.createUser(user),
      taskAnswer: taskAnswerFunctions.writeTaskAnswer(taskAnswer),
      comment: 62396529
    }
    expect(putPeerReview({"params": {"idPeerReview": peerReviewID},"body":invalidPeerReview},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT peerReview/:idPeerReview no comment', () => {
    var peerReviewID = peerReviewFunctions.addPeerReview(peerReview);
    var invalidPeerReview = {
      user: userFunctions.createUser(user),
      taskAnswer: "_3gdfuw28x",
    }
    expect(putPeerReview({"params": {"idPeerReview": peerReviewID},"body":invalidPeerReview},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT peerReview/:idPeerReview no taskAnswer', () => {
    var peerReviewID = peerReviewFunctions.addPeerReview(peerReview);
    var invalidPeerReview = {
      user: userFunctions.createUser(user),
      comment: "Molto dettagliata"
    }
    expect(putPeerReview({"params": {"idPeerReview": peerReviewID},"body":invalidPeerReview},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT peerReview/:idPeerReview body is undefined', () => {
    var peerReviewID = peerReviewFunctions.addPeerReview(peerReview);
    expect(putPeerReview({"params": {"idPeerReview": peerReviewID},"body":undefined},res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('DELETE /peerReview/:idPeerReview valid tests', () => {
  test('DELETE /peerReview return code 200', () => {
    var peerReviewID = peerReviewFunctions.addPeerReview(peerReview);
    expect(deletePeerReview({"params": {"idPeerReview": peerReviewID}}, res)).toEqual(res.status(200).json("PeerReview deleted"));
  })
});

describe('DELETE /peerReview/:idPeerReview invalid tests', () => {
  test('DELETE /peerReview return code 404', () => {
    var peerReviewID = "_ciao";
    expect(deletePeerReview({"params": {"idPeerReview": peerReviewID}}, res)).toEqual(res.status(404).json("PeerReview NOT found"));
  })

  test('DELETE /peerReview/:idPeerReview peerReviewID is a number', () => {
    var peerReviewID = 947398;
    expect(deletePeerReview({"params": {"idPeerReviewr": peerReviewID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /peerReview/:idPeerReview peerReviewID is undefined', () => {
    var peerReviewID = undefined;
    expect(deletePeerReview({"params": {"idPeerReviewr": peerReviewID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /peerReview/:idPeerReview peerReviewID is null', () => {
    var peerReviewID = null;
    expect(deletePeerReview({"params": {"idPeerReviewr": peerReviewID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /peerReview/:idPeerReview params is undefined', () => {
    var peerReviewID = "_ytrtw8282";
    expect(deletePeerReview({"params": {"": peerReviewID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /peerReview/:idPeerReview req is undefined', () => {
    expect(deletePeerReview(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});
