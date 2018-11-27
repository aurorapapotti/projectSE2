const loginUser = require('../src/login.js').loginUser;

test('Login User', () => {
  expect(loginUser(req, res).not.toBe(null));
});
