//--- GET USER GROUP ---
const getUsers = require('./userGroup').getUsers
.........................................


//--- POST USER GROUP ---
const createUsers = require('./userGroup').createUsers

test('create userGroup (author pos, users pos)', () => {
	var author = 1;
	var users = 1;
	
	expect(createUsers(author, users)).toBe(200);
});

test('create userGroup (author null, users pos)', () => {
	var author = null;
	var users = 1;
	
	expect(createUsers(author, users)).toBe(404);
});

test('create userGroup (author pos, users null)', () => {
	var author = 1;
	var users = null;
	
	expect(createUsers(author, users)).toBe(404);
});

test('create userGroup (author null, users null)', () => {
	var author = null;
	var users = null;
	
	expect(createUsers(author, users)).toBe(404);
});


//--- PUT USER GROUP ---
const editUsers = require('./userGroup').editUsers

test('edit users (old null, new pos)', () => {
	var oldAss = null;
	var newAss = 3;
	
	expect(editUsers(oldAss, newAss)).toBe(404);
});

test('edit users (old pos, new null)', () => {
	var oldAss = 3;
	var newAss = null;
	
	expect(editUsers(oldAss, newAss)).toBe(404);
});

test('edit users (old null, new null)', () => {
	var oldAss = null;
	var newAss = null;
	
	expect(editUsers(oldAss, newAss)).toBe(404);
});

test('edit users (old pos, new pos)', () => {
	var oldAss = 4;
	var newAss = 3;
	
	expect(editUsers(oldAss, newAss)).toBe(200);
});


//--- GET USER_GROUP/ID ---
const getId = require('./userGroup/userGroupId').getId
............................


//--- PUT USER_GROUP/ID ---
const putUsers = require('./userGroup/userGroupId').putUsers

test('edit users (old null, new pos)', () => {
	var oldAss = null;
	var newAss = 3;
	
	expect(putUsers(oldAss, newAss)).toBe(404);
});

test('edit users (old pos, new null)', () => {
	var oldAss = 3;
	var newAss = null;
	
	expect(putUsers(oldAss, newAss)).toBe(404);
});

test('edit users (old null, new null)', () => {
	var oldAss = null;
	var newAss = null;
	
	expect(putUsers(oldAss, newAss)).toBe(404);
});

test('edit users (old pos, new pos)', () => {
	var oldAss = 4;
	var newAss = 3;
	
	expect(putUsers(oldAss, newAss)).toBe(200);
});


//--- DELETE USER_GROUP/ID ---
const deleteId = require('./userGroup/userGroupId').deleteId

test('delete UserGroup (id null)', () => {
	var id = null;
	
	expect(deleteId(id)).toBe(404);
});

test('delete UserGroup (id pos)', () => {
	var id = 1;
	
	expect(deleteId(id)).toBe(200);
});


//--- GET USER_GROUP/AUTHOR ---
const getAuthor = require('./userGroup/Author').getAuthor
...................................


//--- GET USERS ---
const getUsers = require('./userGroup/userGroupId/users').getUsers
....................................


//--- DELETE A USER ---
const deleteUser = require('./userGroup/userGroupId/users/userId').deleteUser

test('delete User (id null)', () => {
	var id = null;
	
	expect(deleteUser(id)).toBe(404);
});

test('delete User (id pos)', () => {
	var id = 1;
	
	expect(deleteUser(id)).toBe(200);
});