const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Import the User model

app.use(cors());
app.use(express.json()); // For parsing JSON data
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/authWebsite', {
}).then(() => {
  console.log('Connected to the database');
}).catch(err => {
  console.error('Database connection error:', err);
});

// POST route for user registration
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating user', details: error.message });
  }
});

app.get("/create", async (req, res) => {
    try {
        mongoose.connection.db.createCollection("users");
        res.status(200).send("Users collection created successfully!");
    }catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error creating users', details: error.message });
    }
});

// Start the server
app.listen(7777, () => {
  console.log('Server is running on port 7777');
});
