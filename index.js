const express = require('express'),
    bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const register = require(./src/register.js);
const login = require(./src/login.js);

//REGISTER
const newUserRegistered = [];

register.post ('/register', function(req, res){
})

//LOGIN
