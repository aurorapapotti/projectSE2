const persistencyLayer = require('./persistencyLayer.js');


function registerUser(req, res) {
  console.log("recived request: ",req.body);
  persistencyLayer.writeUser(req.body);
  console.log("wrote completed: ",persistencyLayer.getAllUsers());
  res.status(201).send("Created");
}

module.exports = {
    registerUser: registerUser
}
