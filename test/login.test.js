const userFunctions = require('../src/functionsEntities/userFunctions.js');
const loginUser = require('../src/login.js').loginUser;

//mock response object
const res = {
  "status": (statuscode) =>{ return {
    "send": (message) => { return {"code": statuscode, "message": message}
     }
   }}
}

const user = {
  name: "Gianni",
  surname: "Morandi",
  email: "gianni.morandi@email.it",
  badgeNumber: 123456
}

describe ('POST test valid', () => {
  test('POST /login return code 201', () => {
    var userID = userFunctions.createUser(user);
    var req = {
      id: userID
    }
    expect(loginUser({"body": req},res)).toEqual(res.status(201).send("User Found"));
  })
});

describe ('POST test invalid', () => {
  test('POST /login id is a integer', () => {
    var user = {
      id: 1,
    }
    expect(loginUser({"body": user},res)).toEqual(res.status(401).send("Bad Request"));
  })

  test('POST /login body id is undefined', () => {
    var user = {
      id: undefined,
    }
    expect(loginUser({"body": user},res)).toEqual(res.status(401).send("Bad Request"));
  })

  test('POST /login body req is undefined', () => {
    var user = {
      id: "_qumn0x035",
    }
    expect(loginUser({"": user},res)).toEqual(res.status(401).send("Bad Request"));
  })
})
