const db = require('./db');

const Task = (req, res) => {
    let task = {
        argument: req.body.argument,
        description: req.body.description,
        type: req.body.type,
        author: req.body.author
    };

    if (!task.type || typeof task.type != 'string' || (task.type != 'Normal' && task.type != "Multiple_choice")) {
        res.status(400).json({ error: 'The field "type" must be a non-empty string. Possible types: "Normal", 
"Multiple_choice' });
        return;
    }

    if (!task.argument || typeof task.argument != 'string') {
        res.status(400).json({ error: 'The field "argument" must be a string' });
        return;
    }

    if (!task.description || typeof task.description != 'string') {
        res.status(400).json({ error: 'The field "description" must be a non-empty string' });
        return;
    }
	
	if (!task.author || typeof task.author != 'string') {
        res.status(400).json({ error: 'The field "author" must be a  non-empty string' });
        return;
    }
};

module.exports = {
    Task
};





