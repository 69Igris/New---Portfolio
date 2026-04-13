const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// Sample projects data
const sampleProjects = [
  {
    title: "E-Commerce Platform",
    shortDescription: "Full-stack e-commerce solution with modern UI",
    description: "A comprehensive e-commerce platform built with React and Node.js, featuring user authentication, payment processing, inventory management, and admin dashboard. Includes real-time notifications and responsive design.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Socket.io"],
    features: ["User Authentication", "Payment Processing", "Real-time Notifications", "Admin Dashboard", "Responsive Design"],
    image: null,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true
  },
  {
    title: "Task Management App",
    shortDescription: "Collaborative task management with real-time updates",
    description: "A modern task management application with drag-and-drop functionality, team collaboration features, and real-time updates. Built with React, Express, and WebSocket for live collaboration.",
    technologies: ["React", "Express", "PostgreSQL", "WebSocket", "DnD", "Material-UI"],
    features: ["Drag & Drop", "Real-time Collaboration", "Team Management", "Progress Tracking", "File Attachments"],
    image: null,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true
  },
  {
    title: "Weather Dashboard",
    shortDescription: "Interactive weather app with location-based forecasts",
    description: "A beautiful weather dashboard that provides detailed forecasts, interactive maps, and location-based weather data. Features include 7-day forecasts, hourly updates, and weather alerts.",
    technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Geolocation", "PWA"],
    features: ["7-Day Forecast", "Interactive Maps", "Weather Alerts", "Location Services", "PWA Support"],
    image: null,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: false
  },
  {
    title: "Social Media Analytics",
    shortDescription: "Analytics dashboard for social media metrics",
    description: "A comprehensive analytics dashboard for tracking social media performance across multiple platforms. Features include data visualization, custom reports, and automated insights.",
    technologies: ["React", "D3.js", "Python", "Django", "Redis", "Celery"],
    features: ["Data Visualization", "Custom Reports", "Automated Insights", "Multi-platform Support", "Real-time Updates"],
    image: null,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: false
  },
  {
    title: "Portfolio Website",
    shortDescription: "Modern portfolio with 3D animations and interactions",
    description: "A stunning portfolio website featuring 3D animations, interactive elements, and smooth transitions. Built with modern web technologies and optimized for performance.",
    technologies: ["React", "Three.js", "GSAP", "Framer Motion", "Tailwind CSS"],
    features: ["3D Animations", "Interactive Elements", "Smooth Transitions", "Responsive Design", "Performance Optimized"],
    image: null,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true
  },
  {
    title: "Chat Application",
    shortDescription: "Real-time chat with video calling capabilities",
    description: "A modern chat application with real-time messaging, video calling, file sharing, and group chat functionality. Built with WebRTC for video calls and Socket.io for real-time messaging.",
    technologies: ["React", "Socket.io", "WebRTC", "Node.js", "Express", "MongoDB"],
    features: ["Real-time Messaging", "Video Calls", "File Sharing", "Group Chats", "Message Encryption"],
    image: null,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: false
  }
];

// Seed function
async function seedDatabase() {
  try {
    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert sample projects
    await Project.insertMany(sampleProjects);
    console.log('Inserted sample projects');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run seed function
seedDatabase();

