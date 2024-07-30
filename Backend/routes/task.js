const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/Task');

const router = express.Router();

// Create Task
router.post('/', auth, async (req, res) => {
    const { title, description, status, priority, deadline } = req.body;
    try {
        const task = new Task({ title, description, status, priority, deadline, user: req.user.id });
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get Tasks
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Update Task
router.put('/:id', auth, async (req, res) => {
    const { title, description, status, priority, deadline } = req.body;
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        task = await Task.findByIdAndUpdate(req.params.id, { title, description, status, priority, deadline }, { new: true });
        res.json(task);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete Task
router.delete('/:id', auth, async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        console.log(req.params.id)
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error', err.message);
    }
});

module.exports = router;
