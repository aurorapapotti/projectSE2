const userFunctions = require('../src/functionsEntities/userFunctions.js');
const listAllUsers = require ('../src/user.js').listAllUsers;
const deleteUser = require('../src/user.js').deleteUser;
const getUser = require('../src/user.js').getUser;
const registerUser = require('../src/register.js').registerUser;

const res = {
  "status": (statuscode) =>{ return {
    "json": (list) => { return {"code": statuscode, "list": list}
     }
   }}
}

const user = {
  name: "Gianni",
  surname: "Morandi",
  email: "gianni.morandi@email.it",
  badgeNumber: 123456
}

describe ('GET /user valid tests', () => {
  test('GET /user return code 200', () => {
    var req = {};
    expect(listAllUsers({"body": {}},res)).toEqual(res.status(200).json(userFunctions.getAllUsers()));
  })
});

describe ('GET /user invalid tests', () => {
  test('GET /user req undefined', () => {
    expect(listAllUsers(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe ('GET /user/:idUser valid tests', () => {
  test('GET /user/:idUser return code 200', () => {
    var userID = userFunctions.createUser(user);
    expect(getUser({"params": {"idUser": userID}},res)).toEqual(res.status(200).json(user));
  })
});

describe ('GET /user/:idUser invalid tests', () => {
  test('GET /user/:idUser return code 404', () => {
    var userID = "_ciao"
    expect(getUser({"params": {"idUser": userID}},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('GET /user/:idUser userID is a number', () => {
    var userID = 834389
    expect(getUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser userID is undefined', () => {
    var userID = undefined
    expect(getUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser userID is null', () => {
    var userID = null
    expect(getUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser params is undefined', () => {
    var userID = "_jhdsd4783x"
    expect(getUser({"params": {"": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('GET /user/:idUser req is undefined', () => {
    expect(getUser(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
}); 

describe('DELETE /user/:idUser valid tests', () => {
  test('DELETE /user/:idUser return code 200', () => {
    var userID = userFunctions.createUser(user);
    expect(deleteUser({"params": {"idUser": userID}},res)).toEqual(res.status(200).json("User deleted"));
  })
});

describe('DELETE /user/:idUser invalid tests', () => {
  test('DELETE /user/:idUser return code 404', async () => {
    var userID = "_ciao";
    expect(deleteUser({"params": {"idUser": userID}},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('DELETE /user/:idUser userID is a number', async () => {
    var userID = 947398;
    expect(deleteUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser userID is undefined', async () => {
    var userID = undefined;
    expect(deleteUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser userID is null', async () => {
    var userID = null;
    expect(deleteUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser params is undefined', async () => {
    var userID = "_ytrtw8282";
    expect(deleteUser({"params": {"": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser req is undefined', async () => {
    expect(deleteUser(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});
