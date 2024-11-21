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
// POST route for user login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the password with the hashed one
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // If successful, send a success response (you could also send a JWT token here)
    res.status(200).json({ message: 'Login successful', userId: user._id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in', details: error.message });
  }
});
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
// POST route for user login
app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Compare the password with the hashed one
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // If successful, send a success response (you could also send a JWT token here)
      res.status(200).json({ message: 'Login successful', userId: user._id });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error logging in', details: error.message });
    }
  });


app.post("/create", async (req, res) => {
    try {
        mongoose.connection.db.createCollection("users");
        res.status(200).send("Users collection created successfully!");
    }catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error creating users', details: error.message });
    }
});
app.get("/getusers", async (req, res) => {
    try {
        // Await the result of the find query and convert it to an array
        const users = await mongoose.connection.db.collection("users").find().toArray();

        // Check if users were found, then respond
        if (users.length > 0) {
            console.log("Found users");
            res.status(200).json({ users });
        } else {
            console.log("No users found");
            res.status(404).json({ message: "No users found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching users', details: error.message });
    }
});
// Start the server
app.listen(7777, () => {
  console.log('Server is running on port 7777');
});
