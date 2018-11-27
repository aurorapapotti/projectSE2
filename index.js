const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());

const register = require("./src/register.js");
const login = require("./src/login.js");

app.get('/', (req, res) => res.send('Hello World!'))

//REGISTER
app.post ('/register', function(req, res){
  res.send(register.addUser(req, res));
})

/*LOGIN
login.post ('/login', function(req, res){

})*/

app.listen(PORT, () => console.log('App listening on port'+ PORT))
