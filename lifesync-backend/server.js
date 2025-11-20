require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// IMPORT ROUTES
const taskRoutes = require('./routes/tasks'); 
const habitRoutes = require('./routes/habits'); // <--- 1. Import Habits

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = ""; 

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// ROUTES
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, 'secretkey123', { expiresIn: '1h' });
        res.json({ token, user: { email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// REGISTER ROUTE FILES
app.use('/tasks', taskRoutes);
app.use('/habits', habitRoutes); // <--- 2. Use Habits

app.listen(5000, () => console.log('Server running on port 5000'));