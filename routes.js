const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
    res.send('Api is running');
});


// get all tasks
router.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            res.status(500).json({ 
                status: 'error',
                message: err.message 
            });
        } else {
            res.json({
                status: 'success',
                data: rows
            });
        }
    });
});

// create a task
router.post('/create', (req, res) => {
    const { title, completed } = req.body;
    db.run('INSERT INTO tasks (title, completed) VALUES (?, ?)', [title, completed], function(err) {
        if (err) {
            res.status(500).json({ 
                status: 'error',
                message: err.message 
            });
        } else {
            res.json({ 
                status: 'success',
                message: 'Task created successfully'
            });
        }
    });
});

// get a task
router.get('/get/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ 
                status: 'error',
                message: err.message 
            });
        } else if (!row) {
            res.status(404).json({
                status: 'error',
                message: 'Task not found'
            });
        } else {
            res.json({
                status: 'success',
                data: row
            });
        }
    });
});

// update a task
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    db.run('UPDATE tasks SET title = ?, completed = ? WHERE id = ?', [title, completed, id], function(err) {
        if (err) {
            res.status(500).json({ 
                status: 'error',
                message: err.message 
            });
        } else if (this.changes === 0) {
            res.status(404).json({
                status: 'error',
                message: 'Task not found'
            });
        } else {
            res.json({
                status: 'success',
                message: 'Task updated successfully'
            });
        }
    });
});

// delete a task
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(500).json({ 
                status: 'error',
                message: err.message 
            });
        } else if (this.changes === 0) {
            res.status(404).json({
                status: 'error',
                message: 'Task not found'
            });
        } else {
            res.json({
                status: 'success',
                message: 'Task deleted successfully'
            });
        }
    });
});

module.exports = router;
