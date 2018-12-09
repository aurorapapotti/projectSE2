const userFunctions = require('../src/functionsEntities/userFunctions.js');
const taskFunctions = require('../src/functionsEntities/taskFunctions.js');
const taskGroupFunctions = require('../src/functionsEntities/taskGroupFunctions.js');
const peerReviewFunctions = require('../src/functionsEntities/peerReviewFunctions.js');
const listAllUsers = require ('../src/user.js').listAllUsers;
const getUser = require('../src/user.js').getUser;
const putUser = require('../src/user.js').putUser;
const deleteUser = require('../src/user.js').deleteUser;
const registerUser = require('../src/register.js').registerUser;
const userMethod = require('../src/user.js');

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

const newUser = {
  name: "Chiara",
  surname: "Ferragni",
  email: "chiara.ferragni@email.it",
  badgeNumber: 654321
}

const task = {
  taskType: "multiple choice",
  argument: "Testing",
  correctAnswer: "Black Box"
}

const taskGroup = {
  name: "SEMA",
  tasks: ["_hdeh53x", "_nde8ws", "_37bsaj2"]
}

const peerReview = {
  taskAnswer: "_4bcdbi4x",
  comment: "Poco dettagliata"
}

describe ('GET /user valid tests', () => {
  test('GET /user return code 200', () => {
    var req = {};
    expect(listAllUsers({"body": {}},res)).toEqual(res.status(200).json(userFunctions.getAllUsers()));
  })
});

describe ('GET /user invalid tests', () => {
  test('GET /user req undefined', () => {
    expect(listAllUsers(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe ('GET /user/:idUser valid tests', () => {
  test('GET /user/:idUser return code 200', () => {
    var userID = userFunctions.createUser(user);
    expect(getUser({"params": {"idUser": userID}},res)).toEqual(res.status(200).json(user));
  })
});

describe ('GET /user/:idUser invalid tests', () => {
  test('GET /user/:idUser return code 404', () => {
    var userID = "_ciao"
    expect(getUser({"params": {"idUser": userID}},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('GET /user/:idUser userID is a number', () => {
    var userID = 834389
    expect(getUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser userID is undefined', () => {
    var userID = undefined
    expect(getUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser userID is null', () => {
    var userID = null
    expect(getUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser params is undefined', () => {
    var userID = "_jhdsd4783x"
    expect(getUser({"params": {"": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser req is undefined', () => {
    expect(getUser(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('PUT /user/:idUser valid tests', () => {
  test('PUT /user/:idUser return code 200', () => {
    var userID = userFunctions.createUser(user);
    expect(putUser({"params": {"idUser": userID},"body":newUser},res)).toEqual(res.status(200).json("User modified"));
  })
});

describe('PUT /user/:idUser invalid tests', () => {
  test ('PUT /user/:idUser return code 404', () => {
    var userID = "_ciao";
    expect(putUser({"params": {"idUser": userID},"body":newUser},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('PUT /user/:idUser userID is a number', () => {
    var userID = 947398;
    expect(putUser({"params": {"idUser": userID},"body":newUser},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser userID is undefined', () => {
    var userID = undefined;
    expect(putUser({"params": {"idUser": userID},"body":newUser},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser userID is null', () => {
    var userID = null;
    expect(putUser({"params": {"idUser": userID},"body":newUser},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser params is undefined', () => {
    var userID = "_ytrtw8282";
    expect(putUser({"params": {"": userID},"body":newUser},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser req is undefined', () => {
    expect(putUser(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser bad badgeNumber format', () => {
    var userID = userFunctions.createUser(user);
    var userNew = {
      name: "Chiara",
      surname: "Ferragni",
      email: "chiara.ferragni@email.it",
      badgeNumber: 654321.6327
    }
    expect(putUser({"params": {"idUser": userID},"body":userNew},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser bad name format', () => {
    var userID = userFunctions.createUser(user);
    var userNew = {
      name: 37638292,
      surname: "Ferragni",
      email: "chiara.ferragni@email.it",
      badgeNumber: 654321.6327
    }
    expect(putUser({"params": {"idUser": userID},"body":userNew},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser no email', () => {
    var userID = userFunctions.createUser(user);
    var userNew = {
      name: "Chiara",
      surname: "Ferragni",
      badgeNumber: 654321.6327
    }
    expect(putUser({"params": {"idUser": userID},"body":userNew},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser no name', () => {
    var userID = userFunctions.createUser(user);
    var userNew = {
      surname: "Ferragni",
      email: "chiara.ferragni@email.it",
      badgeNumber: 654321.6327
    }
    expect(putUser({"params": {"idUser": userID},"body":userNew},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser no surname', () => {
    var userID = userFunctions.createUser(user);
    var userNew = {
      name: "Chiara",
      email: "chiara.ferragni@email.it",
      badgeNumber: 654321.6327
    }
    expect(putUser({"params": {"idUser": userID},"body":userNew},res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('DELETE /user/:idUser valid tests', () => {
  test('DELETE /user/:idUser return code 200', () => {
    var userID = userFunctions.createUser(user);
    expect(deleteUser({"params": {"idUser": userID}},res)).toEqual(res.status(200).json("User deleted"));
  })
});

describe('DELETE /user/:idUser invalid tests', () => {
  test('DELETE /user/:idUser return code 404', () => {
    var userID = "_ciao";
    expect(deleteUser({"params": {"idUser": userID}},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('DELETE /user/:idUser userID is a number', () => {
    var userID = 947398;
    expect(deleteUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser userID is undefined', () => {
    var userID = undefined;
    expect(deleteUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser userID is null', () => {
    var userID = null;
    expect(deleteUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser params is undefined', () => {
    var userID = "_ytrtw8282";
    expect(deleteUser({"params": {"": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser req is undefined', () => {
    expect(deleteUser(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('GET /user/:idUser/tasks valid tests', () => {
  test('GET /user/:idUser/tasks return code 200', () => {
    var userID = userFunctions.createUser(user);
    task.author = userID;
    taskFunctions.addTask(task);
    expect(userMethod.getTasksByIdUser({"params": {"idUser": userID}},res)).toEqual(res.status(200).json(userFunctions.getTasks(userID,"author")));
  })
});

describe('GET /user/:idUser/tasks invalid tests', () => {
  test('GET /user/:idUser/tasks return code 404', () => {
    var userID = "_ciao";
    expect(userMethod.getTasksByIdUser({"params": {"idUser": userID}},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('GET /user/:idUser/tasks userID is a number', () => {
    var userID = 947398;
    expect(userMethod.getTasksByIdUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/tasks userID is undefined', () => {
    var userID = undefined;
    expect(userMethod.getTasksByIdUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/tasks userID is null', () => {
    var userID = null;
    expect(userMethod.getTasksByIdUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/tasks params is undefined', () => {
    var userID = "_ytrtw8282";
    expect(userMethod.getTasksByIdUser({"params": {"": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/tasks req is undefined', () => {
    expect(userMethod.getTasksByIdUser(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('GET /user/:idUser/tasks/:idTask valid tests', () => {
  test('GET /user/:idUser/tasks/:idTask return code 200', () => {
    var userID = userFunctions.createUser(user);
    task.author = userID;
    var taskID = taskFunctions.addTask(task);
    expect(userMethod.getTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(200).json(task));
  })
});

describe('GET /user/:idUser/tasks/:idTask invalid tests', () => {
  test('GET /user/:idUser/tasks/:idTask return code 404', () => {
    var userID = "_ciao";
    var taskID = "_bdfb47x";
    expect(userMethod.getTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('GET /user/:idUser/tasks/:idTask return code 404', () => {
    var userID = userFunctions.createUser(user);
    var taskID = "_ciao";
    expect(userMethod.getTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(404).json("Task NOT found"));
  })

  test('GET /user/:idUser/tasks/:idTask userID is a number', () => {
    var userID = 947398;
    var taskID = "_bdfb47x";
    expect(userMethod.getTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/tasks/:idTask userID is undefined', () => {
    var userID = undefined;
    var taskID = "_bdfb47x";
    expect(userMethod.getTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/tasks/:idTask userID is null', () => {
    var userID = null;
    var taskID = "_bdfb47x"
    expect(userMethod.getTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/tasks/:idTask params idUser is undefined', () => {
    var userID = "_ytrtw8282";
    var taskID = "_bdfb47x"
    expect(userMethod.getTaskByIdUser({"params": {"": userID, "idTask": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/tasks/:idTask taskID is a number', () => {
    var userID = userFunctions.createUser(user);
    var taskID = 947398;
    expect(userMethod.getTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/tasks/:idTask taskID is undefined', () => {
    var userID = userFunctions.createUser(user);
    var taskID = undefined;
    expect(userMethod.getTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/tasks/:idTask taskID is null', () => {
    var userID = userFunctions.createUser(user);
    var taskID = null;
    expect(userMethod.getTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/tasks/:idTask params idTask is undefined', () => {
    var userID = userFunctions.createUser(user);
    var taskID = "_bdfb47x";
    expect(userMethod.getTaskByIdUser({"params": {"idUser": userID, "": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/tasks/:idTask req is undefined', () => {
    expect(userMethod.getTaskByIdUser(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('GET /user/:idUser/taskGroups valid tests', () => {
  test('GET /user/:idUser/tasks return code 200', () => {
    var userID = userFunctions.createUser(user);
    taskGroup.author = userID;
    taskGroupFunctions.addTaskGroup(taskGroup);
    expect(userMethod.getTaskGroupsByIdUser({"params": {"idUser": userID}},res)).toEqual(res.status(200).json(userFunctions.getTaskGroups(userID,"author")));
  })
});

describe('GET /user/:idUser/taskGroups invalid tests', () => {
  test('GET /user/:idUser/tasks return code 404', () => {
    var userID = "_ciao";
    expect(userMethod.getTaskGroupsByIdUser({"params": {"idUser": userID}},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('GET /user/:idUser/taskGroups userID is a number', () => {
    var userID = 947398;
    expect(userMethod.getTaskGroupsByIdUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/taskGroups userID is undefined', () => {
    var userID = undefined;
    expect(userMethod.getTaskGroupsByIdUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/taskGroups userID is null', () => {
    var userID = null;
    expect(userMethod.getTaskGroupsByIdUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/taskGroups params is undefined', () => {
    var userID = "_ytrtw8282";
    expect(userMethod.getTaskGroupsByIdUser({"params": {"": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/taskGroups req is undefined', () => {
    expect(userMethod.getTaskGroupsByIdUser(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('GET /user/:idUser/taskGroups/:idTaskGroup valid tests', () => {
  test('GET /user/:idUser/tasks/:idTask return code 200', () => {
    var userID = userFunctions.createUser(user);
    taskGroup.author = userID;
    var taskGroupID = taskGroupFunctions.addTaskGroup(taskGroup);
    expect(userMethod.getTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}},res)).toEqual(res.status(200).json(taskGroup));
  })
});

describe('GET /user/:idUser/taskGroups/:idTaskGroup invalid tests', () => {
  test('GET /user/:idUser/tasks/:idTask return code 404', () => {
    var userID = "_ciao";
    var taskGroupID = "_bdfb47x";
    expect(userMethod.getTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('GET /user/:idUser/taskGroups/:idTaskGroup return code 404', () => {
    var userID = userFunctions.createUser(user);
    var taskGroupID = "_ciao";
    expect(userMethod.getTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}},res)).toEqual(res.status(404).json("TaskGroup NOT found"));
  })

  test('GET /user/:idUser/taskGroups/:idTaskGroup userID is a number', () => {
    var userID = 947398;
    var taskGroupID = "_bdfb47x";
    expect(userMethod.getTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/taskGroups/:idTaskGroup userID is undefined', () => {
    var userID = undefined;
    var taskGroupID = "_bdfb47x";
    expect(userMethod.getTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/taskGroups/:idTaskGroup userID is null', () => {
    var userID = null;
    var taskGroupID = "_bdfb47x"
    expect(userMethod.getTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/taskGroups/:idTaskGroup params idUser is undefined', () => {
    var userID = "_ytrtw8282";
    var taskGroupID = "_bdfb47x"
    expect(userMethod.getTaskGroupByIdUser({"params": {"": userID, "idTaskGroup": taskGroupID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/taskGroups/:idTaskGroup taskGroupID is a number', () => {
    var userID = userFunctions.createUser(user);
    var taskGroupID = 947398;
    expect(userMethod.getTaskGroupByIdUser({"params": {"": userID, "idTaskGroup": taskGroupID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/taskGroups/:idTaskGroup taskGroupID is undefined', () => {
    var userID = userFunctions.createUser(user);
    var taskGroupID = undefined;
    expect(userMethod.getTaskGroupByIdUser({"params": {"": userID, "idTaskGroup": taskGroupID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/taskGroups/:idTaskGroup taskGroupID is null', () => {
    var userID = userFunctions.createUser(user);
    var taskGroupID = null;
    expect(userMethod.getTaskGroupByIdUser({"params": {"": userID, "idTaskGroup": taskGroupID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/taskGroups/:idTaskGroup params idTaskGroup is undefined', () => {
    var userID = userFunctions.createUser(user);
    var taskGroupID = "_bdfb47x";
    expect(userMethod.getTaskGroupByIdUser({"params": {"idUser": userID, "": taskGroupID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/taskGroups/:idTaskGroup req is undefined', () => {
    expect(userMethod.getTaskGroupByIdUser(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('GET /user/:idUser/peerReviews valid tests', () => {
  test('GET /user/:idUser/peerReviews return code 200', () => {
    var userID = userFunctions.createUser(user);
    peerReview.user = userID;
    peerReviewFunctions.addPeerReview(peerReview);
    expect(userMethod.getPeerReviewsByIdUser({"params": {"idUser": userID}},res)).toEqual(res.status(200).json(userFunctions.getPeerReviews(userID,"user")));
  })
});

describe('GET /user/:idUser/peerReviews invalid tests', () => {
  test('GET /user/:idUser/peerReviews return code 404', () => {
    var userID = "_ciao";
    expect(userMethod.getPeerReviewsByIdUser({"params": {"idUser": userID}},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('GET /user/:idUser/peerReviews userID is a number', () => {
    var userID = 947398;
    expect(userMethod.getPeerReviewsByIdUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/peerReviews userID is undefined', () => {
    var userID = undefined;
    expect(userMethod.getPeerReviewsByIdUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/peerReviews userID is null', () => {
    var userID = null;
    expect(userMethod.getPeerReviewsByIdUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/peerReviews params is undefined', () => {
    var userID = "_ytrtw8282";
    expect(userMethod.getPeerReviewsByIdUser({"params": {"": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/peerReviews req is undefined', () => {
    expect(userMethod.getPeerReviewsByIdUser(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('GET /user/:idUser/peerReviews/:idPeerReview valid tests', () => {
  test('GET /user/:idUser/peerReviews/:idPeerReview return code 200', () => {
    var userID = userFunctions.createUser(user);
    peerReview.user = userID;
    var peerReviewID = peerReviewFunctions.addPeerReview(peerReview);
    expect(userMethod.getPeerReviewByIdUser({"params": {"idUser": userID, "idPeerReview": peerReviewID}},res)).toEqual(res.status(200).json(peerReview));
  })
});

describe('GET /user/:idUser/peerReviews/:idPeerReview invalid tests', () => {
  test('GET /user/:idUser/peerReviews/:idPeerReview return code 404', () => {
    var userID = "_ciao";
    var peerReviewID = "_bdfb47x";
    expect(userMethod.getPeerReviewByIdUser({"params": {"idUser": userID, "idPeerReview": peerReviewID}},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('GET /user/:idUser/peerReviews/:idPeerReview return code 404', () => {
    var userID = userFunctions.createUser(user);
    var peerReviewID = "_ciao";
    expect(userMethod.getPeerReviewByIdUser({"params": {"idUser": userID, "idPeerReview": peerReviewID}},res)).toEqual(res.status(404).json("PeerReview NOT found"));
  })

  test('GET /user/:idUser/peerReviews/:idPeerReview userID is a number', () => {
    var userID = 947398;
    var peerReviewID = "_bdfb47x";
    expect(userMethod.getPeerReviewByIdUser({"params": {"idUser": userID, "idPeerReview": peerReviewID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/peerReviews/:idPeerReview userID is undefined', () => {
    var userID = undefined;
    var peerReviewID = "_bdfb47x";
    expect(userMethod.getPeerReviewByIdUser({"params": {"idUser": userID, "idPeerReview": peerReviewID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/peerReviews/:idPeerReview userID is null', () => {
    var userID = null;
    var peerReviewID = "_bdfb47x"
    expect(userMethod.getPeerReviewByIdUser({"params": {"idUser": userID, "idPeerReview": peerReviewID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/peerReviews/:idPeerReview params idUser is undefined', () => {
    var userID = "_ytrtw8282";
    var peerReviewID = "_bdfb47x"
    expect(userMethod.getPeerReviewByIdUser({"params": {"": userID, "idPeerReview": peerReviewID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/peerReviews/:idPeerReview peerReviewID is a number', () => {
    var userID = userFunctions.createUser(user);
    peerReviewID = 947398;
    expect(userMethod.getPeerReviewByIdUser({"params": {"idUser": userID, "idPeerReview": peerReviewID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/peerReviews/:idPeerReview peerReviewID is undefined', () => {
    var userID = userFunctions.createUser(user);
    var peerReviewID = undefined;
    expect(userMethod.getPeerReviewByIdUser({"params": {"idUser": userID, "idPeerReview": peerReviewID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/peerReviews/:idPeerReview peerReviewID is null', () => {
    var userID = userFunctions.createUser(user);
    var peerReviewID = null;
    expect(userMethod.getPeerReviewByIdUser({"params": {"idUser": userID, "idPeerReview": peerReviewID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/peerReviews/:idPeerReview params idPeerReview is undefined', () => {
    var userID = userFunctions.createUser(user);
    var peerReviewID = "_bdfb47x";
    expect(userMethod.getPeerReviewByIdUser({"params": {"idUser": userID, "": peerReviewID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser/peerReviews/:idPeerReview req is undefined', () => {
    expect(userMethod.getPeerReviewByIdUser(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});
