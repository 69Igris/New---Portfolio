const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [process.env.CLIENT_ORIGIN || 'http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server / curl
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(null, true); // fallback: allow during local dev
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));
app.options('*', cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Contact Message Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  technologies: [String],
  features: [String],
  image: String,
  liveUrl: String,
  githubUrl: String,
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get featured projects
app.get('/api/projects/featured', async (req, res) => {
  try {
    const featuredProjects = await Project.find({ featured: true }).sort({ createdAt: -1 });
    res.json(featuredProjects);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({ error: 'Failed to fetch featured projects' });
  }
});

// Create a new project
app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to database
    const contactMessage = new Contact({
      name,
      email,
      subject,
      message
    });

    await contactMessage.save();

    // Send email notification (optional)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Your email
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get all contact messages (admin route)
app.get('/api/contact', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;

