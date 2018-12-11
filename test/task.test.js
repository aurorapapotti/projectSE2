const taskFunctions = require('../src/functionsEntities/taskFunctions.js');
const userFunctions = require('../src/functionsEntities/userFunctions.js')

const putTask = require('../src/task.js').putTask;
const listAllTasks = require ('../src/task.js').listAllTasks;
const deleteTask = require('../src/task.js').deleteTask;
const getTask = require('../src/task.js').getTask;
const getTasksByArgument = require ('../src/task.js').getTasksByArgument;

const res = {
  "status": (statuscode) =>{ return {
    "json": (list) => { return {"code": statuscode, "list": list}
     }
   }}
}

const task = {
  author: "Martina",
  taskType: "multiple",
  argument: "Algoritmi",
  correctAnswer: "ciao"
}

const newUser = {
  name: "Martina",
  surname: "Ciao",
  email: "a@a.it",
  badgeNumber: "1234"
}

// PUT
describe('PUT /task/:idTask valid tests', () =>{
  test('PUT /task return code 200', () =>{
    var idTask = taskFunctions.createTask(task);
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
    var idTask = taskFunctions.createTask(task);
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
    var idTask = taskFunctions.createTask(task);
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
    var idTask = taskFunctions.createTask(task);
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
    var idTask = taskFunctions.createTask(task);
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
    var idTask = taskFunctions.createTask(task);
    var newTask = {
      taskType: "multiple1",
      argument: "Algoritmi1",
      correctAnswer: 1234
    }
    var req = {idTask: idTask};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(400).json("Bad Request"));
  });

  test('PUT /task return code 400 taskType undefined', () =>{
    var idTask = taskFunctions.createTask(task);
    var newTask = {
      author: userFunctions.createUser(newUser),
      argument: "Algoritmi1",
      correctAnswer: 1234
    }
    var req = {idTask: idTask};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(400).json("Bad Request"));
  });

  test('PUT /task return code 400 argument undefined', () =>{
    var idTask = taskFunctions.createTask(task);
    var newTask = {
      author: userFunctions.createUser(newUser),
      taskType: "multiple1",
      correctAnswer: 1234
    }
    var req = {idTask: idTask};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(400).json("Bad Request"));
  });

  test('PUT /task return code 400 correctAnswer undefined', () =>{
    var idTask = taskFunctions.createTask(task);
    var newTask = {
      author: userFunctions.createUser(newUser),
      taskType: "multiple1",
      argument: "Algoritmi1",
    }
    var req = {idTask: idTask};
    expect(putTask({params: req, body: newTask}, res)).toEqual(res.status(400).json("Bad Request"));
  });
  
  test('PUT /task return code 400 body undefined', () =>{
    var idTask = taskFunctions.createTask(task);
    var req = {idTask: idTask};
    expect(putTask({params: req}, res)).toEqual(res.status(400).json("Bad Request"));
  });

  test('PUT /task return code 400 req undefined', () =>{
    var idTask = taskFunctions.createTask(task);
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
    var idTask = taskFunctions.createTask(task);
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
    taskFunctions.createTask(task);
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
    var idTask = taskFunctions.createTask(task);
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
