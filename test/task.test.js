const taskFunctions = require('../src/functionsEntities/taskFunctions.js');
const userFunctions = require('../src/functionsEntities/userFunctions.js');
const createTaskByIdUser = require('../src/task.js').createTaskByIdUser;
const putTaskByIdUser = require('../src/task.js').putTaskByIdUser;
const deleteTaskByIdUser = require('../src/task.js').deleteTaskByIdUser;

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
  taskType: "Multiple Choice",
  argument: "Testing",
  correctAnswer: "Black Box"
}

const newTask = {
  taskType: "Open Question",
  argument: "Testing",
  correctAnswer: "White Box"
}

describe('POST /user/:idUser/tasks valid tests', () => {
  test('POST /user/:idUser/tasks valid tests return code 201', () => {
    var userID = userFunctions.createUser(user);
    expect(createTaskByIdUser({"params": {"idUser": userID}, "body": task},res)).toEqual(res.status(201).json("Created Task"));
  })
});

describe('POST /user/:idUser/tasks invalid tests', () => {
  test('POST /user/:idUser/tasks return code 404 user NOT found', () => {
    var userID = "_ciao";
    expect(createTaskByIdUser({"params": {"idUser": userID}, "body": task},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('POST /user/:idUser/tasks userID is a number', () => {
    var userID = 36284378;
    expect(createTaskByIdUser({"params": {"idUser": userID}, "body": task},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('POST /user/:idUser/tasks userID is a undefined', () => {
    var userID = undefined;
    expect(createTaskByIdUser({"params": {"idUser": userID}, "body": task},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('POST /user/:idUser/tasks userID is a null', () => {
    var userID = null;
    expect(createTaskByIdUser({"params": {"idUser": userID}, "body": task},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('POST /user/:idUser/tasks param idUser is undefined', () => {
    var userID = userFunctions.createUser(user);
    expect(createTaskByIdUser({"params": {"": userID}, "body": task},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('POST /user/:idUser/tasks body is undefined', () => {
    var userID = userFunctions.createUser(user);
    expect(createTaskByIdUser({"params": {"idUser": userID}, "body": undefined},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('POST /user/:idUser/tasks body is null', () => {
    var userID = userFunctions.createUser(user);
    expect(createTaskByIdUser({"params": {"idUser": userID}, "body": null},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('POST /user/:idUser/tasks taskType is undefined', () => {
    var userID = userFunctions.createUser(user);
    var invalidTask = {
      argument: "Testing",
      comment: "Black Box"
    }
    expect(createTaskByIdUser({"params": {"idUser": userID}, "body": invalidTask},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('POST /user/:idUser/tasks argument is a number', () => {
    var userID = userFunctions.createUser(user);
    var invalidTask = {
      taskType: "Multiple Choice",
      argument: 36294619,
      comment: "Black Box"
    }
    expect(createTaskByIdUser({"params": {"idUser": userID}, "body": invalidTask},res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('PUT /user/:idUser/tasks valid tests', () => {
  test('PUT /user/:idUser/tasks/:idTask valid tests return code 200', () => {
    var userID = userFunctions.createUser(user);
    task.author = userID;
    var taskID = taskFunctions.addTask(task);
    expect(putTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}, "body": newTask},res)).toEqual(res.status(200).json("Task modified"));
  })
});

describe('PUT /user/:idUser/tasks invalid tests', () => {
  test('POST /user/:idUser/tasks return code 404 user NOT found', () => {
    var userID = "_ciao";
    var taskID = "_dbw67x";
    expect(createTaskByIdUser({"params": {"idUser": userID}, "body": task},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('PUT /user/:idUser/tasks/:idTask return code 404 task NOT found', () => {
    var userID = userFunctions.createUser(user);
    var taskID = "_ciao";
    expect(putTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}, "body": newTask},res)).toEqual(res.status(404).json("Task NOT found"));
  })

  test('PUT /user/:idUser/tasks/:idTask userID is a number', () => {
    var userID = 3728301;
    var taskID = "_dhqi77x";
    expect(putTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}, "body": newTask},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/tasks/:idTask taskID is a number', () => {
    var userID = userFunctions.createUser(user);
    var taskID = 74398469;
    expect(putTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}, "body": newTask},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/tasks/:idTask userID is undefined', () => {
    var userID = undefined;
    var taskID = "_dhqi77x";
    expect(putTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}, "body": newTask},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/tasks/:idTask taskID is undefined', () => {
    var userID = userFunctions.createUser(user);
    var taskID = undefined;
    expect(putTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}, "body": newTask},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/tasks/:idTask userID is null', () => {
    var userID = null;
    var taskID = "_dhqi77x";
    expect(putTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}, "body": newTask},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/tasks/:idTask taskID is null', () => {
    var userID = userFunctions.createUser(user);
    var taskID = null;
    expect(putTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}, "body": newTask},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/tasks/:idTask param idUser is undefined', () => {
    var userID = userFunctions.createUser(user);
    task.author = userID;
    var taskID = taskFunctions.addTask(task);
    expect(putTaskByIdUser({"params": {"": userID, "idTask": taskID}, "body": newTask},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/tasks/:idTask param idTask is undefined', () => {
    var userID = userFunctions.createUser(user);
    task.author = userID;
    var taskID = taskFunctions.addTask(task);
    expect(putTaskByIdUser({"params": {"idUser": userID, "": taskID}, "body": newTask},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/tasks/:idTask body is undefined', () => {
    var userID = userFunctions.createUser(user);
    task.author = userID;
    var taskID = taskFunctions.addTask(task);
    expect(putTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}, "body": undefined},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/tasks/:idTask taskType is undefined', () => {
    var userID = userFunctions.createUser(user);
    task.author = userID;
    var taskID = taskFunctions.addTask(task);
    var invalidTask = {
      argument: "Testing",
      comment: "Black Box"
    }
    expect(putTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}, "body": invalidTask},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/tasks/:idTask argument is a number', () => {
    var userID = userFunctions.createUser(user);
    task.author = userID;
    var taskID = taskFunctions.addTask(task);
    var invalidTask = {
      taskType: "Multiple Choice",
      argument: 834744702,
      comment: "Black Box"
    }
    expect(putTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}, "body": invalidTask},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/tasks/:idTask req is undefined', () => {
    expect(putTaskByIdUser(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('DELETE /user/:idUser/tasks/:idTask valid tests', () => {
  test('DELETE /user/:idUser/tasks/:idTask return code 200', () => {
    var userID = userFunctions.createUser(user);
    task.author = userID;
    var taskID = taskFunctions.addTask(task);
    expect(deleteTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}, "body": task},res)).toEqual(res.status(200).json("Task deleted"));
  })
});

describe('DELETE /user/:idUser/tasks/:idTask invalid tests', () => {
  test('DELETE /user/:idUser/tasks/:idTask return code 404 user NOT found', () => {
    var userID = "_ciao";
    var taskID = "_dhsc36x";
    expect(deleteTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('DELETE /user/:idUser/tasks/:idTask return code 404 task NOT found', () => {
    var userID = userFunctions.createUser(user);
    var taskID = "_ciao";
    expect(deleteTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(404).json("Task NOT found"));
  })

  test('DELETE /user/:idUser/tasks/:idTask userID is a number', () => {
    var userID = 3629461248;
    var taskID = "_dhsc36x";
    expect(deleteTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser/tasks/:idTask taskID is a number', () => {
    var userID = userFunctions.createUser(user);
    var taskID = 47840740;
    expect(deleteTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser/tasks/:idTask userID is undefined', () => {
    var userID = undefined;
    var taskID = "_dhsc36x";
    expect(deleteTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser/tasks/:idTask taskID is undefined', () => {
    var userID = userFunctions.createUser(user);
    var taskID = undefined;
    expect(deleteTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser/tasks/:idTask userID is null', () => {
    var userID = null;
    var taskID = "_dhsc36x";
    expect(deleteTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser/tasks/:idTask taskID is null', () => {
    var userID = userFunctions.createUser(user);
    var taskID = null;
    expect(deleteTaskByIdUser({"params": {"idUser": userID, "idTask": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser/tasks/:idTask param idUser is undefined', () => {
    var userID = userFunctions.createUser(user);
    task.author = userID;
    var taskID = taskFunctions.addTask(task);
    expect(deleteTaskByIdUser({"params": {"": userID, "idTask": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser/tasks/:idTask param idTask is undefined', () => {
    var userID = userFunctions.createUser(user);
    task.author = userID;
    var taskID = taskFunctions.addTask(task);
    expect(deleteTaskByIdUser({"params": {"idUser": userID, "": taskID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser/tasks/:idTask req is undefined', () => {
    var userID = userFunctions.createUser(user);
    task.author = userID;
    var taskID = taskFunctions.addTask(task);
    expect(deleteTaskByIdUser(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});
