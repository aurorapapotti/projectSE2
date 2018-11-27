const registerUser = require('../src/register.js').registerUser;

test('Register User', () => {
  expect(registerUser(req, res).not.toBe(null));
});
