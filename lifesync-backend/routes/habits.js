const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Habit = require('../models/Habit');

// GET all habits
router.get('/', auth, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.json(habits);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// POST create habit
router.post('/', auth, async (req, res) => {
  try {
    const newHabit = new Habit({
      title: req.body.title,
      user: req.user.id,
      completedDates: []
    });
    const habit = await newHabit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// PUT Toggle Check-in
router.put('/:id/toggle', auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ msg: 'Habit not found' });

    const today = new Date().toISOString().split('T')[0];
    const index = habit.completedDates.indexOf(today);
    
    if (index === -1) {
      habit.completedDates.push(today);
    } else {
      habit.completedDates.splice(index, 1);
    }

    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// DELETE habit
router.delete('/:id', auth, async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Habit deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;