const taskFunctions = require('./functionsEntities/taskFunctions.js');

function listAllTask(req, res){
  console.log("recived request: ",req.body);
  res.status(200).send(taskFunctions.getAllTask());
}

function getTask(req, res){
  console.log("receiver request: ", req.params.Id);
  console.log(TaskFunctions.getTaskById(req.params.Id));
}

function deleteTask(req, res){
  console.log("receiver request: ", req.body);
  console.log(taskFunctions.removeTask(req.body.Id));
}

module.exports = {
  listAllTask: listAllTask,
  deleteTask: deleteTask,
  getTask: getTask
}

