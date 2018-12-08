const userFunctions = require('../src/functionsEntities/userFunctions.js');
const listAllUsers = require ('../src/user.js').listAllUsers;
const getUser = require('../src/user.js').getUser;
const putUser = require('../src/user.js').putUser;
const deleteUser = require('../src/user.js').deleteUser;
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

const newUser = {
  name: "Chiara",
  surname: "Ferragni",
  email: "chiara.ferragni@email.it",
  badgeNumber: 654321
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

describe('PUT /user/:idUser valid tests', () => {
  test('PUT /user/:idUser return code 200', () => {
    var userID = userFunctions.createUser(user);
    expect(putUser({"params": {"idUser": userID},"body":newUser},res)).toEqual(res.status(200).json("User modified"));
  })
});

describe('PUT /user/:idUser invalid tests', () => {
  test ('PUT /user/:idUser return code 404', () => {
    var userID = "_ciao";
    expect(putUser({"params": {"idUser": userID},"body":newUser},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('PUT /user/:idUser userID is a number', () => {
    var userID = 947398;
    expect(putUser({"params": {"idUser": userID},"body":newUser},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser userID is undefined', () => {
    var userID = undefined;
    expect(putUser({"params": {"idUser": userID},"body":newUser},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser userID is null', () => {
    var userID = null;
    expect(putUser({"params": {"idUser": userID},"body":newUser},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser params is undefined', () => {
    var userID = "_ytrtw8282";
    expect(putUser({"params": {"": userID},"body":newUser},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser req is undefined', () => {
    expect(putUser(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser bad badgeNumber format', () => {
    var userID = userFunctions.createUser(user);
    var userNew = {
      name: "Chiara",
      surname: "Ferragni",
      email: "chiara.ferragni@email.it",
      badgeNumber: 654321.6327
    }
    expect(putUser({"params": {"idUser": userID},"body":userNew},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser bad name format', () => {
    var userID = userFunctions.createUser(user);
    var userNew = {
      name: 37638292,
      surname: "Ferragni",
      email: "chiara.ferragni@email.it",
      badgeNumber: 654321.6327
    }
    expect(putUser({"params": {"idUser": userID},"body":userNew},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser no email', () => {
    var userID = userFunctions.createUser(user);
    var userNew = {
      name: "Chiara",
      surname: "Ferragni",
      badgeNumber: 654321.6327
    }
    expect(putUser({"params": {"idUser": userID},"body":userNew},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser no name', () => {
    var userID = userFunctions.createUser(user);
    var userNew = {
      surname: "Ferragni",
      email: "chiara.ferragni@email.it",
      badgeNumber: 654321.6327
    }
    expect(putUser({"params": {"idUser": userID},"body":userNew},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('PUT /user/:idUser no surname', () => {
    var userID = userFunctions.createUser(user);
    var userNew = {
      name: "Chiara",
      email: "chiara.ferragni@email.it",
      badgeNumber: 654321.6327
    }
    expect(putUser({"params": {"idUser": userID},"body":userNew},res)).toEqual(res.status(400).json("Bad Request"));
  })
});

describe('DELETE /user/:idUser valid tests', () => {
  test('DELETE /user/:idUser return code 200', () => {
    var userID = userFunctions.createUser(user);
    expect(deleteUser({"params": {"idUser": userID}},res)).toEqual(res.status(200).json("User deleted"));
  })
});

describe('DELETE /user/:idUser invalid tests', () => {
  test('DELETE /user/:idUser return code 404', () => {
    var userID = "_ciao";
    expect(deleteUser({"params": {"idUser": userID}},res)).toEqual(res.status(404).json("User NOT found"));
  })

  test('DELETE /user/:idUser userID is a number', () => {
    var userID = 947398;
    expect(deleteUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser userID is undefined', () => {
    var userID = undefined;
    expect(deleteUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser userID is null', () => {
    var userID = null;
    expect(deleteUser({"params": {"idUser": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser params is undefined', () => {
    var userID = "_ytrtw8282";
    expect(deleteUser({"params": {"": userID}},res)).toEqual(res.status(400).json("Bad Request"));
  })

  test('DELETE /user/:idUser req is undefined', () => {
    expect(deleteUser(undefined,res)).toEqual(res.status(400).json("Bad Request"));
  })
});
