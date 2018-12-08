const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({encoded: true}));

const register = require("./src/register.js");
const login = require("./src/login.js");
const user = require("./src/user.js");
const task = require("./src/task.js");
const taskGroup = require("./src/taskGroup.js");

//app.get('/', (req, res) => res.send('Hello World!'))

//REGISTER
app.post ('/register', function(req, res){
  res.send(register.registerUser(req, res));
})

//LOGIN
app.post ('/login', function(req, res){
  res.send(login.loginUser(req,res));
})

//USER
app.get ('/user', function(req, res){
  res.send(user.listAllUsers(req, res));
})

app.get ('/user/:idUser', function(req, res){
  res.send(user.getUser(req, res));
})

app.delete ('/user', function(req, res){
  res.send(user.deleteUser(req, res));
});

//TASK

app.post ('/task', function(req, res){
  res.send(task.createTask(req, res));
})

app.get ('/task', function(req, res){
  if (req.query.taskArgument !== null || req.query.taskArgument !== undefined){
    res.send(task.getTaskbyArgument(req, res));
  }
  else if (req.query.taskDescription !== null || req.query.taskDescription !== undefined){
    res.send(task.getTaskbyDescription(req, res));
  }
  else {
    res.send(task.getAllTasks(req, res));
  } 
})

app.delete ('/task/:taskId', function(req, res){
  res.send(task.deleteTask(req, res));
})

app.get ('/task/:taskId', function(req, res){
  res.send(task.getTaskbyId(req, res));
})


//TASKGROUP

app.post ('/taskGroup', function(req, res){
  res.send(taskGroup.createTaskGroup(req, res));
})

app.get ('/taskGroup', function(req, res){
  res.send(taskGroup.getAllTaskGroups(req, res));
})

app.delete ('/taskGroup/:taskGroupId', function(req, res){
  res.send(taskGroup.deleteTaskGroup(req, res));
})

app.get ('/taskGroup/:taskGroupId', function(req, res){
  res.send(taskGroup.getTaskGroupById(req, res));
})

app.get ('/taskGroup/:taskGroupName', function(req, res){
  res.send(taskGroup.getTaskByName(req, res));
})

app.listen(PORT, () => console.log('App listening on port'+ PORT))
