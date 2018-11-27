const db = require('./db');

const TaskGroup = (req, res) => {
    let TaskGroup = {
        name: req.body.name,
        author: req.body.author,
		tasks: req.body.tasks
    };


    if (!task.name || typeof task.name != 'string') {
        res.status(400).json({ error: 'The field "name" must be a 
string' });
        return;
    }

    if (!task.tasks || typeof task.tasks != 'string') {
        res.status(400).json({ error: 'The field "tasks" must be a 
non-empty string' });
        return;
    }
	
	if (!task.author || typeof task.author != 'string') {
        res.status(400).json({ error: 'The field "author" must be a  
non-empty string' });
        return;
    }
};

module.exports = {
    TaskGroup
};





