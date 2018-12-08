const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());

const register = require("./src/register.js");
const login = require("./src/login.js");
const user = require("./src/user.js");

app.get('/', (req, res) => res.send('Hello World!'))

//REGISTER
app.post('/register',register.registerUser);

//LOGIN
app.post('/login', login.loginUser);

//USER
app.get('/user', user.listAllUsers);
app.get('/user/:idUser', user.getUser);
app.delete('/user/:idUser', user.deleteUser);
app.get('/user/:idUser/assignments', user.getAssignmentsByIdUser);
app.get('/user/:idUser/assignments/:idAssignment', user.getAssignmentByIdUser);
app.delete('/user/:idUser/assignments/:idAssignment', user.deleteAssignmentByIdUser);

app.listen(PORT, () => console.log('App listening on port'+ PORT))
