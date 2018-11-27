var express = require('express');
var app = express();
var fs = require("fs");

var user = {
  "user3" : {
    "id" : "3",
    "name" : "Maria",
    "surname" : "Cavalli",
    "badgeNumber" : "456123",
    "email" : "gino.mazzo@email.it"
  }
}

function registerUser(req, res) {
  fs.readFile( "entities" + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user3"] = user["user3"];
      console.log( data );
      res.end( JSON.stringify(data));
   });
}
