const registerUser = require('../src/register.js').registerUser;

//mock response object
const res = {
  "status": (statuscode) =>{ return {
    "send": (message) => { return {"code": statuscode, "message": message}
     }
   }}
}



test('POST /register return code 201', async () => {
  var user = {
    name: "Gianni",
    surname: "Morandi",
    email: "gianni.morandi@email.it",
    badgeNumber: 123456
  }
  expect(registerUser({"body": user},res)).toEqual(res.status(201).send("Created"));
});
test('POST /register no name', async () => {
  var user = {
    surname: "Morandi",
    email: "gianni.morandi@email.it",
    badgeNumber: 123456
  }
  expect(registerUser({"body": user},res)).toEqual(res.status(401).send("Bad Request"));
});
test('POST /register no email', async () => {
  var user = {
    name: "Gianni",
    surname: "Morandi",
    badgeNumber: 123456
  }
  expect(registerUser({"body": user},res)).toEqual(res.status(401).send("Bad Request"));
});
test('POST /register bad name format', async () => {
  var user = {
    name: 12334,
    surname: "Morandi",
    email: "gianni.morandi@email.it",
    badgeNumber: 123456
  }
  expect(registerUser({"body": user},res)).toEqual(res.status(401).send("Bad Request"));
});
test('POST /register bad badgeNumber format', async () => {
  var user = {
    name: 12334,
    surname: "Morandi",
    email: "gianni.morandi@email.it",
    badgeNumber: 123456.5
  }
  expect(registerUser({"body": user},res)).toEqual(res.status(401).send("Bad Request"));
});
