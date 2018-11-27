const create = require('./TaskGroup').create;

test('Create a TaskGroup', () => {
	var name = 1;
	var author = 1;
	var tasks = 1;
	
	expect(create(name, author, tasks)).toBe(200);
});

test('Create a TaskGroup: name null', () => {
	var name = null;
	var author = 1;
	var tasks = 1;
	
	expect(create(name, author, tasks)).toBe(400);
});

test('Create a TaskGroup: author null', () => {
	var name = 1;
	var author = null;
	var tasks = 1;
	
	expect(create(name, author, tasks)).toBe(400);
});

test('Create a TaskGroup: tasks null', () => {
	var name = 1;
	var author = 1;
	var tasks = null;
	
	expect(create(name, author, tasks)).toBe(400);
});

test('Create a TaskGroup: all attributes null', () => {
	var name = null;
	var author = null;
	var tasks = null;
	
	expect(create(name, author, tasks)).toBe(400);
});

const updateTaskGroup = require('./taskGroup/Id').update;

test('Update the id of a taskGroup', () => {
	var oldId = 1;
	var newId = 2;
	
	expect(updateTaskGroup(oldId, newId)).toBe(200);
});

test('Update the id of a taskGroup: oldId null', () => {
	var oldId = null;
	var newId = 2;
	
	expect(updateTaskGroup(oldId, newId)).toBe(400);
});

test('Update the id of a taskGroup: newId null', () => {
	var oldId = 1;
	var newId = null;
	
	expect(updateTaskGroup(oldId, newId)).toBe(400);
});

test('Edit the id of a taskGroup: all attributes null', () => {
	var oldId = null;
	var newId = null;
	
	expect(updateTaskGroup(oldId, newId)).toBe(400);
});

const deleteTaskGroup = require('./taskGroup/Id').deleteTaskGroup;

test('Delete taskGroup', () => {
	var taskGroupId = 1;
	
	expect(deleteTaskGroup(taskGroupId)).toBe(204);
});

test('Delete taskGroup: id null', () => {
	var taskGroupId = null;
	
	expect(deleteTaskGroup(taskGroupId)).toBe(400);
});


const updateName = require('./task/Id/name').update;

test('Update Name', () => {
	var taskGroupId = 1;
	var name = 1;
	var newName = 2;
	
	expect(updateName(taskGroupId, name, newName)).toBe(200);
});

test('Update Name: taskId null', () => {
	var taskGroupId = null;
	var name = 1;
	var newName = 2;
	
	expect(updateName(taskGroupId, name, newName)).toBe(400);
});

test('Update Name: name null', () => {
	var taskGroupId = 1;
	var name = null;
	var newName = 2;
	
	expect(updateName(taskGroupId, name, newName)).toBe(400);
});

test('Update Name: newName null', () => {
	var taskGroupId = 1;
	var name = 1;
	var newName = null;
	
	expect(updateName(taskGroupId, name, newName)).toBe(400);
});

test('Update Name: all attributes null', () => {
	var taskGroupId = null;
	var name = null;
	var newName = null;
	
	expect(updateName(taskGroupId, name, newName)).toBe(400);
});

const updateAuthor = require('./taskGroup/Id/Author').update;

test('Update Author', () => {
	var taskGroupId = 1;
	var author = 1;
	var newAuthor = 2;
	
	expect(updateAuthor(taskGroupId, author, newAuthor)).toBe(200);
});

test('Update Author: taskId null', () => {
	var taskGroupId = null;
	var author = 1;
	var newAuthor = 2;
	
	expect(updateAuthor(taskGroupId, author, newAuthor)).toBe(400);
});

test('Update Author: author null', () => {
	var taskGroupId = 1;
	var author = null;
	var newAuthor = 2;
	
	expect(updateAuthor(taskGroupId, author, newAuthor)).toBe(400);
});

test('Update Author: newAuthor null', () => {
	var taskGroupId = 1;
	var author = 1;
	var newAuthor = null;
	
	expect(updateAuthor(taskGroupId, author, newAuthor)).toBe(400);
});

test('Update Author: all attributes null', () => {
	var taskGroupId = null;
	var author = null;
	var newAuthor = null;
	
	expect(updateAuthor(taskGroupId, author, newAuthor)).toBe(400);
});



