const create = require('./taskAnswer').create;

test('Create a taskAnswer', () => {
	var student = 1;
	var assignment = 1;
	var taskGroup = 1;
	
	expect(create(student, assignment, taskGroup)).toBe(200);
});

test('Create a taskAnswer: student null', () => {
	var student = null;
	var assignment = 1;
	var taskGroup = 1;
	
	expect(create(student, assignment, taskGroup)).toBe(400);
});

test('Create a taskAnswer: assignment null', () => {
	var student = 1;
	var assignment = null;
	var taskGroup = 1;
	
	expect(create(student, assignment, taskGroup)).toBe(400);
});

test('Create a taskAnswer: taskGroup null', () => {
	var student = 1;
	var assignment = 1;
	var taskGroup = null;
	
	expect(create(student, assignment, taskGroup)).toBe(400);
});

test('Create a taskAnswer: all attributes null', () => {
	var student = null;
	var assignment = null;
	var taskGroup = null;
	
	expect(create(student, assignment, taskGroup)).toBe(400);
});

const editTaskAnswer = require('./taskAnswers/taskAnswerId').edit;

test('Edit the id of a taskAnswer', () => {
	var taskAnswerId = 1;
	var newTaskAnswerId = 2;
	
	expect(editTaskAnswer(taskAnswerId, newTaskAnswerId)).toBe(200);
});

test('Edit the id of a taskAnswer: taskAnswerId null', () => {
	var taskAnswerId = null;
	var newTaskAnswerId = 2;
	
	expect(editTaskAnswer(taskAnswerId, newTaskAnswerId)).toBe(400);
});

test('Edit the id of a taskAnswer: newTaskAnswerId null', () => {
	var taskAnswerId = 1;
	var newTaskAnswerId = null;
	
	expect(editTaskAnswer(taskAnswerId, newTaskAnswerId)).toBe(400);
});

test('Edit the id of a taskAnswer: all attributes null', () => {
	var taskAnswerId = null;
	var newTaskAnswerId = null;
	
	expect(editTaskAnswer(taskAnswerId, newTaskAnswerId)).toBe(400);
});

const deleteTaskAnswer = require('./taskAnswer/taskAnswerId').deleteTaskAnswer;

test('Delete taskAnswer', () => {
	var taskAnswerId = 1;
	
	expect(deleteTaskAnswer(taskAnswerId)).toBe(204);
});

test('Delete taskAnswer: id null', () => {
	var taskAnswerId = null;
	
	expect(deleteTaskAnswer(taskAnswerId)).toBe(400);
});

const editAnswer = require('./taskAnswer/taskAnswerId/answers/answerId').edit;

test('Edit answer', () => {
	var taskAnswerId = 1;
	var answerId = 1;
	var newAnswerId = 2;
	
	expect(editAnswer(taskAnswerId, answerId, newAnswerId)).toBe(200);
});

test('Edit answer: taskAnswerId null', () => {
	var taskAnswerId = null;
	var answerId = 1;
	var newAnswerId = 2;
	
	expect(editAnswer(taskAnswerId, answerId, newAnswerId)).toBe(400);
});

test('Edit answer: answerId null', () => {
	var taskAnswerId = 1;
	var answerId = null;
	var newAnswerId = 2;
	
	expect(editAnswer(taskAnswerId, answerId, newAnswerId)).toBe(400);
});

test('Edit answer: newAnswerId null', () => {
	var taskAnswerId = 1;
	var answerId = 1;
	var newAnswerId = null;
	
	expect(editAnswer(taskAnswerId, answerId, newAnswerId)).toBe(400);
});

test('Edit answer: all attributes null', () => {
	var taskAnswerId = null;
	var answerId = null;
	var newAnswerId = null;
	
	expect(editAnswer(taskAnswerId, answerId, newAnswerId)).toBe(400);
});

const editStudent = require('./taskAnswers/taskAnswerId/student').edit;

test('Edit student', () => {
	var taskAnswerId = 1;
	var student = 1;
	var newStudent = 2;
	
	expect(editStudent(taskAnswerId, student, newStudent)).toBe(200);
});

test('Edit student: taskAnswerId null', () => {
	var taskAnswerId = null;
	var student = 1;
	var newStudent = 2;
	
	expect(editStudent(taskAnswerId, student, newStudent)).toBe(400);
});

test('Edit student: student null', () => {
	var taskAnswerId = 1;
	var student = null;
	var newStudent = 2;
	
	expect(editStudent(taskAnswerId, student, newStudent)).toBe(400);
});

test('Edit student: newStudent null', () => {
	var taskAnswerId = 1;
	var student = 1;
	var newStudent = null;
	
	expect(editStudent(taskAnswerId, student, newStudent)).toBe(400);
});

test('Edit student: all attributes null', () => {
	var taskAnswerId = null;
	var student = null;
	var newStudent = null;
	
	expect(editStudent(taskAnswerId, student, newStudent)).toBe(400);
});

const editAssignment = require('./taskAnswers/taskAnswerId/assignment').edit;

test('Edit assignment', () => {
	var taskAnswerId = 1;
	var assignment = 1;
	var newAssignment = 2;
	
	expect(editStudent(taskAnswerId, assignment, newAssignment)).toBe(200);
});

test('Edit assignment: taskAnswerId null', () => {
	var taskAnswerId = null;
	var assignment = 1;
	var newAssignment = 2;
	
	expect(editStudent(taskAnswerId, assignment, newAssignment)).toBe(400);
});

test('Edit assignment: assignment null', () => {
	var taskAnswerId = 1;
	var assignment = null;
	var newAssignment = 2;
	
	expect(editStudent(taskAnswerId, assignment, newAssignment)).toBe(400);
});

test('Edit assignment: newAssignment null', () => {
	var taskAnswerId = 1;
	var assignment = 1;
	var newAssignment = null;
	
	expect(editStudent(taskAnswerId, assignment, newAssignment)).toBe(400);
});

test('Edit assignment: all attributes null', () => {
	var taskAnswerId = null;
	var assignment = null;
	var newAssignment = null;
	
	expect(editStudent(taskAnswerId, assignment, newAssignment)).toBe(400);
});

const editTaskGroup = require('./taskAnswer/taskAnswerId/taskGroup').edit;

test('Edit taskGroup', () => {
	var taskAnswerId = 1;
	var taskGroup = 1;
	var newTaskGroup = 2;
	
	expect(editTaskGroup(taskAnswerId, taskGroup, newTaskGroup)).toBe(200);
});

test('Edit taskGroup: taskAnswerId null', () => {
	var taskAnswerId = null;
	var taskGroup = 1;
	var newTaskGroup = 2;
	
	expect(editTaskGroup(taskAnswerId, taskGroup, newTaskGroup)).toBe(400);
});

test('Edit taskGroup: taskGroup null', () => {
	var taskAnswerId = 1;
	var taskGroup = null;
	var newTaskGroup = 2;
	
	expect(editTaskGroup(taskAnswerId, taskGroup, newTaskGroup)).toBe(400);
});

test('Edit taskGroup: newTaskGroup', () => {
	var taskAnswerId = 1;
	var taskGroup = 1;
	var newTaskGroup = null;
	
	expect(editTaskGroup(taskAnswerId, taskGroup, newTaskGroup)).toBe(400);
});

test('Edit taskGroup: all attributes null', () => {
	var taskAnswerId = null;
	var taskGroup = null;
	var newTaskGroup = null;
	
	expect(editTaskGroup(taskAnswerId, taskGroup, newTaskGroup)).toBe(400);
});