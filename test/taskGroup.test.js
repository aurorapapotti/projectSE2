const taskGroupFunctions = require('../src/functionsEntities/taskGroupFunctions.js');
const listAllTaskGroups = require ('../src/taskGroup.js').listAllTaskGroups;
const deleteTaskGroup = require('../src/taskGroup.js').deleteTaskGroup;
const getTaskGroup = require('../src/taskGroup.js').getTaskGroup;
const createTaskGroup = require('../src/taskGroup.js').createTaskGroup;
const getTaskGroupByName = require ('../src/taskGroup.js').getTaskGroupByName;

const res = {
  "status": (statuscode) =>{ return {
    "json": (list) => { return {"code": statuscode, "list": list}
     }
   }}
}

const taskGroup = {
  name: "SEMA",
  author: "Martina",
  tasks: "123"
}

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
    var idTaskGroup = taskGroupFunctions.createTaskGroup(taskGroup);
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

/*
describe ('GET /taskGroup/:taskGroupName', () => {
	test('GET /taskGroup/:taskGroupName return code 200', () => {
	  var taskGroupName = taskGroupFunctions.getTaskGroupByName(taskGroupName);
	  expect(getTaskGroupByName({"params": {"TaskGroupName": taskGroupName}},res)).toEqual(res.status(200).json(taskGroupName));
	})
  });
  
  describe ('GET /taskGroupName/:taskGroupName invalid tests', () => {
	test('GET /taskGroup/:taskGroupName return code 404', () => {
	  var taskGroupName = "SEMA"
	  expect(getTaskGroupByName({"params": {"taskGroupName": taskGroupName}},res)).toEqual(res.status(400).json("Bad Request"));
	})
  
	test('GET /taskGroup/:TaskGroupName taskGroupName is undefined', () => {
	  var taskGroupName = undefined
	  expect(getTaskGroupByName({"params": {"taskGroupName": taskGroupName}},res)).toEqual(res.status(400).json("Bad Request"));
	})
  
	test('GET /taskGroup/:taskGroupName taskGroupName is null', () => {
	  var taskGroupName = null
	  expect(getTaskGroupByName({"params": {"taskGroupName": taskGroupName}},res)).toEqual(res.status(400).json("Bad Request"));
	});
  }); 

*/
//DELETE TASKGROUP

describe('DELETE /taskGroup/:idTaskGroup valid tests', () => {
  test('DELETE /taskGroup/:idTaskGroup return code 200', () => {
    var idTaskGroup = taskGroupFunctions.createTaskGroup(taskGroup);
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
