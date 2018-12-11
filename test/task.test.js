const taskFunctions = require('../src/functionsEntities/taskFunctions.js');
const userFunctions = require('../src/functionsEntities/userFunctions.js');
const createTaskByIdUser = require('../src/task.js').createTaskByIdUser;
const putTaskByIdUser = require('../src/task.js').putTaskByIdUser;
const deleteTaskByIdUser = require('../src/task.js').deleteTaskByIdUser;
const putTask = require('../src/task.js').putTask;
const listAllTasks = require('../src/task.js').listAllTasks;
const getTask = require('../src/task.js').getTask;
const getTasksByArgument = require('../src/task.js').getTasksByArgument;
const deleteTask = require('../src/task.js').deleteTask;

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
  correctAnswer: "Black Box",
  author: userFunctions.createUser(user)
}

const newTask = {
  taskType: "Open Question",
  argument: "Testing",
  correctAnswer: "White Box"
}

const newUser = {
  name: "Martina",
  surname: "Ciao",
  email: "a@a.it",
  badgeNumber: 1234
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
// PUT
describe('PUT /task/:idTask valid tests', () =>{
  test('PUT /task return code 200', () =>{
    var idTask = taskFunctions.addTask(task);
    var newTask = {
      author: userFunctions.createUser(newUser),
      taskType: "multiple1",
      argument: "Algoritmi1",
      correctAnswer: "ciao1"
    }
    var req = {idTask: idTask};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(200).json("Task modified"));
  })
});

describe('PUT /task/:idTask invalid tests', () =>{
  test('PUT /task return code 400 idTask number', () =>{
    var idTask = 1234;
    var newTask = {
      author: userFunctions.createUser(newUser),
      taskType: "multiple1",
      argument: "Algoritmi1",
      correctAnswer: "ciao1"
    }
    var req = {idTask: idTask};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(400).json("Bad Request"));
  });

  test('PUT /task return code 400 author number', () =>{
    var idTask = taskFunctions.addTask(task);
    var newTask = {
      author: 1234,
      taskType: "multiple1",
      argument: "Algoritmi1",
      correctAnswer: "ciao1"
    }
    var req = {idTask: idTask};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(400).json("Bad Request"));
  });

  test('PUT /task return code 400 taskType number', () =>{
    var idTask = taskFunctions.addTask(task);
    var newTask = {
      author: userFunctions.createUser(newUser),
      taskType: 1234,
      argument: "Algoritmi1",
      correctAnswer: "ciao1"
    }
    var req = {idTask: idTask};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(400).json("Bad Request"));
  });

  test('PUT /task return code 400 argument number', () =>{
    var idTask = taskFunctions.addTask(task);
    var newTask = {
      author: userFunctions.createUser(newUser),
      taskType: "multiple1",
      argument: 1234,
      correctAnswer: "ciao1"
    }
    var req = {idTask: idTask};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(400).json("Bad Request"));
  });

  test('PUT /task return code 400 correctAnswer number', () =>{
    var idTask = taskFunctions.addTask(task);
    var newTask = {
      author: userFunctions.createUser(newUser),
      taskType: "multiple1",
      argument: "Algoritmi1",
      correctAnswer: 1234
    }
    var req = {idTask: idTask};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(400).json("Bad Request"));
  });

  test('PUT /task return code 400 idTask undefined', () =>{
    var newTask = {
      author: userFunctions.createUser(newUser),
      taskType: 1234,
      argument: "Algoritmi1",
      correctAnswer: "ciao1"
    }
    var req = {};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(400).json("Bad Request"));
  });

  test('PUT /task return code 400 author undefined', () =>{
    var idTask = taskFunctions.addTask(task);
    var newTask = {
      taskType: "multiple1",
      argument: "Algoritmi1",
      correctAnswer: 1234
    }
    var req = {idTask: idTask};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(400).json("Bad Request"));
  });

  test('PUT /task return code 400 taskType undefined', () =>{
    var idTask = taskFunctions.addTask(task);
    var newTask = {
      author: userFunctions.createUser(newUser),
      argument: "Algoritmi1",
      correctAnswer: 1234
    }
    var req = {idTask: idTask};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(400).json("Bad Request"));
  });

  test('PUT /task return code 400 argument undefined', () =>{
    var idTask = taskFunctions.addTask(task);
    var newTask = {
      author: userFunctions.createUser(newUser),
      taskType: "multiple1",
      correctAnswer: 1234
    }
    var req = {idTask: idTask};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(400).json("Bad Request"));
  });

  test('PUT /task return code 400 correctAnswer undefined', () =>{
    var idTask = taskFunctions.addTask(task);
    var newTask = {
      author: userFunctions.createUser(newUser),
      taskType: "multiple1",
      argument: "Algoritmi1",
    }
    var req = {idTask: idTask};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(400).json("Bad Request"));
  });
  
  test('PUT /task return code 400 body undefined', () =>{
    var idTask = taskFunctions.addTask(task);
    var req = {idTask: idTask};
    expect(putTask({params: req}, res)).toEqual(res.status(400).json("Bad Request"));
  });

  test('PUT /task return code 400 req undefined', () =>{
    var idTask = taskFunctions.addTask(task);
    var req = {idTask: idTask};
    expect(putTask("", res)).toEqual(res.status(400).json("Bad Request"));
  });
  
  test('PUT /task return code 404 idTask wrong', () =>{
    var idTask = "a";
    var newTask = {
      author: userFunctions.createUser(newUser),
      taskType: "multiple1",
      argument: "Algoritmi1",
      correctAnswer: "ciao1"
    }
    var req = {idTask: idTask};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(404).json("Task NOT found"));
  })
});

// GET ALL TASKS

describe ('GET /task valid tests', () => {
  test('GET /task return code 200', () => {
    var req = {};
    expect(listAllTasks({"body": {}},res)).toEqual(res.status(200).json(taskFunctions.getAllTasks()));
  })
});

describe ('GET /task invalid tests', () => {
  test('GET /task req undefined', () => {
    expect(listAllTasks(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});


//GET TASK

describe ('GET /task/:idTask', () => {
  test('GET /task/:idTask return code 200', () => {
    var idTask = taskFunctions.addTask(task);
    expect(getTask({"params": {"idTask": idTask}},res)).toEqual(res.status(200).json(task));
  })
});

describe ('GET /task/:idTask invalid tests', () => {
  test('GET /task/:idTask return code 404', () => {
    var idTask = "123"
    expect(getTask({"params": {"idTask": idTask}},res)).toEqual(res.status(404).json("Task NOT found"));
  })

  test('GET /task/:idTask idTask is a number', () => {
    var idTask = 1234
    expect(getTask({"params": {"idTask": idTask}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /task/:idTask idTask is undefined', () => {
    var idTask = undefined
    expect(getTask({"params": {"idTask": idTask}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /task/:idTask idTask is null', () => {
    var idTask = null
    expect(getTask({"params": {"idTask": idTask}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /task/:idTask params is undefined', () => {
    var idTask = "_xt7guc9e0"
    expect(getTask({"params": {"": idTask}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /task/:idTask req is undefined', () => {
    expect(getTask(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
}); 

//GET TASKGROUP BY ARGUMENT


describe ('GET /task/:taskArgument', () => {
	test('GET /task/:taskArgument return code 200', () => {
    taskFunctions.addTask(task);
	  expect(getTasksByArgument({query: {"taskArgument": "Algoritmi"}},res)).toEqual(res.status(200).json(taskFunctions.getTasks("Algoritmi", "argument")));
  })
  
  test('GET /taskArgument/:taskArgument return code 200 empty set', () => {
	  expect(getTasksByArgument({query: {"taskArgument": "ciao"}},res)).toEqual(res.status(200).json(taskFunctions.getTasks("ciao", "argument")));
	})
});

describe ('GET /taskArgument/:taskArgument invalid tests', () => {
	test('GET /task/:TaskArgument taskArgument is undefined', () => {
	  expect(getTasksByArgument({query: {}},res)).toEqual(res.status(400).json("Bad Request"));
	})
  
	test('GET /task/:taskArgument taskArgument is null', () => {
	  expect(getTasksByArgument({query: {"taskArgument": null}},res)).toEqual(res.status(400).json("Bad Request"));
  })
});  


//DELETE TASK

describe('DELETE /task/:idTask valid tests', () => {
  test('DELETE /task/:idTask return code 200', () => {
    var idTask = taskFunctions.addTask(task);
    expect(deleteTask({"params": {"idTask": idTask}},res)).toEqual(res.status(200).json("Task deleted"));
  })
});

describe('DELETE /task/:idTask invalid tests', () => {
  test('DELETE /task/:idTask return code 404', async () => {
    var idTask = "marti";
    expect(deleteTask({"params": {"idTask": idTask}},res)).toEqual(res.status(404).json("Task NOT found"));
  })

  test('DELETE /task/:idTask idTask is a number', async () => {
    var idTask = 12345;
    expect(deleteTask({"params": {"idTask": idTask}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /task/:idTask idTask is undefined', async () => {
    var idTask = undefined;
    expect(deleteTask({"params": {"idTask": idTask}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /task/:idTask idTask is null', async () => {
    var idTask = null;
    expect(deleteTask({"params": {"idTask": idTask}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /task/:idTask params is undefined', async () => {
    var idTask = "_xt7guc9e0";
    expect(deleteTask({"params": {"": idTask}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /task/:idTask req is undefined', async () => {
    expect(deleteTask(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});
