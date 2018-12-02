//--- POST ASSIGNMENT ---
const createAssignment = require('./assignment').createAssignment

test('create assignment (prof pos, tasks pos, clas pos, start pos, deadline pos)', () => {
	var prof = 1;
	var tasks = 1;
	var clas = 1;
	var start = 1;
	var deadline = 1;
	
	expect(createAssignment(prof, tasks, clas, start, deadline)).toBe(200);
});

test('create assignment (prof null, tasks null, clas null, start null, deadline null)', () => {
	var prof = null;
	var tasks = null;
	var clas = null;
	var start = null;
	var deadline = null;
	
	expect(createAssignment(prof, tasks, clas, start, deadline)).toBe(404);
});

test('create assignment (prof null, tasks pos, clas pos, start pos, deadline pos)', () => {
	var prof = null;
	var tasks = 1;
	var clas = 1;
	var start = 1;
	var deadline = 1;
	
	expect(createAssignment(prof, tasks, clas, start, deadline)).toBe(200);
});

test('create assignment (prof pos, tasks null, clas pos, start pos, deadline pos)', () => {
	var prof = 1;
	var tasks = null;
	var clas = 1;
	var start = 1;
	var deadline = 1;
	
	expect(createAssignment(prof, tasks, clas, start, deadline)).toBe(200);
});

test('create assignment (prof pos, tasks pos, clas null, start pos, deadline pos)', () => {
	var prof = 1;
	var tasks = 1;
	var clas = null;
	var start = 1;
	var deadline = 1;
	
	expect(createAssignment(prof, tasks, clas, start, deadline)).toBe(200);
});

test('create assignment (prof pos, tasks pos, clas pos, start null, deadline pos)', () => {
	var prof = 1;
	var tasks = 1;
	var clas = 1;
	var start = null;
	var deadline = 1;
	
	expect(createAssignment(prof, tasks, clas, start, deadline)).toBe(200);
});

test('create assignment (prof pos, tasks pos, clas pos, start pos, deadline null)', () => {
	var prof = 1;
	var tasks = 1;
	var clas = 1;
	var start = 1;
	var deadline = null;
	
	expect(createAssignment(prof, tasks, clas, start, deadline)).toBe(200);
});


//--- GET ASSIGNMENTS ---
const getAssignments = require('./assignment').getAssignments

test('get assignment (id null)', () => {
	var id = null;
	
	expect(getAssignments(id)).toBe(404);
});

test('get assignment (id pos)', () => {
	var id = 1;
	
	expect(getAssignments(id)).toBe(200);
});


//--- PUT ASSIGNMENT/ASSIGNMENT_ID ---
const editAssignment = require('./assignment/assignmentId').editAssignment

test('edit assignment (old null, new pos)', () => {
	var oldAss = null;
	var newAss = 3;
	
	expect(editAssignment(oldAss, newAss)).toBe(404);
});

test('edit assignment (old pos, new null)', () => {
	var oldAss = 3;
	var newAss = null;
	
	expect(editAssignment(oldAss, newAss)).toBe(404);
});

test('edit assignment (old null, new null)', () => {
	var oldAss = null;
	var newAss = null;
	
	expect(editAssignment(oldAss, newAss)).toBe(404);
});

test('edit assignment (old pos, new pos)', () => {
	var oldAss = 4;
	var newAss = 3;
	
	expect(editAssignment(oldAss, newAss)).toBe(200);
});


//--- GET ASSIGNMENT/ASSIGNMENT_ID ---
const getAssignment = require('./assignment/assignmentId').getAssignment

test('get assignment (id null)', () => {
	var id = null;
	
	expect(getAssignment(id)).toBe(404);
});

test('get assignment (id pos)', () => {
	var id = 1;
	
	expect(getAssignment(id)).toBe(200);
});


//--- DELETE ASSIGNMENT/ASSIGNMENT_ID ---
const deleteAssignment = require('./assignment/assignmentId').deleteAssignment

test('delete assignment (id null)', () => {
	var id = null;
	
	expect(delete(id)).toBe(404);
});

test('delete assignment (id pos)', () => {
	var id = 1;
	
	expect(delete(id)).toBe(200);
});


//--- GET ASSIGNMENT/PROFESSOR ---
const getProfessor = require('./assignment/Professor').getProfessor

test('get professor (id null)', () => {
	var id = null;
	
	expect(getProfessor(id)).toBe(404);
});

test('get professor (id pos)', () => {
	var id = 1;
	
	expect(getProfessor(id)).toBe(200);
});


//--- GET USERS ---
const getUsers = require('./assignment/assignmentId/users').getUsers
...........................


//--- PUT USERS ---
const editUsers = require('./assignment/assignmentId/users').editUsers

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


//--- GET TASKS ---
..........................

//--- PUT TASKS ---
const editUsers = require('./assignment/assignmentId/tasks').editUsers

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