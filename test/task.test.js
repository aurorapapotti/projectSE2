const taskFunctions = require('../src/functionsEntities/taskFunctions.js');
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
/*
describe ('GET /task/:taskArgument', () => {
	test('GET /task/:taskArgument return code 200', () => {
	  var taskArgument = taskFunctions.getTaskByArgument(taskArgument);
	  expect(getTasksByArgument({"params": {"TaskArgument": taskArgument}},res)).toEqual(res.status(200).json(taskArgument));
	})
  });
  
  describe ('GET /taskArgument/:taskArgument invalid tests', () => {
	test('GET /taskArgument/:taskArgument return code 404', () => {
	  var taskArgument = "algoritmi"
	  expect(getTasksByArgument({"params": {"taskArgument": taskArgument}},res)).toEqual(res.status(400).json("Bad Request"));
	})
  
	test('GET /task/:TaskArgument taskArgument is undefined', () => {
	  var taskArgument = undefined
	  expect(getTasksByArgument({"params": {"taskArgument": taskArgument}},res)).toEqual(res.status(400).json("Bad Request"));
	})
  
	test('GET /task/:taskArgument taskArgument is null', () => {
	  var taskArgument = null
	  expect(getTasksByArgument({"params": {"taskArgument": taskArgument}},res)).toEqual(res.status(400).json("Bad Request"));
  })
});
  
  */

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
