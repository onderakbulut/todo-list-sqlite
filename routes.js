const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
    res.send('Api is running');
});

// create a task
router.post('/create', (req, res) => {
    const { title, completed, user_id } = req.body;
    db.run('INSERT INTO tasks (title, completed, user_id) VALUES (?, ?, ?)', [title, completed, user_id], function(err) {
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

// get tasks by user id
router.get('/tasks/:userId', (req, res) => {
    const { userId } = req.params;
    db.all('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, rows) => {
        res.json({ status: 'success', data: rows });
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


// get all users
router.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
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

// user register
router.post('/user/register', (req, res) => {
    const { username, email, password } = req.body;
    
    db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
        [username, email, password], 
        function(err) {
            if (err) {
                if (err.errno === 19 && err.message.includes('users.email')) {
                    return res.status(409).json({ 
                        status: 'error', 
                        message: 'This email is already in use',
                        error: {
                            code: 'EMAIL_EXISTS',
                            field: 'email'
                        }
                    });
                }

                console.error('Database error:', err);
                return res.status(500).json({ 
                    status: 'error', 
                    message: 'An error occurred while registering user',
                    error: {
                        code: err.code,
                        message: err.message,
                        type: err.errno ? `SQLite Error Code: ${err.errno}` : 'Unknown error'
                    }
                });
            }
            
            if (this.lastID) {
                res.json({ 
                    status: 'success', 
                    message: 'User created successfully',
                    userId: this.lastID 
                });
            } else {
                res.status(500).json({ 
                    status: 'error', 
                    message: 'User registration could not be verified',
                    error: {
                        type: 'ValidationError',
                        message: 'Record created but ID could not be retrieved'
                    }
                });
            }
        }
    );
});

// get a user
router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ 
                status: 'error',
                message: err.message 
            });
        } else if (!row) {
            res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        } else {
            res.json({
                status: 'success',
                data: row
            });
        }
    });
});

// update a user
router.put('/user/update/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    db.run('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [username, email, password, id], function(err) {
        res.json({ status: 'success', message: 'User updated successfully' });
    });
});

// delete a user
router.delete('/user/delete/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
        res.json({ status: 'success', message: 'User deleted successfully' });
    });
});

// login endpoint
router.post('/user/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
        if (err) {
            res.status(500).json({ 
                status: 'error',
                message: err.message 
            });
        } else if (!row) {
            res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        } else {
            res.json({
                status: 'success',
                userId: row.id,
                token: 'dummy-token' 
            });
        }
    });
});

module.exports = router;
