const create = require('./Task').create;

test('Create a Task', () => {
	var argument = 1;
	var description = 1;
	var author = 1;
	
	expect(create(argument, description, type, author)).toBe(200);
});

test('Create a Task: argument null', () => {
	var argument = null;
	var description = 1;
	var type = 1;
	var author = 1;
	
	expect(create(argument, description, type, author)).toBe(400);
});

test('Create a Task: description null', () => {
	var argument = 1;
	var description = null;
	var type = 1;
	var author = 1;
	
	expect(create(argument, description, type, author)).toBe(400);
});

test('Create a Task: type null', () => {
	var argument = 1;
	var description = 1;
	var type = null;
	var author = 1;
	
	expect(create(argument, description, type, author)).toBe(400);
});

test('Create a Task: author null', () => {
	var argument = 1;
	var description = 1;
	var type = 1;
	var author = null;
	
	expect(create(argument, description, type, author)).toBe(400);
});

test('Create a task: all attributes null', () => {
	var argument = null;
	var description = null;
	var type = null;
	var author = null;
	
	expect(create(argument, description, type, author)).toBe(400);
});

const updateTask = require('./task/Id').update;

test('Update the id of a task', () => {
	var oldId = 1;
	var newId = 2;
	
	expect(updateTask(oldId, newId)).toBe(200);
});

test('Update the id of a task: oldId null', () => {
	var oldId = null;
	var newId = 2;
	
	expect(updateTask(oldId, newId)).toBe(400);
});

test('Update the id of a task: newId null', () => {
	var oldId = 1;
	var newId = null;
	
	expect(updateTask(oldId, newId)).toBe(400);
});

test('Edit the id of a task: all attributes null', () => {
	var oldId = null;
	var newId = null;
	
	expect(updateTask(oldId, newId)).toBe(400);
});

const deleteTask = require('./task/Id').deleteTask;

test('Delete task', () => {
	var taskId = 1;
	
	expect(deleteTask(taskId)).toBe(204);
});

test('Delete task: id null', () => {
	var taskId = null;
	
	expect(deleteTask(taskId)).toBe(400);
});


const updateArgument = require('./task/Id/argument').update;

test('Update Argument', () => {
	var taskId = 1;
	var argument = 1;
	var newArgument = 2;
	
	expect(updateArgument(taskId, argument, newArgument)).toBe(200);
});

test('Update Argument: taskId null', () => {
	var taskId = null;
	var argument = 1;
	var newArgument = 2;
	
	expect(updateArgument(taskId, argument, newArgument)).toBe(400);
});

test('Update Argument: argument null', () => {
	var taskId = 1;
	var argument = null;
	var newArgument = 2;
	
	expect(updateArgument(taskId, argument, newArgument)).toBe(400);
});

test('Update Argument: newArgument null', () => {
	var taskId = 1;
	var argument = 1;
	var newArgument = null;
	
	expect(updateArgument(taskId, argument, newArgument)).toBe(400);
});

test('Update Argument: all attributes null', () => {
	var taskId = null;
	var argument = null;
	var newArgument = null;
	
	expect(updateArgument(taskId, argument, newArgument)).toBe(400);
});

const updateAuthor = require('./task/Id/Author').update;

test('Update Author', () => {
	var taskId = 1;
	var author = 1;
	var newAuthor = 2;
	
	expect(updateAuthor(taskId, author, newAuthor)).toBe(200);
});

test('Update Author: taskId null', () => {
	var taskId = null;
	var author = 1;
	var newAuthor = 2;
	
	expect(updateAuthor(taskId, author, newAuthor)).toBe(400);
});

test('Update Author: author null', () => {
	var taskId = 1;
	var author = null;
	var newAuthor = 2;
	
	expect(updateAuthor(taskId, author, newAuthor)).toBe(400);
});

test('Update Author: newAuthor null', () => {
	var taskId = 1;
	var author = 1;
	var newAuthor = null;
	
	expect(updateAuthor(taskId, author, newAuthor)).toBe(400);
});

test('Update Author: all attributes null', () => {
	var taskId = null;
	var author = null;
	var newAuthor = null;
	
	expect(updateAuthor(taskId, author, newAuthor)).toBe(400);
});

