const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err.message));
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// User model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  company: String,
  registeredAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Service request model
const serviceRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  service: String,
  description: String,
  budget: Number,
  timeline: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

// Routes
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, company } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, company });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.post('/service-request', async (req, res) => {
  try {
    const { service, description, budget, timeline } = req.body;
    const userId = req.user.userId; // Assuming you have middleware to extract user from token
    const serviceRequest = new ServiceRequest({ user: userId, service, description, budget, timeline });
    await serviceRequest.save();
    res.status(201).json({ message: 'Service request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting service request' });
  }
});

app.get('/service-history', async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming you have middleware to extract user from token
    const serviceRequests = await ServiceRequest.find({ user: userId });
    res.json(serviceRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service history' });
  }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));