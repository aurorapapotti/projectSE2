const taskFunctions = require('../src/functionsEntities/taskFunctions.js');
const userFunctions = require('../src/functionsEntities/userFunctions.js');
const taskGroupFunctions = require('../src/functionsEntities/taskGroupFunctions.js');
const createTaskGroupByIdUser = require ('../src/taskGroup.js').createTaskGroupByIdUser;
const putTaskGroupByIdUser = require('../src/taskGroup.js').putTaskGroupByIdUser;
const putTaskGroup = require('../src/taskGroup.js').putTaskGroup;


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
  taskType: "Multiple Choice",
  argument: "Testing",
  correctAnswer: "Black Box"
}

const taskGroup = {
  name : "SEMA",
  author: userFunctions.createUser(user),
  tasks: [taskFunctions.addTask(task), taskFunctions.addTask(task)]
}

const newTaskGroup = {
  name: "Pancakes",
  tasks: [taskFunctions.addTask(task), taskFunctions.addTask(task)]
}

describe('POST /user/:idUser/taskGroups valid tests', () => {
  test ('POST /user/:idUser/taskGroups return code 201', () => {
    var userID = userFunctions.createUser(user);
    expect(createTaskGroupByIdUser({"params": {"idUser": userID}, "body": taskGroup}, res)).toEqual(res.status(201).json("Created TaskGroup"));
  })
});

describe('POST /user/:idUser/taskGroups invalid tests', () => {
  test ('POST /user/:idUser/taskGroups return code 404 user NOT found', () => {
    var userID = "_ciao";
    expect(createTaskGroupByIdUser({"params": {"idUser": userID}, "body": taskGroup}, res)).toEqual(res.status(404).json("User NOT found"));
  })

  test ('POST /user/:idUser/taskGroups return code 404 task NOT found', () => {
    var userID = userFunctions.createUser(user);
    var invalidTask = {
      name: "SEMA",
      tasks: ["hello", "ciao"]
    }
    expect(createTaskGroupByIdUser({"params": {"idUser": userID}, "body": invalidTask}, res)).toEqual(res.status(404).json("Task NOT found"));
  })

  test ('POST /user/:idUser/taskGroups return tasks are integer', () => {
    var userID = userFunctions.createUser(user);
    var invalidTask = {
      name: "SEMA",
      tasks: [735983257237895, 74238793452987]
    }
    expect(createTaskGroupByIdUser({"params": {"idUser": userID}, "body": invalidTask}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('POST /user/:idUser/taskGroups userID is a number', () => {
    var userID = 73294720;
    expect(createTaskGroupByIdUser({"params": {"idUser": userID}, "body": taskGroup}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('POST /user/:idUser/taskGroups userID is undefined', () => {
    var userID = undefined;
    expect(createTaskGroupByIdUser({"params": {"idUser": userID}, "body": taskGroup}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('POST /user/:idUser/taskGroups userID is null', () => {
    var userID = null;
    expect(createTaskGroupByIdUser({"params": {"idUser": userID}, "body": taskGroup}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('POST /user/:idUser/taskGroups params idUser is undefined', () => {
    var userID = userFunctions.createUser(user);
    expect(createTaskGroupByIdUser({"params": {"": userID}, "body": taskGroup}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('POST /user/:idUser/taskGroups params body is undefined', () => {
    var userID = userFunctions.createUser(user);
    expect(createTaskGroupByIdUser({"params": {"": userID}, "body": undefined}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('POST /user/:idUser/taskGroups params body is null', () => {
    var userID = userFunctions.createUser(user);
    expect(createTaskGroupByIdUser({"params": {"": userID}, "body": null}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('POST /user/:idUser/taskGroups tasks is undefined', () => {
    var userID = userFunctions.createUser(user);
    var invalidTask = {
      name: "SEMA",
    }
    expect(createTaskGroupByIdUser({"params": {"idUser": userID}, "body": invalidTask}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('POST /user/:idUser/taskGroups name is a number', () => {
    var userID = userFunctions.createUser(user);
    var invalidTask = {
      name: 28932874,
      tasks: ["bdhs382x", "ndu93xuz"]
    }
    expect(createTaskGroupByIdUser({"params": {"idUser": userID}, "body": invalidTask}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('POST /user/:idUser/taskGroups name is undefined', () => {
    var userID = userFunctions.createUser(user);
    var invalidTask = {
      tasks: ["bdhs382x", "ndu93xuz"]
    }
    expect(createTaskGroupByIdUser({"params": {"idUser": userID}, "body": invalidTask}, res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('PUT /user/:idUser/taskGroups/:idTaskGroup valid tests', () => {
  test('PUT /user/:idUser/taskGroups/:idTaskGroup return code 200', () => {
    var userID = userFunctions.createUser(user);
    taskGroup.author = userID;
    var taskGroupID = taskGroupFunctions.addTaskGroup(taskGroup);
    expect(putTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}, "body":newTaskGroup}, res)).toEqual(res.status(200).json("TaskGroup modified"));
  })
});

describe('PUT /user/:idUser/taskGroups/:idTaskGroup invalid tests', () => {
  test('PUT /user/:idUser/taskGroups/:idTaskGroup return code 404 user NOT found', () => {
    var userID = "_ciao";
    var taskGroupID = "_373bdfgx";
    expect(putTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}, "body":newTaskGroup}, res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('PUT /user/:idUser/taskGroups/:idTaskGroup return code 404 TaskGroup NOT found', () => {
    var userID = userFunctions.createUser(user);
    var taskGroupID = "ciao";
    expect(putTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}, "body":newTaskGroup}, res)).toEqual(res.status(404).json("TaskGroup NOT found"));
  })

  test('PUT /user/:idUser/taskGroups/:idTaskGroup userID is undefined', () => {
    var userID = undefined;
    var taskGroupID = "dfvd73bc";
    expect(putTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}, "body":newTaskGroup}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/taskGroups/:idTaskGroup taskID is undefined', () => {
    var userID = userFunctions.createUser(user);
    var taskGroupID = undefined;
    expect(putTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}, "body":newTaskGroup}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/taskGroups/:idTaskGroup userID is null', () => {
    var userID = null;
    var taskGroupID = "dfvd73bc";
    expect(putTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}, "body":newTaskGroup}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/taskGroups/:idTaskGroup taskID is null', () => {
    var userID = userFunctions.createUser(user);
    var taskGroupID = null;
    expect(putTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}, "body":newTaskGroup}, res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('PUT /taskGroup/:idTaskGroup valid test', () => {
  test ('PUT /taskGroup/:idTaskGroup return code 200', () => {
    let idTaskGroup = taskGroupFunctions.addTaskGroup(taskGroup);
    let reqBody = {
      name : "SEMA1",
      author: userFunctions.createUser(user),
      tasks: [taskFunctions.addTask(task), taskFunctions.addTask(task)]
    }
    let req = {
      idTaskGroup: idTaskGroup
    }

    expect(putTaskGroup({params: req, body: reqBody}, res)).toEqual(res.status(200).json("Task modified"));
  })
});

describe('PUT /taskGroup/:idTaskGroup invalid test', () => {
  test ('PUT /taskGroup/:idTaskGroup return code 400 idTaskGroup number2', () => {
    let idTaskGroup = 1234;
    let reqBody = {
      name : "SEMA1",
      author: userFunctions.createUser(user),
      tasks: [taskFunctions.addTask(task), taskFunctions.addTask(task)]
    }
    let req = {
      idTaskGroup: idTaskGroup
    }

    expect(putTaskGroup({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('PUT /taskGroup/:idTaskGroup return code 400 name number', () => {
    let idTaskGroup = taskGroupFunctions.addTaskGroup(taskGroup);
    let reqBody = {
      name : 1234,
      author: userFunctions.createUser(user),
      tasks: [taskFunctions.addTask(task), taskFunctions.addTask(task)]
    }
    let req = {
      idTaskGroup: idTaskGroup
    }

    expect(putTaskGroup({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('PUT /taskGroup/:idTaskGroup return code 400 author number', () => {
    let idTaskGroup = taskGroupFunctions.addTaskGroup(taskGroup);
    let reqBody = {
      name : "SEMA1",
      author: 1234,
      tasks: [taskFunctions.addTask(task), taskFunctions.addTask(task)]
    }
    let req = {
      idTaskGroup: idTaskGroup
    }

    expect(putTaskGroup({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('PUT /taskGroup/:idTaskGroup return code 400 tasks number', () => {
    let idTaskGroup = taskGroupFunctions.addTaskGroup(taskGroup);
    let reqBody = {
      name : "SEMA1",
      author: userFunctions.createUser(user),
      tasks: [1234, taskFunctions.addTask(task)]
    }
    let req = {
      idTaskGroup: idTaskGroup
    }

    expect(putTaskGroup({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('PUT /taskGroup/:idTaskGroup return code 404 author wrong', () => {
    let idTaskGroup = taskGroupFunctions.addTaskGroup(taskGroup);
    let reqBody = {
      name : "SEMA1",
      author: "a",
      tasks: [taskFunctions.addTask(task), taskFunctions.addTask(task)]
    }
    let req = {
      idTaskGroup: idTaskGroup
    }

    expect(putTaskGroup({params: req, body: reqBody}, res)).toEqual(res.status(404).json("User NOT found"));
  })

  test ('PUT /taskGroup/:idTaskGroup return code 404 task wrong', () => {
    let idTaskGroup = taskGroupFunctions.addTaskGroup(taskGroup);
    let reqBody = {
      name : "SEMA1",
      author: userFunctions.createUser(user),
      tasks: ["a", taskFunctions.addTask(task)]
    }
    let req = {
      idTaskGroup: idTaskGroup
    }

    expect(putTaskGroup({params: req, body: reqBody}, res)).toEqual(res.status(404).json("Task NOT found"));
  })

  test ('PUT /taskGroup/:idTaskGroup return code 404 idTaskGroup wrong', () => {
    let idTaskGroup = "a";
    let reqBody = {
      name : "SEMA1",
      author: userFunctions.createUser(user),
      tasks: [taskFunctions.addTask(task)]
    }
    let req = {
      idTaskGroup: idTaskGroup
    }

    expect(putTaskGroup({params: req, body: reqBody}, res)).toEqual(res.status(404).json("TaskGroup NOT found"));
  })

  test ('PUT /taskGroup/:idTaskGroup return code 400 req undefined', () => {
    expect(putTaskGroup("", res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('PUT /taskGroup/:idTaskGroup return code 400 idTaskGroup undefined', () => {
    let reqBody = {
      name : "SEMA1",
      author: userFunctions.createUser(user),
      tasks: [taskFunctions.addTask(task), taskFunctions.addTask(task)]
    }

    expect(putTaskGroup({params: {}, body: reqBody}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('PUT /taskGroup/:idTaskGroup return code 400 name undefined', () => {
    let idTaskGroup = taskGroupFunctions.addTaskGroup(taskGroup);
    let reqBody = {
      author: userFunctions.createUser(user),
      tasks: [taskFunctions.addTask(task), taskFunctions.addTask(task)]
    }
    let req = {
      idTaskGroup: idTaskGroup
    }

    expect(putTaskGroup({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('PUT /taskGroup/:idTaskGroup return code 400 author undefined', () => {
    let idTaskGroup = taskGroupFunctions.addTaskGroup(taskGroup);
    let reqBody = {
      name : "SEMA1",
      tasks: [taskFunctions.addTask(task), taskFunctions.addTask(task)]
    }
    let req = {
      idTaskGroup: idTaskGroup
    }

    expect(putTaskGroup({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('PUT /taskGroup/:idTaskGroup return code 400 tasks undefined', () => {
    let idTaskGroup = taskGroupFunctions.addTaskGroup(taskGroup);
    let reqBody = {
      name : "SEMA1",
      author: userFunctions.createUser(user)
    }
    let req = {
      idTaskGroup: idTaskGroup
    }

    expect(putTaskGroup({params: req, body: reqBody}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('PUT /taskGroup/:idTaskGroup return code 400 body undefined', () => {
    let idTaskGroup = taskGroupFunctions.addTaskGroup(taskGroup);
    let req = {
      idTaskGroup: idTaskGroup
    }

    expect(putTaskGroup({params: req}, res)).toEqual(res.status(400).json("Bad Request"));
  })
});
