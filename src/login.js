const userFunctions = require('./functionsEntities/userFunctions.js');

function loginUser(req, res) {
  //console.log("recived request: ",req.body);
  if(!req || !req.body || !req.body.id)
    return res.status(400).send("Bad Request");
  if (typeof req.body.id !== 'string')
    return res.status(400).send("Bad Request");
  return res.status(201).send("User Found");
}

module.exports = {
    loginUser: loginUser
}
