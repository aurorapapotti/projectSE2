const express = require('express'),
    bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const register = require(./register);
const login = require(./login);

//REGISTER
const newUserRegistered = [];

register.post ('/', function(req, res){
  const newUser = req.body

})
