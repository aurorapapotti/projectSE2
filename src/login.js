const persistencyLayer = require('./persistencyLayer.js');

function loginUser(req, res) {
  console.log("recived request: ",req.body);
  persistencyLayer.getUser(req.body.id);
  res.status(201).send("Found");
}

module.exports = {
    loginUser: loginUser
}
