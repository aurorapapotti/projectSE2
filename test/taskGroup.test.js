const taskFunctions = require('../src/functionsEntities/taskFunctions.js');
const userFunctions = require('../src/functionsEntities/userFunctions.js');
const taskGroupFunctions = require('../src/functionsEntities/taskGroupFunctions.js');
const createTaskGroupByIdUser = require ('../src/taskGroup.js').createTaskGroupByIdUser;
const putTaskGroupByIdUser = require('../src/taskGroup.js').putTaskGroupByIdUser;
const deleteTaskGroupByIdUser = require('../src/taskGroup.js').deleteTaskGroupByIdUser;
const listAllTaskGroups = require ('../src/taskGroup.js').listAllTaskGroups;
const deleteTaskGroup = require('../src/taskGroup.js').deleteTaskGroup;
const getTaskGroup = require('../src/taskGroup.js').getTaskGroup;
const getTaskGroupByName = require ('../src/taskGroup.js').getTaskGroupByName;

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

  test('PUT /user/:idUser/taskGroups/:idTaskGroup params idUser is undefined', () => {
    var userID = userFunctions.createUser(user);
    taskGroup.author = userID;
    var taskGroupID = taskGroupFunctions.addTaskGroup(taskGroup);
    expect(putTaskGroupByIdUser({"params": {"": userID, "idTaskGroup": taskGroupID}, "body":newTaskGroup}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/taskGroups/:idTaskGroup params idTaskGroup is undefined', () => {
    var userID = userFunctions.createUser(user);
    taskGroup.author = userID;
    var taskGroupID = taskGroupFunctions.addTaskGroup(taskGroup);
    expect(putTaskGroupByIdUser({"params": {"idUser": userID, "": taskGroupID}, "body":newTaskGroup}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/taskGroups/:idTaskGroup body is undefined', () => {
    var userID = userFunctions.createUser(user);
    taskGroup.author = userID;
    var taskGroupID = taskGroupFunctions.addTaskGroup(taskGroup);
    expect(putTaskGroupByIdUser({"params": {"idUser": userID, "": taskGroupID}, "body":undefined}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/taskGroups/:idTaskGroup params body is null', () => {
    var userID = userFunctions.createUser(user);
    taskGroup.author = userID;
    var taskGroupID = taskGroupFunctions.addTaskGroup(taskGroup);
    expect(putTaskGroupByIdUser({"params": {"idUser": userID, "": taskGroupID}, "body":null}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/taskGroups/:idTaskGroup req is undefined', () => {
    var userID = userFunctions.createUser(user);
    taskGroup.author = userID;
    var taskGroupID = taskGroupFunctions.addTaskGroup(taskGroup);
    expect(putTaskGroupByIdUser(undefined, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/taskGroups/:idTaskGroup name is a number', () => {
    var userID = userFunctions.createUser(user);
    taskGroup.author = userID;
    var taskGroupID = taskGroupFunctions.addTaskGroup(taskGroup);
    invalidTask = {
      name: 4468243479,
      tasks: ["ghsdg682x", "gdusdc"]
    }
    expect(putTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}, "body":invalidTask}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/taskGroups/:idTaskGroup tasks are numbers', () => {
    var userID = userFunctions.createUser(user);
    taskGroup.author = userID;
    var taskGroupID = taskGroupFunctions.addTaskGroup(taskGroup);
    invalidTask = {
      name: "SEMA",
      tasks: [34638428, 438743289]
    }
    expect(putTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}, "body":invalidTask}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/taskGroups/:idTaskGroup no tasks', () => {
    var userID = userFunctions.createUser(user);
    taskGroup.author = userID;
    var taskGroupID = taskGroupFunctions.addTaskGroup(taskGroup);
    invalidTask = {
      name: "SEMA",
    }
    expect(putTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}, "body":invalidTask}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser/taskGroups/:idTaskGroup no names', () => {
    var userID = userFunctions.createUser(user);
    taskGroup.author = userID;
    var taskGroupID = taskGroupFunctions.addTaskGroup(taskGroup);
    invalidTask = {
      tasks: ["ghsdg682x", "gdusdc"]
    }
    expect(putTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}, "body":invalidTask}, res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('DELETE /user/:idUser/taskGroups/:idTaskGroup valid tests', () => {
  test ('DELETE /user/:idUser/taskGroups/:idTaskGroup return code 200', () => {
    var userID = userFunctions.createUser(user);
    taskGroup.author = userID;
    var taskGroupID = taskGroupFunctions.addTaskGroup(taskGroup);
    expect(deleteTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}}, res)).toEqual(res.status(200).json("TaskGroup deleted"));
  })
});

describe('DELETE /user/:idUser/taskGroups/:idTaskGroup invalid tests', () => {
  test ('DELETE /user/:idUser/taskGroups/:idTaskGroup return code 404 user NOT found', () => {
    var userID = "_ciao";
    var taskGroupID = "_sgds537x";
    expect(deleteTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}}, res)).toEqual(res.status(404).json("User NOT found"));
  })

  test ('DELETE /user/:idUser/taskGroups/:idTaskGroup return code 404 taskGroup NOT found', () => {
    var userID = userFunctions.createUser(user);
    var taskGroupID = "_ciao";
    expect(deleteTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}}, res)).toEqual(res.status(404).json("TaskGroup NOT found"));
  })

  test ('DELETE /user/:idUser/taskGroups/:idTaskGroup userID is undefined', () => {
    var userID = undefined;
    var taskGroupID = "_sgds537x";
    expect(deleteTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('DELETE /user/:idUser/taskGroups/:idTaskGroup taskID is undefined', () => {
    var userID = userFunctions.createUser(user);
    var taskGroupID = undefined;
    expect(deleteTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('DELETE /user/:idUser/taskGroups/:idTaskGroup userID is null', () => {
    var userID = null;
    var taskGroupID = "_sgds537x";
    expect(deleteTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('DELETE /user/:idUser/taskGroups/:idTaskGroup taskID is null', () => {
    var userID = userFunctions.createUser(user);
    var taskGroupID = null;
    expect(deleteTaskGroupByIdUser({"params": {"idUser": userID, "idTaskGroup": taskGroupID}}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('DELETE /user/:idUser/taskGroups/:idTaskGroup params idUser is null', () => {
    var userID = userFunctions.createUser(user);
    taskGroup.author = userID;
    var taskGroupID = taskGroupFunctions.addTaskGroup(taskGroup);
    expect(deleteTaskGroupByIdUser({"params": {"": userID, "idTaskGroup": taskGroupID}}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('DELETE /user/:idUser/taskGroups/:idTaskGroup params idTaskGroup is null', () => {
    var userID = userFunctions.createUser(user);
    taskGroup.author = userID;
    var taskGroupID = taskGroupFunctions.addTaskGroup(taskGroup);
    expect(deleteTaskGroupByIdUser({"params": {"idUser": userID, "": taskGroupID}}, res)).toEqual(res.status(400).json("Bad Request"));
  })

  test ('DELETE /user/:idUser/taskGroups/:idTaskGroup req is undefined', () => {
    expect(deleteTaskGroupByIdUser(undefined, res)).toEqual(res.status(400).json("Bad Request"));
  })
});

// GET ALL TASKGROUPS

describe ('GET /taskGroup valid tests', () => {
  test('GET /taskGroup return code 200', () => {
    var req = {};
    expect(listAllTaskGroups({"body": {}},res)).toEqual(res.status(200).json(taskGroupFunctions.getAllTaskGroups()));
  })
});

describe ('GET /taskGroup invalid tests', () => {
  test('GET /taskGroup req undefined', () => {
    expect(listAllTaskGroups(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});

//GET TASKGROUP

describe ('GET /taskGroup/:idTaskGroup', () => {
  test('GET /taskGroup/:idTaskGroup return code 200', () => {
    var idTaskGroup = taskGroupFunctions.addTaskGroup(taskGroup);
    expect(getTaskGroup({"params": {"idTaskGroup": idTaskGroup}},res)).toEqual(res.status(200).json(taskGroup));
  })
});

describe ('GET /taskGroup/:idTaskGroup invalid tests', () => {
  test('GET /taskGroup/:idTaskGroup return code 404', () => {
    var idTaskGroup = "_epxye8be2"
    expect(getTaskGroup({"params": {"idTaskGroup": idTaskGroup}},res)).toEqual(res.status(404).json("TaskGroup NOT found"));
  })

  test('GET /taskGroup/:idTaskGroup idTaskGroup is a number', () => {
    var idTaskGroup = 1234567
    expect(getTaskGroup({"params": {"idTaskGroup": idTaskGroup}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /taskGroup/:idTaskGroup idTaskGroup is undefined', () => {
    var idTaskGroup = undefined
    expect(getTaskGroup({"params": {"idTaskGroup": idTaskGroup}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /taskGroup/:idTaskGroup idTaskGroup is null', () => {
    var idTaskGroup = null
    expect(getTaskGroup({"params": {"idTaskGroup": idTaskGroup}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /taskGroup/:idTaskGroup params is undefined', () => {
    var idTaskGroup = "_epxye8be2"
    expect(getTaskGroup({"params": {"": idTaskGroup}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /taskGroup/:idTaskGroup req is undefined', () => {
    expect(getTaskGroup(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
}); 

//GET TASKGROUP BY NAME


describe ('GET /taskGroup/:taskGroupName', () => {
	test('GET /taskGroup/:taskGroupName return code 200', () => {
    taskGroupFunctions.addTaskGroup(taskGroup);
    expect(getTaskGroupByName({query: {"TaskGroupName": "SEMA"}},res)).toEqual(res.status(200).json(taskFunctions.getTasks("SEMA", "name")));
	})
  });
  
  describe ('GET /taskGroupName/:taskGroupName invalid tests', () => {
	test('GET /taskGroup/:taskGroupName return code 404', () => {
	  expect(getTaskGroupByName({"params": {"taskGroupName": "sema"}},res)).toEqual(res.status(400).json("Bad Request"));
	})
  
	test('GET /taskGroup/:TaskGroupName taskGroupName is undefined', () => {
	  expect(getTaskGroupByName({"params": {"taskGroupName": "sema"}},res)).toEqual(res.status(400).json("Bad Request"));
	})
  
	test('GET /taskGroup/:taskGroupName taskGroupName is null', () => {
	  expect(getTaskGroupByName({"params": {"taskGroupName": "sema"}},res)).toEqual(res.status(400).json("Bad Request"));
	});
  }); 


//DELETE TASKGROUP

describe('DELETE /taskGroup/:idTaskGroup valid tests', () => {
  test('DELETE /taskGroup/:idTaskGroup return code 200', () => {
    var idTaskGroup = taskGroupFunctions.addTaskGroup(taskGroup);
    expect(deleteTaskGroup({"params": {"idTaskGroup": idTaskGroup}},res)).toEqual(res.status(200).json("TaskGroup deleted"));
  })
});

describe('DELETE /taskGroup/:idTaskGroup invalid tests', () => {
  test('DELETE /taskGroup/:idTaskGroup return code 404', async () => {
    var idTaskGroup = "_epxye8be2";
    expect(deleteTaskGroup({"params": {"idTaskGroup": idTaskGroup}},res)).toEqual(res.status(404).json("TaskGroup NOT found"));
  })

  test('DELETE /taskGroup/:idTaskGroup idTaskGroup is a number', async () => {
    var idTaskGroup = 12345678;
    expect(deleteTaskGroup({"params": {"idTaskGroup": idTaskGroup}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /taskGroup/:idTaskGroup idTaskGroup is undefined', async () => {
    var idTaskGroup = undefined;
    expect(deleteTaskGroup({"params": {"idTaskGroup": idTaskGroup}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /taskGroup/:idTaskGroup idTaskGroup is null', async () => {
    var idTaskGroup = null;
    expect(deleteTaskGroup({"params": {"idTaskGroup": idTaskGroup}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /taskGroup/:idTaskGroup params is undefined', async () => {
    var idTaskGroup = "_epxye8be2";
    expect(deleteTaskGroup({"params": {"": idTaskGroup}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /taskGroup/:idTaskGroup req is undefined', async () => {
    expect(deleteTaskGroup(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});
