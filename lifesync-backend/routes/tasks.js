const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware to check token
const Task = require('../models/Task');     // Database Model

// @route   GET /tasks
// @desc    Get all tasks for the specific logged-in user
router.get('/', auth, async (req, res) => {
  try {
    // Sort by newest first (-1)
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /tasks
// @desc    Create a new task
router.post('/', auth, async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      priority: req.body.priority,
      user: req.user.id // Link task to the user who sent the request
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /tasks/:id
// @desc    Update task (Mark as Completed/Uncompleted)
router.put('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Verify that the user owns this task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update the 'isCompleted' field
    task.isCompleted = req.body.isCompleted;
    
    // If title or priority were sent, update them too (optional future proofing)
    if (req.body.title) task.title = req.body.title;
    if (req.body.priority) task.priority = req.body.priority;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /tasks/:id
// @desc    Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find the task by ID
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if the user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Delete the task
    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;